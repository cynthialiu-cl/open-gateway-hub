#!/usr/bin/env python3
"""
GSMA Open Gateway 情报站 - 通过 GitHub API 直接推送更新
不需要 git clone，直接通过 API 修改 data.js 并推送
使用方式: python scripts/api_push.py

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
import subprocess
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


# ============ 数据更新 ============
def update_content(content):
    """更新 data.js 内容中的时间戳和数据"""
    now = datetime.now(timezone(timedelta(hours=8)))
    today = now.strftime("%Y-%m-%d")
    current_time = now.strftime("%Y-%m-%d %H:%M")

    # 更新 version
    content = re.sub(
        r'version:\s*"[^"]*"',
        f'version: "{today}"',
        content
    )

    # 更新 lastUpdate
    content = re.sub(
        r'lastUpdate:\s*"[^"]*"',
        f'lastUpdate: "{current_time}"',
        content
    )

    return content, today, current_time


# ============ 主流程 ============
def main():
    print("=" * 60)
    print("GSMA Open Gateway 情报站 - GitHub API 自动推送")
    print(f"时间: {datetime.now(timezone(timedelta(hours=8))).strftime('%Y-%m-%d %H:%M:%S')} (UTC+8)")
    print("=" * 60)

    # 1. 获取 Token
    token = get_token()
    if not token:
        sys.exit(1)

    # 2. 获取远程 data.js
    print("\n[1/3] 获取远程 data.js...")
    remote_content = get_remote_data_js(token)
    if not remote_content:
        print("[ERROR] 无法获取远程 data.js", file=sys.stderr)
        sys.exit(1)
    print(f"  [OK] 获取成功 ({len(remote_content)} bytes)")

    # 3. 获取当前 sha
    print("\n[2/3] 获取文件 sha...")
    sha = get_file_sha(token)
    if not sha:
        print("[ERROR] 无法获取文件 sha", file=sys.stderr)
        sys.exit(1)
    print(f"  [OK] sha={sha[:7]}")

    # 4. 更新内容
    print("\n[3/3] 更新并推送...")
    updated_content, today, current_time = update_content(remote_content)

    # 检查是否有变化
    if updated_content == remote_content:
        print("  [SKIP] 内容无变化，跳过推送")
        sys.exit(0)

    commit_msg = f"data: daily auto-update {today}"
    success = push_data_js(updated_content, sha, token, commit_msg)

    if success:
        print(f"\n[完成] 推送成功! version={today}, lastUpdate={current_time}")
        print(f"  GitHub Pages 将在 1-2 分钟内自动部署")
        sys.exit(0)
    else:
        print("\n[失败] 推送失败", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
