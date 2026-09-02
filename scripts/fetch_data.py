#!/usr/bin/env python3
"""
GSMA Open Gateway 情报站 - 每日数据抓取脚本
数据来源: GSMA 官网(press releases + Discover + 案例研究)、CAMARA 项目新闻、CAMARA GitHub releases
运行方式: python3 scripts/fetch_data.py
说明:
  - 抓取 CAMARA GitHub 各 API 仓库最新 release，更新 camaraAPIs 的 releaseTag
  - 抓取多来源新闻（GSMA press releases + GSMA Discover + CAMARA 新闻 + GSMA 案例研究），追加新新闻到 news 数组（不覆盖已有）
  - 抓取 GSMA resources 页面，追加新案例到 appScenarios
  - 更新 meta.version 和 meta.lastUpdate 时间戳
  - 输出抓取报告到 fetch_report.json
"""

import json
import re
import os
import sys
from datetime import datetime, timezone, timedelta
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError

# ============ 配置 ============
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
DATA_FILE = os.path.join(PROJECT_DIR, "data.js")

# CAMARA API 名称 -> GitHub 仓库名映射
CAMARA_API_REPOS = {
    "Number Verification": "NumberVerification",
    "Sim Swap": "SimSwap",
    "Device Status": "DeviceStatus",
    "Device Roaming Status": "DeviceRoamingStatus",
    "Device Reachability Status": "DeviceReachabilityStatus",
    "Location Verification": "LocationVerification",
    "Quality on Demand": "QualityOnDemand",
    "One Time Password SMS": "OTPValidation",
    "Call Forwarding Signal": "CallForwardingSignal",
    "Device Swap": "DeviceSwap",
    "Simple Edge Discovery": "SimpleEdgeDiscovery",
    "Population Density Data": "PopulationDensityData",
    "QoS Booking": "QoSBooking",
    "Blockchain Public Address": "BlockchainPublicAddress",
    "Number Recycling": "NumberRecycling",
    # 以下 API 可能没有独立 release，跳过
    # "Know Your Customer Match": "KYCMatch",
    # "Know Your Customer Age Verification": "KYCAge",
    # "Carrier Billing": "CarrierBilling",
    # "Silent Authentication": "SilentAuthentication",
    # "IoT SIM Fraud Prevention": "IoTSIMFraudPrevention",
    # "Scam Signal": "ScamSignal",
    # "Location Retrieval": "LocationRetrieval",
}

# GSMA 新闻页面 URL
GSMA_PRESS_URL = "https://www.gsma.com/solutions-and-impact/gsma-open-gateway/press-releases/"
GSMA_RESOURCES_URL = "https://www.gsma.com/solutions-and-impact/gsma-open-gateway/resources/"
# 扩展新闻来源
GSMA_DISCOVER_URL = "https://www.gsma.com/discover/?www_gsma_com_discover%5Bpage%5D=1"
GSMA_CASE_STUDIES_URL = "https://www.gsma.com/solutions-and-impact/gsma-open-gateway/gsma-open-gateway-case-studies"
CAMARA_NEWS_URL = "https://camaraproject.org/category/news/"
# Open Gateway 相关关键词（用于过滤 GSMA Discover 页面中无关的文章）
OG_KEYWORDS = ["open gateway", "open-gateway", "camara", "network api", "network-api",
               "sim swap", "number verification", "number verify", "quality on demand",
               "qod", "device status", "device swap", "scam signal", "otp",
               "channel partner", "kyv", "kyc", "edge discovery", "carrier billing"]

# ============ 工具函数 ============
def fetch_url(url, timeout=15):
    """安全地抓取 URL 内容"""
    try:
        req = Request(url, headers={
            "User-Agent": "Mozilla/5.0 (compatible; OpenGateway-Bot/1.0; +https://github.com/cynthialiu-cl/open-gateway-hub)"
        })
        with urlopen(req, timeout=timeout) as response:
            return response.read().decode("utf-8", errors="replace")
    except (URLError, HTTPError, Exception) as e:
        print(f"  [WARN] 抓取失败 {url}: {e}", file=sys.stderr)
        return None


