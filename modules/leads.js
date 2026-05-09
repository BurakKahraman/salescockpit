/* ══════════════════════════════════════════════════════════
 * SalesCockpit Module — leads.js
 * CRM: list, filter, add/edit modal, status update
 * ══════════════════════════════════════════════════════════ */

export const meta = {
  id: 'leads',
  title: { de: 'Leads', en: 'Leads' },
  icon: '👥'
};

let _ctx   = null;
let _leads = [];
let _filter = 'all';

const STAGES = ['discovery', 'offer', 'slot', 'booked', 'other'];
const STAGE_LABELS = { discovery: 'Erstkontakt', offer: 'Angebot', slot: 'Termin', booked: 'Gebucht', other: 'Sonstiges' };
const STAGE_COLORS = { discovery: '#1B5E9B', offer: '#6B21A8', slot: '#0d7985', booked: '#15803d', other: '#b45309' };

export async function mount(rootEl, ctx) {
  _ctx = ctx;

  rootEl.innerHTML = `
    <!-- Modal backdrop -->
    <div id="lead-modal" style="display:none;position:fixed;inset:0;z-index:5000;background:rgba(1,24,72,.5);align-items:center;justify-content:center">
      <div style="background:#fff;border-radius:var(--rlg);box-shadow:var(--sh4);width:min(520px,95vw);max-height:90vh;overflow-y:auto;padding:28px 28px 24px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
          <h2 id="modal-title" style="font-size:16px;font-weight:800;color:var(--navy)">Neuer Lead</h2>
          <button id="btn-modal-close" style="width:28px;height:28px;border-radius:50%;background:var(--s1);border:none;font-size:16px;color:var(--ink3);cursor:pointer;display:flex;align-items:center;justify-content:center">×</button>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div class="ef-group"><label class="ef-lbl">Name *</label><input class="ef-input" id="lf-name" placeholder="Max Mustermann"></div>
          <div class="ef-group"><label class="ef-lbl">E-Mail</label><input class="ef-input" id="lf-email" type="email" placeholder="max@firma.de"></div>
          <div class="ef-group"><label class="ef-lbl">Telefon</label><input class="ef-input" id="lf-phone" placeholder="+49 30 …"></div>
          <div class="ef-group"><label class="ef-lbl">Gruppe (Pers.)</label><input class="ef-input" id="lf-group" type="number" placeholder="12"></div>
          <div class="ef-group"><label class="ef-lbl">Event-Datum</label><input class="ef-input" id="lf-date" type="date"></div>
          <div class="ef-group"><label class="ef-lbl">Status</label>
            <select class="ef-input" id="lf-status">
              ${STAGES.map(s => `<option value="${s}">${STAGE_LABELS[s]}</option>`).join('')}
            </select>
          </div>
          <div class="ef-group" style="grid-column:1/-1"><label class="ef-lbl">Notizen</label>
            <textarea class="ef-textarea" id="lf-notes" rows="3" placeholder="Besonderheiten, Wünsche…"></textarea>
          </div>
        </div>
        <div id="modal-err" style="color:var(--red);font-size:11px;min-height:16px;margin-top:8px"></div>
        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px">
          <button class="btn-secondary" id="btn-modal-cancel">Abbrechen</button>
          <button class="btn-primary"   id="btn-modal-save">Speichern</button>
        </div>
      </div>
    </div>

    <!-- Page -->
    <div style="display:flex;flex-direction:column;height:100%;overflow:hidden">

      <!-- Toolbar -->
      <div style="padding:14px 20px;border-bottom:1px solid var(--bd);background:#fff;display:flex;align-items:center;gap:12px;flex-shrink:0">
        <h1 style="font-size:18px;font-weight:800;color:var(--navy);flex:1">Leads</h1>
        <label style="background:var(--s1);border:1px solid var(--bd);border-radius:var(--r);padding:5px 12px;font-size:12px;cursor:pointer;color:var(--ink2)">
          CSV Import
          <input type="file" id="csv-file" accept=".csv" style="display:none">
        </label>
        <button class="btn-secondary" id="btn-refresh">↺ Aktualisieren</button>
        <button class="btn-primary"   id="btn-add">+ Neuer Lead</button>
      </div>

      <!-- Filter tabs -->
      <div style="background:#fff;border-bottom:1px solid var(--bd);padding:0 20px;display:flex;gap:2px;overflow-x:auto;flex-shrink:0">
        ${['all', ...STAGES].map(s => `
          <div class="lf-tab" data-filter="${s}"
            style="padding:8px 14px;font-size:11px;font-weight:500;cursor:pointer;white-space:nowrap;
                   border-bottom:2px solid ${s === _filter ? 'var(--navy)' : 'transparent'};
                   color:${s === _filter ? 'var(--navy)' : 'var(--ink3)'};transition:all .12s">
            ${s === 'all' ? 'Alle' : STAGE_LABELS[s]}
          </div>`).join('')}
      </div>

      <!-- Table -->
      <div id="leads-wrap" style="flex:1;overflow-y:auto">
        <div style="padding:40px;text-align:center;color:var(--ink3)">Lädt…</div>
      </div>
    </div>
  `;

  _attachEvents(rootEl);
  _loadLeads(rootEl);
}

