/* ══════════════════════════════════════════════════════════
 * SalesCockpit Module — builder.js
 * ══════════════════════════════════════════════════════════ */

import * as pricing from '../engine/pricing.js';
import * as templateEngine from '../engine/templates.js';
import * as decision from '../engine/decision.js';

/**
 * Module metadata
 */
export const meta = {
  id: 'builder',
  title: { de: 'Custom Offer Builder', en: 'Custom Offer Builder' },
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
  const { state } = ctx;
  const activeLead = state.get('activeLead');
  const leadName = activeLead?.data?.Name || 'Guest';
  const type = state.get('type') || 'b2b';
  const lang = state.get('lang') || 'de';
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
          <h2 style="font-size:12px; font-weight:700; margin-bottom:12px; color:var(--navy)">
             ${activeLead ? 'Editing: ' + leadName : 'Select a Lead'}
          </h2>
          <div style="font-size:10px; font-weight:700; color:var(--ink3); margin-bottom:12px; text-transform:uppercase">Paketauswahl</div>
          ${renderPriceIndex(priceList[type], lang)}
        </div>

        <!-- Center: Editor -->
        <div id="bl-center" style="flex:1; display:flex; flex-direction:column; background:#fff">
           <div id="email-toolbar" style="padding:12px 20px; border-bottom:1px solid var(--bd); display:flex; justify-content:space-between; align-items:center;">
              <div style="font-weight:700; color:var(--navy)">E-Mail Entwurf</div>
              <div style="display:flex; gap:8px;">
                <button class="btn-primary" id="btn-copy">Copy to Clipboard</button>
                <button class="btn-primary" id="btn-send" style="background:var(--blue)">Send via Mail</button>
              </div>
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

function renderPriceIndex(families = [], lang = 'de') {
  return families.map(fam => {
    const famName = typeof fam.name === 'object' ? (fam.name[lang] || fam.name.de) : fam.name;
    return `
    <div style="margin-bottom:16px;">
      <div style="font-size:11px; font-weight:700; color:${fam.color}; margin-bottom:4px;">${famName}</div>
      ${fam.tiers.map(t => `
        <div class="tier-chip" data-key="${t.key}" style="padding:6px 10px; background:#fff; border:1px solid var(--bd); border-radius:6px; font-size:12px; cursor:pointer; margin-bottom:4px;">
          ${typeof t.lbl === 'object' ? (t.lbl[lang] || t.lbl.de) : t.lbl}
        </div>
      `).join('')}
    </div>
  `}).join('');
}

function attachEvents(rootEl) {
  rootEl.querySelectorAll('.tier-chip').forEach(chip => {
    chip.onclick = () => {
      let selected = _ctx.state.get('selectedTiers') || [];
      const key = chip.dataset.key;
      
      if (selected.includes(key)) {
        selected = selected.filter(k => k !== key); // Deselect
      } else {
        if (selected.length < 3) selected.push(key); // Select
        else alert(_ctx.state.get('lang') === 'de' ? 'Maximal 3 Pakete auswählbar.' : 'Maximum 3 packages selectable.');
      }
      
      _ctx.state.set('selectedTiers', selected);
      
      // Highlight selected
      rootEl.querySelectorAll('.tier-chip').forEach(c => {
        if (selected.includes(c.dataset.key)) {
          c.style.border = '2px solid var(--navy)';
          c.style.background = 'var(--s0)';
        } else {
          c.style.border = '1px solid var(--bd)';
          c.style.background = '#fff';
        }
      });
      updatePreview(rootEl);
    };
  });

  // Copy button
  const copyBtn = rootEl.querySelector('#btn-copy');
  if (copyBtn) {
    copyBtn.onclick = () => {
      const textarea = rootEl.querySelector('#email-body');
      if (textarea) {
        navigator.clipboard.writeText(textarea.value).then(() => {
          copyBtn.textContent = '✓ Copied!';
          setTimeout(() => { copyBtn.textContent = 'Copy to Clipboard'; }, 2000);
        });
      }
    };
  }

  // Send button
  const sendBtn = rootEl.querySelector('#btn-send');
  if (sendBtn) {
    sendBtn.onclick = () => {
      const textarea = rootEl.querySelector('#email-body');
      if (textarea) {
        const lead = _ctx.state.get('activeLead');
        const email = lead?.data?.Email || '';
        const sel = _ctx.state.get('selectedTiers') || [];
        const subject = encodeURIComponent('Angebot: ' + (sel.length > 0 ? sel.join(', ') : 'Event'));
        const body = encodeURIComponent(textarea.value);
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      }
    };
  }
}

function updatePreview(rootEl) {
  const selectedKeys = _ctx.state.get('selectedTiers') || [];
  const lead = _ctx.state.get('activeLead') || { NAME: 'Gast' };
  const lang = _ctx.state.get('lang') || 'de';
  const type = _ctx.state.get('type') || 'b2b';

  if (selectedKeys.length === 0) {
    rootEl.querySelector('#email-body').value = lang === 'de' 
      ? '← Bitte wählen Sie bis zu 3 Pakete aus der linken Seite.' 
      : '← Please select up to 3 packages from the left panel.';
    return;
  }
  
  // Need to get crossTransitions from state
  const transitions = _ctx.state.get('crossTransitions') || {};
  const transLang = transitions[lang] || {};

  let packagesText = '';
  
  selectedKeys.forEach((tierKey, index) => {
    const pkg = pricing.getPackageDetails(tierKey);
    const contents = pricing.getPackageContents(tierKey, lang);
    const price = pricing.getPrice(tierKey, type);
    const pkgLabel = pkg ? (typeof pkg.lbl === 'object' ? pkg.lbl[lang] : pkg.lbl) : tierKey;
    
    let transitionSentence = '';
    if (index > 0) {
      const prevKey = selectedKeys[index - 1];
      const transKey = `${prevKey}→${tierKey}`;
      transitionSentence = transLang[transKey] || (lang === 'de' ? 'Oder als Alternative:' : 'Or as an alternative:');
      packagesText += `\n\n${transitionSentence}\n\n`;
    }
    
    packagesText += `🔹 ${pkgLabel} (${price} €)\n${contents}`;
  });
  
  // Find template from state data
  const tmplData = _ctx.state.get('templates');
  let tmpl = null;
  
  try {
    const stage = _ctx.state.get('stage') || 'offer';
    if (tmplData && tmplData[type] && tmplData[type][lang] && tmplData[type][lang][stage]) {
      tmpl = tmplData[type][lang][stage][0]; // First template for this stage
    }
  } catch(e) {
    console.warn('[builder] Template lookup failed:', e);
  }
  
  if (tmpl && typeof templateEngine.render === 'function') {
    const rendered = templateEngine.render(tmpl.body || tmpl.ms || '', lead, {
      placeholders: {
        PACKAGE: selectedKeys.length > 1 ? (lang === 'de' ? 'verschiedene Optionen' : 'different options') : (pricing.getPackageDetails(selectedKeys[0])?.lbl?.[lang] || '...'),
        PKG_CONTENTS: packagesText
      }
    });
    rootEl.querySelector('#email-body').value = rendered;
  } else {
    // Fallback: display packages directly
    rootEl.querySelector('#email-body').value = packagesText;
  }
}

function renderStageTabs(rootEl) {
  const bar = rootEl.querySelector('#stage-tabs-bar');
  const lang = _ctx.state.get('lang') || 'de';
  const stages = [
    {key:'discovery', de:'Erstkontakt', en:'Discovery'},
    {key:'offer', de:'Angebot', en:'Quote'},
    {key:'slot', de:'Verfügbarkeit', en:'Availability'},
    {key:'booked', de:'Gebucht', en:'Signed'},
    {key:'other', de:'Follow-up', en:'Follow-up'}
  ];
  
  stages.forEach((st, i) => {
    const btn = document.createElement('div');
    btn.className = 'stab' + (st.key === (_ctx.state.get('stage') || 'discovery') ? ' active' : '');
    btn.innerHTML = `<span class="stab-n">${i+1}</span> ${st[lang]}`;
    btn.onclick = () => {
      _ctx.state.set('stage', st.key);
      rootEl.querySelectorAll('.stab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updatePreview(rootEl);
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
