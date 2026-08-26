// GSMA Open Gateway 情报站 - 主应用逻辑
var D = APP_DATA;
var editMode = false;

function toast(msg) {
  var t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function() { t.classList.remove('show'); }, 2500);
}

function esc(s) {
  if (!s) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('show');
}

function renderHero() {
  document.getElementById('dataVersion').textContent = D.meta.version;
  document.getElementById('newsCount').textContent = D.meta.newsCount + ' 条';
  document.getElementById('operatorCount').textContent = D.meta.operatorCount + ' 家';
  document.getElementById('apiCount').textContent = D.meta.apiCount + ' 个';
  document.getElementById('lastUpdate').textContent = D.meta.lastUpdate;
  var fv = document.getElementById('footerVersion');
  var fu = document.getElementById('footerUpdate');
  if (fv) fv.textContent = D.meta.version;
  if (fu) fu.textContent = D.meta.lastUpdate;
}

// M1: 新闻
var newsFilter = { cat:'', vendor:'', region:'', kw:'' };

function renderNews() {
  var list = D.news.filter(function(n) {
    if (newsFilter.cat && n.cat !== newsFilter.cat) return false;
    if (newsFilter.vendor && n.vendor !== newsFilter.vendor) return false;
    if (newsFilter.region && n.region !== newsFilter.region) return false;
    if (newsFilter.kw && n.title.indexOf(newsFilter.kw) < 0) return false;
    return true;
  });
  var html = list.map(function(n) {
    return '<div class="news-item"><span class="date">' + n.date + '</span>' +
      '<span class="cat ' + n.cat + '">' + n.catName + '</span>' +
      '<div class="body"><div class="title"><a href="' + n.url + '" target="_blank">' + esc(n.title) + '</a></div>' +
      '<div class="source">' + n.vendor + ' · ' + n.source + '</div></div>' +
      '<span class="region">' + n.region + '</span></div>';
  }).join('');
  document.getElementById('newsList').innerHTML = html || '<div style="text-align:center;color:var(--tx3);padding:20px">暂无匹配动态</div>';
  document.getElementById('newsCountDisplay').textContent = list.length;
}

function initNewsFilters() {
  var cats = [''].concat(D.news.map(function(n){return n.cat}).filter(function(v,i,a){return a.indexOf(v)===i}));
  document.getElementById('filterCat').innerHTML = cats.map(function(c) {
    return '<option value="' + c + '">' + (c || '全部分类') + '</option>';
  }).join('');
  var vendors = [''].concat(D.news.map(function(n){return n.vendor}).filter(function(v,i,a){return a.indexOf(v)===i}));
  document.getElementById('filterVendor').innerHTML = vendors.map(function(v) {
    return '<option value="' + v + '">' + (v || '全部运营商') + '</option>';
  }).join('');
  var regions = [''].concat(D.news.map(function(n){return n.region}).filter(function(v,i,a){return a.indexOf(v)===i}));
  document.getElementById('filterRegion').innerHTML = regions.map(function(r) {
    return '<option value="' + r + '">' + (r || '全部区域') + '</option>';
  }).join('');
}

// ===== M2: 运营商综合能力排名 =====
function renderRanking() {
  var sorted = D.operators.slice().sort(function(a, b) { return b.score - a.score; });
  var html = sorted.map(function(op, i) {
    var rank = i + 1;
    var numClass = rank === 1 ? 'r1' : rank === 2 ? 'r2' : rank === 3 ? 'r3' : 'rx';
    var pct = (op.score / 10) * 100;
    return '<div class="rank-item">' +
      '<div class="rank-num ' + numClass + '">' + rank + '</div>' +
      '<div class="rank-name">' + esc(op.name) + '</div>' +
      '<span style="font-size:11px;color:var(--tx3);min-width:80px">' + esc(op.country) + ' · ' + esc(op.type) + '</span>' +
      '<div class="rank-bar"><div class="rank-bar-fill" style="width:' + pct + '%"></div></div>' +
      '<div class="rank-score">' + op.score.toFixed(1) + '</div>' +
      '</div>';
  }).join('');
  document.getElementById('rankList').innerHTML = html;
}

// ===== M2: 分项能力排名 =====
function renderDimRanking(dimIdx) {
  var sorted = D.operators.slice().sort(function(a, b) {
    return b.dims[dimIdx] - a.dims[dimIdx];
  });
  var html = sorted.map(function(op, i) {
    var rank = i + 1;
    var numClass = rank === 1 ? 'r1' : rank === 2 ? 'r2' : rank === 3 ? 'r3' : 'rx';
    var score = op.dims[dimIdx];
    var pct = (score / 5) * 100;
    return '<div class="rank-item">' +
      '<div class="rank-num ' + numClass + '">' + rank + '</div>' +
      '<div class="rank-name">' + esc(op.name) + '</div>' +
      '<span style="font-size:11px;color:var(--tx3);min-width:80px">' + esc(op.country) + '</span>' +
      '<div class="rank-bar"><div class="rank-bar-fill" style="width:' + pct + '%"></div></div>' +
      '<div class="rank-score">' + score + '/5</div>' +
      '</div>';
  }).join('');
  document.getElementById('dimRankList').innerHTML = html;
}

// ===== M2: 能力热力矩阵 =====
function renderHeatmap() {
  var ops = D.operators;
  var caps = D.capabilities;
  var matrix = D.heatmap;
  var html = '<div class="tbl-wrap"><table class="heat-table"><thead><tr><th>运营商</th>';
  caps.forEach(function(c) {
    html += '<th title="' + esc(c) + '">' + esc(c) + '</th>';
  });
  html += '</tr></thead><tbody>';
  ops.forEach(function(op, i) {
    html += '<tr><th>' + esc(op.name) + '</th>';
    if (matrix[i]) {
      matrix[i].forEach(function(val) {
        var cls = val === 2 ? 'heat-2' : val === 1 ? 'heat-1' : 'heat-0';
        var sym = val === 2 ? '●' : val === 1 ? '◐' : '○';
        html += '<td class="' + cls + '">' + sym + '</td>';
      });
    }
    html += '</tr>';
  });
  html += '</tbody></table></div>';
  document.getElementById('heatmapContainer').innerHTML = html;
}

