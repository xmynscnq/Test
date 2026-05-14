/* ===========================
   王五导航 · WebStack主题 · main.js
   =========================== */

const WORKER_URL = 'https://ico.xmynscnq.dpdns.org';
const LINKS_FILE = '../links.json';

const DEFAULT_ICON = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOTk5IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiPjwvY2lyY2xlPjxwYXRoIGQ9Ik0yIDEyaDIwIj48L3BhdGg+PHBhdGggZD0iTTEyIDJhMTUuMyAxNS4zIDAgMCAxIDQgMTAgMTUuMyAxNS4zIDAgMCAxLTQgMTAgMTUuMyAxNS4zIDAgMCAxLTQtMTAgMTUuMyAxNS4zIDAgMCAxIDQtMTB6Ij48L3BhdGg+PC9zdmc+';

function buildFaviconUrl(domain) {
  if (!domain) return DEFAULT_ICON;
  return `${WORKER_URL}/?domain=${domain}`;
}

function getDomain(url) {
  try { return new URL(url).hostname; } catch { return null; }
}

function faviconSrc(url) {
  return buildFaviconUrl(getDomain(url));
}

/* ── 生成唯一 ID ── */
function sectionId(section) {
  return 'sec-' + section.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '-');
}

/* ── 渲染左侧菜单 ── */
function renderSidebar(sections) {
  const menu = document.getElementById('main-menu');
  if (!menu) return;
  menu.innerHTML = '';

  sections.forEach(({ section }) => {
    const id = sectionId(section);
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#' + id;
    a.className = 'nav-smooth';
    a.innerHTML = `<i class="linecons-tag"></i><span class="title">${section}</span>`;
    li.appendChild(a);
    menu.appendChild(li);
  });

  // 平滑滚动 — 使用原生 scrollIntoView
  document.querySelectorAll('a.nav-smooth').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        // 60px offset for fixed navbar
        const top = target.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      document.querySelectorAll('#main-menu li').forEach(l => l.classList.remove('active'));
      this.parentElement.classList.add('active');
    });
  });
}

/* ── 渲染主内容区 ── */
function renderContent(sections) {
  const main = document.getElementById('main-content-area');
  if (!main) return;
  main.innerHTML = '';

  sections.forEach(({ section, items }) => {
    const id = sectionId(section);

    // 分区包裹块（用于筛选）
    const block = document.createElement('div');
    block.className = 'ws-section-block';

    // 分区标题
    const heading = document.createElement('h4');
    heading.className = 'text-gray section-heading';
    heading.id = id;
    heading.innerHTML = `<i class="linecons-tag" style="margin-right:7px;"></i>${section}`;
    block.appendChild(heading);

    // 卡片行
    let row = null;
    items.forEach((item, idx) => {
      if (idx % 4 === 0) {
        row = document.createElement('div');
        row.className = 'row';
        block.appendChild(row);
      }

      const url = item.url || '#';
      const domain = getDomain(url);
      const iconSrc = item.icon || faviconSrc(url);
      const title = (item.title || '').replace(/'/g, '&#39;');
      const desc = (item.desc || item['data-desc'] || '').replace(/'/g, '&#39;');
      const safeUrl = url.replace(/'/g, "\\'");

      const col = document.createElement('div');
      col.className = 'col-sm-3 ws-card-col';
      col.innerHTML = `
        <div class="xe-widget xe-conversations box2 label-info"
             onclick="window.open('${safeUrl}', '_blank')"
             data-toggle="tooltip" data-placement="bottom"
             title="" data-original-title="${domain || url}">
          <div class="xe-comment-entry">
            <a class="xe-user-img">
              <img src="${iconSrc}" class="img-circle" width="40"
                   onerror="this.src='${DEFAULT_ICON}';this.onerror=null;">
            </a>
            <div class="xe-comment">
              <a href="#" class="xe-user-name overflowClip_1">
                <strong>${title}</strong>
              </a>
              <p class="overflowClip_2">${desc}</p>
            </div>
          </div>
        </div>
      `;
      row.appendChild(col);
    });

    const br = document.createElement('br');
    block.appendChild(br);
    main.appendChild(block);
  });
}

/* ── 切换回主题一 ── */
function switchToMain() {
  localStorage.setItem('navTheme', 'main');
  window.location.href = '../index.html';
}
window.switchToMain = switchToMain;

/* ── 入口 ── */
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch(LINKS_FILE);
    const data = await res.json();
    renderSidebar(data);
    renderContent(data);

    if (typeof $ !== 'undefined') {
      $('[data-toggle="tooltip"]').tooltip();
    }
  } catch (err) {
    console.error('加载 links.json 失败：', err);
    const area = document.getElementById('main-content-area');
    if (area) {
      area.innerHTML = '<p style="color:#999;text-align:center;padding:3rem;">链接数据加载失败，请检查 links.json 文件。</p>';
    }
  }
});
