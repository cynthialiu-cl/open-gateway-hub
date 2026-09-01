#!/usr/bin/env python3
"""
GSMA Open Gateway 情报站 - 每日数据抓取脚本
数据来源: GSMA 官网、CAMARA GitHub、监管机构官网等公开信源
运行方式: python3 scripts/fetch_data.py
说明: 仅更新 meta 信息和 CAMARA release 数据，历史新闻保留不删除
输出: 更新 data.js 中的 meta 字段，输出 camara_releases.json
"""

import json
import re
import os
import sys
from datetime import datetime, timezone, timedelta
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError

# 数据源 URL
SOURCES = {
    "gsma": "https://www.gsma.com/solutions-and-impact/gsma-open-gateway/",
    "camara_releases": "https://github.com/camaraproject/NumberVerification/releases",
    "simswap_releases": "https://github.com/camaraproject/SimSwap/releases",
    "qod_releases": "https://github.com/camaraproject/QualityOnDemand/releases",
    "gsma_map": "https://www.gsma.com/solutions-and-impact/gsma-open-gateway/open-gateway-api-launches-around-the-world/",
    "rbi": "https://www.rbi.org.in/scripts/BS_PressReleaseDisplay.aspx?prid=61282",
}

# 输出文件路径
DATA_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data.js")

def fetch_url(url, timeout=15):
    """安全地抓取 URL 内容"""
    try:
        req = Request(url, headers={
            "User-Agent": "Mozilla/5.0 (compatible; OpenGateway-Bot/1.0)"
        })
        with urlopen(req, timeout=timeout) as response:
            return response.read().decode("utf-8", errors="replace")
    except (URLError, HTTPError, Exception) as e:
        print(f"  [WARN] 抓取失败 {url}: {e}", file=sys.stderr)
        return None

def fetch_camara_releases(repo_name):
    """抓取 CAMARA GitHub 仓库的 release 信息"""
    api_url = f"https://api.github.com/repos/camaraproject/{repo_name}/releases?per_page=5"
    print(f"  [FETCH] CAMARA {repo_name} releases...")
    data = fetch_url(api_url)
    if not data:
        return []
    try:
        releases = json.loads(data)
        result = []
        for r in releases[:5]:
            tag = r.get("tag_name", "")
            name = r.get("name", "")
            published = r.get("published_at", "")[:10] if r.get("published_at") else ""
            prerelease = r.get("prerelease", False)
            html_url = r.get("html_url", "")
            result.append({
                "tag": tag,
                "name": name,
                "date": published,
                "prerelease": prerelease,
                "url": html_url
            })
        return result
    except json.JSONDecodeError:
        print(f"  [WARN] 解析 JSON 失败: {repo_name}", file=sys.stderr)
        return []

def fetch_gsma_operator_count():
    """从 GSMA 官网抓取运营商数量"""
    print("  [FETCH] GSMA operator count...")
    html = fetch_url(SOURCES["gsma"])
    if not html:
        return None
    # 尝试匹配运营商数量
    match = re.search(r'(\d+)\s+(?:operator|telecom|carrier)\s+groups?', html, re.IGNORECASE)
    if match:
        return int(match.group(1))
    return None

def fetch_meta_stats():
    """抓取统计数据用于更新 meta 信息"""
    stats = {
        "operatorCount": None,
        "camaraReleases": {},
    }

    # 抓取运营商数量
    op_count = fetch_gsma_operator_count()
    if op_count:
        stats["operatorCount"] = op_count

    # 抓取 CAMARA API releases
    for repo in ["NumberVerification", "SimSwap", "QualityOnDemand"]:
        releases = fetch_camara_releases(repo)
        if releases:
            stats["camaraReleases"][repo] = releases

    return stats

def update_data_file(stats):
    """更新 data.js 文件中的 meta 信息"""
    if not os.path.exists(DATA_FILE):
        print(f"  [ERROR] data.js 不存在: {DATA_FILE}", file=sys.stderr)
        return False

    with open(DATA_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    now = datetime.now(timezone(timedelta(hours=8)))
    today = now.strftime("%Y-%m-%d")
    current_time = now.strftime("%Y-%m-%d %H:%M")
    new_version = today
    new_last_update = current_time

    # 更新 version
    content = re.sub(
        r'version:\s*"[^"]*"',
        f'version: "{new_version}"',
        content
    )

    # 更新 lastUpdate
    content = re.sub(
        r'lastUpdate:\s*"[^"]*"',
        f'lastUpdate: "{new_last_update}"',
        content
    )

    # 如果抓取到运营商数量，更新
    if stats.get("operatorCount"):
        content = re.sub(
            r'operatorCount:\s*\d+',
            f'operatorCount: {stats["operatorCount"]}',
            content
        )

    with open(DATA_FILE, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"  [OK] data.js 已更新: version={new_version}, lastUpdate={new_last_update}")
    if stats.get("operatorCount"):
        print(f"  [OK] operatorCount 更新为: {stats['operatorCount']}")

    # 保存抓取的 release 数据到 JSON 文件（供前端读取）
    releases_file = os.path.join(os.path.dirname(DATA_FILE), "camara_releases.json")
    with open(releases_file, "w", encoding="utf-8") as f:
        json.dump({
            "fetchTime": current_time,
            "releases": stats.get("camaraReleases", {})
        }, f, ensure_ascii=False, indent=2)
    print(f"  [OK] camara_releases.json 已更新")

    return True

def main():
    print("=" * 60)
    print("GSMA Open Gateway 情报站 - 每日数据抓取")
    print(f"时间: {datetime.now(timezone(timedelta(hours=8))).strftime('%Y-%m-%d %H:%M:%S')} (UTC+8)")
    print("=" * 60)

    # 抓取数据
    print("\n[1/2] 抓取数据源...")
    stats = fetch_meta_stats()

    # 更新文件
    print("\n[2/2] 更新 data.js...")
    success = update_data_file(stats)

    if success:
        print("\n[完成] 数据抓取和更新成功")
        sys.exit(0)
    else:
        print("\n[失败] 数据更新失败", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