// ===== M2: CAMARA API 清单（含版本和标准进展） =====
function renderCamaraAPIs() {
  var html = '<div style="margin-bottom:10px;padding:8px 14px;background:rgba(13,115,119,.05);border:1px solid rgba(13,115,119,.1);border-radius:var(--radius-sm);font-size:12px;color:var(--tx2)">' +
    '<strong style="color:var(--accent)">版本说明:</strong> Stable = 正式发布可商用 · Release Candidate (RC) = 候选版测试中 · Beta = 早期测试 · ' +
    '<a href="https://github.com/camaraproject/Commonalities" target="_blank" style="font-size:12px">Commonalities</a> 和 ' +
    '<a href="https://github.com/camaraproject/IdentityAndConsentManagement" target="_blank" style="font-size:12px">ICM</a> 是所有 API 必须遵循的基础设计规范和安全框架' +
    '</div>';
  html += '<div class="tbl-wrap"><table><thead><tr>' +
    '<th>API 名称</th><th>当前版本</th><th>发布标签</th><th>状态</th><th>说明</th><th>分类</th><th>商用市场</th><th>GitHub</th>' +
    '</tr></thead><tbody>';
  D.camaraAPIs.forEach(function(api) {
    var statusClass = api.status === 'Stable' ? 'green-cell' : 'yellow-cell';
    var statusText = api.status;
    if (api.version && api.version.indexOf('rc') >= 0) {
      statusClass = 'yellow-cell';
      statusText = 'RC';
    }
    html += '<tr>' +
      '<td style="font-weight:600">' + esc(api.name) + '</td>' +
      '<td class="c" style="font-weight:600;color:var(--accent2)">' + esc(api.version || '-') + '</td>' +
      '<td class="c">' + esc(api.releaseTag || '-') + '</td>' +
      '<td class="' + statusClass + '">' + esc(statusText) + '</td>' +
      '<td style="white-space:normal;max-width:200px">' + esc(api.desc) + '</td>' +
      '<td>' + esc(api.category) + '</td>' +
      '<td class="c">' + api.launchMarkets + '</td>' +
      '<td><a href="' + esc(api.camaraUrl || '#') + '" target="_blank" style="font-size:12px">Releases</a></td>' +
      '</tr>';
  });
  // 添加基础规范行
  html += '<tr style="background:rgba(109,40,217,.03)"><td colspan="8" style="font-size:11px;color:var(--tx3);font-style:italic">基础规范: Commonalities v0.6.0 (r3.3) — API 设计指南 | Identity & Consent Management v0.4.0 (r3.3) — 认证授权与隐私框架 — 以上两个规范非 API，是所有 CAMARA API 必须遵循的基础规则</td></tr>';
  html += '</tbody></table></div>';
  document.getElementById('camaraApiList').innerHTML = html;
}

// ===== M2: 渠道合作伙伴 =====
function renderChannelPartners() {
  var html = '<div class="tbl-wrap"><table><thead><tr>' +
    '<th>合作伙伴</th><th>类型</th><th>支持 API</th><th>开发者门户</th>' +
    '</tr></thead><tbody>';
  D.channelPartners.forEach(function(p) {
    html += '<tr>' +
      '<td style="font-weight:600' + (p.name === 'CITIC Telecom' ? ';color:var(--accent2)' : '') + '">' + esc(p.name) + (p.name === 'CITIC Telecom' ? ' ★' : '') + '</td>' +
      '<td>' + esc(p.type) + '</td>' +
      '<td style="white-space:normal">' + esc(p.apis) + '</td>' +
      '<td><a href="' + esc(p.devPortal || '#') + '" target="_blank" style="font-size:12px">访问门户</a></td>' +
      '</tr>';
  });
  html += '</tbody></table></div>';
  document.getElementById('channelPartners').innerHTML = html;
}

// ===== M2: 雷达图 =====
function generateRadarSVG(name, values, labels) {
  var cx = 150, cy = 150, r = 110;
  var n = labels.length;
  var colors = ['#1a73e8', '#00897b', '#7b1fa2', '#d93025', '#f9ab00', '#1e8e3e'];
  var colorIdx = 0;
  for (var i = 0; i < D.radarData.length; i++) {
    if (D.radarData[i].name === name) { colorIdx = i; break; }
  }
  var color = colors[colorIdx % colors.length];

  // 计算顶点角度
  var angles = [];
  for (i = 0; i < n; i++) {
    angles.push(-Math.PI / 2 + (i * 2 * Math.PI) / n);
  }

  // 背景网格(5层)
  var gridSvg = '';
  for (var g = 1; g <= 5; g++) {
    var gr = (r * g) / 5;
    var pts = [];
    for (i = 0; i < n; i++) {
      pts.push((cx + gr * Math.cos(angles[i])).toFixed(1) + ',' + (cy + gr * Math.sin(angles[i])).toFixed(1));
    }
    gridSvg += '<polygon points="' + pts.join(' ') + '" fill="none" stroke="#dadce0" stroke-width="0.5" opacity="0.6"/>';
  }

  // 轴线
  var axisSvg = '';
  for (i = 0; i < n; i++) {
    var x2 = cx + r * Math.cos(angles[i]);
    var y2 = cy + r * Math.sin(angles[i]);
    axisSvg += '<line x1="' + cx + '" y1="' + cy + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke="#dadce0" stroke-width="0.5"/>';
  }

  // 标签
  var labelSvg = '';
  for (i = 0; i < n; i++) {
    var lx = cx + (r + 20) * Math.cos(angles[i]);
    var ly = cy + (r + 20) * Math.sin(angles[i]);
    labelSvg += '<text x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) + '" text-anchor="middle" dominant-baseline="middle" font-size="10" fill="#5f6368">' + esc(labels[i]) + '</text>';
  }

  // 数据多边形
  var dataPts = [];
  for (i = 0; i < n; i++) {
    var val = values[i] || 0;
    var dr = (r * val) / 5;
    dataPts.push((cx + dr * Math.cos(angles[i])).toFixed(1) + ',' + (cy + dr * Math.sin(angles[i])).toFixed(1));
  }
  var dataPoly = '<polygon points="' + dataPts.join(' ') + '" fill="' + color + '" fill-opacity="0.15" stroke="' + color + '" stroke-width="2"/>';

  // 数据点
  var dotsSvg = '';
  for (i = 0; i < n; i++) {
    var val2 = values[i] || 0;
    var dr2 = (r * val2) / 5;
    var dx = cx + dr2 * Math.cos(angles[i]);
    var dy = cy + dr2 * Math.sin(angles[i]);
    dotsSvg += '<circle cx="' + dx.toFixed(1) + '" cy="' + dy.toFixed(1) + '" r="3" fill="' + color + '"/>';
  }

  return '<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">' +
    gridSvg + axisSvg + labelSvg + dataPoly + dotsSvg +
    '</svg>';
}

