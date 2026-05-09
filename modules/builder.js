/* ══════════════════════════════════════════════════════════
 * SalesCockpit Module — builder.js
 * Offer Builder: stage tabs, template select, email preview
 * ══════════════════════════════════════════════════════════ */

import * as pricingEngine   from '../engine/pricing.js';
import * as templateEngine  from '../engine/templates.js';
import * as decisionEngine  from '../engine/decision.js';

export const meta = {
  id: 'builder',
  title: { de: 'Offer Builder', en: 'Offer Builder' },
  icon: '📋'
};

let _ctx         = null;
let _stage       = 'discovery';
let _tmplIndex   = 0;
let _mirrorIndex = 0;
let _tierKey     = null;

export async function mount(rootEl, ctx) {
  _ctx   = ctx;
  const { state } = ctx;
  _stage = state.get('stage') || 'discovery';

  rootEl.innerHTML = `
    <div style="display:flex;flex-direction:column;height:100%;overflow:hidden">

      <!-- Stage Tabs -->
      <div id="stage-tabs-bar" style="background:#fff;border-bottom:1px solid var(--bd);display:flex;padding:0 16px;overflow-x:auto;flex-shrink:0"></div>

      <!-- Lead Search Bar -->
      <div id="builder-search-bar" style="background:#fff;border-bottom:1px solid var(--bd);padding:8px 16px;flex-shrink:0;display:flex;align-items:center;gap:10px;">
        <div style="position:relative;flex:1;max-width:400px">
          <svg style="position:absolute;left:9px;top:50%;transform:translateY(-50%);color:var(--ink3)" width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="6" cy="6" r="4"/><path d="M10 10l3 3"/></svg>
          <input id="bs-input" type="text" placeholder="Lead suche (Name, Email)…" autocomplete="off"
            style="width:100%;padding:6px 10px 6px 30px;background:var(--s1);border:1px solid var(--bd);border-radius:var(--r);font-size:12px;outline:none">
          <div id="bs-drop" style="display:none;position:absolute;top:calc(100% + 4px);left:0;right:0;background:#fff;border:1px solid var(--bd);border-radius:var(--rmd);box-shadow:var(--sh3);z-index:50;max-height:260px;overflow-y:auto"></div>
        </div>
        <div id="bs-lead-tag" style="display:none;align-items:center;gap:6px;background:var(--nb);border:1px solid rgba(1,24,72,.15);border-radius:100px;padding:3px 10px;font-size:11px;font-weight:600;color:var(--navy)">
          <span id="bs-lead-name">–</span>
          <span id="bs-lead-clear" style="cursor:pointer;color:var(--ink3);font-size:14px;line-height:1">×</span>
        </div>
      </div>

      <!-- Three-panel workspace -->
      <div id="builder-main" style="flex:1;display:flex;overflow:hidden;min-height:0">

        <!-- Left: Package index + template selector -->
        <div id="bl-left" style="width:230px;border-right:1px solid var(--bd);background:var(--s1);display:flex;flex-direction:column;overflow:hidden">
          <div style="padding:10px 12px;border-bottom:1px solid var(--bd);font-size:9px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;color:var(--ink3)">Paket wählen</div>
          <div id="pkg-list" style="flex:1;overflow-y:auto;padding:10px 10px 8px"></div>
          <div style="padding:10px 12px;border-top:1px solid var(--bd);font-size:9px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;color:var(--ink3)">Vorlage</div>
          <div id="tmpl-list" style="overflow-y:auto;max-height:180px;padding:6px 10px 10px"></div>
        </div>

        <!-- Center: Email editor -->
        <div id="bl-center" style="flex:1;display:flex;flex-direction:column;background:#fff;overflow:hidden">
          <div style="padding:10px 16px;border-bottom:1px solid var(--bd);display:flex;align-items:center;justify-content:space-between;flex-shrink:0">
            <div>
              <div style="font-size:11px;font-weight:700;color:var(--navy)" id="em-stage-lbl">—</div>
              <div style="font-size:10px;color:var(--ink3);margin-top:1px" id="em-tmpl-lbl">Keine Vorlage gewählt</div>
            </div>
            <div style="display:flex;gap:6px">
              <button class="btn-secondary" id="btn-mirror" style="font-size:11px;padding:5px 10px">Mirror wechseln</button>
              <button class="btn-primary"   id="btn-copy"   style="font-size:11px;padding:5px 10px">📋 Kopieren</button>
            </div>
          </div>
          <div style="padding:8px 16px;border-bottom:1px solid var(--bd);flex-shrink:0;display:flex;gap:6px;align-items:center">
            <span style="font-size:10px;font-weight:600;color:var(--ink3)">Betreff:</span>
            <input id="em-subject" style="flex:1;border:none;font-size:12px;font-weight:600;color:var(--navy);outline:none;background:none" placeholder="—">
          </div>
          <textarea id="email-body" style="flex:1;border:none;padding:18px 20px;font-size:12.5px;line-height:1.7;resize:none;outline:none;font-family:var(--font);color:var(--ink)"></textarea>
        </div>

        <!-- Right: Decision panel -->
        <div id="bl-right" style="width:270px;border-left:1px solid var(--bd);background:var(--s1);overflow-y:auto;padding:12px">
          <div style="font-size:9px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;color:var(--ink3);margin-bottom:8px">Entscheidungshilfe</div>
          <div id="decision-panel">
            <div style="font-size:11px;color:var(--ink3);padding:20px 0;text-align:center">Lead wählen für Empfehlungen</div>
          </div>
        </div>

      </div>
    </div>
  `;

  _renderStageTabs(rootEl);
  _renderPkgList(rootEl);
  _renderTmplList(rootEl);
  _renderEmail(rootEl);
  _renderDecision(rootEl);
  _attachEvents(rootEl);
}

