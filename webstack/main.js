/* ===========================
   王五导航 · WebStack-Hugo主题 · main.js
   =========================== */

const WORKER_URL = 'https://ico.xmynscnq.dpdns.org';
const LINKS_FILE = '../links.json';

const DEFAULT_ICON = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOTk5IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiPjwvY2lyY2xlPjxwYXRoIGQ9Ik0yIDEyaDIwIj48L3BhdGg+PHBhdGggZD0iTTEyIDJhMTUuMyAxNS4zIDAgMCAxIDQgMTAgMTUuMyAxNS4zIDAgMCAxLTQgMTAgMTUuMyAxNS4zIDAgMCAxLTQtMTAgMTUuMyAxNS4zIDAgMCAxIDQtMTB6Ij48L3BhdGg+PC9zdmc+';

/* ── 搜索引擎数据（与原版一致） ── */
const SEARCH_CATEGORIES = [
  {
    id: 'engine', label: '引擎',
    engines: [
      { name: '百度',       url: 'https://www.baidu.com/s?wd=',           domain: 'baidu.com' },
      { name: 'Google',     url: 'https://www.google.com/search?q=',      domain: 'google.com' },
      { name: 'Brave',      url: 'https://search.brave.com/search?q=',    domain: 'search.brave.com' },
      { name: '搜狗',       url: 'https://www.sogou.com/web?query=',      domain: 'sogou.com' },
      { name: 'Bing',       url: 'https://www.bing.com/search?q=',        domain: 'bing.com' },
      { name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=',            domain: 'duckduckgo.com' },
      { name: '360',        url: 'https://www.so.com/s?q=',               domain: 'so.com' },
      { name: '夸克',       url: 'https://www.quark.cn/s?q=',             domain: 'quark.cn' },
    ]
  },
  {
    id: 'community', label: '社区',
    engines: [
      { name: 'GitHub', url: 'https://github.com/search?q=',             domain: 'github.com' },
      { name: '微博',   url: 'https://s.weibo.com/weibo?q=',              domain: 'weibo.com' },
      { name: '知乎',   url: 'https://www.zhihu.com/search?q=',           domain: 'zhihu.com' },
      { name: '豆瓣',   url: 'https://www.douban.com/search?q=',          domain: 'douban.com' },
      { name: '贴吧',   url: 'https://tieba.baidu.com/f/search/res?qw=',  domain: 'tieba.baidu.com' },
      { name: 'Reddit', url: 'https://www.reddit.com/search/?q=',         domain: 'reddit.com' },
    ]
  },
  {
    id: 'video', label: '视频',
    engines: [
      { name: 'B站',    url: 'https://search.bilibili.com/all?keyword=', domain: 'bilibili.com' },
      { name: '腾讯',   url: 'https://v.qq.com/search.html#stag=0&s=',  domain: 'v.qq.com' },
      { name: '爱奇艺', url: 'https://so.iqiyi.com/so/q_',              domain: 'iqiyi.com' },
      { name: '优酷',   url: 'https://so.youku.com/search_video/q_',    domain: 'youku.com' },
      { name: '芒果',   url: 'https://so.mgtv.com/so/k-',               domain: 'mgtv.com' },
    ]
  },
  {
    id: 'music', label: '音乐',
    engines: [
      { name: 'QQ音乐', url: 'https://y.qq.com/portal/search.html#page=1&searchid=1&remoteplace=txt.yqq.top&t=song&w=', domain: 'y.qq.com' },
      { name: '网易云', url: 'https://music.163.com/#/search/m/?s=', domain: 'music.163.com' },
    ]
  },
  {
    id: 'life', label: '生活',
    engines: [
      { name: '淘宝',   url: 'https://s.taobao.com/search?q=',                             domain: 'taobao.com' },
      { name: '京东',   url: 'https://search.jd.com/Search?keyword=',                      domain: 'jd.com' },
      { name: '拼多多', url: 'https://mobile.yangkeduo.com/search_result.html?search_key=', domain: 'pinduoduo.com' },
      { name: '做菜',   url: 'https://www.xiachufang.com/search/?keyword=',                 domain: 'xiachufang.com' },
      { name: '翻译',   url: 'https://fanyi.baidu.com/#zh/en/',                            domain: 'fanyi.baidu.com' },
    ]
  },
  {
    id: 'job', label: '求职',
    engines: [
      { name: '智联招聘', url: 'https://sou.zhaopin.com/?jl=530&kw=',                       domain: 'zhaopin.com' },
      { name: 'BOSS直聘', url: 'https://www.zhipin.com/web/geek/job?query=',                domain: 'zhipin.com' },
      { name: '猎聘',     url: 'https://www.liepin.com/zhaopin/?key=',                      domain: 'liepin.com' },
      { name: '前程无忧', url: 'https://search.51job.com/list/000000,000000,0000,00,9,99,', domain: '51job.com' },
      { name: '拉勾网',   url: 'https://www.lagou.com/wn/jobs?kd=',                         domain: 'lagou.com' },
    ]
  },
];

let currentCategoryId = 'engine';
let currentEngine = SEARCH_CATEGORIES[0].engines[0];
let enginePanelOpen = false;

function getDomain(url) {
  try { return new URL(url).hostname; } catch { return null; }
}
function buildFaviconUrl(domain) {
  if (!domain) return DEFAULT_ICON;
  return `${WORKER_URL}/?domain=${domain}`;
}
function faviconSrc(url) { return buildFaviconUrl(getDomain(url)); }
function engineFavicon(e) { return buildFaviconUrl(e.domain); }

/* ── 分类 Tab ── */
function renderTabs() {
  const el = document.getElementById('ws-tabs');
  if (!el) return;
  el.innerHTML = '';
  SEARCH_CATEGORIES.forEach(cat => {
    const label = document.createElement('label');
    label.textContent = cat.label;
    if (cat.id === currentCategoryId) label.classList.add('active');
    label.onclick = () => {
      currentCategoryId = cat.id;
      currentEngine = cat.engines[0];
      renderTabs();
      updateEngineDisplay();
      if (enginePanelOpen) renderEngineList();
    };
    el.appendChild(label);
  });
}

function updateEngineDisplay() {
  const icon = document.getElementById('ws-engine-icon');
  const name = document.getElementById('ws-engine-name');
  if (icon) { icon.src = engineFavicon(currentEngine); icon.style.display = ''; }
  if (name) name.textContent = currentEngine.name;
}

/* ── 引擎面板 ── */
function renderEngineList() {
  const panel = document.getElementById('search-list');
  if (!panel) return;
  panel.innerHTML = '';
  const cat = SEARCH_CATEGORIES.find(c => c.id === currentCategoryId);
  if (!cat) return;

  const ul = document.createElement('ul');
  ul.className = 'search-type';
  cat.engines.forEach((engine, idx) => {
    const li = document.createElement('li');
    const id = `ws-engine-${idx}`;
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'ws-type';
    input.id = id;
    input.hidden = true;
    if (engine === currentEngine) input.checked = true;

    const label = document.createElement('label');
    label.htmlFor = id;
    label.innerHTML = `<span class="text-muted">${engine.name}</span>`;
    label.onclick = () => {
      currentEngine = engine;
      updateEngineDisplay();
      renderEngineList();
      document.getElementById('search-text')?.focus();
    };

    li.appendChild(input);
    li.appendChild(label);
    ul.appendChild(li);
  });
  panel.appendChild(ul);
}

function toggleEnginePanel() {
  enginePanelOpen = !enginePanelOpen;
  const panel = document.getElementById('search-list');
  const arrow = document.getElementById('ws-engine-arrow');
  if (panel) panel.style.display = enginePanelOpen ? 'block' : 'none';
  if (arrow) arrow.style.transform = enginePanelOpen ? 'rotate(180deg)' : '';
  if (enginePanelOpen) renderEngineList();
}
window.toggleEnginePanel = toggleEnginePanel;

function doSearch(e) {
  if (e) e.preventDefault();
  const kw = document.getElementById('search-text')?.value.trim();
  if (kw) window.open(currentEngine.url + encodeURIComponent(kw), '_blank');
}
window.doSearch = doSearch;

function onSearchInput() {
  const query = document.getElementById('search-text')?.value.toLowerCase().trim() ?? '';
  filterCards(query);
}
window.onSearchInput = onSearchInput;

function onSearchKeydown(e) {
  if (e.key === 'Escape') {
    const input = document.getElementById('search-text');
    if (input) { input.value = ''; filterCards(''); }
    if (enginePanelOpen) toggleEnginePanel();
  }
}
window.onSearchKeydown = onSearchKeydown;

function filterCards(query) {
  query = (query || '').toLowerCase().trim();
  document.querySelectorAll('.ws-section').forEach(block => {
    let hasVisible = false;
    block.querySelectorAll('.url-card').forEach(card => {
      const title = card.querySelector('strong')?.textContent.toLowerCase() ?? '';
      const desc  = card.querySelector('p')?.textContent.toLowerCase() ?? '';
      const show  = !query || title.includes(query) || desc.includes(query);
      card.style.display = show ? '' : 'none';
      if (show) hasVisible = true;
    });
    block.style.display = (!query || hasVisible) ? '' : 'none';
  });
}
window.filterCards = filterCards;

/* ── ID ── */
function sectionId(s) {
  return 'sec-' + s.replace(/\s+/g, '-').replace(/[^\w\u4e00-\u9fa5-]/g, '');
}

/* ── 渲染侧边栏 ── */
function renderSidebar(sections) {
  const menu = document.getElementById('main-menu');
  if (!menu) return;
  menu.innerHTML = '';
  sections.forEach(({ section }) => {
    const id = sectionId(section);
    const li = document.createElement('li');
    li.className = 'sidebar-item';
    const a = document.createElement('a');
    a.href = '#' + id;
    a.className = 'nav-smooth';
    a.innerHTML = `<i class="iconfont icon-tag icon-fw icon-lg mr-2"></i><span>${section}</span>`;
    li.appendChild(a);
    menu.appendChild(li);
  });

  document.querySelectorAll('a.nav-smooth').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.getElementById(this.getAttribute('href').substring(1));
      if (target) {
        const bannerH = document.querySelector('.header-big')?.offsetHeight || 180;
        const top = target.getBoundingClientRect().top + window.scrollY - bannerH - 10;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      document.querySelectorAll('#main-menu li').forEach(l => l.classList.remove('active'));
      this.parentElement.classList.add('active');
    });
  });
}