function renderRadar() {
  var html = D.radarData.map(function(item) {
    return '<div class="radar-box">' +
      generateRadarSVG(item.name, item.values, D.radarDims) +
      '<div class="name">' + esc(item.name) + '</div>' +
      '</div>';
  }).join('');
  document.getElementById('radarContainer').innerHTML = html;
}

// ===== M3: 市场数据 =====
function renderMarketData() {
  var md = D.marketData;
  var html = '';

  // 全球统计
  html += '<div class="card-title">全球统计概览</div>';
  html += '<div class="diff-grid" style="margin-bottom:20px">';
  md.globalStats.forEach(function(s) {
    html += '<div class="diff-card">' +
      '<div class="dc-name">' + esc(s.metric) + '</div>' +
      '<div class="dc-desc"><span style="font-size:18px;font-weight:700;color:var(--accent)">' + esc(s.value) + '</span> ' + esc(s.unit) + '</div>' +
      '<div class="dc-desc" style="margin-top:4px">' + esc(s.note) + '</div>' +
      '</div>';
  });
  html += '</div>';

  // 市场预测
  html += '<div class="card-title">市场预测</div>';
  html += '<div class="tbl-wrap" style="margin-bottom:20px"><table><thead><tr>' +
    '<th>来源</th><th>指标</th><th>规模</th><th>时间范围</th>' +
    '</tr></thead><tbody>';
  md.marketForecast.forEach(function(f) {
    html += '<tr>' +
      '<td style="font-weight:600">' + esc(f.source) + '</td>' +
      '<td>' + esc(f.metric) + '</td>' +
      '<td class="c" style="font-weight:700;color:var(--accent2)">' + esc(f.value) + ' ' + esc(f.unit) + '</td>' +
      '<td>' + esc(f.horizon) + '</td>' +
      '</tr>';
  });
  html += '</tbody></table></div>';

  // 区域进展
  html += '<div class="card-title">区域进展</div>';
  html += '<div class="tbl-wrap"><table><thead><tr>' +
    '<th>区域</th><th>主要运营商</th><th>核心 API</th><th>备注</th>' +
    '</tr></thead><tbody>';
  md.regionalProgress.forEach(function(r) {
    html += '<tr>' +
      '<td style="font-weight:600">' + esc(r.region) + '</td>' +
      '<td style="white-space:normal">' + esc(r.operators) + '</td>' +
      '<td style="white-space:normal">' + esc(r.apis) + '</td>' +
      '<td style="white-space:normal">' + esc(r.note) + '</td>' +
      '</tr>';
  });
  html += '</tbody></table></div>';

  document.getElementById('marketData').innerHTML = html;
}

// ===== M3: 差异化能力矩阵 =====
function renderDiff() {
  var html = '<div class="diff-grid">';
  D.diffMatrix.forEach(function(d) {
    var vendorTags = (d.vendors || []).map(function(v) {
      return '<span style="font-size:11px;background:var(--bg3);border:1px solid var(--bd2);padding:2px 8px;border-radius:4px;color:var(--tx2);margin-top:4px;display:inline-block;margin-right:4px">' + esc(v) + '</span>';
    }).join('');
    html += '<div class="diff-card">' +
      '<div class="dc-name">' + esc(d.name) + '</div>' +
      '<div class="dc-desc">' + esc(d.desc) + '</div>' +
      '<div style="margin-top:6px">' + vendorTags + '</div>' +
      '</div>';
  });
  html += '</div>';
  document.getElementById('diffContainer').innerHTML = html;
}

// ===== M3: API 调用量排行 =====
function renderApiCallVolume() {
  var html = '<div class="tbl-wrap"><table><thead><tr>' +
    '<th>运营商/企业</th><th>API</th><th>调用量</th><th>统计周期</th><th>来源</th>' +
    '</tr></thead><tbody>';
  D.apiCallVolume.forEach(function(v) {
    html += '<tr>' +
      '<td style="font-weight:600">' + esc(v.operator) + '</td>' +
      '<td>' + esc(v.api) + '</td>' +
      '<td class="c" style="font-weight:700;color:var(--accent2)">' + esc(v.calls) + ' ' + esc(v.unit) + '</td>' +
      '<td>' + esc(v.period) + '</td>' +
      '<td><a href="' + esc(v.sourceUrl) + '" target="_blank" style="font-size:12px">' + esc(v.source) + '</a></td>' +
      '</tr>';
  });
  html += '</tbody></table></div>';
  var el = document.getElementById('apiCallVolumeContainer');
  if (el) el.innerHTML = html;
}

// ===== M3: 营收数据 =====
function renderRevenueData() {
  var html = '<div class="tbl-wrap"><table><thead><tr>' +
    '<th>来源/运营商</th><th>营收规模</th><th>币种</th><th>时间范围</th><th>说明</th><th>来源</th>' +
    '</tr></thead><tbody>';
  D.revenueData.forEach(function(r) {
    html += '<tr>' +
      '<td style="font-weight:600">' + esc(r.operator) + '</td>' +
      '<td class="c" style="font-weight:700;color:var(--accent);font-size:15px">' + esc(r.revenue) + '</td>' +
      '<td class="c">' + esc(r.currency) + '</td>' +
      '<td>' + esc(r.period) + '</td>' +
      '<td style="white-space:normal;max-width:250px">' + esc(r.note) + '</td>' +
      '<td><a href="' + esc(r.sourceUrl) + '" target="_blank" style="font-size:12px">' + esc(r.source) + '</a></td>' +
      '</tr>';
  });
  html += '</tbody></table></div>';
  var el = document.getElementById('revenueDataContainer');
  if (el) el.innerHTML = html;
}

// ===== M3: 覆盖率趋势 =====
function renderCoverageTrends() {
  var html = '<div class="coverage-trend-list">';
  D.coverageTrends.forEach(function(t, i) {
    var isLatest = i === D.coverageTrends.length - 1;
    html += '<div class="trend-item' + (isLatest ? ' latest' : '') + '">' +
      '<div class="trend-dot' + (isLatest ? ' latest' : '') + '"></div>' +
      '<div class="trend-content">' +
        '<div class="trend-period">' + esc(t.period) + (isLatest ? ' <span class="trend-badge">最新</span>' : '') + '</div>' +
        '<div class="trend-stats">' +
          '<span class="trend-stat"><strong>' + esc(t.operators) + '</strong> 运营商</span>' +
          '<span class="trend-sep">·</span>' +
          '<span class="trend-stat"><strong>' + esc(t.markets) + '</strong> 市场</span>' +
          '<span class="trend-sep">·</span>' +
          '<span class="trend-stat"><strong>' + esc(t.apis) + '</strong> 个 API</span>' +
        '</div>' +
        '<div class="trend-note">' + esc(t.note) + '</div>' +
        '<div class="trend-source">' + esc(t.source) + '</div>' +
      '</div>' +
    '</div>';
  });
  html += '</div>';
  var el = document.getElementById('coverageTrendsContainer');
  if (el) el.innerHTML = html;
}