/* ── Stage tabs ── */
function _renderStageTabs(rootEl) {
  const bar = rootEl.querySelector('#stage-tabs-bar');
  const stages = [
    { key: 'discovery', de: '🔍 Erstkontakt',      en: '🔍 Discovery' },
    { key: 'offer',     de: '📋 Angebot',          en: '📋 Quote' },
    { key: 'slot',      de: '📅 Terminbestätigung', en: '📅 Slot Confirm' },
    { key: 'booked',    de: '✅ Gebucht',           en: '✅ Booked' },
    { key: 'other',     de: '⚡ Follow-up',         en: '⚡ Follow-up' }
  ];
  const lang = _ctx.state.get('lang') || 'de';
  bar.innerHTML = stages.map(s => `
    <div class="stab${s.key === _stage ? ' active' : ''}" data-stage="${s.key}"
      style="padding:10px 14px;font-size:11px;font-weight:500;color:${s.key === _stage ? 'var(--navy)' : 'var(--ink3)'};
             border-bottom:2px solid ${s.key === _stage ? 'var(--navy)' : 'transparent'};
             cursor:pointer;white-space:nowrap;transition:all .15s">
      ${s[lang]}
    </div>
  `).join('');

  bar.querySelectorAll('.stab').forEach(btn => {
    btn.onclick = () => {
      _stage      = btn.dataset.stage;
      _tmplIndex  = 0;
      _mirrorIndex = 0;
      _ctx.state.set('stage', _stage);
      _renderStageTabs(rootEl);
      _renderTmplList(rootEl);
      _renderEmail(rootEl);
      _renderDecision(rootEl);
    };
  });
}

