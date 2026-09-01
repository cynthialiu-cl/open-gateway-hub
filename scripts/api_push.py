#!/usr/bin/env python3
"""
GSMA Open Gateway 情报站 - 通过 GitHub API 直接推送更新
不需要 git clone，直接通过 API 修改 data.js 并推送
使用方式: python scripts/api_push.py

工作流程:
  1. 获取远程 data.js 内容
  2. 调用 fetch_data.py 的抓取逻辑更新内容（CAMARA release + GSMA 新闻 + 时间戳）
  3. 通过 GitHub API 推送更新后的 data.js
  4. GitHub Pages 自动触发部署

前提条件:
  1. 设置环境变量 GITHUB_TOKEN (GitHub Personal Access Token, 需 repo 权限)
     或在 scripts/github_token.txt 中保存 token

  2. 设置 Windows 定时任务:
     schtasks /create /tn "OpenGatewayDailyUpdate" /tr "python C:\\path\\to\\scripts\\api_push.py" /sc daily /st 10:00

参考: Ivy-Huo/ai-hub-benchmark 使用同样的方式
"""

import json
import re
import os
import sys
import base64
import importlib.util
from datetime import datetime, timezone, timedelta
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError

# ============ 配置 ============
REPO_OWNER = "cynthialiu-cl"
REPO_NAME = "open-gateway-hub"
BRANCH = "main"
FILE_PATH = "data.js"

# 脚本所在目录
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
DATA_FILE = os.path.join(PROJECT_DIR, "data.js")

# ============ 动态加载 fetch_data 模块 ============
def load_fetch_module():
    """加载同目录下的 fetch_data.py 模块"""
    fetch_path = os.path.join(SCRIPT_DIR, "fetch_data.py")
    if not os.path.exists(fetch_path):
        print(f"[ERROR] fetch_data.py 不存在: {fetch_path}", file=sys.stderr)
        return None
    spec = importlib.util.spec_from_file_location("fetch_data", fetch_path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


# ============ Token 获取 ============
def get_token():
    """从环境变量或文件获取 GitHub Token"""
    # 1. 环境变量
    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
    if token:
        return token

    # 2. 文件
    token_file = os.path.join(SCRIPT_DIR, "github_token.txt")
    if os.path.exists(token_file):
        with open(token_file, "r") as f:
            token = f.read().strip()
            if token:
                return token

    print("[ERROR] 未找到 GitHub Token!", file=sys.stderr)
    print("请通过以下方式之一设置:", file=sys.stderr)
    print("  1. 设置环境变量 GITHUB_TOKEN", file=sys.stderr)
    print("  2. 在 scripts/github_token.txt 中保存 token", file=sys.stderr)
    print("获取 Token: https://github.com/settings/tokens (需 repo 权限)", file=sys.stderr)
    return None


# ============ GitHub API ============
def github_api(method, path, token, data=None):
    """调用 GitHub API"""
    url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/{path}"
    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "OpenGateway-DailyUpdate/1.0"
    }
    body = json.dumps(data).encode("utf-8") if data else None
    req = Request(url, data=body, headers=headers, method=method)
    try:
        with urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except HTTPError as e:
        err_body = e.read().decode("utf-8") if e.fp else ""
        print(f"  [ERROR] GitHub API {method} {path}: {e.code} {e.reason}", file=sys.stderr)
        if err_body:
            print(f"  [ERROR] Response: {err_body[:200]}", file=sys.stderr)
        return None
    except Exception as e:
        print(f"  [ERROR] {e}", file=sys.stderr)
        return None


def get_file_sha(token):
    """获取 data.js 当前的 sha (用于 API 更新)"""
    result = github_api("GET", f"contents/{FILE_PATH}?ref={BRANCH}", token)
    if result and "sha" in result:
        return result["sha"]
    return None


def get_remote_data_js(token):
    """获取远程 data.js 内容"""
    result = github_api("GET", f"contents/{FILE_PATH}?ref={BRANCH}", token)
    if result and "content" in result:
        content = result["content"].replace("\n", "")
        return base64.b64decode(content).decode("utf-8")
    return None


def push_data_js(content, sha, token, commit_msg):
    """通过 API 推送 data.js"""
    encoded = base64.b64encode(content.encode("utf-8")).decode("utf-8")
    data = {
        "message": commit_msg,
        "content": encoded,
        "sha": sha,
        "branch": BRANCH
    }
    result = github_api("PUT", f"contents/{FILE_PATH}", token, data)
    if result and "commit" in result:
        print(f"  [OK] 推送成功: {result['commit']['sha'][:7]}")
        return True
    return False


