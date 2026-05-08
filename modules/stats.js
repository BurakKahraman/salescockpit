/* ══════════════════════════════════════════════════════════
 * SalesCockpit Module — stats.js (Analytics)
 * ══════════════════════════════════════════════════════════ */

export const meta = {
  id: 'stats',
  title: { de: 'Statistik', en: 'Statistics' },
  icon: '📊'
};

export async function mount(rootEl, ctx) {
  const { state, utils, supabase } = ctx;

  rootEl.innerHTML = `
    <div style="padding: 24px; display: flex; flex-direction: column; gap: 20px;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <h1 style="font-size: 24px; font-weight: 800; color: var(--navy)">Analytics & Accounting</h1>
        <button class="btn-secondary" id="btn-export-datev">Export for DATEV/sevDesk</button>
      </div>
      
      <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:20px;">
        <div style="background:#fff; padding:20px; border:1px solid var(--bd); border-radius:12px;">
          <div style="font-size:11px; color:var(--ink3); font-weight:700;">TOTAL LEADS</div>
          <div style="font-size:28px; font-weight:800; color:var(--navy); margin-top:4px;">128</div>
        </div>
        <div style="background:#fff; padding:20px; border:1px solid var(--bd); border-radius:12px;">
          <div style="font-size:11px; color:var(--ink3); font-weight:700;">CONVERSION</div>
          <div style="font-size:28px; font-weight:800; color:var(--green); margin-top:4px;">24%</div>
        </div>
        <div style="background:#fff; padding:20px; border:1px solid var(--bd); border-radius:12px;">
          <div style="font-size:11px; color:var(--ink3); font-weight:700;">REVENUE (EST.)</div>
          <div style="font-size:28px; font-weight:800; color:var(--navy); margin-top:4px;">€42,400</div>
        </div>
      </div>

      <div style="margin-top:20px; padding:20px; background:var(--bg); border-radius:12px; border:1px solid var(--bd);">
        <h3 style="font-size:14px; color:var(--navy); margin-bottom:8px;">Finanzielle Übersicht</h3>
        <p style="font-size:12px; color:var(--ink3);">IBAN: ${state.get('tenant')?.iban || 'Not set'}</p>
        <p style="font-size:12px; color:var(--ink3);">Bank: ${state.get('tenant')?.bank_name || 'Not set'}</p>
      </div>
    </div>
  `;

  rootEl.querySelector('#btn-export-datev').onclick = async () => {
    const leads = await supabase.db.getLeads();
    const exportData = leads.map(l => ({
      ID: l.id,
      Name: l.data?.Name,
      Email: l.data?.Email,
      Status: l.status,
      Date: l.created_at
    }));
    utils.exportToCSV(exportData, `salescockpit_leads_${new Date().toISOString().split('T')[0]}.csv`);
  };
}

export function unmount() {}
