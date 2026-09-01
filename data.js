// GSMA Open Gateway 情报站 - 数据文件
// 数据来源: GSMA 官网、CAMARA/Linux Foundation、5GWorldPro、运营商财报/公告、监管机构等
// 更新方式: GitHub Actions 每日 10:00 (UTC+8) 自动抓取并部署
// 历史新闻保留: 新动态追加到列表顶部，不删除旧数据
var APP_DATA = {
  meta: {
    version: "2026-09-01",
    lastUpdate: "2026-09-01 09:45",
    updateSchedule: "GitHub Actions 每日 10:00 自动抓取",
    newsCount: 32,
    operatorCount: 86,
    apiCount: 36,
    commercialApiCount: 20,
    marketCount: 65,
    channelPartners: 79,
    dataNote: "H1 2026 渠道合作伙伴 77 家，8 月最新 79 家(含 IBM + Codec)；CAMARA 生态 36 个认证 API(含 Beta)，本站追踪 22 个(20 Stable / 2 Beta)，20 个已有商用部署",
    baseline: "GSMA Open Gateway + CAMARA + TM Forum",
    dataSources: {
      gsma: {name:"GSMA 官网",url:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/"},
      camara: {name:"CAMARA / Linux Foundation",url:"https://github.com/camaraproject/"},
      gsmaMap: {name:"GSMA Open Gateway 全球地图",url:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/open-gateway-api-launches-around-the-world/"},
      camaraAPIs: {name:"CAMARA API 清单",url:"https://camaraproject.org/"},
      fiveGWorldPro: {name:"5GWorldPro",url:"https://5gworldpro.com/blog/2026/08/14/network-apis-and-camara-why-telecoms-api-monetization-push-is-finally-working-in-2026/"},
      apis: {name:"APIs.io Open Gateway",url:"https://apis.io/providers/open-gateway"},
      pyxis: {name:"Pyxis.tech",url:"https://pyxis.tech/open-gateway-when-the-mobile-network-becomes-a-security-layer"},
      einPresswire: {name:"EIN Presswire",url:"https://www.einpresswire.com/article/933906732/blackdice-joins-gsma-open-gateway-as-channel-partner-sharing-ai-powered-cyber-defence-to-the-global-operator-ecosystem"},
      linkedin: {name:"GSMA LinkedIn",url:"https://www.linkedin.com/posts/matteo-di-battista-75584b15b_networkapis-opengateway-fraudprevention-activity-7491400899257556994-uoZW"},
      briefpedia: {name:"Briefpedia",url:"https://briefpedia.org/articles/spark-new-zealand-the-evolution-from-telecom-to-digital-services"},
      chinaTechWire: {name:"China Tech Wire",url:"https://telbb.com/2026/08/china-telecom-debuts-world-s-first-iot-security-api-on-gsma"},
      cnii: {name:"中国工信新闻网",url:"https://www.cnii.com.cn/rmydb/202608/t20260820_755729.html"},
      baidu: {name:"百度百科",url:"https://baike.baidu.com/item/GSMA Open Gateway/64211582"},
      u2opia: {name:"U2opia",url:"https://www.u2opia.com/blog/what-is-silent-network-authentication"}
    }
  },
  // M1: 行业动态
  news: [
    {date:"2026-08-20",cat:"industry",catName:"行业",vendor:"GSMA",title:"GSMA Open Gateway 工作周报: 渠道合作伙伴达 79 家(Codec 签约)，发布车联网和无人机 2 项案例研究，MENA Ignite 黑客马拉松报名超 1100 人",source:"GSMA Open Gateway Flash Report",region:"全球",url:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/"},
    {date:"2026-08-20",cat:"industry",catName:"行业",vendor:"中国联通/奇瑞/蔚来/中兴",title:"案例研究: 中国联通联合奇瑞汽车、蔚来汽车、中兴通讯发布通信质量(QoD)车联网应用案例",source:"GSMA 案例研究",region:"中国内地",url:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/gsma_study/china-unicom-chery-auto-nio-auto-zte-connected-mobility/"},
    {date:"2026-08-20",cat:"industry",catName:"行业",vendor:"Turk Telekom",title:"案例研究: 土耳其电信(Turk Telekom)发布基于 Open Gateway QoD API 的无人机安全飞行案例",source:"GSMA 案例研究",region:"欧洲",url:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/gsma_study/turk-telekom-enabling-safe-drone-operations/"},
    {date:"2026-08-20",cat:"vendor",catName:"运营商",vendor:"LG U+",title:"韩国 LG U+ 即将推出 6 个 CAMARA API，加速亚太地区 Open Gateway 部署",source:"GSMA Flash Report",region:"亚洲",url:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/"},
    {date:"2026-08-20",cat:"industry",catName:"行业",vendor:"GSMA Fusion",title:"GSMA Fusion 启动四大垂直行业推广(航空/汽车/金融服务/媒体娱乐)，9月9日 LinkedIn 直播品牌推广",source:"GSMA Flash Report",region:"全球",url:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/"},
    {date:"2026-08-20",cat:"industry",catName:"行业",vendor:"GSMA/Ektar/Vydens",title:"需求侧: Ektar Technologies 和 Vydens 发布需求说明书(SoR)，渠道合作伙伴自助注册计划收到 15 份意向书",source:"GSMA Flash Report",region:"全球",url:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/"},
    {date:"2026-08-25",cat:"vendor",catName:"运营商",vendor:"GSMA",title:"GSMA H1 2026报告: 渠道合作伙伴从25家增至71家，英国银行Scam Signal API部署后欺诈损失减少44%",source:"GSMA/LinkedIn",region:"全球",url:"https://www.linkedin.com/posts/matteo-di-battista-75584b15b_networkapis-opengateway-fraudprevention-activity-7491400899257556994-uoZW"},
    {date:"2026-08-13",cat:"industry",catName:"行业",vendor:"BlackDice",title:"BlackDice 加入 GSMA Open Gateway 渠道合作伙伴计划，提供 AI 驱动的网络级反欺诈安全能力",source:"EIN Presswire",region:"全球",url:"https://www.einpresswire.com/article/933906732/blackdice-joins-gsma-open-gateway-as-channel-partner-sharing-ai-powered-cyber-defence-to-the-global-operator-ecosystem"},
    {date:"2026-08-14",cat:"tech",catName:"技术趋势",vendor:"Twilio/GSMA",title:"MWC26 Open Gateway Summit: Twilio 日处理 3080 万笔 API 交易，反欺诈 API 覆盖全球近 2/3 移动连接",source:"5GWorldPro",region:"全球",url:"https://5gworldpro.com/blog/2026/08/14/network-apis-and-camara-why-telecoms-api-monetization-push-is-finally-working-in-2026/"},
    {date:"2026-07-25",cat:"tech",catName:"技术趋势",vendor:"Pyxis/Antel",title:"Antel Summit 2026: Open Gateway 成为支付安全基础设施，A2A支付时代网络API消费量增长91%",source:"Pyxis.tech",region:"拉美",url:"https://pyxis.tech/open-gateway-when-the-mobile-network-becomes-a-security-layer"},
    {date:"2026-06-23",cat:"vendor",catName:"运营商",vendor:"Antel/Claro",title:"乌拉圭 Antel 和 Claro 正式上线 SIM Swap 和 Number Verification API，聚焦 A2A 支付反欺诈",source:"Pyxis.tech/GSMA",region:"拉美",url:"https://pyxis.tech/open-gateway-when-the-mobile-network-becomes-a-security-layer"},
    {date:"2026-03-04",cat:"industry",catName:"行业",vendor:"One NZ/Spark/2degrees",title:"新西兰三大运营商(Spark/One NZ/2degrees)完成 2G/3G 退网，全面拥抱 Open Gateway 网络 API 生态",source:"Briefpedia",region:"大洋洲",url:"https://briefpedia.org/articles/spark-new-zealand-the-evolution-from-telecom-to-digital-services"},
    {date:"2026-08-20",cat:"vendor",catName:"运营商",vendor:"中国电信",title:"天翼物联 IoT SIM 防欺诈 API 登陆 GSMA Open Gateway 全球地图，首个物联网安全 API",source:"中国工信新闻网/GSMA",region:"中国内地",url:"https://www.cnii.com.cn/rmydb/202608/t20260820_755729.html"},
    {date:"2026-08-14",cat:"tech",catName:"技术趋势",vendor:"CAMARA",title:"CAMARA API 商用化加速: 300+ 实例、20 种 API 覆盖 65 个市场，反欺诈 API 领跑",source:"5GWorldPro",region:"全球",url:"https://5gworldpro.com/blog/2026/08/14/network-apis-and-camara-why-telecoms-api-monetization-push-is-finally-working-in-2026/"},
    {date:"2026-08-07",cat:"vendor",catName:"运营商",vendor:"中国电信",title:"中国电信天翼物联 IoT SIM Fraud Prevention API 正式上线 GSMA Open Gateway，纳入 CAMARA 开源项目",source:"China Tech Wire",region:"中国内地",url:"https://telbb.com/2026/08/china-telecom-debuts-world-s-first-iot-security-api-on-gsma"},
    {date:"2026-07-25",cat:"tech",catName:"技术趋势",vendor:"API Evangelist",title:"GSMA Open Gateway Kin Score 52.0: 33 个 CAMARA API、280 商用实例、50 市场覆盖",source:"APIs.io",region:"全球",url:"https://apis.io/providers/open-gateway"},
    {date:"2026-07-01",cat:"industry",catName:"行业",vendor:"MasOrange",title:"MasOrange 启动 Quality-on-Demand 早期商用部署，聚焦流量优先级场景",source:"5GWorldPro",region:"欧洲",url:"#"},
    {date:"2026-06-26",cat:"industry",catName:"行业",vendor:"GSMA",title:"GSMA Open Gateway 中国工作组 2026 年第一次会议在 MWC 上海召开，主题: Agentic AI 时代下的 Open Gateway",source:"中国联通研究院",region:"中国内地",url:"#"},
    {date:"2026-05-15",cat:"tech",catName:"技术趋势",vendor:"Telefónica/Nokia",title:"Telefónica 与 Nokia 试点 Agentic AI + Open Gateway: A2A 协议自动发现和编排网络 API",source:"GSMA/MWC2026",region:"欧洲",url:"#"},
    {date:"2026-04-01",cat:"industry",catName:"行业",vendor:"YTL Communications",title:"马来西亚 YTL Communications 与 CAMARA 签约，部署 Number Verification 和 SIM Swap API",source:"U2opia",region:"东南亚",url:"https://www.u2opia.com/blog/what-is-silent-network-authentication"},
    {date:"2026-03-15",cat:"vendor",catName:"运营商",vendor:"Viettel/Aduna",title:"MWC 2026: Viettel Solutions 与 Aduna Global 签署网络 API 服务框架协议",source:"GSMA",region:"东南亚",url:"#"},
    {date:"2026-03-01",cat:"policy",catName:"政策",vendor:"UAE 央行",title:"阿联酋央行 Notice 3057 生效: 金融机构禁用 SMS OTP，推动 SNA 网络认证",source:"U2opia",region:"中东",url:"#"},
    {date:"2026-03-01",cat:"industry",catName:"行业",vendor:"One NZ",title:"新西兰 One NZ 商用发布 Network Authentication API 套件",source:"U2opia",region:"大洋洲",url:"#"},
    {date:"2026-02-03",cat:"vendor",catName:"运营商",vendor:"Claro/Movistar/Tigo",title:"哥伦比亚 Claro、Movistar、Tigo 加入 GSMA Open Gateway，推出 SIM Swap 和 Number Verification",source:"GSMA 官网",region:"拉美",url:"https://www.gsma.com/about-us/regions/latin-america-and-the-caribbean/open-gateway-colombia/"},
    {date:"2026-01-20",cat:"tech",catName:"技术趋势",vendor:"IBM",title:"IBM Consulting 加入 GSMA Open Gateway 渠道合作伙伴计划，助力企业 CAMARA API 集成",source:"GSMA 官网",region:"全球",url:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/ibm-consulting-gsma-open-gateway-enterprise-network-api-adoption/"},
    {date:"2025-09-30",cat:"policy",catName:"政策",vendor:"马来西亚运营商",title:"马来西亚主要运营商签署 MOU: 基于 GSMA Open Gateway 部署联合网络认证服务",source:"U2opia",region:"东南亚",url:"#"},
    {date:"2025-08-27",cat:"industry",catName:"行业",vendor:"GSMA",title:"GSMA Open Gateway 中国工作组 2025 年第二次会议在珠海召开，成员从 7 家增长到 20 家",source:"中国联通研究院",region:"中国内地",url:"#"},
    {date:"2025-04-01",cat:"tech",catName:"技术趋势",vendor:"中国三大运营商",title:"中国电信联合移动、联通基于 Open Gateway 标准实现 5G QoD 三网能力对接与平台互通",source:"百度百科",region:"中国内地",url:"https://baike.baidu.com/item/GSMA Open Gateway/64211582"},
    {date:"2025-03-04",cat:"policy",catName:"政策",vendor:"中国信通院",title:"中国信通院正式加入 GSMA Open Gateway 倡议，签署合作备忘录",source:"百度百科",region:"中国内地",url:"#"},
    {date:"2024-03-26",cat:"industry",catName:"行业",vendor:"中国三大运营商",title:"中国移动、电信、联通发布商用 OTP API，中国成为全球首个推出 GSMA Open Gateway OTP API 的市场",source:"百度百科",region:"中国内地",url:"#"},
    {date:"2023-02-27",cat:"policy",catName:"政策",vendor:"GSMA",title:"GSMA 在 MWC 巴塞罗那正式发布 Open Gateway 倡议，21 家运营商签署备忘录，8 个通用 API",source:"百度百科/GSMA",region:"全球",url:"#"},
    {date:"2026-08-14",cat:"partner",catName:"渠道伙伴",vendor:"GSMA",title:"Blackdice Gsma Open Gateway Channel Partner",source:"GSMA 官网",region:"全球",url:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/blackdice-gsma-open-gateway-channel-partner/",sourceUrl:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/blackdice-gsma-open-gateway-channel-partner/",summary:"Blackdice Gsma Open Gateway Channel Partner"},
    {date:"2026-07-20",cat:"industry",catName:"行业动态",vendor:"GSMA",title:"Movitext Joins Gsma Open Gateway",source:"GSMA 官网",region:"拉美",url:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/movitext-joins-gsma-open-gateway/",sourceUrl:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/movitext-joins-gsma-open-gateway/",summary:"Movitext Joins Gsma Open Gateway"},
    {date:"2026-07-14",cat:"industry",catName:"行业动态",vendor:"GSMA",title:"Smart Gsma Certification Device Roaming Status Api",source:"GSMA 官网",region:"亚洲",url:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/smart-gsma-certification-device-roaming-status-api/",sourceUrl:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/smart-gsma-certification-device-roaming-status-api/",summary:"Smart Gsma Certification Device Roaming Status Api"},
    {date:"2026-06-30",cat:"industry",catName:"行业动态",vendor:"GSMA",title:"Uruguay Gsma Open Gateway Antel Claro Apis",source:"GSMA 官网",region:"拉美",url:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/uruguay-gsma-open-gateway-antel-claro-apis/",sourceUrl:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/uruguay-gsma-open-gateway-antel-claro-apis/",summary:"Uruguay Gsma Open Gateway Antel Claro Apis"},
    {date:"2026-06-24",cat:"partner",catName:"渠道伙伴",vendor:"GSMA",title:"Sc Soft Gsma Open Gateway Channel Partner Network Apis Fraud Prevention",source:"GSMA 官网",region:"全球",url:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/sc-soft-gsma-open-gateway-channel-partner-network-apis-fraud-prevention/",sourceUrl:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/sc-soft-gsma-open-gateway-channel-partner-network-apis-fraud-prevention/",summary:"Sc Soft Gsma Open Gateway Channel Partner Network Apis Fraud Prevention"},
    {date:"2026-06-15",cat:"industry",catName:"行业动态",vendor:"GSMA",title:"Coure Joins Gsma Open Gateway Network Apis Africa",source:"GSMA 官网",region:"非洲",url:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/coure-joins-gsma-open-gateway-network-apis-africa/",sourceUrl:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/coure-joins-gsma-open-gateway-network-apis-africa/",summary:"Coure Joins Gsma Open Gateway Network Apis Africa"},
    {date:"2026-05-28",cat:"partner",catName:"渠道伙伴",vendor:"GSMA",title:"Netapi Telecom Gsma Open Gateway Channel Partner Africa",source:"GSMA 官网",region:"非洲",url:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/netapi-telecom-gsma-open-gateway-channel-partner-africa/",sourceUrl:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/netapi-telecom-gsma-open-gateway-channel-partner-africa/",summary:"Netapi Telecom Gsma Open Gateway Channel Partner Africa"},
    {date:"2026-05-27",cat:"industry",catName:"行业动态",vendor:"GSMA",title:"Vnpt Achieves Gsma Opengateway Certification",source:"GSMA 官网",region:"亚洲",url:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/vnpt-achieves-gsma-opengateway-certification/",sourceUrl:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/vnpt-achieves-gsma-opengateway-certification/",summary:"Vnpt Achieves Gsma Opengateway Certification"},
    {date:"2026-05-20",cat:"partner",catName:"渠道伙伴",vendor:"GSMA",title:"Plumma Becomes Gsma Open Gateway Channel Partner Italys Pioneer For Network Apis In Enterprise Fraud Prevention And Identity Verification 2",source:"GSMA 官网",region:"全球",url:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/plumma-becomes-gsma-open-gateway-channel-partner-italys-pioneer-for-network-apis-in-enterprise-fraud-prevention-and-identity-verification-2/",sourceUrl:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/plumma-becomes-gsma-open-gateway-channel-partner-italys-pioneer-for-network-apis-in-enterprise-fraud-prevention-and-identity-verification-2/",summary:"Plumma Becomes Gsma Open Gateway Channel Partner Italys Pioneer For Network Apis In Enterprise Fraud Prevention And Identity Verification 2"},
    {date:"2026-03-30",cat:"industry",catName:"行业动态",vendor:"GSMA",title:"Broadcast Industry Urges Mobile Network Operators To Help Commercialise Live Production Over 5g By Exposing Standardised Quality On Demand A",source:"GSMA 官网",region:"全球",url:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/broadcast-industry-urges-mobile-network-operators-to-help-commercialise-live-production-over-5g-by-exposing-standardised-quality-on-demand-a/",sourceUrl:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/broadcast-industry-urges-mobile-network-operators-to-help-commercialise-live-production-over-5g-by-exposing-standardised-quality-on-demand-a/",summary:"Broadcast Industry Urges Mobile Network Operators To Help Commercialise Live Production Over 5g By Exposing Standardised Quality On Demand A"}
  ],
  newsSources:["GSMA 官网/新闻","CAMARA GitHub/Linux Foundation","行业媒体(5GWorldPro/Asia Tech Journal/Computer Weekly)","运营商官网/新闻中心","财经产业媒体","政府监管机构","研报智库(麦肯锡/GSMA)","微信公众号","MWC 大会公告","Pyxis.tech","EIN Presswire","Briefpedia","中国工信新闻网","APIs.io","LinkedIn"],
  // M2: 运营商能力对标
  operators:[
    {name:"Telefónica",country:"西班牙",region:"欧洲",type:"跨国运营商",score:9.0,dims:[5,5,5,5,4,5],devPortal:"https://developers.opengateway.telefonica.com/"},
    {name:"Vodafone Group",country:"英国",region:"欧洲",type:"跨国运营商",score:8.8,dims:[5,4,5,5,4,5],devPortal:"https://developer.vodafone.com"},
    {name:"Orange Group",country:"法国",region:"欧洲",type:"跨国运营商",score:8.6,dims:[5,4,4,5,4,5],devPortal:"https://developer.orange.com/"},
    {name:"Deutsche Telekom",country:"德国",region:"欧洲",type:"跨国运营商",score:8.5,dims:[4,4,4,5,4,4],devPortal:"https://developer.telekom.com/en"},
    {name:"中国联通",country:"中国",region:"中国内地",type:"国有运营商",score:8.6,dims:[4,5,4,5,5,3],devPortal:"https://open.10010.com/"},
    {name:"中国移动",country:"中国",region:"中国内地",type:"国有运营商",score:8.4,dims:[4,5,4,4,5,3],devPortal:"https://open.10086.cn/"},
    {name:"中国电信",country:"中国",region:"中国内地",type:"国有运营商",score:8.5,dims:[5,5,4,4,4,3],devPortal:"https://open.189.cn/"},
    {name:"CITIC Telecom",country:"中国香港",region:"中国内地",type:"跨国运营商",score:7.8,dims:[3,3,4,4,4,3],devPortal:"https://developer.citictel.com/"},
    {name:"Verizon",country:"美国",region:"北美洲",type:"商业运营商",score:8.0,dims:[4,3,4,4,3,4],devPortal:"https://developers.verizon.com/"},
    {name:"AT&T",country:"美国",region:"北美洲",type:"商业运营商",score:7.8,dims:[4,3,4,4,3,4],devPortal:"https://developer.att.com/"},
    {name:"T-Mobile US",country:"美国",region:"北美洲",type:"商业运营商",score:7.6,dims:[4,3,3,4,3,4],devPortal:"https://developer.t-mobile.com/"},
    {name:"NTT Docomo",country:"日本",region:"亚洲",type:"商业运营商",score:7.8,dims:[4,3,4,4,3,3],devPortal:"https://dev.smt.docomone.jp/"},
    {name:"SK Telecom",country:"韩国",region:"亚洲",type:"商业运营商",score:7.6,dims:[4,3,3,4,3,3],devPortal:"https://openapi.sk.com/"},
    {name:"Reliance Jio",country:"印度",region:"亚洲",type:"商业运营商",score:7.4,dims:[4,3,3,3,3,3],devPortal:"https://developer.jio.com"},
    {name:"Bharti Airtel",country:"印度",region:"亚洲",type:"商业运营商",score:7.4,dims:[4,3,3,3,3,3],devPortal:"https://developers.airtel.in/"},
    {name:"MasOrange",country:"西班牙",region:"欧洲",type:"商业运营商",score:7.6,dims:[4,3,4,4,3,3],devPortal:""},
    {name:"Claro",country:"拉美多国",region:"拉美",type:"跨国运营商",score:7.2,dims:[3,3,3,4,3,3],devPortal:"https://www.claroinsight.com.br/"}
  ],
  dimLabels:["API 上线数","API 品类覆盖","商用化进展","安全合规","计费灵活","开发者生态"],
  dimWeights:["25%","20%","20%","12%","13%","10%"],
  dimExplain:[
    "已上线的 CAMARA API 数量。评估标准：运营商已商用发布的 API 数量越多得分越高（5分=15+个API，3分=8-10个，1分=3个以下）",
    "覆盖的 API 类别数。评估标准：认证/设备/位置/网络质量/计费/边缘/IoT 等 7 大类中覆盖几类（5分=全覆盖，3分=覆盖4类，1分=仅认证类）",
    "商用化部署程度。评估标准：有真实商用案例+收入=5分，有试点但无收入=3分，仅宣布未部署=1分",
    "数据安全与合规认证。评估标准：通过 GDPR/PCI DSS/ISO 27001 等认证情况（5分=多项认证，3分=部分认证，1分=未公开认证）",
    "计费模式多样性。评估标准：按次/阶梯/套餐/批发分成/直销等模式覆盖度（5分=5种以上，3分=2-3种，1分=仅直销）",
    "开发者生态成熟度。评估标准：是否有开发者门户、SDK、沙箱测试、文档质量、开发者数量（5分=完整门户+850+开发者，3分=有门户但规模小，1分=无公开门户）"
  ],
  // CAMARA API 清单 (名称与 camaraproject.org 官方一致)
  camaraAPIs:[
    {name:"Number Verification",desc:"验证手机号与设备 SIM 一致性(无 SMS OTP)",status:"Stable",version: "2026-09-01",releaseTag:"r3.2",category:"认证与反欺诈",launchMarkets:35,camaraUrl:"https://camaraproject.org/number-verification/"},
    {name:"Sim Swap",desc:"检测 SIM 卡近期是否被更换",status:"Stable",version: "2026-09-01",releaseTag:"r3.3",category:"认证与反欺诈",launchMarkets:40,camaraUrl:"https://camaraproject.org/sim-swap/"},
    {name:"Device Status",desc:"设备在线/漫游/离线状态查询",status:"Stable",version: "2026-09-01",releaseTag:"r2.2",category:"设备信息",launchMarkets:20,camaraUrl:"https://github.com/camaraproject/DeviceStatus"},
    {name:"Device Roaming Status",desc:"设备漫游状态及所在国家",status:"Stable",version: "2026-09-01",releaseTag:"r1.2",category:"设备信息",launchMarkets:18,camaraUrl:"https://camaraproject.org/device-roaming-status/"},
    {name:"Device Reachability Status",desc:"设备是否可通过 SMS/数据到达",status:"Stable",version: "2026-09-01",releaseTag:"r1.2",category:"设备信息",launchMarkets:15,camaraUrl:"https://camaraproject.org/device-reachability-status/"},
    {name:"Location Verification",desc:"设备位置验证(地理围栏)",status:"Stable",version: "2026-09-01",releaseTag:"r3.2",category:"位置服务",launchMarkets:12,camaraUrl:"https://camaraproject.org/location-verification/"},
    {name:"Quality on Demand",desc:"按需请求网络质量保障(延迟/带宽)",status:"Stable",version: "2026-09-01",releaseTag:"r3.2",category:"网络质量",launchMarkets:8,camaraUrl:"https://camaraproject.org/quality-on-demand/"},
    {name:"Know Your Customer Match",desc:"KYC 身份信息匹配验证",status:"Stable",version: "2026-09-01",releaseTag:"r3.2",category:"认证与反欺诈",launchMarkets:10,camaraUrl:"https://camaraproject.org/know-your-customer-match/"},
    {name:"Know Your Customer Age Verification",desc:"年龄验证(是否成年)",status:"Stable",version: "2026-09-01",releaseTag:"r3.2",category:"认证与反欺诈",launchMarkets:8,camaraUrl:"https://camaraproject.org/know-your-customer-age-verification/"},
    {name:"One Time Password SMS",desc:"标准化 OTP 短信发送",status:"Stable",version: "2026-09-01",releaseTag:"r3.2",category:"认证与反欺诈",launchMarkets:25,camaraUrl:"https://camaraproject.org/one-time-password-sms/"},
    {name:"Carrier Billing",desc:"运营商计费/代扣费 API",status:"Stable",version: "2026-09-01",releaseTag:"r3.2",category:"计费与支付",launchMarkets:12,camaraUrl:"https://camaraproject.org/carrier-billing/"},
    {name:"Call Forwarding Signal",desc:"呼叫转移状态检测(反欺诈)",status:"Stable",version: "2026-09-01",releaseTag:"r3.3",category:"认证与反欺诈",launchMarkets:6,camaraUrl:"https://camaraproject.org/call-forwarding-signal/"},
    {name:"Device Swap",desc:"检测设备是否被更换",status:"Stable",version: "2026-09-01",releaseTag:"r3.2",category:"设备信息",launchMarkets:10,camaraUrl:"https://camaraproject.org/device-swap/"},
    {name:"Silent Authentication",desc:"无感网络认证(替代 SMS OTP，Number Verification 的高级模式)",status:"Stable",version: "2026-09-01",releaseTag:"r3.2",category:"认证与反欺诈",launchMarkets:5,camaraUrl:"https://github.com/camaraproject/SilentAuthentication"},
    {name:"Simple Edge Discovery",desc:"边缘计算节点发现与路由",status:"Stable",version: "2026-09-01",releaseTag:"r2.3",category:"边缘计算",launchMarkets:3,camaraUrl:"https://camaraproject.org/simple-edge-discovery/"},
    {name:"Population Density Data",desc:"区域人口密度估算数据",status:"Stable",version: "2026-09-01",releaseTag:"r3.2",category:"位置服务",launchMarkets:2,camaraUrl:"https://camaraproject.org/population-density-data/"},
    {name:"IoT SIM Fraud Prevention",desc:"物联网 SIM 卡防欺诈(中国电信贡献)",status:"Beta",version: "2026-09-01",releaseTag:"Beta",category:"物联网安全",launchMarkets:1,camaraUrl:"https://camaraproject.org/iot-sim-fraud-prevention/"},
    {name:"QoS Booking",desc:"预约特定时间地点的网络质量保障",status:"Beta",version: "2026-09-01",releaseTag:"r1.2",category:"网络质量",launchMarkets:1,camaraUrl:"https://camaraproject.org/qos-booking/"},
    {name:"Blockchain Public Address",desc:"手机号关联区块链地址(DID)",status:"Stable",version: "2026-09-01",releaseTag:"r2.2",category:"计费与支付",launchMarkets:1,camaraUrl:"https://camaraproject.org/blockchain-public-address/"},
    {name:"Scam Signal",desc:"通话欺诈信号检测(英国银行业反欺诈)",status:"Stable",version: "2026-09-01",releaseTag:"r3.2",category:"认证与反欺诈",launchMarkets:1,camaraUrl:"https://camaraproject.org/scam-signal/"},
    {name:"Number Recycling",desc:"手机号是否被回收重新分配",status:"Stable",version: "2026-09-01",releaseTag:"r2.2",category:"认证与反欺诈",launchMarkets:2,camaraUrl:"https://camaraproject.org/number-recycling/"},
    {name:"Location Retrieval",desc:"设备地理位置获取(基于网络数据)",status:"Stable",version: "2026-09-01",releaseTag:"r3.2",category:"位置服务",launchMarkets:5,camaraUrl:"https://camaraproject.org/location-retrieval/"}
  ],
  apiCategories:["认证与反欺诈","设备信息","位置服务","网络质量","计费与支付","边缘计算","物联网安全"],
  // 热力矩阵: 运营商 x API 能力
  capabilities:["Number Verification","Sim Swap","Device Status","Device Roaming Status","Device Reachability Status","Location Verification","Quality on Demand","Know Your Customer Match","Know Your Customer Age Verification","One Time Password SMS","Carrier Billing","Call Forwarding Signal","Device Swap","Silent Authentication","Simple Edge Discovery","Population Density Data","IoT SIM Fraud Prevention","QoS Booking","Blockchain Public Address","Scam Signal","Number Recycling","Location Retrieval"],
  // 值: 2=已商用  1=试点/部分支持  0=未部署
  heatmap:[
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,0,0,1,1,1,1], // Telefónica
    [2,2,2,2,2,2,2,1,1,2,2,1,2,1,1,0,0,0,0,1,0,1], // Vodafone
    [2,2,2,2,2,2,2,2,2,2,1,2,2,1,1,0,0,0,0,0,0,1], // Orange
    [2,2,2,2,1,2,2,1,1,2,1,1,2,1,1,0,0,0,0,0,0,0], // Deutsche Telekom
    [2,2,1,1,1,1,2,1,1,2,2,0,1,1,0,0,1,1,0,0,0,0], // 中国联通
    [2,2,1,1,1,1,2,1,1,2,2,0,1,1,0,0,1,0,0,0,0,0], // 中国移动
    [2,2,1,1,1,2,2,1,1,2,1,0,1,1,0,1,2,1,0,0,0,0], // 中国电信
    [2,2,0,2,0,2,2,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2], // CITIC Telecom (7个API已在developer.citictel.com上线)
    [2,2,2,1,1,1,1,1,0,2,1,0,1,1,0,0,0,0,0,0,0,0], // Verizon
    [2,2,2,1,1,1,1,1,0,2,1,0,1,1,0,0,0,0,0,0,0,0], // AT&T
    [2,2,1,1,1,1,1,0,0,2,0,0,1,1,0,0,0,0,0,0,0,0], // T-Mobile US
    [2,2,2,1,1,1,1,1,1,2,1,0,1,1,0,0,0,0,0,0,0,0], // NTT Docomo
    [2,2,1,1,1,1,1,0,0,2,1,0,1,1,1,0,0,0,0,0,0,0], // SK Telecom
    [2,2,1,1,1,0,0,1,0,2,1,0,1,1,0,0,0,0,0,0,0,0], // Reliance Jio
    [2,2,1,1,1,0,0,1,0,2,1,0,1,1,0,0,0,0,0,0,0,0], // Bharti Airtel
    [2,2,2,2,2,1,2,1,1,2,1,1,2,1,1,0,0,0,0,0,0,1], // MasOrange
    [2,2,1,1,1,1,0,0,0,2,0,0,1,0,0,0,0,0,0,0,0,0]  // Claro
  ],
  radarDims:["API上线数","品类覆盖","商用进展","安全合规","计费灵活","开发者生态","生态合作","开发者体验"],
  radarData:[
    {name:"Telefónica",values:[5,5,5,5,4,5,5,5]},
    {name:"Orange",values:[5,4,4,5,4,5,5,4]},
    {name:"中国联通",values:[4,5,4,5,5,3,4,3]},
    {name:"中国电信",values:[5,5,4,4,4,3,4,3]},
    {name:"CITIC Telecom",values:[3,3,4,4,4,3,3,2]},
    {name:"Vodafone",values:[5,4,5,5,4,5,4,4]},
    {name:"Verizon",values:[4,3,4,4,3,4,3,3]}
  ],
  channelPartners:[
    {name:"AWS",type:"云厂商/聚合",apis:"Number Verify, SIM Swap, QoD, Device Status",devPortal:"https://aws.amazon.com/marketplace"},
    {name:"Google Cloud",type:"云厂商/聚合",apis:"Number Verify, SIM Swap, QoD",devPortal:"https://cloud.google.com/"},
    {name:"Microsoft Azure",type:"云厂商/聚合",apis:"Number Verify, SIM Swap",devPortal:"https://azure.microsoft.com/"},
    {name:"Twilio",type:"CPaaS",apis:"Number Verify, SIM Swap, OTP, Silent Auth",devPortal:"https://www.twilio.com/docs"},
    {name:"Vonage",type:"CPaaS",apis:"Number Verify, SIM Swap, QoD",devPortal:"https://developer.vonage.com/"},
    {name:"Infobip",type:"CPaaS",apis:"Number Verify, SIM Swap, OTP",devPortal:"https://www.infobip.com/docs"},
    {name:"Sinch",type:"CPaaS",apis:"Number Verify, SIM Swap",devPortal:"https://developers.sinch.com/"},
    {name:"Nokia",type:"设备商/平台",apis:"QoD, Device Status, Number Verify",devPortal:"https://www.nokia.com/"},
    {name:"Aduna",type:"聚合平台",apis:"Number Verify, SIM Swap, QoD, KYC",devPortal:"https://aduna.global/"},
    {name:"IBM Consulting",type:"集成商",apis:"全 API 集成咨询",devPortal:"https://www.ibm.com/consulting"},
    {name:"Huawei",type:"设备商",apis:"QoD, Number Verify",devPortal:"https://developer.huawei.com/"},
    {name:"ZTE",type:"设备商",apis:"QoD",devPortal:"https://www.zte.com.cn/"},
    {name:"Alibaba Cloud",type:"云厂商",apis:"Number Verify, SIM Swap",devPortal:"https://www.alibabacloud.com/"},
    {name:"Meta",type:"技术伙伴",apis:"Number Verify",devPortal:"https://developers.facebook.com/"},
    {name:"Oracle",type:"技术伙伴",apis:"Carrier Billing",devPortal:"https://docs.oracle.com/"},
    {name:"BlackDice",type:"安全/反欺诈",apis:"AI 驱动网络级反欺诈安全能力",devPortal:"https://www.blackdice.com/"},
    {name:"Codec",type:"CPaaS",apis:"Number Verify, SIM Swap, OTP",devPortal:"https://www.codec.com/"},
    {name:"CITIC Telecom",type:"NaaS/聚合",apis:"Number Verify, SIM Swap, QoD, Location, OTP",devPortal:"https://developer.citictel.com/"}
  ],
  // 市场规模数据
  marketData:{
    globalStats:[
      {metric:"运营商集团",value:"86",unit:"家",note:"覆盖全球 80% 移动连接",sourceUrl:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/",updateTime:"2026-08-26"},
      {metric:"移动网络",value:"300+",unit:"个",note:"全球范围",sourceUrl:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/",updateTime:"2026-08-26"},
      {metric:"渠道合作伙伴",value:"77",unit:"家",note:"云厂商/CPaaS/设备商/安全厂商",sourceUrl:"https://www.linkedin.com/posts/matteo-di-battista-75584b15b_networkapis-opengateway-fraudprevention-activity-7491400899257556994-uoZW",updateTime:"2026-08-25"},
      {metric:"CAMARA 认证 API",value:"36",unit:"个",note:"含 Beta；本站追踪 22 个核心 API(20 Stable / 2 Beta)，20 个已有商用部署",sourceUrl:"https://camaraproject.org/",updateTime:"2026-08-26"},
      {metric:"商用 API 实例",value:"300+",unit:"个",note:"跨 85 个网络",sourceUrl:"https://5gworldpro.com/blog/2026/08/14/network-apis-and-camara-why-telecoms-api-monetization-push-is-finally-working-in-2026/",updateTime:"2026-08-14"},
      {metric:"商用市场",value:"65",unit:"个",note:"27 个市场已 100% API 对齐",sourceUrl:"https://5gworldpro.com/blog/2026/08/14/network-apis-and-camara-why-telecoms-api-monetization-push-is-finally-working-in-2026/",updateTime:"2026-08-14"}
    ],
    marketForecast:[
      {source:"GSMA",metric:"网络 API 市场收入(连接+边缘)",value:"3000",unit:"亿美元",horizon:"5-7年"},
      {source:"GSMA",metric:"API 本身额外营收",value:"300",unit:"亿美元",horizon:"5-7年"},
      {source:"麦肯锡",metric:"网络能力 API 核心价值",value:"300-500",unit:"亿美元",horizon:"至 2030 年"},
      {source:"行业报告",metric:"Number Verification API 市场",value:"112",unit:"亿美元",horizon:"至 2034 年 (CAGR 12.8%)"}
    ],
    regionalProgress:[
      {region:"欧洲",operators:"Telefónica/Vodafone/Orange/DT/MasOrange",apis:"全品类覆盖",note:"商用化领先，QoD 早期部署"},
      {region:"中国内地",operators:"移动/电信/联通",apis:"OTP/QoD/IoT安全/KYC",note:"QoD 三网互通，IoT 安全 API 全球首发"},
      {region:"北美洲",operators:"Verizon/AT&T/T-Mobile",apis:"Number Verify/SIM Swap",note:"商用化中，聚焦反欺诈"},
      {region:"拉美",operators:"Claro/Movistar/Tigo/Antel",apis:"SIM Swap/Number Verify",note:"8 国已上线，快速增长"},
      {region:"亚洲",operators:"Jio/Airtel/NTT/SK",apis:"SIM Swap/Number Verify/OTP",note:"印度三大运营商已上线"},
      {region:"东南亚",operators:"DITO/YTL/Viettel",apis:"SIM Swap/Number Verify",note:"马来西亚 MOU 联合部署"},
      {region:"中东",operators:"Emirates NBD/ADIB/FAB",apis:"Silent Auth/SIM Swap",note:"央行强制禁用 SMS OTP"},
      {region:"大洋洲",operators:"One NZ/Spark/2degrees",apis:"Number Verify/SIM Swap",note:"2G/3G 退网后全面拥抱 Open Gateway"}
    ]
  },
  // 差异化能力矩阵
  diffMatrix:[
    {name:"IoT SIM 防欺诈 API",desc:"全球首个物联网安全 API，中国电信天翼物联贡献",vendors:["中国电信"]},
    {name:"5G QoD 三网互通",desc:"中国三大运营商基于统一标准实现跨网 QoD",vendors:["中国联通","中国移动","中国电信"]},
    {name:"Silent Authentication",desc:"无感网络认证替代 SMS OTP",vendors:["Telefónica","Orange","Verizon"]},
    {name:"QoD 流量优先级",desc:"MasOrange 首批商用 QoD 流量优先级场景",vendors:["MasOrange"]},
    {name:"Agentic AI + API 编排",desc:"AI 智能体自动发现和编排网络 API",vendors:["Telefónica","Nokia"]},
    {name:"A2A 协议试点",desc:"Agent-to-Agent 协议跨运营商 API 编排",vendors:["Orange","Google Cloud","AWS"]},
    {name:"跨境联合 MOU",desc:"多运营商签署 MOU 联合部署网络认证",vendors:["马来西亚运营商","One NZ"]},
    {name:"MCP 能力开放",desc:"基于 Model Context Protocol 开放网络能力",vendors:["中国联通"]}
  ],
  // 商业模式
  billingModels:[
    {model:"按次计费 (Per-Call)",vendors:"Twilio, Vonage, Infobip",desc:"每次 API 调用计费，$0.02-$0.05/次验证，量大可议"},
    {model:"按量阶梯定价",vendors:"AWS, Google Cloud",desc:"按月调用量阶梯计费，大客户可签批量协议"},
    {model:"批发分成",vendors:"Aduna, Sinch",desc:"运营商通过聚合商暴露能力，按调用次数分成"},
    {model:"套餐订阅",vendors:"Sinch, Infobip",desc:"月度/年度 API 套餐，含一定调用量"},
    {model:"运营商直销",vendors:"Telefónica, 中国联通",desc:"运营商直接向企业销售 API 服务"}
  ],
  // 分层参考架构
  // 来源依据: GSMA Open Gateway 白皮书 (定义运营商网络能力暴露框架) + CAMARA API 架构规范 (定义 API 标准化接口) + TM Forum Open API 框架 (定义 BSS/OSS 开放标准)
  // 层级划分逻辑: 从上到下为"从开发者到网络"的数据流路径，上层消费下层能力，下层为上层提供服务
  // 层级关联: 每层通过标准化接口(REST API/OpenAPI)与相邻层通信，CAMARA 规范贯穿"接入→聚合→网关→暴露"四层
  architectureSource:"来源: GSMA Open Gateway 白皮书(网络能力暴露框架) + CAMARA 架构规范(API 标准化接口) + TM Forum Open API 框架(BSS/OSS 开放标准)。层级逻辑: 从上到下为开发者→网络的数据流路径，上层消费下层能力，CAMARA 规范贯穿接入→聚合→网关→暴露四层",
  architecture:[
    {layer:"1. 开发者接入层",desc:"API 门户、文档、SDK、沙箱测试环境。开发者在此层注册、查阅 API 文档、下载 SDK、在沙箱中测试 API 调用",vendors:["GSMA","CAMARA","TM Forum","Telefónica Developer Hub"],relation:"向下调用渠道聚合层或直连 API 网关层获取能力"},
    {layer:"2. 渠道聚合层",desc:"CPaaS/云厂商/NaaS 平台聚合多家运营商 API，提供统一接口和统一计费，企业无需逐一对接每个运营商",vendors:["AWS","Twilio","Vonage","Infobip","Aduna","CITIC Telecom NaaS"],relation:"向上为开发者层提供统一接口，向下通过 API 网关层调用运营商能力"},
    {layer:"3. API 网关层",desc:"认证授权、OAuth2 令牌管理、限流、路由、计量、API 版本管理。运营商在此层控制 API 访问权限和用量",vendors:["Nokia","Telefónica","Orange","华为"],relation:"向上接收聚合层或直连开发者的请求，向下将请求转发至能力编排层或直接到 NEF"},
    {layer:"4. 能力编排层",desc:"API 组合编排、Agentic AI 自动发现和编排 API、A2A 协议跨运营商协同。可将多个 API 组合为复杂业务流程",vendors:["Telefónica","Nokia","Google Cloud","AWS"],relation:"向上为网关层提供组合能力，向下调用 NEF 层暴露的网络能力"},
    {layer:"5. 网络能力暴露层 (NEF)",desc:"5G 核心网 NEF (Network Exposure Function) 映射。将 5G 网络内部能力(QoS/位置/状态)映射为 CAMARA 标准 API 规范",vendors:["华为","中兴","Nokia","Ericsson"],relation:"向上为编排层/网关层提供标准 API，向下调用核心网网元能力"},
    {layer:"6. 核心网/网络层",desc:"5G SA 独立组网、EPC、IMS 等网络基础设施。提供移动性管理、会话管理、策略控制等基础网络能力",vendors:["华为","中兴","Ericsson","Nokia","CITIC Telecom"],relation:"向上为 NEF 层提供网络网元接口，是所有 API 能力的最终来源"},
    {layer:"7. BSS/OSS 层",desc:"计费系统、配额管理、用户身份管理、运营支撑系统。支撑 API 的计量计费、用户签约和运营管理",vendors:["Amdocs","华为","亚信科技","新华三"],relation:"贯穿所有层，为 API 网关层提供计费数据，为开发者层提供用量统计，为 NEF 层提供策略控制"}
  ],
  // API 调用量排行
  apiCallVolume:[
    {operator:"Telefónica",api:"Number Verification",calls:"23 亿",period:"累计 (2024-2026)",unit:"次",source:"Telefónica 财报/GSMA",sourceUrl:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/"},
    {operator:"Telefónica",api:"SIM Swap",calls:"3.4 亿",period:"累计 (2024-2026)",unit:"次",source:"Telefónica 财报/GSMA",sourceUrl:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/"},
    {operator:"Itaú Unibanco",api:"SIM Swap",calls:"7000 万",period:"月均",unit:"次",source:"Telefónica/GSMA",sourceUrl:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/"},
    {operator:"Deutsche Telekom",api:"Quality on Demand",calls:"420 万",period:"月均",unit:"次",source:"5GWorldPro",sourceUrl:"https://5gworldpro.com/blog/2026/08/14/network-apis-and-camara-why-telecoms-api-monetization-push-is-finally-working-in-2026/"},
    {operator:"Twilio (CPaaS 聚合)",api:"多 API 聚合",calls:"3080 万",period:"日均",unit:"笔",source:"5GWorldPro/MWC26",sourceUrl:"https://5gworldpro.com/blog/2026/08/14/network-apis-and-camara-why-telecoms-api-monetization-push-is-finally-working-in-2026/"},
    {operator:"英国银行联盟",api:"Scam Signal",calls:"N/A",period:"2026 上半年",unit:"—",source:"GSMA/FICO",sourceUrl:"https://www.linkedin.com/posts/matteo-di-battista-75584b15b_networkapis-opengateway-fraudprevention-activity-7491400899257556994-uoZW"}
  ],
  // 营收数据
  revenueData:[
    {operator:"Telefónica",revenue:"4500 万",currency:"欧元",period:"年 (2025-2026)",note:"API 业务年收入(GSMA/行业估算，非 Telefónica 官方财报独立披露)，850+ 开发者接入",source:"5GWorldPro/GSMA",sourceUrl:"https://5gworldpro.com/blog/2026/08/14/network-apis-and-camara-why-telecoms-api-monetization-push-is-finally-working-in-2026/"},
    {operator:"GSMA (全行业)",revenue:"3000 亿",currency:"美元",period:"5-7 年预测",note:"网络 API 市场收入 (连接+边缘)",source:"GSMA 预测",sourceUrl:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/"},
    {operator:"GSMA (全行业)",revenue:"300 亿",currency:"美元",period:"5-7 年预测",note:"API 本身额外营收",source:"GSMA 预测",sourceUrl:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/"},
    {operator:"麦肯锡 (全行业)",revenue:"300-500 亿",currency:"美元",period:"至 2030 年",note:"网络能力 API 核心价值",source:"麦肯锡报告",sourceUrl:"#"},
    {operator:"行业报告",revenue:"112 亿",currency:"美元",period:"至 2034 年",note:"Number Verification API 市场 (CAGR 12.8%)",source:"行业报告",sourceUrl:"#"}
  ],
  // 覆盖率趋势
  coverageTrends:[
    {period:"2023-02",operators:"21",markets:"3",apis:"8",note:"GSMA 在 MWC 巴塞罗那正式发布 Open Gateway 倡议",source:"GSMA"},
    {period:"2024-03",operators:"47",markets:"9",apis:"12",note:"中国三大运营商发布商用 OTP API",source:"百度百科/GSMA"},
    {period:"2025-03",operators:"61",markets:"25",apis:"18",note:"中国信通院正式加入 GSMA Open Gateway",source:"百度百科"},
    {period:"2025-09",operators:"72",markets:"40",apis:"25",note:"马来西亚运营商签署 MOU 联合部署",source:"U2opia"},
    {period:"2026-03",operators:"80",markets:"55",apis:"30",note:"MWC26: Twilio 日处理 3080 万笔交易",source:"5GWorldPro"},
    {period:"2026-08",operators:"86",markets:"65",apis:"36",note:"300+ 商用实例，77 家渠道合作伙伴，36 个 CAMARA 认证 API",source:"GSMA/CAMARA"}
  ],
  // M6: 商用案例与试商用案例
  commercialCases:[
    {
      company:"中国联通 × 奇瑞汽车 × 蔚来汽车 × 中兴通讯",
      country:"中国",
      region:"中国内地",
      industry:"汽车/车联网",
      apis:["Quality on Demand (QoD)","Communications Quality"],
      apiCount:2,
      type:"商用",
      painPoint:"智能网联汽车需要稳定低延迟的网络通信保障，车联网服务在不同网络条件下体验不一致",
      solution:"中国联通联合奇瑞汽车、蔚来汽车和中兴通讯，基于 Open Gateway QoD API 为车联网场景提供通信质量保障，实现车辆与云端之间的稳定连接",
      results:"发布 GSMA 官方案例研究，展示 QoD API 在车联网领域的商业化应用",
      source:"GSMA 案例研究",
      sourceUrl:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/gsma_study/china-unicom-chery-auto-nio-auto-zte-connected-mobility/",
      date:"2026-08-20"
    },
    {
      company:"Turk Telekom (土耳其电信)",
      country:"土耳其",
      region:"欧洲",
      industry:"无人机/航空",
      apis:["Quality on Demand (QoD)","Device Location Verification"],
      apiCount:2,
      type:"商用",
      painPoint:"无人机飞行需要实时网络通信保障和位置验证，网络不稳定影响飞行安全",
      solution:"基于 Open Gateway QoD API 为无人机飞行提供网络质量保障，结合 Device Location Verification 验证无人机位置在授权飞行区域内",
      results:"发布 GSMA 官方案例研究，展示 Open Gateway API 在无人机安全飞行领域的应用",
      source:"GSMA 案例研究",
      sourceUrl:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/gsma_study/turk-telekom-enabling-safe-drone-operations/",
      date:"2026-08-20"
    },
    {
      company:"Itaú Unibanco",
      country:"巴西",
      region:"拉美",
      industry:"银行/金融",
      apis:["SIM Swap","Number Verification","KYC Match","KYC Age Verification","Device Status","Carrier Billing"],
      apiCount:10,
      type:"商用",
      painPoint:"账户接管欺诈频发，SMS OTP 验证存在 SIM 劫持风险，客户开户流程冗长导致流失率高",
      solution:"集成 10 个 Open Gateway API，核心使用 SIM Swap 检测异常换卡，Number Verification 替代 SMS OTP 实现无感认证，KYC Match 自动匹配身份信息",
      results:"SIM Swap API 月查询量 7000 万次，开户效率提升 15%，首次通话解决率提升 30%，账户接管欺诈显著下降",
      source:"Telefónica / GSMA",
      sourceUrl:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/",
      date:"2024-06"
    },
    {
      company:"Daycoval Bank",
      country:"巴西",
      region:"拉美",
      industry:"银行/金融",
      apis:["SIM Swap","Number Verification"],
      apiCount:2,
      type:"商用",
      painPoint:"远程开户需验证用户手机号真实性，传统 SMS OTP 易被 SIM 交换攻击绕过",
      solution:"通过 Telefónica Brasil 网络调用 SIM Swap API 检测近期换卡记录，Number Verification 确认手机号与设备 SIM 一致",
      results:"开户欺诈风险大幅降低，客户身份验证流程从分钟级缩短至秒级",
      source:"Telefónica",
      sourceUrl:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/",
      date:"2024-03"
    },
    {
      company:"Vinted",
      country:"西班牙",
      region:"欧洲",
      industry:"电商/C2C",
      apis:["Number Verification"],
      apiCount:1,
      type:"商用",
      painPoint:"C2C 二手交易平台用户注册需验证手机号，SMS OTP 成本高且体验差",
      solution:"通过 Telefónica 网络 Number Verification API 直接验证手机号与设备一致性，无需发送短信",
      results:"注册转化率提升，验证成本降低，用户体验改善",
      source:"Telefónica",
      sourceUrl:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/",
      date:"2024-09"
    },
    {
      company:"Frete.com",
      country:"巴西",
      region:"拉美",
      industry:"物流/货运",
      apis:["KYC Match"],
      apiCount:1,
      type:"商用",
      painPoint:"货车司机注册需核实身份，虚假注册导致安全问题",
      solution:"通过 KYC Match API 匹配司机提交的身份信息与运营商登记信息，自动验证姓名、身份证号一致性",
      results:"司机注册审核效率提升，虚假注册大幅减少",
      source:"Telefónica",
      sourceUrl:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/",
      date:"2024-05"
    },
    {
      company:"英国银行反欺诈联盟",
      country:"英国",
      region:"欧洲",
      industry:"银行/金融",
      apis:["Scam Signal"],
      apiCount:1,
      type:"商用",
      painPoint:"英国年度欺诈损失达 4.507 亿英镑，诈骗分子通过电话诱导受害者转账",
      solution:"Vodafone、EE、Virgin Media O2 三家运营商联合部署 Scam Signal API，结合 FICO 与 JT Intelligence 平台，实时检测通话中是否存在诈骗信号",
      results:"诈骗呼叫减少 41%，欺诈损失降低 44%，误报率降低 55%",
      source:"GSMA / FICO",
      sourceUrl:"https://www.linkedin.com/posts/matteo-di-battista-75584b15b_networkapis-opengateway-fraudprevention-activity-7491400899257556994-uoZW",
      date:"2026-06"
    },
    {
      company:"Deutsche Telekom",
      country:"德国/奥地利/希腊/匈牙利",
      region:"欧洲",
      industry:"视频流媒体/云游戏",
      apis:["Quality on Demand (QoD)"],
      apiCount:1,
      type:"商用",
      painPoint:"视频流媒体卡顿率高，云游戏延迟不稳定，用户投诉多",
      solution:"通过 QoD API 按需请求网络质量保障，为视频流和游戏流量分配优先级带宽。与 Broadpeak 合作完成视频流 PoC 验证",
      results:"月均 QoD 会话 420 万次，视频卡顿率显著下降，云游戏体验提升",
      source:"5GWorldPro / GSMA",
      sourceUrl:"https://5gworldpro.com/blog/2026/08/14/network-apis-and-camara-why-telecoms-api-monetization-push-is-finally-working-in-2026/",
      date:"2026-07"
    },
    {
      company:"MasOrange",
      country:"西班牙",
      region:"欧洲",
      industry:"企业/通信",
      apis:["Quality on Demand (QoD)"],
      apiCount:1,
      type:"商用",
      painPoint:"企业客户需要差异化网络质量保障，特定业务流量需优先处理",
      solution:"首批商用 QoD 流量优先级场景，企业客户通过 API 按需请求网络质量保障",
      results:"早期商用部署完成，企业客户网络体验差异化能力上线",
      source:"5GWorldPro",
      sourceUrl:"https://5gworldpro.com/blog/2026/08/14/network-apis-and-camara-why-telecoms-api-monetization-push-is-finally-working-in-2026/",
      date:"2026-07"
    },
    {
      company:"Bharti Airtel / Reliance Jio / Vodafone Idea",
      country:"印度",
      region:"亚洲",
      industry:"银行/金融",
      apis:["SIM Swap"],
      apiCount:1,
      type:"商用",
      painPoint:"印度消费者诈骗率高达 53%，SIM 交换欺诈导致银行账户被盗",
      solution:"印度三大运营商联合上线 SIM Swap API，银行可实时查询用户近期是否更换 SIM 卡，拦截可疑交易",
      results:"累计拦截 530 亿次诈骗呼叫，银行账户接管欺诈显著下降",
      source:"GSMA / 运营商公告",
      sourceUrl:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/",
      date:"2025-11"
    },
    {
      company:"Telefónica",
      country:"西班牙/巴西/德国/英国",
      region:"欧洲",
      industry:"多行业",
      apis:["Number Verification","SIM Swap","KYC Match","QoD"],
      apiCount:15,
      type:"商用",
      painPoint:"多市场多业务需统一认证能力，传统 SMS OTP 成本高且不安全",
      solution:" Telefónica 在旗下 4 个市场全面部署 Open Gateway API，为 850+ 开发者提供标准化网络 API 接入",
      results:"Number Verify 累计调用 23 亿次，SIM Swap 调用 3.4 亿次，API 业务年收入 4500 万欧元",
      source:"Telefónica / GSMA",
      sourceUrl:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/",
      date:"2026-06"
    },
    {
      company:"YBVR",
      country:"西班牙",
      region:"欧洲",
      industry:"VR/体育",
      apis:["Quality on Demand (QoD)"],
      apiCount:1,
      type:"试商用",
      painPoint:"VR 体育赛事直播对网络延迟和带宽要求极高，普通网络体验差",
      solution:"通过 Telefónica 网络 QoD API 为 VR 视频流分配专属带宽和低延迟保障",
      results:"VR 直播体验提升，延迟降低，画质改善",
      source:"Telefónica",
      sourceUrl:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/",
      date:"2025-10"
    },
    {
      company:"Twilio (CPaaS 聚合)",
      country:"全球",
      region:"全球",
      industry:"多行业",
      apis:["Number Verification","SIM Swap","OTP SMS","Silent Authentication"],
      apiCount:4,
      type:"商用",
      painPoint:"全球企业需要统一接口接入多运营商 API，逐一对接成本高",
      solution:"Twilio 作为 CPaaS 聚合商，统一封装多运营商 Open Gateway API，企业通过 Twilio API 即可调用全球近 2/3 移动连接的验证能力",
      results:"MWC26 峰会公布日处理 3080 万笔 API 交易，覆盖近 2/3 全球移动连接",
      source:"5GWorldPro",
      sourceUrl:"https://5gworldpro.com/blog/2026/08/14/network-apis-and-camara-why-telecoms-api-monetization-push-is-finally-working-in-2026/",
      date:"2026-08"
    },
    {
      company:"中国电信 (天翼物联)",
      country:"中国",
      region:"中国内地",
      industry:"物联网",
      apis:["IoT SIM Fraud Prevention"],
      apiCount:1,
      type:"商用",
      painPoint:"物联网 SIM 卡被恶意复制或劫持，IoT 设备安全风险高",
      solution:"全球首个物联网安全 API，检测 IoT SIM 卡异常行为，防止 SIM 卡克隆和欺诈使用",
      results:"正式上线 GSMA Open Gateway 全球地图，纳入 CAMARA 开源项目",
      source:"中国工信新闻网 / China Tech Wire",
      sourceUrl:"https://www.cnii.com.cn/rmydb/202608/t20260820_755729.html",
      date:"2026-08"
    }
  ],
  // M6: 应用场景
  appScenarios:[
    {
      industry:"银行/金融",
      icon:"bank",
      sourceUrl:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/",
      sourceName:"GSMA / Telefónica 商用案例",
      scenarios:[
        {
          scene:"账户开户身份核验",
          need:"远程开户需验证用户身份真实性，防止虚假开户和身份冒用",
          apis:["KYC Match","Number Verification","SIM Swap"],
          desc:"KYC Match 匹配姓名/身份证号，Number Verification 确认手机号真实，SIM Swap 检测近期换卡异常",
          sourceUrl:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/"
        },
        {
          scene:"交易反欺诈",
          need:"大额转账前确认用户设备未被劫持，防止账户接管欺诈",
          apis:["SIM Swap","Device Status","Scam Signal"],
          desc:"SIM Swap 检测换卡，Device Status 确认设备在线，Scam Signal 分析通话是否涉诈",
          sourceUrl:"https://www.linkedin.com/posts/matteo-di-battista-75584b15b_networkapis-opengateway-fraudprevention-activity-7491400899257556994-uoZW"
        },
        {
          scene:"无感登录认证",
          need:"替代 SMS OTP，提升登录体验同时增强安全性",
          apis:["Silent Authentication","Number Verification"],
          desc:"Silent Auth 基于网络层自动完成认证，Number Verification 验证手机号与设备一致性",
          sourceUrl:"https://www.u2opia.com/blog/what-is-silent-network-authentication"
        }
      ]
    },
    {
      industry:"电商/零售",
      icon:"cart",
      sourceUrl:"https://www.gsma.com/solutions-and-impact/gsma-open-gateway/",
      sourceName:"Telefónica 商用案例 (Vinted)",
      scenarios:[
        {
          scene:"用户注册验证",
          need:"C2C/C2B 平台用户注册需低成本验证手机号真实性",
          apis:["Number Verification"],
          desc:"直接验证手机号与设备 SIM 一致性，无需发送短信，降低成本提升转化率"
        },
        {
          scene:"支付安全增强",
          need:"交易支付环节防止 SIM 劫持导致的支付劫持",
          apis:["SIM Swap","Carrier Billing"],
          desc:"支付前查询 SIM Swap 状态，Carrier Billing 支持运营商代扣费"
        }
      ]
    },
    {
      industry:"物流/出行",
      icon:"truck",
      scenarios:[
        {
          scene:"司机/骑手身份审核",
          need:"货运平台需核实司机身份，防止虚假注册",
          apis:["KYC Match","KYC Age Verification"],
          desc:"KYC Match 匹配身份信息，KYC Age Verification 确认年龄合规"
        },
        {
          scene:"车辆位置验证",
          need:"物流配送需验证车辆是否到达指定区域",
          apis:["Device Location Verification"],
          desc:"地理围栏验证设备位置，确认配送到达"
        }
      ]
    },
    {
      industry:"游戏/多媒体",
      icon:"game",
      scenarios:[
        {
          scene:"云游戏低延迟保障",
          need:"云游戏对网络延迟敏感，需稳定低延迟保障",
          apis:["Quality on Demand (QoD)"],
          desc:"QoD API 按需请求低延迟保障，为游戏流量分配优先级带宽"
        },
        {
          scene:"VR/AR 视频流保障",
          need:"VR/AR 直播需高带宽低延迟，普通网络体验差",
          apis:["Quality on Demand (QoD)"],
          desc:"QoD API 为 VR/AR 视频流分配专属带宽，保障沉浸式体验"
        }
      ]
    },
    {
      industry:"物联网",
      icon:"iot",
      scenarios:[
        {
          scene:"IoT SIM 卡防欺诈",
          need:"物联网设备 SIM 卡被克隆或劫持，设备安全风险高",
          apis:["IoT SIM Fraud Prevention"],
          desc:"检测 IoT SIM 卡异常行为，防止克隆和欺诈使用"
        },
        {
          scene:"设备状态监控",
          need:"远程监控 IoT 设备在线状态和漫游位置",
          apis:["Device Status","Device Roaming Status","Device Reachability Status"],
          desc:"组合查询设备在线/漫游/可达状态，实现 IoT 设备全生命周期管理"
        }
      ]
    },
    {
      industry:"企业 IT/安全",
      icon:"shield",
      scenarios:[
        {
          scene:"零信任网络接入",
          need:"企业远程办公需验证设备身份和网络状态",
          apis:["Silent Authentication","Device Status"],
          desc:"Silent Auth 自动认证设备，Device Status 确认设备在线状态后才允许接入"
        },
        {
          scene:"企业账号保护",
          need:"企业账号防接管，防止 SIM 交换攻击",
          apis:["SIM Swap","Number Verification"],
          desc:"关键操作前检测 SIM Swap 状态，Number Verification 二次确认设备"
        },
        {
          scene:"内容年龄合规",
          need:"限制未成年人访问特定内容",
          apis:["KYC Age Verification"],
          desc:"通过运营商数据验证用户年龄是否成年，无需收集身份证号"
        }
      ]
    }
  ],
  // M8: 监管动态
  regulatoryData:[
    {
      regulator:"阿联酋央行 (CBUAE)",
      country:"阿联酋",
      policyName:"Notice 2025/3057",
      date:"2026-03-31",
      newsDate:"2026-03-25",
      effectiveDate:"2026-03-31",
      summary:"要求所有持牌金融机构完全停用 SMS 和邮件 OTP，替代方案包括 FIDO2 passkeys、生物识别、设备绑定等。违规罚款最高 250,000 AED，SMS OTP 欺诈需全额赔偿客户。",
      impact:"Emirates NBD、ADIB、FAB 等已率先切换至生物识别认证，推动 Open Gateway SNA API 需求",
      source:"CBUAE / UAE Advisor Guide",
      sourceUrl:"https://www.uaeadvisorguide.com/2026/03/uae-banks-must-drop-sms-otps-by-31-march.html"
    },
    {
      regulator:"印度储备银行 (RBI)",
      country:"印度",
      policyName:"Authentication Mechanisms for Digital Payment Transactions Directions, 2025",
      date:"2025-09-25",
      newsDate:"2025-09-25",
      effectiveDate:"2026-04-01",
      summary:"要求数字支付交易强制双因子认证，至少一个动态因子。不禁止 SMS OTP 但鼓励采用生物识别、app 令牌等替代方案。跨境 CNP 交易需额外验证。",
      impact:"推动 Jio、Airtel、Vi 与银行加速 SIM Swap API 和 Number Verification API 部署",
      source:"RBI 官网",
      sourceUrl:"https://www.rbi.org.in/scripts/BS_PressReleaseDisplay.aspx?prid=61282"
    },
    {
      regulator:"GSMA Identity and Data Community",
      country:"全球",
      policyName:"GSMA Task Force for SIM-based Authentication",
      date:"2026-01-15",
      newsDate:"2026-01-15",
      effectiveDate:"2026 全年推进",
      summary:"GSMA 成立任务组加速 SIM 认证方案普及，解决运营商 entitlement server 支持和设备 OS 兼容问题",
      impact:"加速 Silent Authentication API 在全球运营商中的部署",
      source:"GSMA 官网",
      sourceUrl:"https://www.gsma.com/solutions-and-impact/technologies/mobile-identity/uncategorized/the-dawn-of-a-new-era-for-authentication/"
    },
    {
      regulator:"巴基斯坦 PTCL/Ufone",
      country:"巴基斯坦",
      policyName:"PCI DSS v4.0.1 认证",
      date:"2026-04-27",
      newsDate:"2026-04-27",
      effectiveDate:"2026",
      summary:"PTCL 和 Ufone 通过 PCI DSS v4.0.1 认证，经 Risk Associates 独立评估，覆盖云基础设施和持卡人数据环境",
      impact:"为巴基斯坦电信运营商开展 Carrier Billing API 业务奠定安全合规基础",
      source:"Next Generation Pakistan",
      sourceUrl:"https://nextgenerationpakistan.com?p=24320/"
    },
    {
      regulator:"欧盟 (EU)",
      country:"欧洲",
      policyName:"GDPR 数据保护条例",
      date:"2018-05-25",
      newsDate:"2026-08-20",
      effectiveDate:"持续执行",
      summary:"对所有处理欧盟居民个人数据的组织适用，违规罚款最高 2000 万欧元或全球营收 4%。Telefónica 已建立 GDPR 合规体系并应用于 Open Gateway API，2026 年持续强化 Privacy by Design",
      impact:"Open Gateway API 设计需遵循 Privacy by Design 原则，影响所有在欧洲运营的运营商 API 部署",
      source:"Telefónica / GDPR",
      sourceUrl:"https://www.telefonica.com/en/communication-room/reports/data-privacy-at-telefonica-innovation-and-digital-transparency"
    },
    {
      regulator:"PCI Security Standards Council",
      country:"全球",
      policyName:"PCI DSS v4.0.1",
      date:"2025-03-31",
      effectiveDate:"2025-03-31",
      summary:"支付卡行业数据安全标准 v4.0.1 全面执行，要求强制多因子认证、持续监控和更强加密。适用于所有存储/处理/传输卡数据的组织",
      impact:"运营商部署 Carrier Billing API 需通过 PCI DSS 认证",
      source:"PCI SSC 官网",
      sourceUrl:"https://www.pcisecuritystandards.org/"
    }
  ],
  // M8: CAMARA 标准进展
  camaraStandards:[
    {
      api:"Number Verification",
      repo:"camaraproject/NumberVerification",
      currentVersion:"v2.1.0",
      releaseTag:"r3.2",
      status:"Stable",
      releaseDate:"2025-09-12",
      changelog:"添加 hashedPhoneNumber 模式验证，JWT-bearer 认证流程文档",
      sourceUrl:"https://github.com/camaraproject/NumberVerification/releases"
    },
    {
      api:"SIM Swap",
      repo:"camaraproject/SimSwap",
      currentVersion:"v2.1.0",
      releaseTag:"r3.2",
      status:"Stable",
      releaseDate:"2025-09-17",
      changelog:"公开发布版本，含 sim-swap 2.1.0 和 sim-swap-subscriptions 0.3.0",
      sourceUrl:"https://github.com/camaraproject/SimSwap/releases"
    },
    {
      api:"Quality on Demand",
      repo:"camaraproject/QualityOnDemand",
      currentVersion:"v1.1.0",
      releaseTag:"r3.2",
      status:"Stable",
      releaseDate:"2025",
      changelog:"quality-on-demand v1.1.0 + qos-profiles v1.1.0 + qos-provisioning v0.3.0，向后兼容 v1.0.0",
      sourceUrl:"https://github.com/camaraproject/QualityOnDemand/releases"
    },
    {
      api:"Quality on Demand (RC)",
      repo:"camaraproject/QualityOnDemand",
      currentVersion:"v1.2.0-rc.3",
      releaseTag:"r4.1",
      status:"Release Candidate",
      releaseDate:"2026",
      changelog:"对齐 Commonalities r4.3 (0.8.0) 和 ICM r4.2 (0.5.0)",
      sourceUrl:"https://github.com/camaraproject/QualityOnDemand/releases"
    },
    {
      api:"Number Verification (RC)",
      repo:"camaraproject/NumberVerification",
      currentVersion:"v2.1.0-rc.1",
      releaseTag:"r3.1",
      status:"Release Candidate",
      releaseDate:"2025-07-18",
      changelog:"首个发布候选版本，基于 Commonalities v0.6.0-rc.1",
      sourceUrl:"https://github.com/camaraproject/NumberVerification/releases"
    },
    {
      api:"SIM Swap (RC)",
      repo:"camaraproject/SimSwap",
      currentVersion:"v2.1.0-rc.2",
      releaseTag:"r3.1",
      status:"Release Candidate",
      releaseDate:"2025-07-18",
      changelog:"发布候选版本，含 sim-swap 2.1.0-rc.2 和 subscriptions 0.3.0-rc.1",
      sourceUrl:"https://github.com/camaraproject/SimSwap/releases"
    },
    {
      api:"Commonalities",
      repo:"camaraproject/Commonalities",
      currentVersion:"v0.6.0",
      releaseTag:"r3.3",
      status:"Stable",
      releaseDate:"2025",
      changelog:"API 设计指南和公共工件基础规范",
      sourceUrl:"https://github.com/camaraproject/Commonalities"
    },
    {
      api:"Identity & Consent Management",
      repo:"camaraproject/IdentityAndConsentManagement",
      currentVersion:"v0.4.0",
      releaseTag:"r3.3",
      status:"Stable",
      releaseDate:"2025",
      changelog:"安全互操作性和用户同意管理规范",
      sourceUrl:"https://github.com/camaraproject/IdentityAndConsentManagement"
    }
  ],
  // M8: 合规认证
  complianceData:[
    {
      operator:"Telefónica",
      certification:"GDPR",
      status:"已认证",
      scope:"全集团数据保护管理体系，含 Open Gateway API Privacy by Design",
      certifyingBody:"西班牙数据保护局 (AEPD)",
      date:"持续合规",
      sourceUrl:"https://www.telefonica.com/en/communication-room/reports/data-privacy-at-telefonica-innovation-and-digital-transparency"
    },
    {
      operator:"Telefónica Germany (O2)",
      certification:"ISO/IEC 27001",
      status:"已认证",
      scope:"信息安全管理体系 (ISMS)，网络服务安全",
      certifyingBody:"TISAX / ISO 认证机构",
      date:"2025",
      sourceUrl:"https://reporting.telefonica.de/o2/sustainability/2025"
    },
    {
      operator:"Telefónica Germany (O2)",
      certification:"GDPR",
      status:"已认证",
      scope:"全集团数据保护管理体系 (DSMS)，含 SOC 安全运营中心",
      certifyingBody:"德国数据保护监管机构",
      date:"2025",
      sourceUrl:"https://reporting.telefonica.de/o2/sustainability/2025"
    },
    {
      operator:"PTCL / Ufone",
      certification:"PCI DSS v4.0.1",
      status:"已认证",
      scope:"云基础设施和持卡人数据环境",
      certifyingBody:"Risk Associates (PCI QSA)",
      date:"2026-04-27",
      sourceUrl:"https://nextgenerationpakistan.com?p=24320/"
    },
    {
      operator:"Telefónica",
      certification:"Binding Corporate Rules (BCR)",
      status:"已批准",
      scope:"跨国个人数据传输保护，覆盖 Telefónica 集团全球业务",
      certifyingBody:"西班牙数据保护局 (AEPD)",
      date:"持续合规",
      sourceUrl:"https://www.telefonica.com/en/communication-room/reports/data-privacy-at-telefonica-innovation-and-digital-transparency"
    },
    {
      operator:"Telefónica Germany (O2)",
      certification:"ISO 9001 / ISO 14001 / ISO 50001",
      status:"已认证",
      scope:"质量管理 / 环境管理 / 能源管理",
      certifyingBody:"TÜV 等认证机构",
      date:"2025",
      sourceUrl:"https://reporting.telefonica.de/o2/sustainability/2025"
    },
    {
      operator:"是方电讯 (CHIEF Telecom)",
      certification:"PCI DSS",
      status:"已认证",
      scope:"数据中心基础设施与安全管理",
      certifyingBody:"PCI SSC 授权 QSA",
      date:"2026-04-27",
      sourceUrl:"https://www.chief.com.tw/announce/news/20260427news"
    }
  ],
  _end: true
};