/* ── Package list ── */
function _renderPkgList(rootEl) {
  const type      = _ctx.state.get('type') || 'b2b';
  const priceList = _ctx.state.get('priceList') || {};
  const families  = priceList[type] || [];
  const lang      = _ctx.state.get('lang') || 'de';

  rootEl.querySelector('#pkg-list').innerHTML = families.map(fam => `
    <div style="margin-bottom:12px">
      <div style="font-size:10px;font-weight:700;color:${fam.color};margin-bottom:5px;display:flex;align-items:center;gap:5px">
        <span style="width:7px;height:7px;border-radius:50%;background:${fam.color};flex-shrink:0"></span>
        ${typeof fam.name === 'string' ? fam.name : (fam.name[lang] || fam.name.de)}
        <span style="font-size:9px;color:var(--ink3);margin-left:auto">${fam.cap?.[lang] || ''}</span>
      </div>
      ${fam.tiers.map(t => {
        const price   = pricingEngine.getPrice(t.key, type);
        const isActive = _tierKey === t.key;
        return `
          <div class="pkg-tier" data-key="${t.key}"
            style="padding:6px 9px;border-radius:var(--rsm);border:1px solid ${isActive ? fam.color : 'var(--bd)'};
                   background:${isActive ? fam.color + '12' : '#fff'};
                   cursor:pointer;margin-bottom:3px;display:flex;justify-content:space-between;align-items:center;
                   transition:all .12s">
            <span style="font-size:11px;font-weight:${isActive ? '700' : '500'};color:${isActive ? fam.color : 'var(--ink2)'}">
              ${t.lbl?.[lang] || t.lbl}
            </span>
            <span style="font-size:11px;font-weight:700;color:${isActive ? fam.color : 'var(--navy)'}">
              ${price ? price.toLocaleString('de-DE') + ' €' : '—'}
            </span>
          </div>`;
      }).join('')}
    </div>
  `).join('');

  rootEl.querySelectorAll('.pkg-tier').forEach(el => {
    el.onclick = () => {
      _tierKey = el.dataset.key;
      _renderPkgList(rootEl);
      _renderEmail(rootEl);
    };
  });
}

/* ── Template list ── */
function _renderTmplList(rootEl) {
  const type  = _ctx.state.get('type') || 'b2b';
  const lang  = _ctx.state.get('lang') || 'de';
  const tmpls = (_ctx.state.get('templates')?.[type]?.[lang]?.[_stage]) || [];

  rootEl.querySelector('#tmpl-list').innerHTML = tmpls.length
    ? tmpls.map((t, i) => `
        <div class="tmpl-chip" data-idx="${i}"
          style="padding:6px 9px;border-radius:var(--r);border:1px solid ${i === _tmplIndex ? 'var(--navy)' : 'var(--bd)'};
                 background:${i === _tmplIndex ? 'var(--nb)' : '#fff'};
                 cursor:pointer;font-size:11px;font-weight:${i === _tmplIndex ? '600' : '400'};
                 color:${i === _tmplIndex ? 'var(--navy)' : 'var(--ink2)'};margin-bottom:4px;
                 white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:all .12s">
          ${t.label}
        </div>
      `).join('')
    : `<div style="font-size:11px;color:var(--ink3);padding:8px 2px">Keine Vorlagen für diese Stage</div>`;

  rootEl.querySelectorAll('.tmpl-chip').forEach(el => {
    el.onclick = () => {
      _tmplIndex  = parseInt(el.dataset.idx);
      _mirrorIndex = 0;
      _renderTmplList(rootEl);
      _renderEmail(rootEl);
    };
  });
}

/* ── Email preview ── */
function _renderEmail(rootEl) {
  const type   = _ctx.state.get('type') || 'b2b';
  const lang   = _ctx.state.get('lang') || 'de';
  const lead   = _ctx.state.get('activeLead')?.data || {};
  const tmpls  = (_ctx.state.get('templates')?.[type]?.[lang]?.[_stage]) || [];
  const tmpl   = tmpls[_tmplIndex];
  const stages = _ctx.state.get('stages') || {};

  // Stage label
  const stageLabel = stages?.[lang]?.[_stage] || _stage;
  const tmplLabel  = tmpl ? tmpl.label : '—';

  rootEl.querySelector('#em-stage-lbl').textContent  = stageLabel;
  rootEl.querySelector('#em-tmpl-lbl').textContent   = tmplLabel;
  rootEl.querySelector('#em-subject').value           = tmpl ? templateEngine.render(tmpl.subject || '', lead) : '';

  if (!tmpl) {
    rootEl.querySelector('#email-body').value = 'Keine Vorlage für diese Stage gefunden.';
    return;
  }

  // Pick mirror
  const mirrors    = tmpl.mirrors || [];
  const mirror     = mirrors[_mirrorIndex % Math.max(mirrors.length, 1)] || '';

  // Build extra placeholder map
  const tierDetails = _tierKey ? pricingEngine.getPackageDetails(_tierKey, type) : null;
  const extra = {
    placeholders: {
      MIRROR:     mirror,
      AVAIL_NOTE: '',
      PACKAGE:    tierDetails ? (tierDetails.lbl?.[lang] || '') : '',
    }
  };

  rootEl.querySelector('#email-body').value = templateEngine.render(tmpl.body, lead, extra);
}

