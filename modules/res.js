/* ══════════════════════════════════════════════════════════
 * SalesCockpit Module — res.js (Resources / Templates)
 * ══════════════════════════════════════════════════════════ */

export const meta = {
  id: 'res',
  title: { de: 'Ressourcen', en: 'Resources' },
  icon: '📚'
};

let _ctx = null;
let currentTmpl = null;
let _root = null;

export async function mount(rootEl, ctx) {
  _ctx = ctx;
  _root = rootEl;
  render();
}

function render() {
  if (!_root || !_ctx) return;
  const templates = _ctx.state.get('templates') || {};

  _root.innerHTML = `
    <div style="padding: 24px; display: flex; flex-direction: column; gap: 20px; height: 100%;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h1 style="font-size: 24px; font-weight: 800; color: var(--navy)">Email Templates</h1>
      </div>

      <div style="display:grid; grid-template-columns: 280px 1fr; gap:20px; flex:1; overflow:hidden;">
        <!-- Template Tree -->
        <div id="tmpl-tree" style="background:var(--bg); border:1px solid var(--bd); border-radius:12px; padding:16px; overflow-y:auto;">
          ${renderTree(templates)}
        </div>

        <!-- Editor Workspace -->
        <div id="tmpl-editor" style="background:#fff; border:1px solid var(--bd); border-radius:12px; padding:24px; overflow-y:auto; display:flex; flex-direction:column;">
          ${renderEditor()}
        </div>
      </div>
    </div>
  `;
  attachTreeEvents();
  attachEditorEvents();
}

function renderTree(templates) {
  let html = '';
  ['b2b', 'b2c'].forEach(type => {
    html += `<div style="font-weight:800; font-size:11px; color:var(--navy); margin-bottom:8px; margin-top:12px; text-transform:uppercase;">${type.toUpperCase()}</div>`;
    ['de', 'en'].forEach(lang => {
      html += `<div style="padding-left:12px; font-weight:700; font-size:12px; color:var(--ink2); margin-bottom:4px;">${lang.toUpperCase()}</div>`;
      const stages = templates[type]?.[lang] || {};
      Object.keys(stages).forEach(stage => {
        html += `<div style="padding-left:24px; font-size:11px; color:var(--ink3); font-weight:600; margin-bottom:2px; margin-top:6px; text-transform:uppercase;">${stage}</div>`;
        const arr = stages[stage];
        arr.forEach(t => {
           const isSel = currentTmpl && currentTmpl.id === t.id;
           html += `<div class="res-tree-item" data-id="${t.id}" data-type="${type}" data-lang="${lang}" data-stage="${stage}" style="padding-left:32px; font-size:12px; color:${isSel?'var(--blue)':'var(--ink3)'}; font-weight:${isSel?'700':'400'}; margin-bottom:4px; cursor:pointer;" onmouseover="this.style.color='var(--blue)'" onmouseout="this.style.color='${isSel?'var(--blue)':'var(--ink3)'}'">• ${t.label}</div>`;
        });
      });
    });
  });
  return html;
}

function renderEditor() {
  if (!currentTmpl) {
    return `
      <div style="text-align:center; padding-top:100px; color:var(--ink3)">
        <div style="font-size:48px; margin-bottom:16px;">✏️</div>
        <p>Select a template from the left to edit.</p>
      </div>
    `;
  }

  return `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; border-bottom:1px solid var(--bd); padding-bottom:16px;">
       <div>
         <div style="font-size:10px; color:var(--ink3); text-transform:uppercase; font-weight:700;">ID: ${currentTmpl.id}</div>
         <div style="font-size:16px; font-weight:700; color:var(--navy);">${currentTmpl.label}</div>
       </div>
       <button class="btn-primary" id="res-btn-save">Save Changes</button>
    </div>
    
    <div style="flex:1; display:flex; flex-direction:column; gap:16px;">
      <div>
        <label class="ef-lbl">Label (Title)</label>
        <input class="ef-i" id="res-label" value="${escapeHtml(currentTmpl.label)}">
      </div>
      <div>
        <label class="ef-lbl">Customer Signal (ms)</label>
        <input class="ef-i" id="res-ms" value="${escapeHtml(currentTmpl.ms || '')}">
      </div>
      <div>
        <label class="ef-lbl">Subject</label>
        <input class="ef-i" id="res-subject" value="${escapeHtml(currentTmpl.subject || '')}">
      </div>
      <div style="flex:1; display:flex; flex-direction:column;">
        <label class="ef-lbl">Body</label>
        <textarea class="ef-textarea" id="res-body" style="flex:1; font-family:monospace; resize:none;">${escapeHtml(currentTmpl.body || '')}</textarea>
      </div>
      <div>
        <label class="ef-lbl">Mirrors (JSON Array)</label>
        <textarea class="ef-textarea" id="res-mirrors" rows="4" style="font-family:monospace;">${escapeHtml(JSON.stringify(currentTmpl.mirrors || [], null, 2))}</textarea>
      </div>
    </div>
  `;
}

function escapeHtml(unsafe) {
  return (unsafe||'').toString()
       .replace(/&/g, "&amp;")
       .replace(/</g, "&lt;")
       .replace(/>/g, "&gt;")
       .replace(/"/g, "&quot;")
       .replace(/'/g, "&#039;");
}

function attachTreeEvents() {
  _root.querySelectorAll('.res-tree-item').forEach(el => {
    el.onclick = () => {
      const { type, lang, stage, id } = el.dataset;
      const templates = _ctx.state.get('templates');
      const tmpl = templates[type][lang][stage].find(t => t.id === id);
      if (tmpl) {
        currentTmpl = { ...tmpl, type, lang, stage };
        render(); // re-render to update selected state and show editor
      }
    };
  });
}

function attachEditorEvents() {
  const btnSave = _root.querySelector('#res-btn-save');
  if (btnSave) {
    btnSave.onclick = async () => {
      if (!currentTmpl) return;
      btnSave.textContent = 'Saving...';
      btnSave.disabled = true;
      try {
        const label = _root.querySelector('#res-label').value;
        const ms = _root.querySelector('#res-ms').value;
        const subject = _root.querySelector('#res-subject').value;
        const body = _root.querySelector('#res-body').value;
        let mirrors = [];
        try {
           mirrors = JSON.parse(_root.querySelector('#res-mirrors').value);
        } catch(e) {
           alert("Invalid JSON in Mirrors");
           btnSave.textContent = 'Save Changes';
           btnSave.disabled = false;
           return;
        }

        const updates = { label, ms, subject, body, mirrors };
        
        // Save to Supabase
        await _ctx.supabase.db.updateTemplate(currentTmpl.id, updates);
        
        // Update local state directly
        const templates = _ctx.state.get('templates');
        const list = templates[currentTmpl.type][currentTmpl.lang][currentTmpl.stage];
        const idx = list.findIndex(t => t.id === currentTmpl.id);
        if (idx > -1) {
          list[idx] = { ...list[idx], ...updates };
        }
        _ctx.state.patch({ templates });
        
        currentTmpl = { ...currentTmpl, ...updates };
        alert("Saved successfully!");
        render();
      } catch(err) {
        console.error(err);
        alert("Error saving: " + err.message);
      } finally {
        if(btnSave) { btnSave.textContent = 'Save Changes'; btnSave.disabled = false; }
      }
    };
  }
}

export function unmount() {
  _ctx = null;
  _root = null;
  currentTmpl = null;
}
