/* ══════════════════════════════════════════════════════════
 * SalesCockpit Module — leads.js
 * CRM and Lead management connected to Supabase
 * ══════════════════════════════════════════════════════════ */

export const meta = {
  id: 'leads',
  title: { de: 'Leads', en: 'Leads' },
  icon: '👥'
};

let _ctx = null;
let _leads = [];

export async function mount(rootEl, ctx) {
  _ctx = ctx;
  const { supabase, state, utils } = ctx;

  rootEl.innerHTML = `
    <div style="padding: 24px; display: flex; flex-direction: column; gap: 20px; height: 100%;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h1 style="font-size: 24px; font-weight: 800; color: var(--navy)">Leads</h1>
        <div style="display:flex; gap:10px;">
           <input type="file" id="csv-import-file" style="display:none" accept=".csv">
           <button id="btn-import" class="btn-secondary">Import CSV</button>
           <button id="btn-refresh" class="btn-secondary">Refresh</button>
           <button id="btn-add" class="btn-primary">+ New Lead</button>
        </div>
      </div>

      <div id="leads-table-container" style="background:#fff; border:1px solid var(--bd); border-radius:12px; flex:1; overflow:auto;">
        <div style="padding:40px; text-align:center; color:var(--ink3)">Loading leads...</div>
      </div>
    </div>
  `;

  const fileInput = rootEl.querySelector('#csv-import-file');
  rootEl.querySelector('#btn-import').onclick = () => fileInput.click();
  rootEl.querySelector('#btn-refresh').onclick = () => loadLeads(rootEl);
  rootEl.querySelector('#btn-add').onclick = () => alert('Add Lead Modal coming soon...');

  fileInput.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const text = await file.text();
    await processCSV(text);
    loadLeads(rootEl);
  };

  loadLeads(rootEl);

  _ctx.state.watch('globalSearchQuery', () => {
    const container = rootEl.querySelector('#leads-table-container');
    if (container) renderTable(container);
  });
}

async function processCSV(csvText) {
  const lines = csvText.split('\n').filter(l => l.trim());
  if (lines.length < 2) return;
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  
  const leadsToInsert = lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
    const data = {};
    headers.forEach((h, i) => data[h] = values[i]);
    return {
      tenant_id: _ctx.state.get('tenant')?.id,
      status: 'discovery',
      data: data
    };
  });

  if (confirm(`${leadsToInsert.length} leads will be imported. Continue?`)) {
    for (const lead of leadsToInsert) {
      await _ctx.supabase.db.createLead(lead);
    }
    alert('Import complete!');
  }
}

async function loadLeads(rootEl) {
  const container = rootEl.querySelector('#leads-table-container');
  try {
    const data = await _ctx.supabase.db.getLeads();
    _leads = data;
    renderTable(container);
  } catch (err) {
    container.innerHTML = `<div style="padding:40px; color:var(--red)">Error: ${err.message}</div>`;
  }
}

function renderTable(container) {
  if (!_leads.length) {
    container.innerHTML = `<div style="padding:40px; text-align:center; color:var(--ink3)">No leads found.</div>`;
    return;
  }

  let html = `
    <table style="width:100%; min-width:600px; border-collapse:collapse; font-size:13px;">
      <thead style="background:var(--bg); border-bottom:1px solid var(--bd); position:sticky; top:0;">
        <tr>
          <th style="padding:12px; text-align:left;">Name</th>
          <th style="padding:12px; text-align:left;">Email</th>
          <th style="padding:12px; text-align:left;">Status</th>
          <th style="padding:12px; text-align:left;">Created</th>
          <th style="padding:12px; text-align:right;">Actions</th>
        </tr>
      </thead>
      <tbody>
  `;

  const query = (_ctx.state.get('globalSearchQuery') || '').toLowerCase();
  
  const filtered = _leads.filter(lead => {
    if (!query) return true;
    const d = lead.data || {};
    const text = ((d.Name || '') + ' ' + (d.Email || '') + ' ' + (lead.status || '')).toLowerCase();
    return text.includes(query);
  });

  if (!filtered.length) {
    container.innerHTML = `<div style="padding:40px; text-align:center; color:var(--ink3)">No leads found matching your search.</div>`;
    return;
  }

  filtered.forEach(lead => {
    const d = lead.data || {};
    html += `
      <tr style="border-bottom:1px solid var(--bg); transition:background 0.2s;" onmouseover="this.style.background='var(--bg)'" onmouseout="this.style.background='none'">
        <td style="padding:12px; font-weight:600; color:var(--navy)">${d.Name || 'Unknown'}</td>
        <td style="padding:12px; color:var(--ink2)">${d.Email || '-'}</td>
        <td style="padding:12px;"><span style="background:var(--s1); color:var(--navy); padding:2px 8px; border-radius:10px; font-size:11px; font-weight:700;">${lead.status.toUpperCase()}</span></td>
        <td style="padding:12px; color:var(--ink3)">${new Date(lead.created_at).toLocaleDateString()}</td>
        <td style="padding:12px; text-align:right;">
          <button class="btn-primary" style="font-size:10px; padding:4px 10px;" 
            onclick="const lead = JSON.parse(decodeURIComponent('${encodeURIComponent(JSON.stringify(lead))}'));
                     _ctx.state.set('activeLead', lead);
                     window.dispatchEvent(new CustomEvent('nav', {detail: 'builder'}));">
            Edit & Build
          </button>
        </td>
      </tr>
    `;
  });

  html += `</tbody></table>`;
  container.innerHTML = html;
}

export function unmount() {
  _leads = [];
  _ctx = null;
}
