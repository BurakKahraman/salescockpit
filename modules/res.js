/* ══════════════════════════════════════════════════════════
 * SalesCockpit Module — res.js (Resources / Templates)
 * Full template tree + click-to-edit + copy + JSON export
 * ══════════════════════════════════════════════════════════ */

export const meta = {
  id: 'res',
  title: { de: 'Ressourcen', en: 'Resources' },
  icon: '📚'
};

let _ctx         = null;
let _activeTmpl  = null;
let _editedSubj  = '';
let _editedBody  = '';

const STAGE_LABELS = { discovery: 'Erstkontakt', offer: 'Angebot', slot: 'Termin', booked: 'Gebucht', other: 'Sonstiges' };
const STAGE_COLORS = { discovery: '#1B5E9B', offer: '#6B21A8', slot: '#0d7985', booked: '#15803d', other: '#b45309' };

export async function mount(rootEl, ctx) {
  _ctx        = ctx;
  _activeTmpl = null;

  const templates = ctx.state.get('templates') || {};

  rootEl.innerHTML = `
    <div style="display:flex;height:100%;overflow:hidden">

      <!-- Left: template tree -->
      <div style="width:260px;flex-shrink:0;border-right:1px solid var(--bd);background:var(--s1);overflow-y:auto;display:flex;flex-direction:column">
        <div style="padding:14px 16px;border-bottom:1px solid var(--bd);display:flex;align-items:center;justify-content:space-between">
          <div style="font-size:11px;font-weight:700;color:var(--navy)">E-Mail Templates</div>
          <button class="btn-secondary" id="btn-export-json" style="font-size:10px;padding:3px 8px">↓ JSON</button>
        </div>
        <div id="tmpl-tree" style="padding:10px 8px;flex:1;overflow-y:auto"></div>
      </div>

      <!-- Right: editor -->
      <div style="flex:1;display:flex;flex-direction:column;overflow:hidden">
        <div style="padding:12px 20px;border-bottom:1px solid var(--bd);background:#fff;display:flex;align-items:center;justify-content:space-between;flex-shrink:0">
          <div id="ed-title" style="font-size:13px;font-weight:700;color:var(--navy)">Template auswählen</div>
          <div style="display:flex;gap:8px">
            <button class="btn-secondary" id="btn-copy-subj" style="font-size:11px;display:none">Betreff kopieren</button>
            <button class="btn-secondary" id="btn-copy-body" style="font-size:11px;display:none">Body kopieren</button>
            <button class="btn-primary"   id="btn-save-tmpl" style="font-size:11px;display:none">In State speichern</button>
          </div>
        </div>

        <div id="tmpl-editor" style="flex:1;overflow-y:auto;padding:20px 24px">
          <div style="text-align:center;padding:80px 0;color:var(--ink3)">
            <div style="font-size:40px;margin-bottom:12px">✉️</div>
            <div style="font-size:14px;font-weight:600;color:var(--ink2)">Kein Template ausgewählt</div>
            <div style="font-size:12px;margin-top:4px">Wähle links ein Template aus der Bibliothek</div>
          </div>
        </div>
      </div>

    </div>
  `;

  _renderTree(rootEl, templates);
  _attachEvents(rootEl);
}