// ===== M4: 计费模式 =====
function renderBilling() {
  var html = '<div class="tbl-wrap"><table><thead><tr>' +
    '<th>计费模式</th><th>代表合作伙伴</th><th>说明</th>' +
    '</tr></thead><tbody>';
  D.billingModels.forEach(function(b) {
    html += '<tr>' +
      '<td style="font-weight:600;color:var(--accent)">' + esc(b.model) + '</td>' +
      '<td style="white-space:normal">' + esc(b.vendors) + '</td>' +
      '<td style="white-space:normal;max-width:400px">' + esc(b.desc) + '</td>' +
      '</tr>';
  });
  html += '</tbody></table></div>';
  document.getElementById('billingModels').innerHTML = html;
}

// ===== M5: 架构图 =====
function renderArchitecture() {
  var html = '';
  if (D.architectureSource) {
    html += '<div style="margin-bottom:14px;padding:10px 14px;background:rgba(13,115,119,.05);border:1px solid rgba(13,115,119,.12);border-radius:var(--radius-sm);font-size:12px;color:var(--tx2)"><strong style="color:var(--accent)">架构来源:</strong> ' + esc(D.architectureSource) + '</div>';
  }
  html += '<div class="arch-stack">';
  D.architecture.forEach(function(a, i) {
    var vendorTags = (a.vendors || []).map(function(v) {
      return '<span class="vendor-tag' + (v.indexOf('CITIC') >= 0 ? ' citic' : '') + '">' + esc(v) + '</span>';
    }).join('');
    html += '<div class="arch-layer">' +
      '<div class="layer-num">' + (i + 1) + '</div>' +
      '<div class="layer-content">' +
      '<div class="layer-name">' + esc(a.layer) + '</div>' +
      '<div class="layer-desc">' + esc(a.desc) + '</div>' +
      '<div class="layer-vendors" style="margin-top:6px">' + vendorTags + '</div>' +
      '</div></div>';
  });
  html += '</div>';
  document.getElementById('archContainer').innerHTML = html;
}

// ===== M1: 信源库 =====
function renderSources() {
  var html = '<div style="display:flex;gap:8px;flex-wrap:wrap">';
  D.newsSources.forEach(function(s) {
    html += '<span style="font-size:12px;background:var(--bg3);border:1px solid var(--bd2);padding:5px 12px;border-radius:4px;color:var(--tx2)">' + esc(s) + '</span>';
  });
  html += '</div>';
  document.getElementById('sourcesList').innerHTML = html;
}

// ===== 数据来源与更新时间 =====
function renderDataSources() {
  var ds = D.meta.dataSources || {};
  var html = '<div class="data-source-section">';
  html += '<h3>数据来源与可追溯链接</h3>';
  html += '<div class="data-source-list">';
  Object.keys(ds).forEach(function(key) {
    var src = ds[key];
    html += '<div class="data-source-item">' +
      '<span class="src-name">' + esc(src.name) + '</span>' +
      '<a class="src-url" href="' + esc(src.url) + '" target="_blank">' + esc(src.url) + '</a>' +
      '</div>';
  });
  html += '</div>';
  html += '<div style="margin-top:12px;padding-top:10px;border-top:1px solid var(--bd);font-size:12px;color:var(--tx2);line-height:1.8">';
  html += '<strong style="color:var(--accent)">更新机制说明</strong><br>';
  html += '· <strong>更新方式:</strong> 每日 10:00 (UTC+8) 自动抓取 GSMA 官网、CAMARA GitHub Releases 等公开数据源<br>';
  html += '· <strong>自动部署:</strong> 抓取脚本检测到新数据后自动提交并触发页面重新部署<br>';
  html += '· <strong>数据来源:</strong> GSMA 官网、CAMARA/Linux Foundation、运营商财报/公告、监管机构官网等一手信源<br>';
  html += '· <strong>历史新闻:</strong> 所有历史动态均保留，新增动态追加到列表顶部，不做删除<br>';
  html += '· <strong>版本管理:</strong> Git 提交记录可追溯每次数据变更，支持历史对比与回溯<br>';
  html += '· <strong>数据质量:</strong> 所有数据均标注来源链接，可点击追溯原始出处<br>';
  html += '· <strong>更新范围:</strong> 行业动态、运营商信息、CAMARA API 清单、市场数据、商用案例、监管政策、合规认证';
  html += '</div>';
  html += '<div style="margin-top:10px;font-size:11px;color:var(--accent);font-weight:500">' +
    '最后更新: ' + esc(D.meta.lastUpdate) + ' · 更新计划: ' + esc(D.meta.updateSchedule) +
    ' · 数据版本: ' + esc(D.meta.version) + '</div>';
  html += '</div>';
  var container = document.getElementById('dataSourcesSection');
  if (container) container.innerHTML = html;
}

// ===== M6: 商用案例 =====
function renderCommercialCases() {
  var html = '<div class="case-grid">';
  D.commercialCases.forEach(function(c) {
    var apiTags = (c.apis || []).map(function(a) {
      return '<span class="case-api-tag">' + esc(a) + '</span>';
    }).join('');
    var typeClass = c.type === '商用' ? 'case-type-commercial' : 'case-type-trial';
    html += '<div class="case-card">' +
      '<div class="case-header">' +
        '<div class="case-company">' + esc(c.company) + '</div>' +
        '<span class="case-type ' + typeClass + '">' + esc(c.type) + '</span>' +
      '</div>' +
      '<div class="case-meta">' +
        '<span class="case-region">' + esc(c.country) + ' · ' + esc(c.industry) + '</span>' +
        '<span class="case-date">' + esc(c.date) + '</span>' +
      '</div>' +
      '<div class="case-apis">' + apiTags + '</div>' +
      '<div class="case-section"><span class="case-label">痛点</span><span class="case-text">' + esc(c.painPoint) + '</span></div>' +
      '<div class="case-section"><span class="case-label">方案</span><span class="case-text">' + esc(c.solution) + '</span></div>' +
      '<div class="case-section"><span class="case-label">成效</span><span class="case-text case-result">' + esc(c.results) + '</span></div>' +
      '<div class="case-source"><a href="' + esc(c.sourceUrl) + '" target="_blank">' + esc(c.source) + '</a></div>' +
      '</div>';
  });
  html += '</div>';
  var container = document.getElementById('commercialCases');
  if (container) container.innerHTML = html;
}

