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
        <button id="btn-refresh" class="btn-secondary">Refresh</button>
      </div>

      <div id="leads-table-container" style="background:#fff; border:1px solid var(--bd); border-radius:12px; flex:1; overflow:auto;">
        <div style="padding:40px; text-align:center; color:var(--ink3)">Loading leads...</div>
      </div>
    </div>
  `;

  rootEl.querySelector('#btn-refresh').onclick = () => loadLeads(rootEl);

  loadLeads(rootEl);
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

  _leads.forEach(lead => {
    const d = lead.data || {};
    html += `
      <tr style="border-bottom:1px solid var(--bg); transition:background 0.2s;" onmouseover="this.style.background='var(--bg)'" onmouseout="this.style.background='none'">
        <td style="padding:12px; font-weight:600; color:var(--navy)">${d.Name || 'Unknown'}</td>
        <td style="padding:12px; color:var(--ink2)">${d.Email || '-'}</td>
        <td style="padding:12px;"><span style="background:var(--s1); color:var(--navy); padding:2px 8px; border-radius:10px; font-size:11px; font-weight:700;">${lead.status.toUpperCase()}</span></td>
        <td style="padding:12px; color:var(--ink3)">${new Date(lead.created_at).toLocaleDateString()}</td>
        <td style="padding:12px; text-align:right;">
          <button class="btn-secondary" style="font-size:10px; padding:4px 8px;" onclick="alert('Go to Builder for this lead')">View</button>
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