# ============ 数据更新（使用 fetch_data 模块）============
def update_content_with_fetch(remote_content, fetch_module):
    """使用 fetch_data 模块的抓取逻辑更新远程 data.js 内容"""
    now = datetime.now(timezone(timedelta(hours=8)))
    today = now.strftime("%Y-%m-%d")
    current_time = now.strftime("%Y-%m-%d %H:%M")

    # 1. 抓取 CAMARA releases
    print("  抓取 CAMARA GitHub releases...")
    camara_releases = fetch_module.fetch_all_camara_releases()

    # 2. 抓取 GSMA press releases
    print("  抓取 GSMA press releases...")
    gsma_news = fetch_module.fetch_gsma_press_releases()

    # 3. 抓取 GSMA resources
    print("  抓取 GSMA resources...")
    gsma_resources = fetch_module.fetch_gsma_resources()

    # 4. 将远程内容写入临时文件，用 fetch_data 的更新逻辑处理
    temp_file = os.path.join(SCRIPT_DIR, "_temp_data.js")
    with open(temp_file, "w", encoding="utf-8") as f:
        f.write(remote_content)

    # 临时修改 fetch_module 的 DATA_FILE 指向临时文件
    original_data_file = fetch_module.DATA_FILE
    fetch_module.DATA_FILE = temp_file

    # 调用更新逻辑
    success, changes = fetch_module.update_data_js(camara_releases, gsma_news, gsma_resources)

    # 恢复
    fetch_module.DATA_FILE = original_data_file

    if not success:
        return remote_content, today, current_time, {}

    # 读取更新后的内容
    with open(temp_file, "r", encoding="utf-8") as f:
        updated_content = f.read()

    # 清理临时文件
    try:
        os.remove(temp_file)
    except:
        pass

    return updated_content, today, current_time, changes


# ============ 主流程 ============
def main():
    print("=" * 60)
    print("GSMA Open Gateway 情报站 - GitHub API 自动推送（含数据抓取）")
    print(f"时间: {datetime.now(timezone(timedelta(hours=8))).strftime('%Y-%m-%d %H:%M:%S')} (UTC+8)")
    print("=" * 60)

    # 0. 加载 fetch_data 模块
    print("\n[0/4] 加载数据抓取模块...")
    fetch_mod = load_fetch_module()
    if not fetch_mod:
        sys.exit(1)
    print("  [OK] fetch_data.py 已加载")

    # 1. 获取 Token
    print("\n[1/4] 获取 GitHub Token...")
    token = get_token()
    if not token:
        sys.exit(1)
    print("  [OK] Token 已获取")

    # 2. 获取远程 data.js
    print("\n[2/4] 获取远程 data.js...")
    remote_content = get_remote_data_js(token)
    if not remote_content:
        print("[ERROR] 无法获取远程 data.js", file=sys.stderr)
        sys.exit(1)
    print(f"  [OK] 获取成功 ({len(remote_content)} bytes)")

    # 3. 获取当前 sha
    print("\n[3/4] 获取文件 sha...")
    sha = get_file_sha(token)
    if not sha:
        print("[ERROR] 无法获取文件 sha", file=sys.stderr)
        sys.exit(1)
    print(f"  [OK] sha={sha[:7]}")

    # 4. 抓取数据并更新内容
    print("\n[4/4] 抓取数据并更新...")
    updated_content, today, current_time, changes = update_content_with_fetch(remote_content, fetch_mod)

    # 检查是否有变化
    if updated_content == remote_content:
        print("  [SKIP] 内容无变化，跳过推送")
        sys.exit(0)

    # 汇报变更
    camara_updates = changes.get("camara_updates", [])
    new_news = changes.get("new_news", [])
    commit_parts = [f"data: daily auto-update {today}"]
    if camara_updates:
        commit_parts.append(f"\n\nCAMARA release 更新 ({len(camara_updates)} 个):")
        for u in camara_updates:
            commit_parts.append(f"  - {u['api']}: {u['old']} -> {u['new']}")
    if new_news:
        commit_parts.append(f"\n\n新增新闻 ({len(new_news)} 条):")
        for n in new_news:
            commit_parts.append(f"  - {n['date']}: {n['title'][:50]}")
    commit_msg = "".join(commit_parts)

    success = push_data_js(updated_content, sha, token, commit_msg)

    if success:
        print(f"\n[完成] 推送成功! version={today}, lastUpdate={current_time}")
        print(f"  GitHub Pages 将在 1-2 分钟内自动部署")
        if camara_updates:
            print(f"  CAMARA release 更新: {len(camara_updates)} 个")
        if new_news:
            print(f"  新增新闻: {len(new_news)} 条")
        sys.exit(0)
    else:
        print("\n[失败] 推送失败", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