/* ── Load & render ── */
async function _loadLeads(rootEl) {
  const wrap = rootEl.querySelector('#leads-wrap');
  try {
    _leads = await _ctx.supabase.db.getLeads();
    _renderTable(rootEl, wrap);
  } catch (err) {
    wrap.innerHTML = `<div style="padding:40px;color:var(--red)">Fehler: ${err.message}</div>`;
  }
}

function _renderTable(rootEl, wrap) {
  const visible = _filter === 'all' ? _leads : _leads.filter(l => l.status === _filter);

  if (!visible.length) {
    wrap.innerHTML = `
      <div style="padding:60px;text-align:center;color:var(--ink3)">
        <div style="font-size:32px;margin-bottom:12px">📭</div>
        <div style="font-size:14px;font-weight:600;color:var(--ink2)">Keine Leads gefunden</div>
        <div style="font-size:12px;margin-top:4px">${_filter !== 'all' ? 'Filter ändern oder' : ''} neuen Lead hinzufügen</div>
      </div>`;
    return;
  }

  wrap.innerHTML = `
    <table style="width:100%;border-collapse:collapse;font-size:13px">
      <thead style="background:var(--s1);position:sticky;top:0;z-index:2">
        <tr>
          <th style="padding:10px 16px;text-align:left;font-size:10px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:var(--ink3)">Name</th>
          <th style="padding:10px 12px;text-align:left;font-size:10px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:var(--ink3)">E-Mail</th>
          <th style="padding:10px 12px;text-align:left;font-size:10px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:var(--ink3)">Gruppe</th>
          <th style="padding:10px 12px;text-align:left;font-size:10px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:var(--ink3)">Event</th>
          <th style="padding:10px 12px;text-align:left;font-size:10px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:var(--ink3)">Status</th>
          <th style="padding:10px 12px;text-align:left;font-size:10px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:var(--ink3)">Erstellt</th>
          <th style="padding:10px 16px;text-align:right;font-size:10px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:var(--ink3)">Aktionen</th>
        </tr>
      </thead>
      <tbody>
        ${visible.map(lead => {
          const d     = lead.data || {};
          const color = STAGE_COLORS[lead.status] || 'var(--navy)';
          return `
            <tr style="border-bottom:1px solid var(--bd);transition:background .12s"
                onmouseover="this.style.background='var(--s1)'" onmouseout="this.style.background='none'">
              <td style="padding:10px 16px;font-weight:600;color:var(--navy)">${d.Name || d.NAME || '–'}</td>
              <td style="padding:10px 12px;color:var(--ink2)">${d.Email || d.EMAIL || '–'}</td>
              <td style="padding:10px 12px;color:var(--ink3)">${d.GROUP || d.group || '–'}</td>
              <td style="padding:10px 12px;color:var(--ink3)">${d['EVENT DATE'] || d.date || '–'}</td>
              <td style="padding:10px 12px">
                <select class="status-sel" data-id="${lead.id}"
                  style="border:1px solid ${color}30;border-radius:100px;padding:2px 8px;font-size:10px;font-weight:700;
                         color:${color};background:${color}12;cursor:pointer;outline:none">
                  ${STAGES.map(s => `<option value="${s}" ${s === lead.status ? 'selected' : ''}>${STAGE_LABELS[s]}</option>`).join('')}
                </select>
              </td>
              <td style="padding:10px 12px;color:var(--ink3);font-size:11px">${new Date(lead.created_at).toLocaleDateString('de-DE')}</td>
              <td style="padding:10px 16px;text-align:right">
                <div style="display:flex;gap:6px;justify-content:flex-end">
                  <button class="btn-edit" data-id="${lead.id}" style="padding:3px 10px;border-radius:var(--r);border:1px solid var(--bd);background:none;font-size:11px;color:var(--ink2);cursor:pointer">Bearbeiten</button>
                  <button class="btn-build" data-id="${lead.id}" style="padding:3px 10px;border-radius:var(--r);border:none;background:var(--navy);color:#fff;font-size:11px;cursor:pointer">Angebot</button>
                </div>
              </td>
            </tr>`;
        }).join('')}
      </tbody>
    </table>`;

  // Status change
  wrap.querySelectorAll('.status-sel').forEach(sel => {
    sel.onchange = async () => {
      try {
        await _ctx.supabase.db.updateLead(sel.dataset.id, { status: sel.value });
        const lead = _leads.find(l => l.id === sel.dataset.id);
        if (lead) lead.status = sel.value;
      } catch (e) { alert('Fehler: ' + e.message); }
    };
  });

  // Edit button → open modal with data
  wrap.querySelectorAll('.btn-edit').forEach(btn => {
    btn.onclick = () => {
      const lead = _leads.find(l => l.id === btn.dataset.id);
      if (lead) _openModal(rootEl, lead);
    };
  });

  // Build button → navigate to builder
  wrap.querySelectorAll('.btn-build').forEach(btn => {
    btn.onclick = () => {
      const lead = _leads.find(l => l.id === btn.dataset.id);
      if (lead) {
        _ctx.state.set('activeLead', lead);
        window.dispatchEvent(new CustomEvent('nav', { detail: 'builder' }));
      }
    };
  });
}

