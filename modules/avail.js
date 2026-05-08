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
  const { state } = ctx;
  const l = state.get('lang') || 'de';
  const tenant = state.get('tenant') || {};
  
  const googleLink = tenant.google_cal_id;
  const outlookLink = tenant.outlook_cal_id;

  rootEl.innerHTML = `
    <div style="padding: 24px; display: flex; flex-direction: column; gap: 20px; height: 100%;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <h1 style="font-size: 24px; font-weight: 800; color: var(--navy)">${l === 'de' ? 'Verfügbarkeit' : 'Availability'}</h1>
        <div style="display:flex; gap:10px;">
           <button class="btn-secondary" onclick="location.reload()">Refresh Sync</button>
        </div>
      </div>
      
      <div style="display:grid; grid-template-columns: 350px 1fr; gap:24px; flex:1; overflow:hidden;">
        <!-- Left: Quick Info -->
        <div style="background:#fff; border:1px solid var(--bd); border-radius:12px; padding:20px; overflow-y:auto;">
          <div style="font-weight:700; margin-bottom:12px; font-size:14px; color:var(--navy)">Integration Status</div>
          ${renderStatus(googleLink, outlookLink)}
          
          <div style="margin-top:24px; font-size:11px; color:var(--ink3); line-height:1.5;">
            Takviminiz burada görünmüyorsa lütfen <b>Venue Settings</b> alanından linkleri kontrol edin.
          </div>
        </div>

        <!-- Right: Calendar View -->
        <div id="cal-viewport" style="background:#fff; border:1px solid var(--bd); border-radius:12px; overflow:hidden; display:flex; align-items:center; justify-content:center;">
          ${renderCalendar(googleLink || outlookLink)}
        </div>
      </div>
    </div>
  `;
}

function renderStatus(g, o) {
  return `
    <div style="display:flex; flex-direction:column; gap:10px;">
      <div style="display:flex; align-items:center; gap:8px; font-size:12px;">
        <span style="color:${g ? 'var(--green)' : 'var(--red)'}">${g ? '●' : '○'}</span> Google Calendar: ${g ? 'Connected' : 'Not Linked'}
      </div>
      <div style="display:flex; align-items:center; gap:8px; font-size:12px;">
        <span style="color:${o ? 'var(--green)' : 'var(--red)'}">${o ? '●' : '○'}</span> Outlook Calendar: ${o ? 'Connected' : 'Not Linked'}
      </div>
    </div>
  `;
}

function renderCalendar(link) {
  if (!link) {
    return `
      <div style="text-align:center; padding:40px;">
        <div style="font-size:48px; margin-bottom:16px;">🗓️</div>
        <div style="font-weight:700; color:var(--navy); margin-bottom:8px;">Kein Takvim Bağlantısı</div>
        <p style="color:var(--ink3); font-size:13px;">Lütfen ayarlardan bir takvim linki ekleyin.</p>
        <button class="btn-primary" style="margin-top:20px;" onclick="window.dispatchEvent(new CustomEvent('nav', {detail: 'settings'}))">Ayarlara Git</button>
      </div>
    `;
  }
  
  // Basic iframe renderer for shared links
  return `<iframe src="${link}" style="border:0; width:100%; height:100%;" frameborder="0" scrolling="no"></iframe>`;
}

export function unmount() {
  _ctx = null;
}
