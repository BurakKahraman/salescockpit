/* ══════════════════════════════════════════════════════════
 * SalesCockpit Module — stats.js (Analytics)
 * ══════════════════════════════════════════════════════════ */

export const meta = {
  id: 'stats',
  title: { de: 'Statistik', en: 'Statistics' },
  icon: '📊'
};

export async function mount(rootEl, ctx) {
  rootEl.innerHTML = `
    <div style="padding: 24px; display: flex; flex-direction: column; gap: 20px;">
      <h1 style="font-size: 24px; font-weight: 800; color: var(--navy)">Analytics</h1>
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
    </div>
  `;
}

export function unmount() {}