/* ── 渲染内容区 ── */
function renderContent(sections) {
  const main = document.getElementById('content');
  if (!main) return;
  main.innerHTML = '';

  sections.forEach(({ section, items }) => {
    const id = sectionId(section);
    const block = document.createElement('div');
    block.className = 'ws-section';

    // 标题
    const heading = document.createElement('div');
    heading.className = 'd-flex flex-fill';
    heading.innerHTML = `
      <h4 class="text-gray text-lg mb-4">
        <i class="site-tag iconfont icon-tag icon-lg mr-1" id="${id}"></i>${section}
      </h4>`;
    block.appendChild(heading);

    // 卡片行
    const row = document.createElement('div');
    row.className = 'row';

    items.forEach(item => {
      const url = item.url || '#';
      const iconSrc = item.icon || faviconSrc(url);
      const title = (item.title || '').replace(/</g, '&lt;');
      const desc = (item.desc || item['data-desc'] || '').replace(/</g, '&lt;');
      const safeUrl = url.replace(/'/g, "\\'");
      const domain = getDomain(url) || url;

      const col = document.createElement('div');
      col.className = 'url-card col-6 col-sm-4 col-md-3 col-xl-2';
      col.innerHTML = `
        <div class="url-body default">
          <a href="${url}" target="_blank" data-url="${url}"
             class="card no-c mb-4"
             data-toggle="tooltip" data-placement="bottom"
             data-original-title="${domain}">
            <div class="card-body">
              <div class="url-content d-flex align-items-center">
                <div class="url-img mr-2 d-flex align-items-center justify-content-center">
                  <img src="${iconSrc}" onerror="this.src='${DEFAULT_ICON}';this.onerror=null;" alt="${title}">
                </div>
                <div class="url-info flex-fill">
                  <div class="text-sm overflowClip_1"><strong>${title}</strong></div>
                  <p class="overflowClip_1 m-0 text-muted text-xs">${desc}</p>
                </div>
              </div>
            </div>
          </a>
        </div>`;
      row.appendChild(col);
    });

    block.appendChild(row);
    block.appendChild(document.createElement('br'));
    main.appendChild(block);
  });

  // tooltip
  if (typeof $ !== 'undefined') {
    $('[data-toggle="tooltip"]').tooltip();
  }
}

/* ── 切换回主题一 ── */
function switchToMain() {
  localStorage.setItem('navTheme', 'main');
  window.location.href = '../index.html';
}
window.switchToMain = switchToMain;

/* ── 入口 ── */
document.addEventListener('DOMContentLoaded', async () => {
  renderTabs();
  updateEngineDisplay();

  try {
    const res = await fetch(LINKS_FILE);
    const data = await res.json();
    renderSidebar(data);
    renderContent(data);
  } catch (err) {
    console.error('加载 links.json 失败：', err);
    const el = document.getElementById('content');
    if (el) el.innerHTML = '<p style="color:#999;text-align:center;padding:3rem;">链接数据加载失败</p>';
  }
});