// ===== M6: 应用场景 =====
function renderAppScenarios() {
  var iconMap = {
    bank: '&#127974;', cart: '&#128722;', truck: '&#128666;',
    game: '&#127918;', iot: '&#128248;', shield: '&#128737;'
  };
  var html = '<div class="scenario-grid">';
  D.appScenarios.forEach(function(s) {
    var icon = iconMap[s.icon] || '&#128204;';
    html += '<div class="scenario-card">' +
      '<div class="scenario-header">' +
        '<span class="scenario-icon">' + icon + '</span>' +
        '<span class="scenario-industry">' + esc(s.industry) + '</span>' +
      '</div>';
    if (s.sourceUrl) {
      html += '<div class="scenario-source"><a href="' + esc(s.sourceUrl) + '" target="_blank">来源: ' + esc(s.sourceName || '点击查看') + '</a></div>';
    }
    html += '<div class="scenario-list">';
    (s.scenarios || []).forEach(function(sc) {
      var apiTags = (sc.apis || []).map(function(a) {
        return '<span class="case-api-tag sm">' + esc(a) + '</span>';
      }).join('');
      html += '<div class="scenario-item">' +
        '<div class="scenario-name">' + esc(sc.scene) + '</div>' +
        '<div class="scenario-need">' + esc(sc.need) + '</div>' +
        '<div class="scenario-apis">' + apiTags + '</div>' +
        '<div class="scenario-desc">' + esc(sc.desc) + '</div>' +
        (sc.sourceUrl ? '<div class="scenario-item-source"><a href="' + esc(sc.sourceUrl) + '" target="_blank">参考来源</a></div>' : '') +
        '</div>';
    });
    html += '</div></div>';
  });
  html += '</div>';
  var container = document.getElementById('appScenarios');
  if (container) container.innerHTML = html;
}

// ===== M8: 监管动态 =====
function renderRegulatory() {
  var html = '<div class="reg-list">';
  D.regulatoryData.forEach(function(r) {
    html += '<div class="reg-card">' +
      '<div class="reg-header">' +
        '<span class="reg-regulator">' + esc(r.regulator) + '</span>' +
        '<span class="reg-country">' + esc(r.country) + '</span>' +
      '</div>' +
      '<div class="reg-policy">' + esc(r.policyName) + '</div>' +
      '<div class="reg-dates"><span>政策发布: ' + esc(r.date) + '</span>' + (r.newsDate ? '<span style="color:var(--accent2)">新闻: ' + esc(r.newsDate) + '</span>' : '') + '<span>生效: ' + esc(r.effectiveDate) + '</span></div>' +
      '<div class="reg-summary">' + esc(r.summary) + '</div>' +
      '<div class="reg-impact"><span class="reg-label">影响</span>' + esc(r.impact) + '</div>' +
      '<div class="reg-source"><a href="' + esc(r.sourceUrl) + '" target="_blank">' + esc(r.source) + '</a></div>' +
      '</div>';
  });
  html += '</div>';
  var el = document.getElementById('regulatoryContainer');
  if (el) el.innerHTML = html;
}

// ===== M8: CAMARA 标准进展 =====
function renderCamaraStandards() {
  var html = '<div class="tbl-wrap"><table><thead><tr>' +
    '<th>API 名称</th><th>当前版本</th><th>发布标签</th><th>状态</th><th>发布日期</th><th>更新说明</th><th>GitHub</th>' +
    '</tr></thead><tbody>';
  D.camaraStandards.forEach(function(s) {
    var statusClass = s.status === 'Stable' ? 'green-cell' : 'yellow-cell';
    html += '<tr>' +
      '<td style="font-weight:600">' + esc(s.api) + '</td>' +
      '<td class="c" style="font-weight:700;color:var(--accent)">' + esc(s.currentVersion) + '</td>' +
      '<td class="c">' + esc(s.releaseTag) + '</td>' +
      '<td class="' + statusClass + '">' + esc(s.status) + '</td>' +
      '<td>' + esc(s.releaseDate) + '</td>' +
      '<td style="white-space:normal;max-width:280px">' + esc(s.changelog) + '</td>' +
      '<td><a href="' + esc(s.sourceUrl) + '" target="_blank" style="font-size:12px">查看 Releases</a></td>' +
      '</tr>';
  });
  html += '</tbody></table></div>';
  var el = document.getElementById('camaraStandardsContainer');
  if (el) el.innerHTML = html;
}

// ===== M8: 合规认证 =====
function renderCompliance() {
  var html = '<div class="tbl-wrap"><table><thead><tr>' +
    '<th>运营商</th><th>认证类型</th><th>状态</th><th>认证范围</th><th>认证机构</th><th>日期</th><th>来源</th>' +
    '</tr></thead><tbody>';
  D.complianceData.forEach(function(c) {
    var statusClass = c.status === '已认证' || c.status === '已批准' ? 'green-cell' : 'yellow-cell';
    html += '<tr>' +
      '<td style="font-weight:600">' + esc(c.operator) + '</td>' +
      '<td style="font-weight:600;color:var(--accent)">' + esc(c.certification) + '</td>' +
      '<td class="' + statusClass + '">' + esc(c.status) + '</td>' +
      '<td style="white-space:normal;max-width:220px">' + esc(c.scope) + '</td>' +
      '<td>' + esc(c.certifyingBody) + '</td>' +
      '<td>' + esc(c.date) + '</td>' +
      '<td><a href="' + esc(c.sourceUrl) + '" target="_blank" style="font-size:12px">查看来源</a></td>' +
      '</tr>';
  });
  html += '</tbody></table></div>';
  var el = document.getElementById('complianceContainer');
  if (el) el.innerHTML = html;
}

// ===== 视图切换 =====
function switchView(tabGroup, viewId) {
  // 切换tab高亮
  var tabs = document.querySelectorAll('.view-tab[data-group="' + tabGroup + '"]');
  tabs.forEach(function(t) {
    t.classList.remove('active');
  });
  var activeTab = document.querySelector('.view-tab[data-group="' + tabGroup + '"][data-view="' + viewId + '"]');
  if (activeTab) activeTab.classList.add('active');

  // 切换内容
  var contents = document.querySelectorAll('.view-content[data-group="' + tabGroup + '"]');
  contents.forEach(function(c) {
    c.classList.remove('active');
  });
  var activeContent = document.querySelector('.view-content[data-group="' + tabGroup + '"][data-view="' + viewId + '"]');
  if (activeContent) activeContent.classList.add('active');

  // 如果是分项排名tab，渲染对应维度
  if (tabGroup === 'dim') {
    renderDimRanking(parseInt(viewId, 10));
  }
}

