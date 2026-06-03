/* ============================================================
   data.js — 常量、图标数据
   ============================================================ */

/* --- 网格常量 --- */
const CELL = 88;
const GAP  = 16;
const ROWS = 2;

/* --- 默认壁纸 --- */
const DEFAULT_BG_IMAGE = '3.jpg';

/* --- 预设渐变壁纸 --- */
const BG_PRESETS = {
  default: null,
  sunset:  'linear-gradient(135deg,#f093fb 0%,#f5576c 50%,#fda085 100%)',
  forest:  'linear-gradient(135deg,#43e97b 0%,#38f9d7 50%,#4facfe 100%)',
  night:   'linear-gradient(135deg,#0f0c29 0%,#302b63 50%,#24243e 100%)',
  aurora:  'linear-gradient(135deg,#43cea2 0%,#185a9d 100%)',
};

/* --- 图标背景色表 --- */
const BG_STYLES = {
  'bg-nav':      'linear-gradient(145deg,#e8714a,#c94d22)',
  'bg-weather':  'linear-gradient(145deg,#64a0dc,#3c78be)',
  'bg-note':     'linear-gradient(145deg,#4cbb7f,#2e8b57)',
  'bg-draw':     'linear-gradient(145deg,#4facfe,#1a7fd4)',
  'bg-ai':       'linear-gradient(145deg,#f07130,#e05518)',
  'bg-settings': 'linear-gradient(145deg,#8e9eab,#616f7a)',
  'bg-calc':     'linear-gradient(145deg,#5b86e5,#36d1dc)',
  'bg-links':    'linear-gradient(145deg,#a78bfa,#7c3aed)',
  'bg-hot':      'rgba(255,255,255,0.22)',
};

function getBgStyle(bgClass, customBg) {
  if (customBg) return customBg.startsWith('linear') || customBg.startsWith('radial')
    ? `background-image:${customBg}` : `background:${customBg}`;
  return `background:${BG_STYLES[bgClass] || '#888'}`;
}

/* --- 默认桌面布局 ---
   只保留功能图标，网站图标由 links.json 动态生成
   布局紧凑，从 col:0 开始，适配各种屏幕宽度
*/
const DEFAULT_PAGES = [
  [
    { id:'weather',    type:'widget', size:'2x2', label:'天气',     bgClass:'bg-weather',  col:0, row:0, action:'weather'                },
    { id:'note',       type:'widget', size:'2x1', label:'记事本',   bgClass:'bg-note',     col:2, row:0, action:'note',     emoji:'📝'   },
    { id:'draw',       type:'widget', size:'2x1', label:'画板',     bgClass:'bg-draw',     col:2, row:1, action:'draw',     emoji:'🎨'   },
    { id:'ai',         type:'widget', size:'2x2', label:'AI 对话',  bgClass:'bg-ai',       col:4, row:0, action:'ai'                     },
    { id:'nav',        type:'icon',   size:'1x1', label:'网址导航', bgClass:'bg-nav',      col:6, row:0, action:'nav',      emoji:'🧭'   },
    { id:'links-nav',  type:'icon',   size:'1x1', label:'快捷导航', bgClass:'bg-links',    col:7, row:0, action:'links-nav',emoji:'🔗'   },
    { id:'ai-search',  type:'icon',   size:'1x1', label:'AI 检索',  bgClass:'bg-ai',       col:6, row:1, action:'ai-search',emoji:'✨'   },
    { id:'calc',       type:'icon',   size:'1x1', label:'计算器',   bgClass:'bg-calc',     col:7, row:1, action:'calc',     emoji:'🧮'   },
    { id:'settings',   type:'icon',   size:'1x1', label:'设置',     bgClass:'bg-settings', col:8, row:0, action:'settings', emoji:'⚙️'  },
  ]
];

/* --- NAV_DATA 保留结构供 nav.js 兼容，实际内容由 links.json 覆盖 ---
   nav.js 的 render() 会被 links-nav-override.js 替换为加载 links.json
*/
const NAV_DATA = { cn: {}, global: {} };
