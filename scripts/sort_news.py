#!/usr/bin/env python3
"""
排序 news 数组: 按 date 字段从新到旧, 并按 URL 去重(保留更详细的那条)
"""
import re
import os
from datetime import datetime

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
DATA_FILE = os.path.join(PROJECT_DIR, "data.js")

with open(DATA_FILE, "r", encoding="utf-8") as f:
    content = f.read()

# 找到 news 数组开始
news_start_match = re.search(r'(\s*news:\s*\[\n)', content)
if not news_start_match:
    print("[ERR] 找不到 news 数组")
    exit(1)

news_start_pos = news_start_match.end()
# 找到 news 数组结束(第一个独立的 \n  ],)
news_end_match = re.search(r'\n  \],', content[news_start_pos:])
if not news_end_match:
    print("[ERR] 找不到 news 数组结束")
    exit(1)

news_end_pos = news_start_pos + news_end_match.start()
news_block = content[news_start_pos:news_end_pos]

# 解析每条 news 条目(以 {date:...} 开头的整行)
# 每条以 4 空格 + { 开始,以 }, 或 } 结尾(后跟逗号或不跟逗号)
entries = []
pattern = re.compile(r'(\s*\{date:"([^"]+)"[^}]*\}(?:,(?:\n|$)|\n|$))', re.DOTALL)
# 更稳健的方式: 按行分割,每行是一个完整 entry
lines = news_block.split("\n")
for line in lines:
    line_stripped = line.strip()
    if not line_stripped or not line_stripped.startswith("{"):
        continue
    # 提取 date
    date_match = re.search(r'date:"([^"]+)"', line_stripped)
    if not date_match:
        continue
    date_str = date_match.group(1)
    # 提取 url(用于去重)
    url_match = re.search(r'url:"([^"]+)"', line_stripped)
    url = url_match.group(1) if url_match else ""
    # 去掉末尾的逗号(用于排序后重写时统一加)
    entry_content = line_stripped.rstrip(",")
    entries.append({
        "date": date_str,
        "url": url,
        "raw": entry_content,
        "indent": "    ",  # 4 空格
    })

print(f"解析到 {len(entries)} 条新闻")

# 不做 URL 去重: 同一信源链接可能对应多条不同新闻(如一篇报道覆盖多个发布),
# 仅按日期排序, 保留全部条目
deduped = entries

# 按日期从新到旧排序
def parse_date(d):
    try:
        return datetime.strptime(d, "%Y-%m-%d")
    except:
        return datetime.min

deduped.sort(key=lambda x: parse_date(x["date"]), reverse=True)

# 重新构造 news 数组
new_news_block = "\n"
for i, e in enumerate(deduped):
    suffix = "," if i < len(deduped) - 1 else ""
    new_news_block += f"{e['indent']}{e['raw']}{suffix}\n"

# 替换原 news 数组内容
new_content = content[:news_start_pos] + new_news_block + content[news_end_pos:]

# 更新 newsCount
new_count = len(deduped)
new_content = re.sub(
    r'newsCount:\s*\d+',
    f'newsCount: {new_count}',
    new_content
)

# 备份原文件
import shutil
backup_path = DATA_FILE + ".bak"
shutil.copy2(DATA_FILE, backup_path)
print(f"已备份原文件到 {backup_path}")

with open(DATA_FILE, "w", encoding="utf-8") as f:
    f.write(new_content)

print(f"\n[OK] 排序完成, news 数组现在有 {new_count} 条, 按 date 从新到旧排序")
print("\n=== 排序后日期列表 ===")
for i, e in enumerate(deduped):
    print(f"{i+1:2}. {e['date']} | {e['url'][:60] if e['url'] else '(no url)'}")
