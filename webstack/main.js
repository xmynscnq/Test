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

/* ── 渲染左侧菜单 ── */
function renderSidebar(sections) {
  const menu = document.getElementById('main-menu');
  if (!menu) return;
  menu.innerHTML = '';

  sections.forEach(({ section }) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#section-${encodeURIComponent(section)}`;
    a.className = 'smooth';
    a.innerHTML = `<i class="linecons-tag"></i><span class="title">${section}</span>`;
    li.appendChild(a);
    menu.appendChild(li);
  });

  // 平滑滚动
  document.querySelectorAll('a.smooth').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 30,
          behavior: 'smooth'
        });
      }
      // 移动端关闭菜单
      document.querySelector('.sidebar-menu')?.classList.remove('mobile-is-visible');

      // 高亮当前菜单项
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
    // 分区标题
    const heading = document.createElement('h4');
    heading.className = 'text-gray section-heading';
    heading.id = `section-${encodeURIComponent(section)}`;
    heading.innerHTML = `<i class="linecons-tag" style="margin-right:7px;"></i>${section}`;
    main.appendChild(heading);

    // 卡片网格（每行4个）
    let row = null;
    items.forEach((item, idx) => {
      if (idx % 4 === 0) {
        row = document.createElement('div');
        row.className = 'row';
        main.appendChild(row);
      }

      const col = document.createElement('div');
      col.className = 'col-sm-3';

      const url = item.url || '#';
      const domain = getDomain(url);
      const iconSrc = item.icon || faviconSrc(url);

      col.innerHTML = `
        <div class="xe-widget xe-conversations box2 label-info"
             onclick="window.open('${url.replace(/'/g, "\\'")}', '_blank')"
             data-toggle="tooltip" data-placement="bottom"
             title="" data-original-title="${domain || url}">
          <div class="xe-comment-entry">
            <a class="xe-user-img">
              <img src="${iconSrc}" class="img-circle" width="40"
                   onerror="this.src='${DEFAULT_ICON}';this.onerror=null;">
            </a>
            <div class="xe-comment">
              <a href="#" class="xe-user-name overflowClip_1">
                <strong>${item.title || ''}</strong>
              </a>
              <p class="overflowClip_2">${item.desc || item['data-desc'] || ''}</p>
            </div>
          </div>
        </div>
      `;

      row.appendChild(col);
    });

    const br = document.createElement('br');
    main.appendChild(br);
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

    // 初始化 Bootstrap tooltip（如果 jQuery 可用）
    if (typeof $ !== 'undefined') {
      $('[data-toggle="tooltip"]').tooltip();
    }
  } catch (err) {
    console.error('加载 links.json 失败：', err);
    const area = document.getElementById('main-content-area');
    if (area) {
      area.innerHTML = '<p style="color:#999;text-align:center;padding:2rem;">链接数据加载失败，请检查 links.json 文件。</p>';
    }
  }
});
