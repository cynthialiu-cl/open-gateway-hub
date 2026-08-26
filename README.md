# GSMA Open Gateway 情报站

电信运营商开放网关行业生态追踪网站。

## 功能模块

- **M1 行业洞察** - 行业动态追踪，每日自动更新
- **M2 能力对标** - 16 家运营商综合能力排名、热力矩阵、CAMARA API 清单
- **M3 差异化定位** - 市场数据、API 调用量排行、营收数据、覆盖率趋势
- **M4 价格与模式** - 计费模式对比
- **M5 技术架构** - 7 层分层参考架构
- **M6 商用案例** - 12 个全球真实商用/试商用案例、6 大行业应用场景
- **M7 监管合规** - 监管动态追踪、CAMARA 标准进展、安全合规认证
- **M8 数据来源** - 可追溯信源与更新机制说明

## 自动更新机制

- **GitHub Actions** 每日 10:00 (UTC+8) 自动触发 `scripts/fetch_data.py`
- 抓取 GSMA 官网、CAMARA GitHub Releases、监管机构等公开数据源
- 检测到新数据时自动提交并部署到 GitHub Pages
- 用户刷新页面即可看到最新数据

## 部署方式

### GitHub Pages

1. 将仓库推送到 GitHub
2. 进入仓库 Settings -> Pages
3. Source 选择 "GitHub Actions"
4. 部署后获得 URL: `https://<username>.github.io/<repo-name>/`

## 本地运行

直接用浏览器打开 `index.html` 即可。

## 文件结构

```
├── index.html          # 主页面
├── styles.css          # 样式
├── data.js             # 数据文件（由脚本自动更新）
├── app.js              # 应用逻辑
├── scripts/
│   └── fetch_data.py   # 每日数据抓取脚本
├── .github/workflows/
│   ├── daily-update.yml   # 每日自动更新工作流
│   └── deploy-pages.yml    # Pages 部署工作流
└── README.md
```

## 数据来源

所有数据均标注可追溯来源链接，包括：
- GSMA 官网 (gsma.com)
- CAMARA / Linux Foundation (github.com/camaraproject)
- 5GWorldPro、APIs.io 等行业媒体
- RBI、CBUAE 等监管机构官网
- Telefónica 等运营商财报/公告
