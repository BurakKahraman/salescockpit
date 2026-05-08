/* ══════════════════════════════════════════════════════════
 * SalesCockpit Module — compliance.js (Legal & DSGVO)
 * ══════════════════════════════════════════════════════════ */

export const meta = {
  id: 'compliance',
  title: { de: 'Rechtliches', en: 'Compliance' },
  icon: '⚖️'
};

export async function mount(rootEl, ctx) {
  const l = ctx.state.get('lang') || 'de';
  
  rootEl.innerHTML = `
    <div style="padding: 24px; display: flex; flex-direction: column; gap: 32px; height: 100%; overflow-y: auto;">
      <h1 style="font-size: 24px; font-weight: 800; color: var(--navy)">Legal & Compliance</h1>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
        <section class="card" style="background:#fff; border:1px solid var(--bd); border-radius:12px; padding:20px;">
          <h2 style="font-size:14px; font-weight:700; margin-bottom:12px;">Impressum & Privacy</h2>
          <p style="font-size:12px; color:var(--ink3); line-height:1.6;">
            Gemäß DSGVO (GDPR) müssen alle Daten in der EU (Frankfurt) verarbeitet werden.
            Status: <b>Active (Supabase EU)</b>
          </p>
          <div style="margin-top:20px; display:flex; flex-direction:column; gap:10px;">
             <button class="btn-secondary">View Impressum</button>
             <button class="btn-secondary">View Privacy Policy (DSGVO)</button>
             <button class="btn-secondary">View Terms of Service (AGB)</button>
          </div>
        </section>

        <section class="card" style="background:#fff; border:1px solid var(--bd); border-radius:12px; padding:20px;">
          <h2 style="font-size:14px; font-weight:700; margin-bottom:12px;">Data Portability</h2>
          <p style="font-size:12px; color:var(--ink3); line-height:1.6;">
            Export all tenant data for compliance audits.
          </p>
          <button class="btn-primary" style="margin-top:20px;">Download Audit Log (JSON)</button>
        </section>
      </div>

      <div style="padding:16px; background:var(--bg); border-radius:12px; border:1px dashed var(--bd); font-size:11px; color:var(--ink3);">
        <b>Note:</b> This module is only visible to Admin/Owner roles.
      </div>
    </div>
  `;
}

export function unmount() {}
