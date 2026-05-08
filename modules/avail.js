/* ══════════════════════════════════════════════════════════
 * SalesCockpit Module — avail.js (Availability / Calendar)
 * ══════════════════════════════════════════════════════════ */

export const meta = {
  id: 'avail',
  title: { de: 'Verfügbarkeit', en: 'Availability' },
  icon: '📅'
};

let _ctx = null;

export async function mount(rootEl, ctx) {
  _ctx = ctx;
  const l = ctx.state.get('lang') || 'de';

  rootEl.innerHTML = `
    <div style="padding: 24px; display: flex; flex-direction: column; gap: 20px; height: 100%;">
      <h1 style="font-size: 24px; font-weight: 800; color: var(--navy)">${l === 'de' ? 'Verfügbarkeit' : 'Availability'}</h1>
      
      <div style="display:grid; grid-template-columns: 350px 1fr; gap:24px; flex:1; overflow:hidden;">
        <!-- Simple Date Picker Simulation -->
        <div style="background:#fff; border:1px solid var(--bd); border-radius:12px; padding:20px;">
          <div style="font-weight:700; margin-bottom:16px;">Datum wählen</div>
          <input type="date" class="ef-input" style="width:100%; margin-bottom:20px;" value="${new Date().toISOString().split('T')[0]}">
          
          <div style="font-size:11px; font-weight:700; color:var(--ink3); margin-bottom:8px; text-transform:uppercase;">Zeitfenster</div>
          <div style="display:flex; flex-direction:column; gap:8px;">
            <div style="padding:10px; background:var(--bg); border-radius:6px; font-size:13px; cursor:pointer;">10:00 - 12:00 (Frei)</div>
            <div style="padding:10px; background:var(--bg); border-radius:6px; font-size:13px; cursor:pointer;">14:00 - 16:00 (Belegt)</div>
            <div style="padding:10px; background:var(--bg); border-radius:6px; font-size:13px; cursor:pointer;">18:00 - 20:00 (Frei)</div>
          </div>
        </div>

        <!-- Slot Details -->
        <div style="background:#fff; border:1px solid var(--bd); border-radius:12px; padding:24px;">
           <div style="text-align:center; padding-top:100px; color:var(--ink3)">
             <p>Wähle links ein Datum und ein Zeitfenster, um Details zu sehen.</p>
           </div>
        </div>
      </div>
    </div>
  `;
}

export function unmount() {
  _ctx = null;
}