function _renderTree(rootEl, templates) {
  const treeEl = rootEl.querySelector('#tmpl-tree');
  let html = '';

  ['b2b', 'b2c'].forEach(type => {
    html += `
      <div style="font-size:10px;font-weight:800;letter-spacing:.8px;text-transform:uppercase;color:var(--navy);padding:10px 8px 4px">
        ${type.toUpperCase()}
      </div>`;

    ['de', 'en'].forEach(lang => {
      const stages = templates[type]?.[lang] || {};
      const stageKeys = Object.keys(stages).filter(s => stages[s]?.length > 0);
      if (!stageKeys.length) return;

      html += `
        <div style="padding:4px 8px;font-size:10px;font-weight:700;color:var(--ink3);text-transform:uppercase;letter-spacing:.5px">
          ${lang === 'de' ? '🇩🇪 Deutsch' : '🇬🇧 English'}
        </div>`;

      stageKeys.forEach(stage => {
        const items = stages[stage];
        const color = STAGE_COLORS[stage] || 'var(--ink3)';
        html += `
          <div style="margin-bottom:2px">
            <div style="padding:4px 8px 2px 16px;font-size:10px;font-weight:700;color:${color}">
              ${STAGE_LABELS[stage] || stage}
              <span style="font-weight:400;color:var(--ink3)"> · ${items.length}</span>
            </div>
            ${items.map(t => `
              <div class="tmpl-item" data-type="${type}" data-lang="${lang}" data-stage="${stage}" data-id="${t.id}"
                style="padding:5px 8px 5px 24px;border-radius:var(--r);cursor:pointer;font-size:11px;color:var(--ink2);
                       transition:background .1s;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"
                onmouseover="this.style.background='var(--s2,#e8edf5)'" onmouseout="this.style.background='transparent'">
                ${t.label || t.id}
              </div>`).join('')}
          </div>`;
      });
    });
  });

  if (!html) {
    html = '<div style="padding:20px;text-align:center;color:var(--ink3);font-size:12px">Keine Templates verfügbar</div>';
  }

  treeEl.innerHTML = html;

  treeEl.querySelectorAll('.tmpl-item').forEach(item => {
    item.onclick = () => {
      const { type, lang, stage, id } = item.dataset;
      const tmpls = _ctx.state.get('templates')?.[type]?.[lang]?.[stage] || [];
      const tmpl  = tmpls.find(t => t.id === id);
      if (tmpl) {
        // Deselect old
        treeEl.querySelectorAll('.tmpl-item').forEach(el => {
          el.style.background  = 'transparent';
          el.style.fontWeight  = '400';
          el.style.color       = 'var(--ink2)';
        });
        // Highlight selected
        item.style.background = '#dbeafe';
        item.style.fontWeight = '600';
        item.style.color      = 'var(--navy)';
        _loadTemplate(rootEl, tmpl, type, lang, stage);
      }
    };
  });
}

