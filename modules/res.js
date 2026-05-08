/* ══════════════════════════════════════════════════════════
 * SalesCockpit Module — res.js (Resources / Templates)
 * ══════════════════════════════════════════════════════════ */

export const meta = {
  id: 'res',
  title: { de: 'Ressourcen', en: 'Resources' },
  icon: '📚'
};

let _ctx = null;

export async function mount(rootEl, ctx) {
  _ctx = ctx;
  const { state } = ctx;
  const templates = state.get('templates') || {};

  rootEl.innerHTML = `
    <div style="padding: 24px; display: flex; flex-direction: column; gap: 20px; height: 100%;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h1 style="font-size: 24px; font-weight: 800; color: var(--navy)">Email Templates</h1>
        <button class="btn-primary" onclick="alert('Export functionality moved to modular system')">Export JSON</button>
      </div>

      <div style="display:grid; grid-template-columns: 280px 1fr; gap:20px; flex:1; overflow:hidden;">
        <!-- Template Tree -->
        <div id="tmpl-tree" style="background:var(--bg); border:1px solid var(--bd); border-radius:12px; padding:16px; overflow-y:auto;">
          ${renderTree(templates)}
        </div>

        <!-- Editor Workspace -->
        <div id="tmpl-editor" style="background:#fff; border:1px solid var(--bd); border-radius:12px; padding:24px; overflow-y:auto;">
          <div style="text-align:center; padding-top:100px; color:var(--ink3)">
            <div style="font-size:48px; margin-bottom:16px;">✏️</div>
            <p>Select a template from the left to edit.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderTree(templates) {
  let html = '';
  ['b2b', 'b2c'].forEach(type => {
    html += `<div style="font-weight:800; font-size:11px; color:var(--navy); margin-bottom:8px; margin-top:12px; text-transform:uppercase;">${type.toUpperCase()}</div>`;
    ['de', 'en'].forEach(lang => {
      html += `<div style="padding-left:12px; font-weight:700; font-size:12px; color:var(--ink2); margin-bottom:4px;">${lang.toUpperCase()}</div>`;
      const stages = templates[type]?.[lang] || {};
      Object.keys(stages).forEach(stage => {
        html += `<div style="padding-left:24px; font-size:12px; color:var(--ink3); margin-bottom:2px; cursor:pointer;" onmouseover="this.style.color='var(--green)'" onmouseout="this.style.color='var(--ink3)'">• ${stage}</div>`;
      });
    });
  });
  return html;
}

export function unmount() {
  _ctx = null;
}