// ===== 导航高亮 =====
function initNav() {
  var navLinks = document.querySelectorAll('.topbar nav a');
  var modules = document.querySelectorAll('.module');
  window.addEventListener('scroll', function() {
    var scrollY = window.scrollY + 80;
    var currentId = '';
    modules.forEach(function(m) {
      if (m.offsetTop <= scrollY) {
        currentId = m.id;
      }
    });
    navLinks.forEach(function(link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentId) {
        link.classList.add('active');
      }
    });
  });
  // 点击平滑滚动
  navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var targetId = link.getAttribute('href').substring(1);
      var target = document.getElementById(targetId);
      if (target) {
        window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
      }
    });
  });
}

// ===== 编辑模式 =====
function toggleEdit() {
  editMode = !editMode;
  var btn = document.getElementById('editBtn');
  if (editMode) {
    btn.style.background = 'var(--accent)';
    btn.style.color = '#fff';
    btn.style.borderColor = 'var(--accent)';
    document.body.classList.add('edit-mode');
    toast('编辑模式已开启');
  } else {
    btn.style.background = '';
    btn.style.color = '';
    btn.style.borderColor = '';
    document.body.classList.remove('edit-mode');
    toast('编辑模式已关闭');
  }
}

// ===== 快照保存 =====
function saveSnapshot() {
  var key = 'og_snapshot_' + new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
  var snapshots = {};
  try {
    var raw = localStorage.getItem('og_snapshots');
    if (raw) snapshots = JSON.parse(raw);
  } catch(e) {}
  snapshots[key] = {
    time: new Date().toLocaleString('zh-CN'),
    data: JSON.parse(JSON.stringify(D))
  };
  try {
    localStorage.setItem('og_snapshots', JSON.stringify(snapshots));
    toast('快照已保存: ' + new Date().toLocaleString('zh-CN'));
  } catch(e) {
    toast('保存失败: ' + e.message);
  }
}

// ===== 历史版本 =====
function showHistory() {
  var snapshots = {};
  try {
    var raw = localStorage.getItem('og_snapshots');
    if (raw) snapshots = JSON.parse(raw);
  } catch(e) {}
  var keys = Object.keys(snapshots).sort().reverse();
  if (keys.length === 0) {
    toast('暂无历史快照');
    return;
  }
  var html = '<span class="close-btn" onclick="closeModal()">&times;</span>';
  html += '<h3>历史版本 (' + keys.length + ')</h3>';
  html += '<div style="margin-top:10px">';
  keys.forEach(function(k) {
    html += '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px;border:1px solid var(--bd);border-radius:6px;margin-bottom:6px">' +
      '<span style="font-size:13px">' + snapshots[k].time + '</span>' +
      '<button class="btn-sm" onclick="restoreSnapshot(\'' + k + '\')">恢复</button>' +
      '</div>';
  });
  html += '</div>';
  document.getElementById('modalContent').innerHTML = html;
  document.getElementById('modalOverlay').classList.add('show');
}

// ===== 恢复快照 =====
function restoreSnapshot(key) {
  var snapshots = {};
  try {
    var raw = localStorage.getItem('og_snapshots');
    if (raw) snapshots = JSON.parse(raw);
  } catch(e) {}
  if (snapshots[key]) {
    D = snapshots[key].data;
    APP_DATA = D;
    renderAll();
    closeModal();
    toast('已恢复到 ' + snapshots[key].time);
  } else {
    toast('快照不存在');
  }
}