/* ── Events ── */
function _attachEvents(rootEl) {
  // Filter tabs
  rootEl.querySelectorAll('.lf-tab').forEach(tab => {
    tab.onclick = () => {
      _filter = tab.dataset.filter;
      rootEl.querySelectorAll('.lf-tab').forEach(t => {
        t.style.borderBottomColor = t.dataset.filter === _filter ? 'var(--navy)' : 'transparent';
        t.style.color             = t.dataset.filter === _filter ? 'var(--navy)' : 'var(--ink3)';
        t.style.fontWeight        = t.dataset.filter === _filter ? '700' : '500';
      });
      _renderTable(rootEl, rootEl.querySelector('#leads-wrap'));
    };
  });

  rootEl.querySelector('#btn-refresh').onclick = () => _loadLeads(rootEl);
  rootEl.querySelector('#btn-add').onclick     = () => _openModal(rootEl, null);

  // Modal controls
  rootEl.querySelector('#btn-modal-close').onclick  = () => _closeModal(rootEl);
  rootEl.querySelector('#btn-modal-cancel').onclick = () => _closeModal(rootEl);
  rootEl.querySelector('#btn-modal-save').onclick   = () => _saveModal(rootEl);

  // CSV import
  rootEl.querySelector('#csv-file').onchange = async e => {
    const file = e.target.files[0];
    if (!file) return;
    const text   = await file.text();
    const lines  = text.split('\n').filter(l => l.trim());
    if (lines.length < 2) return;
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const rows    = lines.slice(1).map(line => {
      const vals = line.split(',').map(v => v.trim().replace(/"/g, ''));
      const data = {};
      headers.forEach((h, i) => { data[h] = vals[i] || ''; });
      return { data, status: 'discovery', tenant_id: _ctx.state.get('tenant')?.id };
    });
    if (!confirm(`${rows.length} Leads importieren?`)) return;
    for (const row of rows) {
      try { await _ctx.supabase.db.createLead(row); } catch {}
    }
    _loadLeads(rootEl);
  };
}

/* ── Modal helpers ── */
function _openModal(rootEl, lead) {
  const d = lead?.data || {};
  rootEl.querySelector('#modal-title').textContent = lead ? 'Lead bearbeiten' : 'Neuer Lead';
  rootEl.querySelector('#lf-name').value    = d.Name  || d.NAME  || '';
  rootEl.querySelector('#lf-email').value   = d.Email || d.EMAIL || '';
  rootEl.querySelector('#lf-phone').value   = d.Phone || d.PHONE || '';
  rootEl.querySelector('#lf-group').value   = d.GROUP || d.group || '';
  rootEl.querySelector('#lf-date').value    = d['EVENT DATE'] || d.date || '';
  rootEl.querySelector('#lf-status').value  = lead?.status || 'discovery';
  rootEl.querySelector('#lf-notes').value   = d.notes || '';
  rootEl.querySelector('#modal-err').textContent = '';
  rootEl.querySelector('#btn-modal-save').dataset.editId = lead?.id || '';
  const modal = rootEl.querySelector('#lead-modal');
  modal.style.display = 'flex';
}

function _closeModal(rootEl) {
  rootEl.querySelector('#lead-modal').style.display = 'none';
}

async function _saveModal(rootEl) {
  const btn = rootEl.querySelector('#btn-modal-save');
  const err = rootEl.querySelector('#modal-err');
  const name = rootEl.querySelector('#lf-name').value.trim();
  if (!name) { err.textContent = 'Name ist Pflichtfeld.'; return; }

  const payload = {
    data: {
      Name:         name,
      Email:        rootEl.querySelector('#lf-email').value.trim(),
      Phone:        rootEl.querySelector('#lf-phone').value.trim(),
      GROUP:        rootEl.querySelector('#lf-group').value.trim(),
      'EVENT DATE': rootEl.querySelector('#lf-date').value,
      notes:        rootEl.querySelector('#lf-notes').value.trim()
    },
    status: rootEl.querySelector('#lf-status').value
  };

  btn.textContent = 'Speichert…'; btn.disabled = true;
  try {
    const editId = btn.dataset.editId;
    if (editId) {
      await _ctx.supabase.db.updateLead(editId, payload);
    } else {
      await _ctx.supabase.db.createLead(payload);
    }
    _closeModal(rootEl);
    _loadLeads(rootEl);
  } catch (e) {
    err.textContent = e.message;
  } finally {
    btn.textContent = 'Speichern'; btn.disabled = false;
  }
}

export function unmount() {
  _leads  = [];
  _filter = 'all';
  _ctx    = null;
}