/* ── Decision panel ── */
function _renderDecision(rootEl) {
  const lead  = _ctx.state.get('activeLead')?.data || null;
  const lang  = _ctx.state.get('lang') || 'de';
  const panel = rootEl.querySelector('#decision-panel');

  if (!lead) {
    panel.innerHTML = `<div style="font-size:11px;color:var(--ink3);padding:20px 0;text-align:center">Lead wählen für persönliche Empfehlungen</div>`;
    return;
  }

  const group    = parseInt(lead.GROUP || lead.group || 0);
  let recKey     = 'arena3';
  let recFamily  = 'Arena Event';
  let recColor   = '#1B5E9B';
  if (group > 25)      { recKey = 'prem3';  recFamily = 'Premium';       recColor = '#6B21A8'; }
  else if (group > 15) { recKey = 'venue3'; recFamily = 'Venue Booking'; recColor = '#0d7985'; }

  const signals = [];
  if (!lead.GROUP && !lead.group)              signals.push({ t: lang === 'de' ? 'Gruppengröße fehlt'  : 'Group size missing',   c: 'amber' });
  if (!lead['EVENT DATE'] && !lead.date)       signals.push({ t: lang === 'de' ? 'Datum offen'         : 'Date not set',         c: 'amber' });
  if (lead.EMAIL || lead.email)                signals.push({ t: lang === 'de' ? 'E-Mail vorhanden'    : 'Email available',      c: 'green' });
  if (lead.PHONE || lead.phone)                signals.push({ t: lang === 'de' ? 'Telefon vorhanden'   : 'Phone available',      c: 'green' });

  const questions = {
    discovery: ['Wie viele Personen?', 'Welcher Anlass?', 'Gibt es ein Budget?'],
    offer:     ['Welches Format bevorzugen Sie?', 'Haben Sie Fragen zum Paket?', 'Termin schon festgelegt?'],
    slot:      ['Termin bestätigt?', 'Zahlung vorbereitet?', 'Anzahl Personen final?'],
    booked:    ['Alle Details bestätigt?', 'Rechnung gesendet?', 'Follow-up geplant?'],
    other:     ['Status klar?', 'Nächster Schritt?']
  };

  panel.innerHTML = `
    <!-- Lead card -->
    <div style="background:var(--navy);border-radius:var(--rsm);padding:12px;margin-bottom:10px">
      <div style="font-size:14px;font-weight:700;color:#fff;margin-bottom:2px">${lead.Name || lead.NAME || '–'}</div>
      <div style="font-size:10px;color:rgba(255,255,255,.55)">${lead.Email || lead.EMAIL || '–'}</div>
      ${lead.GROUP || lead.group ? `<div style="font-size:10px;color:rgba(255,255,255,.7);margin-top:4px">${lead.GROUP || lead.group} Personen · ${lead['EVENT DATE'] || lead.date || 'Datum offen'}</div>` : ''}
    </div>

    <!-- Recommendation -->
    <div style="background:#fff;border:1px solid rgba(${recColor === '#6B21A8' ? '107,33,168' : recColor === '#0d7985' ? '13,121,133' : '27,94,155'},.15);border-radius:var(--rsm);padding:10px 12px;margin-bottom:8px">
      <div style="font-size:9px;font-weight:700;letter-spacing:.7px;text-transform:uppercase;color:${recColor};margin-bottom:4px">Empfehlung</div>
      <div style="font-size:12px;font-weight:700;color:var(--navy)">${recFamily}</div>
      <div style="font-size:10px;color:var(--ink3);margin-top:2px">${group > 0 ? group + ' Personen → ' + recFamily : 'Gruppensize für Empfehlung nötig'}</div>
    </div>

    <!-- Signals -->
    ${signals.length ? `
    <div style="font-size:9px;font-weight:700;letter-spacing:.7px;text-transform:uppercase;color:var(--ink3);margin-bottom:6px;margin-top:10px">Signale</div>
    <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:10px">
      ${signals.map(s => `
        <span style="font-size:10px;padding:2px 8px;border-radius:100px;
          background:${s.c === 'green' ? 'var(--gbg)' : 'var(--abg)'};
          color:${s.c === 'green' ? 'var(--green)' : 'var(--amber)'}">
          ${s.t}
        </span>`).join('')}
    </div>` : ''}

    <!-- Questions -->
    <div style="font-size:9px;font-weight:700;letter-spacing:.7px;text-transform:uppercase;color:var(--ink3);margin-bottom:6px">Fragen für diese Stage</div>
    ${(questions[_stage] || []).map((q, i) => `
      <div style="display:flex;align-items:flex-start;gap:7px;padding:5px 0;border-bottom:1px solid var(--bd)">
        <div style="width:16px;height:16px;border-radius:50%;background:var(--navy);color:#fff;font-size:8px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px">${i+1}</div>
        <div style="font-size:11px;color:var(--ink);line-height:1.45">${q}</div>
      </div>`).join('')}
  `;
}

