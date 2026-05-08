/* ══════════════════════════════════════════════════════════
 * SalesCockpit Module — builder.js
 * ══════════════════════════════════════════════════════════ */

/**
 * Module metadata
 */
export const meta = {
  id: 'builder',
  title: { de: 'Offer Builder', en: 'Offer Builder' },
  icon: '📋'
};

let _ctx = null;

/**
 * Mount the module
 * @param {HTMLElement} rootEl - The container element
 * @param {object} ctx - Shared context (state, bus, utils, etc.)
 */
export async function mount(rootEl, ctx) {
  _ctx = ctx;
  const { state, i18n, utils } = ctx;
  const l = state.get('lang') || 'de';

  rootEl.innerHTML = `
    <div style="padding: 24px; display: flex; flex-direction: column; gap: 20px; height: 100%; overflow-y: auto;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h1 style="font-size: 24px; font-weight: 800; color: var(--navy)">${i18n.T('hd.title')}</h1>
        <div style="display: flex; gap: 8px;">
           <button class="btn-secondary" id="btn-lang-de">DE</button>
           <button class="btn-secondary" id="btn-lang-en">EN</button>
        </div>
      </div>
      
      <div style="background: #fff; border: 1px solid var(--bd); border-radius: 12px; padding: 20px; text-align: center;">
        <p style="color: var(--ink3)">Modüler yapıda ilk modül yüklendi! Monolitteki Builder kodları buraya taşınacak.</p>
        <div style="margin-top: 16px; font-size: 11px; color: var(--navy); font-weight: 600;">
           Current View: ${state.get('view')} | Lang: ${state.get('lang')}
        </div>
      </div>
    </div>
  `;

  // Internal events
  rootEl.querySelector('#btn-lang-de').onclick = () => state.set('lang', 'de');
  rootEl.querySelector('#btn-lang-en').onclick = () => state.set('lang', 'en');

  console.log('[module:builder] mounted');
}

/**
 * Cleanup when unmounting
 */
export function unmount() {
  console.log('[module:builder] unmounted');
  _ctx = null;
}