def html_to_text(html):
    """简单 HTML 标签清理"""
    text = re.sub(r'<script[^>]*>.*?</script>', '', html, flags=re.DOTALL | re.IGNORECASE)
    text = re.sub(r'<style[^>]*>.*?</style>', '', text, flags=re.DOTALL | re.IGNORECASE)
    text = re.sub(r'<[^>]+>', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()


# ============ CAMARA Release 抓取 ============
def fetch_camara_release(repo_name):
    """抓取 CAMARA GitHub 仓库的最新 release 信息"""
    api_url = f"https://api.github.com/repos/camaraproject/{repo_name}/releases/latest"
    # 添加 token 避免 GitHub API 限流（GitHub Actions 中自动设置 GITHUB_TOKEN）
    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
    headers = {"User-Agent": "OpenGateway-Bot/1.0"}
    if token:
        headers["Authorization"] = f"token {token}"
    try:
        req = Request(api_url, headers=headers)
        with urlopen(req, timeout=15) as response:
            data = response.read().decode("utf-8", errors="replace")
    except (URLError, HTTPError, Exception) as e:
        if "403" in str(e):
            print(f"  [WARN] GitHub API 限流，跳过 {repo_name}", file=sys.stderr)
        else:
            print(f"  [WARN] 抓取失败 {repo_name}: {e}", file=sys.stderr)
        return None
    try:
        r = json.loads(data)
        if "tag_name" not in r:
            return None
        return {
            "tag": r.get("tag_name", ""),
            "date": (r.get("published_at", "") or "")[:10],
            "prerelease": r.get("prerelease", False),
            "url": r.get("html_url", ""),
            "name": r.get("name", "")
        }
    except json.JSONDecodeError:
        return None


def fetch_all_camara_releases():
    """抓取所有 CAMARA API 的 release 信息"""
    print("\n[1/4] 抓取 CAMARA GitHub releases...")
    releases = {}
    for api_name, repo_name in CAMARA_API_REPOS.items():
        print(f"  [FETCH] {api_name} ({repo_name})...")
        r = fetch_camara_release(repo_name)
        if r:
            releases[api_name] = r
            print(f"    -> tag={r['tag']}, date={r['date']}, prerelease={r['prerelease']}")
        else:
            print(f"    -> 无 release")
    return releases


# ============ GSMA 新闻抓取 ============
def parse_date(date_str):
    """解析英文日期，返回 YYYY-MM-DD"""
    # 格式: "Friday 14 August, 2026" 或 "Thursday 20 August 2026"
    months = {
        "January": "01", "February": "02", "March": "03", "April": "04",
        "May": "05", "June": "06", "July": "07", "August": "08",
        "September": "09", "October": "10", "November": "11", "December": "12"
    }
    for eng, num in months.items():
        if eng in date_str:
            day_match = re.search(r'(\d{1,2})', date_str)
            year_match = re.search(r'(20\d{2})', date_str)
            if day_match and year_match:
                day = day_match.group(1).zfill(2)
                year = year_match.group(1)
                return f"{year}-{num}-{day}"
    return None


def fetch_gsma_press_releases():
    """抓取 GSMA press releases 页面的新闻列表"""
    print("\n[2/4] 抓取 GSMA press releases...")
    html = fetch_url(GSMA_PRESS_URL)
    if not html:
        print("  [WARN] 无法抓取 GSMA press releases 页面", file=sys.stderr)
        return []

    news_items = []
    # 匹配模式: 日期 + 标题 + 链接
    # GSMA 页面结构: <日期> <标题> [Read article](URL)
    # 用正则提取文章块
    # 模式: 星期 日期 月份 年份 + 标题文本 + Read article 链接
    pattern = re.compile(
        r'((?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\s+\d{1,2}\s+\w+,\s*\d{4}|(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\s+\d{1,2}\s+\w+\s+\d{4})'
        r'[\s\S]{0,500}?'
        r'(https://www\.gsma\.com/solutions-and-impact/gsma-open-gateway/[^"\s\)]+)',
        re.IGNORECASE
    )

    matches = pattern.findall(html)
    seen_urls = set()
    for date_str, url in matches:
        if url in seen_urls:
            continue
        seen_urls.add(url)
        date = parse_date(date_str)
        if not date:
            continue
        # 从 URL 提取标题（简化处理）
        slug = url.rstrip('/').split('/')[-1]
        # 将 slug 转为可读标题
        title = slug.replace('-', ' ').replace('/', ' ').strip()
        # 首字母大写
        title = ' '.join(w.capitalize() for w in title.split())

        news_items.append({
            "date": date,
            "title": title,
            "url": url,
            "category": "channel-partner" if "channel-partner" in url.lower() else "press-release"
        })

    # 按日期降序排列
    news_items.sort(key=lambda x: x["date"], reverse=True)
    print(f"  [OK] 抓取到 {len(news_items)} 条新闻")
    for item in news_items[:5]:
        print(f"    {item['date']}: {item['title'][:60]}")
    return news_items


def fetch_gsma_resources():
    """抓取 GSMA resources/insights 页面的案例列表"""
    print("\n[3/4] 抓取 GSMA resources/insights...")
    html = fetch_url(GSMA_RESOURCES_URL)
    if not html:
        print("  [WARN] 无法抓取 GSMA resources 页面", file=sys.stderr)
        return []

    items = []
    pattern = re.compile(
        r'((?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\s+\d{1,2}\s+\w+\s+\d{4})'
        r'[\s\S]{0,500}?'
        r'(https://www\.gsma\.com/solutions-and-impact/gsma-open-gateway/[^"\s\)]+)',
        re.IGNORECASE
    )
    matches = pattern.findall(html)
    seen_urls = set()
    for date_str, url in matches:
        if url in seen_urls:
            continue
        # 排除 press releases 页面本身
        if "press-releases" in url:
            continue
        seen_urls.add(url)
        date = parse_date(date_str)
        if not date:
            continue
        slug = url.rstrip('/').split('/')[-1]
        title = slug.replace('-', ' ').replace('/', ' ').strip()
        title = ' '.join(w.capitalize() for w in title.split())
        is_case_study = "case-study" in url.lower() or "gsma_study" in url.lower()
        items.append({
            "date": date,
            "title": title,
            "url": url,
            "type": "case-study" if is_case_study else "insight"
        })

    items.sort(key=lambda x: x["date"], reverse=True)
    print(f"  [OK] 抓取到 {len(items)} 条 resources/insights")
    for item in items[:5]:
        print(f"    {item['date']}: {item['title'][:60]}")
    return items


def fetch_gsma_discover():
    """抓取 GSMA Discover 页面中与 Open Gateway 相关的文章"""
    print("\n[2b] 抓取 GSMA Discover (扩展来源)...")
    html = fetch_url(GSMA_DISCOVER_URL)
    if not html:
        print("  [WARN] 无法抓取 GSMA Discover 页面", file=sys.stderr)
        return []

    news_items = []
    # GSMA Discover 页面结构: 日期 + 标题 + Read article 链接
    # 模式: 星期 日期 月份 年份 ... 标题 ... Read article URL
    pattern = re.compile(
        r'((?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\s+\d{1,2}\s+\w+(?:,)?\s*\d{4})'
        r'[\s\S]{0,800}?'
        r'(https://www\.gsma\.com/[^"\s\)]+)',
        re.IGNORECASE
    )
    matches = pattern.findall(html)
    seen_urls = set()
    for date_str, url in matches:
        if url in seen_urls:
            continue
        seen_urls.add(url)
        # 用关键词过滤，只保留 Open Gateway 相关
        url_lower = url.lower()
        # 如果 URL 直接包含 open-gateway，直接收录
        if "open-gateway" not in url_lower:
            # 否则检查页面标题/文本是否包含关键词
            # 找到 date_str 在 html 中的位置，取附近文本检查关键词
            pos = html.find(date_str)
            if pos >= 0:
                nearby_text = html[pos:pos+800].lower()
                if not any(kw in nearby_text for kw in OG_KEYWORDS):
                    continue
        date = parse_date(date_str)
        if not date:
            continue
        slug = url.rstrip('/').split('/')[-1]
        title = slug.replace('-', ' ').replace('/', ' ').strip()
        title = ' '.join(w.capitalize() for w in title.split())
        news_items.append({
            "date": date,
            "title": title,
            "url": url,
            "category": "discover"
        })

    news_items.sort(key=lambda x: x["date"], reverse=True)
    print(f"  [OK] 抓取到 {len(news_items)} 条 Discover 文章(过滤后)")
    for item in news_items[:5]:
        print(f"    {item['date']}: {item['title'][:60]}")
    return news_items


def fetch_camara_news():
    """抓取 CAMARA 项目官网新闻页面"""
    print("\n[2c] 抓取 CAMARA 项目新闻...")
    html = fetch_url(CAMARA_NEWS_URL)
    if not html:
        print("  [WARN] 无法抓取 CAMARA 新闻页面", file=sys.stderr)
        return []

    news_items = []
    # CAMARA 新闻页面结构: 文章标题 + 日期 + 链接
    # 尝试匹配标题和日期
    # 模式1: <a href="URL">标题</a> ... 日期
    # 模式2: 标题文本后跟日期
    # CAMARA 使用 WordPress，文章结构较为标准
    title_pattern = re.compile(
        r'<h[1-3][^>]*>\s*<a[^>]+href="(https://camaraproject\.org/[^"]+)"[^>]*>([^<]+)</a>',
        re.IGNORECASE
    )
    # 日期匹配: "Month DD, YYYY" 或 "DD Month YYYY"
    date_pattern = re.compile(
        r'((?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4})',
        re.IGNORECASE
    )

    # 找到所有文章链接
    for match in title_pattern.finditer(html):
        url = match.group(1)
        title = match.group(2).strip()
        # 在标题位置附近找日期
        pos = match.end()
        nearby = html[pos:pos+500]
        date_match = date_pattern.search(nearby)
        if date_match:
            date = parse_date(date_match.group(1))
            if date:
                news_items.append({
                    "date": date,
                    "title": title,
                    "url": url,
                    "category": "camara-news"
                })

    # 去重
    seen = set()
    deduped = []
    for item in news_items:
        if item["url"] not in seen:
            seen.add(item["url"])
            deduped.append(item)

    deduped.sort(key=lambda x: x["date"], reverse=True)
    print(f"  [OK] 抓取到 {len(deduped)} 条 CAMARA 新闻")
    for item in deduped[:5]:
        print(f"    {item['date']}: {item['title'][:60]}")
    return deduped


def fetch_gsma_case_studies():
    """抓取 GSMA Open Gateway 案例研究页面"""
    print("\n[2d] 抓取 GSMA Open Gateway 案例研究...")
    html = fetch_url(GSMA_CASE_STUDIES_URL)
    if not html:
        print("  [WARN] 无法抓取案例研究页面", file=sys.stderr)
        return []

    items = []
    pattern = re.compile(
        r'((?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\s+\d{1,2}\s+\w+\s+\d{4})'
        r'[\s\S]{0,500}?'
        r'(https://www\.gsma\.com/solutions-and-impact/gsma-open-gateway/[^"\s\)]+)',
        re.IGNORECASE
    )
    matches = pattern.findall(html)
    seen_urls = set()
    for date_str, url in matches:
        if url in seen_urls:
            continue
        seen_urls.add(url)
        date = parse_date(date_str)
        if not date:
            continue
        slug = url.rstrip('/').split('/')[-1]
        title = slug.replace('-', ' ').replace('/', ' ').strip()
        title = ' '.join(w.capitalize() for w in title.split())
        items.append({
            "date": date,
            "title": title,
            "url": url,
            "category": "case-study"
        })

    items.sort(key=lambda x: x["date"], reverse=True)
    print(f"  [OK] 抓取到 {len(items)} 条案例研究")
    for item in items[:5]:
        print(f"    {item['date']}: {item['title'][:60]}")
    return items


# ============ data.js 更新 ============
def update_data_js(camara_releases, gsma_news, gsma_resources):
    """更新 data.js 文件"""
    print("\n[4/4] 更新 data.js...")
    if not os.path.exists(DATA_FILE):
        print(f"  [ERROR] data.js 不存在: {DATA_FILE}", file=sys.stderr)
        return False, {}

    with open(DATA_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    now = datetime.now(timezone(timedelta(hours=8)))
    today = now.strftime("%Y-%m-%d")
    current_time = now.strftime("%Y-%m-%d %H:%M")
    changes = {"version": False, "camara_updates": [], "new_news": [], "new_resources": []}

    # 1. 更新 version 和 lastUpdate 时间戳
    old_version_match = re.search(r'version:\s*"([^"]*)"', content)
    old_version = old_version_match.group(1) if old_version_match else ""
    content = re.sub(
        r'version:\s*"[^"]*"',
        f'version: "{today}"',
        content
    )
    content = re.sub(
        r'lastUpdate:\s*"[^"]*"',
        f'lastUpdate: "{current_time}"',
        content
    )
    if old_version != today:
        changes["version"] = True
        print(f"  [OK] version: {old_version} -> {today}")

    # 2. 更新 camaraAPIs 的 releaseTag
    for api_name, release_info in camara_releases.items():
        tag = release_info["tag"]
        # 在 camaraAPIs 中找到对应 API 并更新 releaseTag
        # 模式: {name:"API Name",...releaseTag:"old_tag",...}
        # 需要精确匹配 API 名称
        pattern = re.compile(
            r'(\{name:"' + re.escape(api_name) + r'"[^}]*?releaseTag:")([^"]*)(")',
            re.DOTALL
        )
        match = pattern.search(content)
        if match:
            old_tag = match.group(2)
            if old_tag != tag and not release_info["prerelease"]:
                content = pattern.sub(
                    lambda m: m.group(1) + tag + m.group(3),
                    content
                )
                changes["camara_updates"].append({
                    "api": api_name,
                    "old": old_tag,
                    "new": tag,
                    "date": release_info["date"]
                })
                print(f"  [OK] {api_name} releaseTag: {old_tag} -> {tag} ({release_info['date']})")

    # 3. 追加新新闻到 news 数组（只追加 data.js 中不存在的）
    # 检查 data.js 中已有的新闻 URL
    existing_urls = set(re.findall(r'sourceUrl:\s*"(https://[^"]+)"', content))
    # 也检查 url 字段中的链接
    existing_urls.update(re.findall(r'url:\s*"(https://[^"]+)"', content))
    new_news_to_add = []
    for item in gsma_news[:20]:  # 扩大到 20 条（多来源合并后）
        if item["url"] in existing_urls:
            continue
        # 映射到现有新闻字段格式
        cat = item.get("category", "")
        if cat in ("channel-partner", "partner"):
            cat_field = "partner"
            cat_name = "渠道伙伴"
        elif cat == "camara-news":
            cat_field = "tech"
            cat_name = "技术趋势"
        elif cat == "case-study":
            cat_field = "industry"
            cat_name = "行业"
        elif cat == "discover":
            cat_field = "industry"
            cat_name = "行业"
        else:
            cat_field = "industry"
            cat_name = "行业动态"

        # 从标题推断 region
        title_lower = item["title"].lower()
        if any(w in title_lower for w in ["africa", "coure", "netapi"]):
            region = "非洲"
        elif any(w in title_lower for w in ["latin", "movitext", "colombian", "uruguay", "claro", "argentin", "brazil", "paraguay"]):
            region = "拉美"
        elif any(w in title_lower for w in ["greece", "italian", "poland", "new zealand", "europe", "france", "german", "spain", "uk"]):
            region = "欧洲"
        elif any(w in title_lower for w in ["smart", "vnpt", "india", "japan", "korea", "philippines", "vietnam", "china", "tata"]):
            region = "亚洲"
        elif any(w in title_lower for w in ["qatar", "uae", "middle east"]):
            region = "中东"
        else:
            region = "全球"

        # 确定 vendor
        if "camara" in item["url"].lower():
            vendor = "CAMARA"
        elif "gsma" in item["url"].lower():
            vendor = "GSMA"
        else:
            vendor = "行业"

        new_news_to_add.append({
            "entry": (
                f'    {{date:"{item["date"]}",cat:"{cat_field}",catName:"{cat_name}",'
                f'vendor:"{vendor}",title:"{item["title"]}",source:"{vendor} 官网",'
                f'region:"{region}",url:"{item["url"]}",'
                f'sourceUrl:"{item["url"]}",summary:"{item["title"]}"}}'
            ),
            "item": item
        })
        existing_urls.add(item["url"])

    if new_news_to_add:
        # 找到 news 数组结束位置
        news_start = content.find('news: [')
        if news_start >= 0:
            # 在 news_start 之后找第一个 \n  ], (news 数组结束)
            search_area = content[news_start:]
            end_match = re.search(r'\n  \],', search_area)
            if end_match:
                abs_end = news_start + end_match.start()  # \n 的绝对位置
                
                # 构造新条目字符串（每条带逗号分隔）
                entries_str = ',\n'.join([n["entry"] for n in new_news_to_add])
                
                # 检查 news 数组最后一条新闻是否以 } 结尾（无逗号）
                before = content[:abs_end].rstrip()
                if before.endswith('}') and not before.endswith('},'):
                    # 最后一条没逗号，需要加
                    # 把 } 替换为 },
                    before = before[:-1] + '},'
                
                # 重新组装：before(以 }, 结尾) + \n + entries_str + content[abs_end:]
                # entries_str 最后一条不带逗号
                after = content[abs_end:]  # \n  ],...
                content = before + '\n' + entries_str + after
                
                for n in new_news_to_add:
                    changes["new_news"].append(n["item"])
                    print(f"  [OK] 追加新闻: {n['item']['date']} {n['item']['title'][:50]}")

    # 4. 保存抓取报告
    report = {
        "fetchTime": current_time,
        "version": today,
        "camaraReleasesChecked": len(camara_releases),
        "camaraUpdates": changes["camara_updates"],
        "gsmaNewsFetched": len(gsma_news),
        "newNewsAdded": len(changes["new_news"]),
        "newNewsItems": changes["new_news"],
        "gsmaResourcesFetched": len(gsma_resources),
    }
    report_file = os.path.join(PROJECT_DIR, "fetch_report.json")
    with open(report_file, "w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=2)
    print(f"  [OK] 抓取报告已保存到 fetch_report.json")

    # 5. 保存 camara_releases.json（供前端可选读取）
    releases_file = os.path.join(PROJECT_DIR, "camara_releases.json")
    with open(releases_file, "w", encoding="utf-8") as f:
        json.dump({
            "fetchTime": current_time,
            "releases": {k: v for k, v in camara_releases.items()}
        }, f, ensure_ascii=False, indent=2)

    # 6. 写入 data.js
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"\n[完成] data.js 已更新: version={today}, lastUpdate={current_time}")
    print(f"  - CAMARA release 更新: {len(changes['camara_updates'])} 个")
    print(f"  - 新增新闻: {len(changes['new_news'])} 条")

    return True, changes


# ============ 主流程 ============
def main():
    print("=" * 60)
    print("GSMA Open Gateway 情报站 - 每日数据抓取")
    print(f"时间: {datetime.now(timezone(timedelta(hours=8))).strftime('%Y-%m-%d %H:%M:%S')} (UTC+8)")
    print("=" * 60)

    # 1. 抓取 CAMARA releases
    camara_releases = fetch_all_camara_releases()

    # 2. 抓取新闻（多来源合并）
    all_news = []
    # 2a. GSMA press releases
    gsma_news = fetch_gsma_press_releases()
    all_news.extend(gsma_news)
    # 2b. GSMA Discover（扩展来源，过滤 Open Gateway 相关）
    discover_news = fetch_gsma_discover()
    all_news.extend(discover_news)
    # 2c. CAMARA 项目新闻
    camara_news = fetch_camara_news()
    all_news.extend(camara_news)
    # 2d. GSMA 案例研究
    case_studies = fetch_gsma_case_studies()
    all_news.extend(case_studies)

    # 合并去重（按 URL 去重）
    seen_urls = set()
    deduped_news = []
    for item in all_news:
        if item["url"] not in seen_urls:
            seen_urls.add(item["url"])
            deduped_news.append(item)
    # 按日期降序
    deduped_news.sort(key=lambda x: x["date"], reverse=True)
    print(f"\n[合并] 新闻总数: {len(deduped_news)} 条（去重后）")

    # 3. 抓取 GSMA resources
    gsma_resources = fetch_gsma_resources()

    # 4. 更新 data.js
    success, changes = update_data_js(camara_releases, deduped_news, gsma_resources)

    if success:
        print("\n[完成] 数据抓取和更新成功")
        sys.exit(0)
    else:
        print("\n[失败] 数据更新失败", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