/* ── Events ── */
function _attachEvents(rootEl) {
  // Copy to clipboard
  rootEl.querySelector('#btn-copy').onclick = async () => {
    const text = rootEl.querySelector('#email-body').value;
    try {
      await navigator.clipboard.writeText(text);
      const btn = rootEl.querySelector('#btn-copy');
      btn.textContent = '✓ Kopiert';
      setTimeout(() => { btn.textContent = '📋 Kopieren'; }, 1800);
    } catch (e) { alert('Kopieren fehlgeschlagen'); }
  };

  // Mirror cycle
  rootEl.querySelector('#btn-mirror').onclick = () => {
    _mirrorIndex++;
    _renderEmail(rootEl);
  };

  // Lead search
  const input = rootEl.querySelector('#bs-input');
  const drop  = rootEl.querySelector('#bs-drop');
  let _debounce;

  input.oninput = () => {
    clearTimeout(_debounce);
    const q = input.value.trim();
    if (q.length < 2) { drop.style.display = 'none'; return; }
    _debounce = setTimeout(async () => {
      try {
        const leads = await _ctx.supabase.db.searchLeads(q);
        if (!leads.length) { drop.style.display = 'none'; return; }
        drop.innerHTML = leads.map(l => `
          <div class="lead-result" data-id="${l.id}"
            style="padding:8px 12px;cursor:pointer;border-bottom:1px solid var(--bd);transition:background .12s"
            onmouseover="this.style.background='var(--s1)'" onmouseout="this.style.background='none'">
            <div style="font-size:12px;font-weight:600;color:var(--navy)">${l.data?.Name || l.data?.NAME || '–'}</div>
            <div style="font-size:10px;color:var(--ink3)">${l.data?.Email || l.data?.EMAIL || ''} · ${l.status}</div>
          </div>`).join('');
        drop.style.display = 'block';
        drop.querySelectorAll('.lead-result').forEach(el => {
          el.onclick = () => {
            const lead = leads.find(l => l.id === el.dataset.id);
            _ctx.state.set('activeLead', lead);
            input.value = '';
            drop.style.display = 'none';
            const tag  = rootEl.querySelector('#bs-lead-tag');
            const name = rootEl.querySelector('#bs-lead-name');
            name.textContent = lead.data?.Name || lead.data?.NAME || '–';
            tag.style.display = 'flex';
            _renderPkgList(rootEl);
            _renderEmail(rootEl);
            _renderDecision(rootEl);
          };
        });
      } catch { drop.style.display = 'none'; }
    }, 280);
  };

  document.addEventListener('click', e => {
    if (!drop.contains(e.target) && e.target !== input) drop.style.display = 'none';
  });

  rootEl.querySelector('#bs-lead-clear').onclick = () => {
    _ctx.state.set('activeLead', null);
    rootEl.querySelector('#bs-lead-tag').style.display = 'none';
    _renderEmail(rootEl);
    _renderDecision(rootEl);
  };

  // Live edit doesn't override on re-render — textarea is free-edit after initial render
}

export function unmount() {
  _ctx = null;
}
