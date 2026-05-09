/* ══════════════════════════════════════════════════════════
 * SalesCockpit Module — avail.js (Availability / Calendar)
 * Shows connected calendar iframes from tenant settings
 * ══════════════════════════════════════════════════════════ */

export const meta = {
  id: 'avail',
  title: { de: 'Verfügbarkeit', en: 'Availability' },
  icon: '📅'
};

let _ctx = null;

export async function mount(rootEl, ctx) {
  _ctx = ctx;
  _render(rootEl, ctx);
}

function _render(rootEl, ctx) {
  const tenant      = ctx.state.get('tenant') || {};
  const googleLink  = tenant.google_cal_id  || '';
  const outlookLink = tenant.outlook_cal_id || '';
  const activeLink  = googleLink || outlookLink;

  rootEl.innerHTML = `
    <div style="display:flex;height:100%;overflow:hidden">

      <!-- Left panel: status -->
      <div style="width:240px;flex-shrink:0;border-right:1px solid var(--bd);background:#fff;display:flex;flex-direction:column;overflow:hidden">
        <div style="padding:14px 16px;border-bottom:1px solid var(--bd);font-size:11px;font-weight:700;color:var(--navy)">Kalender Status</div>
        <div style="padding:16px;flex:1;overflow-y:auto">

          <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:20px">
            <div style="display:flex;align-items:center;gap:8px;font-size:12px;padding:10px 12px;border-radius:var(--r);border:1px solid ${googleLink ? 'rgba(21,128,61,.2)' : 'var(--bd)'}">
              <div style="width:8px;height:8px;border-radius:50%;background:${googleLink ? 'var(--green)' : 'var(--bd2)'};flex-shrink:0"></div>
              <div>
                <div style="font-weight:600;color:var(--navy)">Google Calendar</div>
                <div style="font-size:10px;color:var(--ink3)">${googleLink ? 'Verbunden' : 'Nicht konfiguriert'}</div>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:8px;font-size:12px;padding:10px 12px;border-radius:var(--r);border:1px solid ${outlookLink ? 'rgba(21,128,61,.2)' : 'var(--bd)'}">
              <div style="width:8px;height:8px;border-radius:50%;background:${outlookLink ? 'var(--green)' : 'var(--bd2)'};flex-shrink:0"></div>
              <div>
                <div style="font-weight:600;color:var(--navy)">Outlook Calendar</div>
                <div style="font-size:10px;color:var(--ink3)">${outlookLink ? 'Verbunden' : 'Nicht konfiguriert'}</div>
              </div>
            </div>
          </div>

          ${activeLink ? `
            <div style="display:flex;flex-direction:column;gap:6px">
              ${googleLink  ? `<button class="btn-secondary" id="btn-show-google"  style="font-size:11px;text-align:left">📅 Google anzeigen</button>`  : ''}
              ${outlookLink ? `<button class="btn-secondary" id="btn-show-outlook" style="font-size:11px;text-align:left">📆 Outlook anzeigen</button>` : ''}
            </div>` : ''}

          <div style="margin-top:20px;padding:12px;background:var(--s1);border-radius:var(--r);font-size:11px;color:var(--ink3);line-height:1.5">
            💡 Kalender-Links werden in den <strong>Einstellungen</strong> konfiguriert. Externe Kalender müssen als öffentlicher oder freigegebener Link verfügbar sein.
          </div>

          <button class="btn-secondary" id="btn-go-settings" style="width:100%;margin-top:12px;font-size:11px">
            → Einstellungen öffnen
          </button>
        </div>
      </div>

      <!-- Right: calendar view -->
      <div id="cal-view" style="flex:1;overflow:hidden;background:var(--s1);display:flex;align-items:center;justify-content:center">
        ${activeLink
          ? `<iframe src="${activeLink}" style="border:0;width:100%;height:100%" frameborder="0" scrolling="no" title="Kalender"></iframe>`
          : `<div style="text-align:center;padding:40px;color:var(--ink3)">
              <div style="font-size:48px;margin-bottom:16px">🗓️</div>
              <div style="font-size:14px;font-weight:600;color:var(--ink2);margin-bottom:6px">Kein Kalender verknüpft</div>
              <div style="font-size:12px;margin-bottom:20px">Kalender-Links in den Einstellungen hinterlegen.</div>
              <button class="btn-primary" id="btn-go-settings-center">Einstellungen öffnen</button>
            </div>`}
      </div>
    </div>
  `;

  rootEl.querySelector('#btn-go-settings')?.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('nav', { detail: 'settings' }));
  });
  rootEl.querySelector('#btn-go-settings-center')?.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('nav', { detail: 'settings' }));
  });

  if (googleLink) {
    rootEl.querySelector('#btn-show-google')?.addEventListener('click', () => {
      rootEl.querySelector('#cal-view').innerHTML =
        `<iframe src="${googleLink}" style="border:0;width:100%;height:100%" frameborder="0" scrolling="no" title="Google Kalender"></iframe>`;
    });
  }
  if (outlookLink) {
    rootEl.querySelector('#btn-show-outlook')?.addEventListener('click', () => {
      rootEl.querySelector('#cal-view').innerHTML =
        `<iframe src="${outlookLink}" style="border:0;width:100%;height:100%" frameborder="0" scrolling="no" title="Outlook Kalender"></iframe>`;
    });
  }
}

export function unmount() {
  _ctx = null;
}
