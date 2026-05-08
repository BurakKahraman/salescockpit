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
import * as pricing from '../engine/pricing.js';
import * as templates from '../engine/templates.js';
import * as decision from '../engine/decision.js';

export async function mount(rootEl, ctx) {
  _ctx = ctx;
  const { state } = ctx;
  const type = state.get('type') || 'b2b';
  const priceList = state.get('priceList') || {};

  rootEl.innerHTML = `
    <style>
      @media (max-width: 1024px) {
        #builder-main { flex-direction: column !important; overflow-y: auto !important; }
        #bl-left, #bl-right { width: 100% !important; border: none !important; border-bottom: 1px solid var(--bd); height: auto !important; }
        #bl-center { height: 500px !important; flex: none !important; }
      }
    </style>
    <div id="builder-container" style="display:flex; flex-direction:column; height:100%">
      <div id="stage-tabs-bar" class="stbar" style="background:var(--s0); border-bottom:1px solid var(--bd); padding:0 12px; display:flex; gap:2px; overflow-x:auto"></div>
      
      <div id="builder-main" style="flex:1; display:flex; overflow:hidden">
        <!-- Left: Price Index -->
        <div id="bl-left" style="width:220px; border-right:1px solid var(--bd); padding:16px; background:var(--bg); overflow-y:auto">
          <div style="font-size:10px; font-weight:700; color:var(--ink3); margin-bottom:12px; text-transform:uppercase">Paketauswahl</div>
          ${renderPriceIndex(priceList[type])}
        </div>

        <!-- Center: Editor -->
        <div id="bl-center" style="flex:1; display:flex; flex-direction:column; background:#fff">
           <div id="email-toolbar" style="padding:12px 20px; border-bottom:1px solid var(--bd); display:flex; justify-content:space-between; align-items:center;">
              <div style="font-weight:700; color:var(--navy)">E-Mail Entwurf</div>
              <button class="btn-primary" id="btn-copy">Copy to Clipboard</button>
           </div>
           <textarea id="email-body" class="ef-textarea" style="flex:1; border:none; padding:24px; font-family:monospace; resize:none; font-size:13px; line-height:1.6;"></textarea>
        </div>

        <!-- Right: Signals -->
        <div id="bl-right" style="width:280px; border-left:1px solid var(--bd); padding:16px; background:var(--bg); overflow-y:auto">
           <div style="font-size:10px; font-weight:700; color:var(--ink3); margin-bottom:12px; text-transform:uppercase">Entscheidungshilfe</div>
           <div id="decision-content"></div>
        </div>
      </div>
    </div>
  `;

  renderStageTabs(rootEl);
  attachEvents(rootEl);
  updatePreview(rootEl);
}

function renderPriceIndex(families = []) {
  return families.map(fam => `
    <div style="margin-bottom:16px;">
      <div style="font-size:11px; font-weight:700; color:${fam.color}; margin-bottom:4px;">${fam.name}</div>
      ${fam.tiers.map(t => `
        <div class="tier-chip" data-key="${t.key}" style="padding:6px 10px; background:#fff; border:1px solid var(--bd); border-radius:6px; font-size:12px; cursor:pointer; margin-bottom:4px;">
          ${t.lbl.de || t.lbl}
        </div>
      `).join('')}
    </div>
  `).join('');
}

function attachEvents(rootEl) {
  rootEl.querySelectorAll('.tier-chip').forEach(chip => {
    chip.onclick = () => {
      _ctx.state.set('selectedTier', chip.dataset.key);
      updatePreview(rootEl);
    };
  });
}

function updatePreview(rootEl) {
  const tierKey = _ctx.state.get('selectedTier');
  const lead = _ctx.state.get('activeLead') || { NAME: 'Burak' };
  const lang = _ctx.state.get('lang') || 'de';
  
  // Get package details
  const pkg = pricing.getPackageDetails(tierKey);
  const contents = pricing.getPackageContents(tierKey, lang);
  
  // Find template (simplified for now)
  const templates = _ctx.state.get('templates');
  const tmpl = templates.b2b.de.offer[0]; // First offer template as default
  
  const rendered = templates.render(tmpl.body, lead, {
    placeholders: {
      PACKAGE: pkg ? pkg.lbl[lang] : '...',
      PKG_CONTENTS: contents
    }
  });

  rootEl.querySelector('#email-body').value = rendered;
}

function renderStageTabs(rootEl) {
  const bar = rootEl.querySelector('#stage-tabs-bar');
  const stages = [
    {key:'discovery', de:'Erstkontakt', en:'Discovery'},
    {key:'offer', de:'Angebot', en:'Quote'},
    {key:'slot', de:'Verfügbarkeit', en:'Availability'},
    {key:'booked', de:'Gebucht', en:'Signed'},
    {key:'other', de:'Follow-up', en:'Follow-up'}
  ];
  
  stages.forEach((st, i) => {
    const btn = document.createElement('div');
    btn.className = 'stab' + (st.key === _ctx.state.get('stage') ? ' active' : '');
    btn.innerHTML = `<span class="stab-n">${i+1}</span> ${st[_ctx.state.get('lang')]}`;
    btn.onclick = () => {
      _ctx.state.set('stage', st.key);
      rootEl.querySelectorAll('.stab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    };
    bar.appendChild(btn);
  });
}

/**
 * Cleanup when unmounting
 */
export function unmount() {
  console.log('[module:builder] unmounted');
  _ctx = null;
}