// ===== 导出 JSON =====
function exportData() {
  var dataStr = JSON.stringify(D, null, 2);
  var blob = new Blob([dataStr], { type: 'application/json' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'open-gateway-data-' + new Date().toISOString().substring(0, 10) + '.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast('JSON 已导出');
}

// ===== 导入 JSON =====
function importData() {
  var html = '<span class="close-btn" onclick="closeModal()">&times;</span>';
  html += '<h3>导入 JSON 数据</h3>';
  html += '<div class="field"><label>选择 JSON 文件</label>';
  html += '<input type="file" id="importFile" accept=".json" style="width:100%"></div>';
  html += '<div style="margin-top:14px;text-align:right">';
  html += '<button class="btn-sm" onclick="closeModal()" style="margin-right:8px">取消</button>';
  html += '<button class="submit-btn" onclick="processImport()">导入</button>';
  html += '</div>';
  document.getElementById('modalContent').innerHTML = html;
  document.getElementById('modalOverlay').classList.add('show');
}

function processImport() {
  var fileInput = document.getElementById('importFile');
  if (!fileInput || !fileInput.files[0]) {
    toast('请选择文件');
    return;
  }
  var file = fileInput.files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    try {
      var data = JSON.parse(e.target.result);
      D = data;
      APP_DATA = data;
      renderAll();
      closeModal();
      toast('数据导入成功');
    } catch(err) {
      toast('导入失败: ' + err.message);
    }
  };
  reader.readAsText(file);
}

// ===== 新增新闻 =====
function addNews() {
  var cats = D.news.map(function(n){return n.cat}).filter(function(v,i,a){return a.indexOf(v)===i});
  var catNames = {};
  D.news.forEach(function(n) { catNames[n.cat] = n.catName; });
  var html = '<span class="close-btn" onclick="closeModal()">&times;</span>';
  html += '<h3>新增行业动态</h3>';
  html += '<div class="field"><label>日期</label><input type="date" id="newsDate" value="' + new Date().toISOString().substring(0,10) + '"></div>';
  html += '<div class="field"><label>分类</label><select id="newsCat">';
  cats.forEach(function(c) {
    html += '<option value="' + c + '">' + (catNames[c] || c) + '</option>';
  });
  html += '</select></div>';
  html += '<div class="field"><label>运营商/来源方</label><input type="text" id="newsVendor" placeholder="如: 中国电信"></div>';
  html += '<div class="field"><label>标题</label><input type="text" id="newsTitle" placeholder="动态标题"></div>';
  html += '<div class="field"><label>来源</label><input type="text" id="newsSource" placeholder="如: GSMA 官网"></div>';
  html += '<div class="field"><label>区域</label><input type="text" id="newsRegion" placeholder="如: 中国内地"></div>';
  html += '<div class="field"><label>链接</label><input type="text" id="newsUrl" placeholder="https://..."></div>';
  html += '<div style="margin-top:14px;text-align:right">';
  html += '<button class="btn-sm" onclick="closeModal()" style="margin-right:8px">取消</button>';
  html += '<button class="submit-btn" onclick="submitNews()">提交</button>';
  html += '</div>';
  document.getElementById('modalContent').innerHTML = html;
  document.getElementById('modalOverlay').classList.add('show');
}

function submitNews() {
  var date = document.getElementById('newsDate').value;
  var cat = document.getElementById('newsCat').value;
  var vendor = document.getElementById('newsVendor').value;
  var title = document.getElementById('newsTitle').value;
  var source = document.getElementById('newsSource').value;
  var region = document.getElementById('newsRegion').value;
  var url = document.getElementById('newsUrl').value;
  if (!title || !date) {
    toast('请填写标题和日期');
    return;
  }
  var catName = '';
  D.news.forEach(function(n) { if (n.cat === cat) catName = n.catName; });
  D.news.unshift({
    date: date, cat: cat, catName: catName || cat,
    vendor: vendor, title: title, source: source,
    region: region, url: url || '#'
  });
  D.meta.newsCount = D.news.length;
  initNewsFilters();
  renderNews();
  renderHero();
  closeModal();
  toast('动态已添加');
}

// ===== 下载 CSV =====
function downloadNewsExcel() {
  var csv = '\uFEFF日期,分类,运营商,标题,来源,区域,链接\n';
  D.news.forEach(function(n) {
    csv += [n.date, n.catName, n.vendor, '"' + n.title.replace(/"/g, '""') + '"',
            n.source, n.region, n.url].join(',') + '\n';
  });
  var blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'open-gateway-news-' + new Date().toISOString().substring(0,10) + '.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  toast('CSV 已下载');
}

// ===== 渲染全部 =====
function renderAll() {
  renderHero();
  renderNews();
  initNewsFilters();
  renderRanking();
  renderDimRanking(0);
  renderHeatmap();
  renderCamaraAPIs();
  renderChannelPartners();
  renderRadar();
  renderMarketData();
  renderDiff();
  renderApiCallVolume();
  renderRevenueData();
  renderCoverageTrends();
  renderBilling();
  renderArchitecture();
  renderCommercialCases();
  renderAppScenarios();
  renderSources();
  renderDataSources();
  renderRegulatory();
  renderCompliance();
}

// ===== 自动更新检测机制（无感自动同步） =====
var UPDATE_CHECK_INTERVAL = 24 * 60 * 60 * 1000; // 每日检查一次
var AUTO_RELOAD_ENABLED = true; // 无感自动刷新开关
var lastKnownVersion = '';
var updateCheckTimer = null;
var updateCheckCount = 0;

function initUpdateChecker() {
  lastKnownVersion = D.meta.version + '|' + D.meta.lastUpdate;
  updateCheckTimer = setInterval(checkForUpdates, UPDATE_CHECK_INTERVAL);
  // 页面可见时立即检查一次
  if (document.visibilityState === 'visible') {
    setTimeout(checkForUpdates, 5000);
  }
  // 页面从隐藏切回可见时检查
  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
      checkForUpdates();
    }
  });
}

function checkForUpdates() {
  // 通过 fetch data.js 并提取版本号来检测是否有新数据
  // 加时间戳防止缓存
  var url = 'data.js?_t=' + Date.now();
  fetch(url, { cache: 'no-cache' })
    .then(function(res) { return res.text(); })
    .then(function(text) {
      updateCheckCount++;
      // 从 data.js 中提取 version 和 lastUpdate
      var versionMatch = text.match(/version:\s*"([^"]+)"/);
      var updateMatch = text.match(/lastUpdate:\s*"([^"]+)"/);
      if (versionMatch && updateMatch) {
        var newVersion = versionMatch[1] + '|' + updateMatch[1];
        if (newVersion !== lastKnownVersion) {
          // 数据已变化，执行自动同步
          applyAutoUpdate(newVersion);
        }
      }
      // 更新同步状态指示器
      updateSyncStatus('synced');
    })
    .catch(function() {
      updateSyncStatus('error');
    });
}

function applyAutoUpdate(newVersion) {
  var parts = newVersion.split('|');
  var newVer = parts[0] || '';
  var newTime = parts[1] || '';

  if (AUTO_RELOAD_ENABLED) {
    // 无感自动刷新：直接重载页面获取最新数据
    // 在重载前通过 sessionStorage 标记，重载后显示"已更新"提示
    try {
      sessionStorage.setItem('og_auto_updated', JSON.stringify({
        version: newVer,
        time: newTime,
        reloadedAt: new Date().toISOString()
      }));
    } catch(e) {}
    window.location.reload();
  } else {
    // 手动模式：显示更新提示 banner
    showUpdateNotification(newVersion);
  }
}

function showUpdateNotification(newVersion) {
  var parts = newVersion.split('|');
  var newVer = parts[0] || '';
  var newTime = parts[1] || '';
  
  var html = '<div class="update-banner" id="updateBanner">' +
    '<div class="update-banner-content">' +
    '<div class="update-banner-icon">&#128640;</div>' +
    '<div class="update-banner-text">' +
    '<div class="update-banner-title">检测到数据更新</div>' +
    '<div class="update-banner-desc">新版本: ' + esc(newVer) + ' · 更新时间: ' + esc(newTime) + '</div>' +
    '</div>' +
    '<div class="update-banner-actions">' +
    '<button class="btn-sm update-btn" onclick="applyUpdate()">立即刷新</button>' +
    '<button class="btn-sm update-dismiss" onclick="dismissUpdate()">稍后</button>' +
    '</div>' +
    '</div></div>';
  
  // 移除旧的 banner
  var old = document.getElementById('updateBanner');
  if (old) old.remove();
  
  // 插入到 body 顶部
  document.body.insertAdjacentHTML('afterbegin', html);
}

function applyUpdate() {
  dismissUpdate();
  window.location.reload();
}

function dismissUpdate() {
  var banner = document.getElementById('updateBanner');
  if (banner) banner.remove();
}

// 检查是否是自动刷新后的页面，显示更新提示
function checkAutoUpdateNotice() {
  try {
    var info = sessionStorage.getItem('og_auto_updated');
    if (info) {
      var data = JSON.parse(info);
      sessionStorage.removeItem('og_auto_updated');
      // 显示短暂提示
      setTimeout(function() {
        toast('数据已自动更新至 ' + data.version + ' (' + data.time + ')');
      }, 800);
    }
  } catch(e) {}
}