function _loadTemplate(rootEl, tmpl, type, lang, stage) {
  _activeTmpl  = { tmpl, type, lang, stage };
  _editedSubj  = tmpl.subject || '';
  _editedBody  = tmpl.body    || '';

  const color = STAGE_COLORS[stage] || 'var(--ink3)';

  rootEl.querySelector('#ed-title').innerHTML =
    `<span style="color:${color};font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.5px">${type.toUpperCase()} · ${lang.toUpperCase()} · ${STAGE_LABELS[stage]||stage}</span>
     <span style="display:block;font-size:13px;font-weight:700;color:var(--navy);margin-top:2px">${tmpl.label || tmpl.id}</span>`;

  rootEl.querySelector('#btn-copy-subj').style.display = '';
  rootEl.querySelector('#btn-copy-body').style.display = '';
  rootEl.querySelector('#btn-save-tmpl').style.display = '';

  const mirrorsHtml = (tmpl.mirrors || []).map((m, i) => `
    <div style="background:var(--s1);border:1px solid var(--bd);border-radius:var(--r);padding:10px 12px;font-size:11px;color:var(--ink2);margin-bottom:6px;cursor:pointer;transition:border-color .12s"
         onmouseover="this.style.borderColor='var(--navy)'" onmouseout="this.style.borderColor='var(--bd)'"
         onclick="document.getElementById('ed-body').value=document.getElementById('ed-body').value.replace(/{MIRROR}/g,'${m.replace(/'/g, "&#39;").replace(/\n/g,' ')}');_edBodyChanged()">
      <div style="font-size:9px;font-weight:700;color:var(--ink3);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px">Mirror ${i + 1} — klicken zum Einfügen</div>
      ${m}
    </div>`).join('');

  rootEl.querySelector('#tmpl-editor').innerHTML = `
    <div style="max-width:700px">

      <!-- Betreff -->
      <div class="ef-group">
        <label class="ef-lbl">Betreff</label>
        <input class="ef-input" id="ed-subj" value="${_esc(_editedSubj)}">
      </div>

      <!-- Body -->
      <div class="ef-group">
        <label class="ef-lbl">E-Mail Body</label>
        <textarea class="ef-textarea" id="ed-body" rows="18" style="font-family:monospace;font-size:12px;line-height:1.6">${_esc(_editedBody)}</textarea>
      </div>

      <!-- Placeholder reference -->
      <div style="background:var(--s1);border:1px solid var(--bd);border-radius:var(--r);padding:12px 14px;margin-bottom:20px">
        <div style="font-size:10px;font-weight:700;color:var(--navy);margin-bottom:8px">Verfügbare Platzhalter</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px">
          ${['{NAME}','{GROUP}','{DATE}','{MIRROR}','{PRICE_ARENA}','{PRICE_VENUE}','{PRICE_PREMIUM}',
             '{AVAIL_NOTE}','{PHOTO_NOTE}','{SIGNOFF}'].map(p =>
            `<code style="font-size:10px;background:#fff;border:1px solid var(--bd);border-radius:4px;padding:2px 6px;color:var(--navy)">${p}</code>`
          ).join('')}
        </div>
      </div>

      ${mirrorsHtml ? `
        <div>
          <div style="font-size:10px;font-weight:700;color:var(--ink3);text-transform:uppercase;letter-spacing:.7px;margin-bottom:8px">Mirror-Varianten</div>
          ${mirrorsHtml}
        </div>` : ''}
    </div>
  `;

  rootEl.querySelector('#ed-subj').oninput = () => { _editedSubj = rootEl.querySelector('#ed-subj').value; };
  rootEl.querySelector('#ed-body').oninput = () => { _editedBody = rootEl.querySelector('#ed-body').value; };

  // expose helper for inline mirror click
  window._edBodyChanged = () => { _editedBody = rootEl.querySelector('#ed-body')?.value || ''; };
}

function _attachEvents(rootEl) {
  rootEl.querySelector('#btn-copy-subj').onclick = async () => {
    if (!_activeTmpl) return;
    await navigator.clipboard.writeText(_editedSubj).catch(() => {});
    _flash(rootEl.querySelector('#btn-copy-subj'), '✓ Kopiert');
  };

  rootEl.querySelector('#btn-copy-body').onclick = async () => {
    if (!_activeTmpl) return;
    await navigator.clipboard.writeText(_editedBody).catch(() => {});
    _flash(rootEl.querySelector('#btn-copy-body'), '✓ Kopiert');
  };

  rootEl.querySelector('#btn-save-tmpl').onclick = () => {
    if (!_activeTmpl) return;
    const { tmpl, type, lang, stage } = _activeTmpl;
    const templates = _ctx.state.get('templates') || {};
    const list = templates[type]?.[lang]?.[stage] || [];
    const idx  = list.findIndex(t => t.id === tmpl.id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], subject: _editedSubj, body: _editedBody };
      _ctx.state.set('templates', { ...templates });
    }
    _flash(rootEl.querySelector('#btn-save-tmpl'), '✓ Gespeichert');
  };

  rootEl.querySelector('#btn-export-json').onclick = () => {
    const templates = _ctx.state.get('templates') || {};
    const json = JSON.stringify(templates, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `salescockpit_templates_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
}

function _flash(btn, text) {
  const orig = btn.textContent;
  btn.textContent = text;
  setTimeout(() => { btn.textContent = orig; }, 1600);
}

function _esc(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function unmount() {
  _ctx        = null;
  _activeTmpl = null;
  delete window._edBodyChanged;
}
