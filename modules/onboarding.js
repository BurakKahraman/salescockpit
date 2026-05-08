/* ══════════════════════════════════════════════════════════
 * SalesCockpit Module — onboarding.js (New Venue Setup)
 * ══════════════════════════════════════════════════════════ */

export const meta = {
  id: 'onboarding',
  title: { de: 'Willkommen', en: 'Onboarding' },
  icon: '🚀'
};

export async function mount(rootEl, ctx) {
  rootEl.innerHTML = `
    <div style="padding: 60px; text-align: center; max-width: 600px; margin: 0 auto;">
      <h1 style="font-size: 32px; font-weight: 800; color: var(--navy); margin-bottom: 16px;">Willkommen bei SalesCockpit!</h1>
      <p style="font-size: 16px; color: var(--ink3); line-height: 1.6; margin-bottom: 40px;">
        In nur 3 Schritten ist Ihr Virtual Reality Park bereit für vollautomatisierten Vertrieb.
      </p>

      <div style="text-align: left; display: flex; flex-direction: column; gap: 20px;">
        <div style="padding: 20px; background: #fff; border: 1px solid var(--bd); border-radius: 12px; display: flex; gap: 16px; align-items: center;">
          <div style="width:32px; height:32px; background:var(--navy); color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700;">1</div>
          <div>
            <div style="font-weight:700;">Business Info</div>
            <div style="font-size:12px; color:var(--ink3);">Hinterlegen Sie IBAN und Firmendaten für Ihre Angebote.</div>
          </div>
        </div>

        <div style="padding: 20px; background: #fff; border: 1px solid var(--bd); border-radius: 12px; display: flex; gap: 16px; align-items: center;">
          <div style="width:32px; height:32px; background:var(--navy); color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700;">2</div>
          <div>
            <div style="font-weight:700;">Calendar Sync</div>
            <div style="font-size:12px; color:var(--ink3);">Verbinden Sie Ihren Google oder Outlook Kalender.</div>
          </div>
        </div>

        <div style="padding: 20px; background: #fff; border: 1px solid var(--bd); border-radius: 12px; display: flex; gap: 16px; align-items: center;">
          <div style="width:32px; height:32px; background:var(--navy); color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700;">3</div>
          <div>
            <div style="font-weight:700;">Lead Import</div>
            <div style="font-size:12px; color:var(--ink3);">Importieren Sie Ihre bestehenden Anfragen per CSV.</div>
          </div>
        </div>
      </div>

      <button class="btn-primary" style="margin-top: 40px; padding: 16px 32px; font-size: 16px;" onclick="window.dispatchEvent(new CustomEvent('nav', {detail: 'settings'}))">
        Jetzt starten →
      </button>
    </div>
  `;
}

export function unmount() {}