// 同步状态指示器
function updateSyncStatus(status) {
  var indicator = document.getElementById('syncIndicator');
  if (!indicator) return;
  var dot = indicator.querySelector('.sync-dot');
  var text = indicator.querySelector('.sync-text');
  if (status === 'synced') {
    if (dot) { dot.className = 'sync-dot synced'; }
    if (text) { text.textContent = '已同步 · 检查 ' + updateCheckCount + ' 次'; }
  } else if (status === 'error') {
    if (dot) { dot.className = 'sync-dot error'; }
    if (text) { text.textContent = '同步异常'; }
  } else if (status === 'checking') {
    if (dot) { dot.className = 'sync-dot checking'; }
    if (text) { text.textContent = '检查中...'; }
  }
}

// ===== URL 分享与持久化 =====
function generateShareLink(expDays) {
  var now = Date.now();
  var expiresAt = now + (expDays * 24 * 60 * 60 * 1000);
  // 生成分享 token（base64 编码：过期时间戳 + 随机标识）
  var tokenData = {
    exp: expiresAt,
    created: now,
    days: expDays,
    ver: D.meta.version
  };
  var token = btoa(unescape(encodeURIComponent(JSON.stringify(tokenData))));
  // 构建 URL
  var baseUrl = window.location.origin + window.location.pathname;
  var shareUrl = baseUrl + '#share=' + token;
  return shareUrl;
}

function showShareDialog() {
  var html = '<span class="close-btn" onclick="closeModal()">&times;</span>';
  html += '<h3>生成分享链接</h3>';
  html += '<div style="margin-top:14px">';
  
  html += '<div class="field"><label>有效期设置</label>';
  html += '<select id="shareExpDays">';
  html += '<option value="7">7 天</option>';
  html += '<option value="30" selected>30 天</option>';
  html += '<option value="90">90 天</option>';
  html += '<option value="365">365 天</option>';
  html += '<option value="0">永久有效</option>';
  html += '</select></div>';
  
  html += '<div class="field"><label>分享链接</label>';
  html += '<input type="text" id="shareUrlInput" readonly style="width:100%;font-family:monospace;font-size:12px" placeholder="点击下方按钮生成">';
  html += '</div>';
  
  html += '<div style="margin-top:6px;padding:10px;background:var(--bg);border:1px solid var(--bd);border-radius:var(--radius-sm);font-size:12px;color:var(--tx2);line-height:1.7">';
  html += '<strong style="color:var(--accent)">链接说明</strong><br>';
  html += '· 分享链接可通过 URL 直接访问，无需登录<br>';
  html += '· 链接过期后自动跳转提示页，可重新生成<br>';
  html += '· 数据更新后所有已分享链接自动同步最新内容<br>';
  html += '· 选择「永久有效」则不会过期';
  html += '</div>';
  
  html += '<div style="margin-top:14px;text-align:right">';
  html += '<button class="btn-sm" onclick="closeModal()" style="margin-right:8px">取消</button>';
  html += '<button class="submit-btn" onclick="generateAndShowShare()">生成链接</button>';
  html += '</div>';
  html += '</div>';
  
  document.getElementById('modalContent').innerHTML = html;
  document.getElementById('modalOverlay').classList.add('show');
}

function generateAndShowShare() {
  var expDays = parseInt(document.getElementById('shareExpDays').value, 10);
  var shareUrl = generateShareLink(expDays);
  var input = document.getElementById('shareUrlInput');
  input.value = shareUrl;
  input.select();
  
  // 尝试复制到剪贴板
  try {
    document.execCommand('copy');
    toast('链接已生成并复制到剪贴板');
  } catch(e) {
    toast('链接已生成，请手动复制');
  }
  
  // 更新说明
  var expText = expDays === 0 ? '永久有效' : expDays + ' 天后过期';
  input.title = '有效期: ' + expText;
}

function checkLinkExpiration() {
  var hash = window.location.hash;
  if (hash.indexOf('#share=') === 0) {
    var token = hash.substring(7);
    try {
      var decoded = decodeURIComponent(escape(atob(token)));
      var data = JSON.parse(decoded);
      var now = Date.now();
      
      if (data.exp > 0 && now > data.exp) {
        // 链接已过期
        showExpiredLink(data);
        return false;
      }
      
      // 链接有效，显示分享信息
      var remaining = data.exp > 0 ? Math.ceil((data.exp - now) / (24 * 60 * 60 * 1000)) : -1;
      var remainText = remaining < 0 ? '永久有效' : remaining + ' 天后过期';
      setTimeout(function() {
        toast('分享链接有效 · ' + remainText);
      }, 1200);
      return true;
    } catch(e) {
      // token 无效，忽略
      return true;
    }
  }
  return true;
}

function showExpiredLink(data) {
  var expDate = new Date(data.exp);
  var html = '<div style="text-align:center;padding:40px 20px">';
  html += '<div style="font-size:48px;margin-bottom:16px">&#128337;</div>';
  html += '<h2 style="color:var(--tx);margin-bottom:8px">分享链接已过期</h2>';
  html += '<p style="color:var(--tx3);font-size:14px;margin-bottom:20px">';
  html += '此链接已于 ' + expDate.toLocaleDateString('zh-CN') + ' 过期<br>';
  html += '原分享版本: ' + esc(data.ver || '未知') + '</p>';
  html += '<button class="submit-btn" onclick="window.location.hash=\'\';window.location.reload()">返回首页</button>';
  html += '</div>';
  document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;min-height:100vh;background:var(--bg)">' + html + '</div>';
}

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', function() {
  // 检查分享链接是否过期
  if (!checkLinkExpiration()) return;
  
  renderAll();
  initNav();
  checkAutoUpdateNotice();

  // 筛选器事件
  document.getElementById('filterCat').addEventListener('change', function() {
    newsFilter.cat = this.value;
    renderNews();
  });
  document.getElementById('filterVendor').addEventListener('change', function() {
    newsFilter.vendor = this.value;
    renderNews();
  });
  document.getElementById('filterRegion').addEventListener('change', function() {
    newsFilter.region = this.value;
    renderNews();
  });
  document.getElementById('filterKw').addEventListener('input', function() {
    newsFilter.kw = this.value;
    renderNews();
  });

  // 分项排名tab事件
  var dimTabs = document.querySelectorAll('.view-tab[data-group="dim"]');
  dimTabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      switchView('dim', tab.getAttribute('data-view'));
    });
  });

  // 模态框点击外部关闭
  document.getElementById('modalOverlay').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });

  // 启动自动更新检测
  initUpdateChecker();
});
