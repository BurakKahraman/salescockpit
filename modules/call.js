/* ══════════════════════════════════════════════════════════
 * SalesCockpit Module — call.js  →  Offer Builder
 * The main daily-use module for sales reps.
 * LEFT:   Lead Info / Search
 * CENTER: Stage Workspace (Template signals + mirrors + editable body)
 * RIGHT:  Email Draft + Actions (Copy / Send via Mail)
 * ══════════════════════════════════════════════════════════ */

export const meta = {
  id: 'call',
  title: { de: 'Offer Builder', en: 'Offer Builder' },
  icon: '📞'
};

let _ctx = null;
let _root = null;
let activeStage = 'discovery';
let selectedSignalIdx = -1;
let selectedMirrorIdx = 0;

export async function mount(rootEl, ctx) {
  _ctx = ctx;
  _root = rootEl;
  activeStage = 'discovery';
  selectedSignalIdx = -1;
  selectedMirrorIdx = 0;
  render();
}

function render() {
  if (!_root || !_ctx) return;
  const lang = _ctx.state.get('lang') || 'de';
  const type = _ctx.state.get('type') || 'b2b';
  const templates = _ctx.state.get('templates') || {};
  const activeLead = _ctx.state.get('activeLead');

  // Get templates for current type/lang/stage
  const stageTemplates = templates[type]?.[lang]?.[activeStage] || [];

  // Selected template
  const tmpl = selectedSignalIdx >= 0 ? stageTemplates[selectedSignalIdx] : null;

  const stageLabels = {
    de: { discovery:'🔍 Erstkontakt', offer:'📋 Angebot', slot:'📅 Verfügbarkeit', booked:'✅ Gebucht', other:'⚡ Follow-up' },
    en: { discovery:'🔍 Discovery', offer:'📋 Quote', slot:'📅 Availability', booked:'✅ Signed', other:'⚡ Follow-up' }
  };
  const stages = ['discovery','offer','slot','booked','other'];

  _root.innerHTML = `
    <style>
      .ob-stage-btn { padding:8px 16px; border-radius:8px; border:1px solid var(--bd); background:var(--s0); cursor:pointer; font-size:12px; font-weight:600; transition:all .15s; }
      .ob-stage-btn.active { background:var(--navy); color:#fff; border-color:var(--navy); }
      .ob-stage-btn:hover:not(.active) { background:var(--s1); }
      .ob-signal-card { padding:12px 14px; border:1px solid var(--bd); border-radius:10px; cursor:pointer; margin-bottom:8px; transition:all .15s; background:#fff; }
      .ob-signal-card:hover { border-color:var(--blue); }
      .ob-signal-card.selected { border-color:var(--blue); background:rgba(37,99,235,0.06); }
      .ob-signal-label { font-size:12px; font-weight:700; color:var(--navy); }
      .ob-signal-ms { font-size:11px; color:var(--ink3); margin-top:2px; }
      .ob-mirror { padding:10px 12px; border:1px solid var(--bd); border-radius:8px; cursor:pointer; font-size:11px; line-height:1.5; color:var(--ink2); margin-bottom:6px; transition:all .15s; background:#fff; }
      .ob-mirror:hover { border-color:var(--green); }
      .ob-mirror.selected { border-color:var(--green); background:rgba(34,197,94,0.06); color:var(--navy); font-weight:500; }
      @media (max-width: 1024px) {
        #ob-main { flex-direction: column !important; }
        .ob-col { width: 100% !important; border: none !important; border-bottom: 1px solid var(--bd) !important; }
      }
    </style>

    <div id="offer-builder-view" style="display:flex; flex-direction:column; height:100%;">
      <!-- Stage Bar -->
      <div style="background:var(--s0); border-bottom:1px solid var(--bd); padding:10px 18px; display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
        ${stages.map(s => `<button class="ob-stage-btn ${s === activeStage ? 'active' : ''}" data-stage="${s}">${(stageLabels[lang] || stageLabels.de)[s]}</button>`).join('')}
      </div>

      <!-- 3-Column Layout -->
      <div id="ob-main" style="flex:1; display:flex; overflow:hidden;">

        <!-- LEFT: Lead Info -->
        <div class="ob-col" style="width:240px; border-right:1px solid var(--bd); display:flex; flex-direction:column; background:var(--s0);">
          <div style="padding:14px 16px; border-bottom:1px solid var(--bd);">
            <div style="font-size:13px; font-weight:700; color:var(--navy);">${lang === 'de' ? 'Lead-Informationen' : 'Lead Information'}</div>
          </div>
          <div id="ob-lead-info" style="flex:1; padding:14px 16px; overflow-y:auto;">
            ${renderLeadInfo(activeLead, lang)}
          </div>
        </div>

        <!-- CENTER: Signals & Mirrors -->
        <div class="ob-col" style="flex:1; display:flex; flex-direction:column; border-right:1px solid var(--bd); background:#fff;">
          <div style="padding:14px 16px; border-bottom:1px solid var(--bd); display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-size:13px; font-weight:700; color:var(--navy);">${lang === 'de' ? 'Kundensignal & Mirroring' : 'Customer Signal & Mirroring'}</div>
              <div style="font-size:11px; color:var(--ink3);">${lang === 'de' ? 'Signal wählen, dann Mirroring-Eröffnung' : 'Select signal, then mirroring opening'}</div>
            </div>
          </div>
          <div style="flex:1; padding:14px 16px; overflow-y:auto;">
            <div style="font-size:10px; font-weight:700; color:var(--ink3); text-transform:uppercase; margin-bottom:8px;">
              ${lang === 'de' ? 'Verfügbare Signale' : 'Available Signals'} (${stageTemplates.length})
            </div>
            <div id="ob-signals">
              ${stageTemplates.map((t, i) => `
                <div class="ob-signal-card ${i === selectedSignalIdx ? 'selected' : ''}" data-idx="${i}">
                  <div class="ob-signal-label">${t.label}</div>
                  <div class="ob-signal-ms">${t.ms || ''}</div>
                </div>
              `).join('') || `<div style="font-size:12px; color:var(--ink3); padding:20px 0; text-align:center;">${lang === 'de' ? 'Keine Signale für diese Stufe.' : 'No signals for this stage.'}</div>`}
            </div>

            ${tmpl ? `
              <div style="margin-top:20px; border-top:1px solid var(--bd); padding-top:16px;">
                <div style="font-size:10px; font-weight:700; color:var(--ink3); text-transform:uppercase; margin-bottom:8px;">
                  ${lang === 'de' ? 'Mirroring-Eröffnungen' : 'Mirroring Openings'}
                </div>
                <div id="ob-mirrors">
                  ${(tmpl.mirrors || []).map((m, i) => `
                    <div class="ob-mirror ${i === selectedMirrorIdx ? 'selected' : ''}" data-midx="${i}" contenteditable="true">${m}</div>
                  `).join('') || `<div style="font-size:11px; color:var(--ink3);">${lang === 'de' ? 'Keine Mirroring-Optionen.' : 'No mirroring options.'}</div>`}
                </div>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- RIGHT: Email Draft -->
        <div class="ob-col" style="flex:1.2; display:flex; flex-direction:column; background:var(--s1);">
          <div style="padding:14px 16px; border-bottom:1px solid var(--bd); background:var(--s0); display:flex; justify-content:space-between; align-items:center;">
            <div style="font-size:13px; font-weight:700; color:var(--navy);">${lang === 'de' ? 'E-Mail Entwurf' : 'Email Draft'}</div>
            <div style="display:flex; gap:6px;">
              <button class="btn-primary" id="ob-btn-copy" style="font-size:11px; padding:6px 12px;">Copy</button>
              <button class="btn-primary" id="ob-btn-send" style="font-size:11px; padding:6px 12px; background:var(--blue);">Send via Mail</button>
            </div>
          </div>
          <div style="padding:14px 16px; overflow-y:auto; flex:1;">
            ${tmpl ? `
              <div style="margin-bottom:12px;">
                <div style="font-size:10px; font-weight:700; color:var(--ink3); text-transform:uppercase; margin-bottom:4px;">Subject</div>
                <input class="ef-i" id="ob-subject" value="${escHtml(tmpl.subject || '')}" style="font-size:12px;">
              </div>
              <div style="flex:1;">
                <div style="font-size:10px; font-weight:700; color:var(--ink3); text-transform:uppercase; margin-bottom:4px;">Body</div>
                <textarea id="ob-email-body" style="width:100%; min-height:400px; border:1px solid var(--bd); border-radius:8px; padding:14px; font-family:monospace; font-size:12px; line-height:1.6; resize:vertical; background:#fff;">${buildEmailBody(tmpl, activeLead, lang)}</textarea>
              </div>
            ` : `
              <div style="text-align:center; padding-top:80px; color:var(--ink3);">
                <div style="font-size:36px; margin-bottom:12px;">📝</div>
                <p style="font-size:13px;">${lang === 'de' ? 'Wähle links ein Signal, um den E-Mail-Entwurf zu generieren.' : 'Select a signal from the left to generate the email draft.'}</p>
              </div>
            `}
          </div>
        </div>
      </div>
    </div>
  `;

  attachEvents();
}

function renderLeadInfo(lead, lang) {
  if (!lead || !lead.data) {
    return `
      <div style="text-align:center; padding-top:30px; color:var(--ink3);">
        <div style="font-size:28px; margin-bottom:8px;">👤</div>
        <div style="font-size:12px; font-weight:600;">${lang === 'de' ? 'Kein Lead geladen' : 'No lead loaded'}</div>
        <div style="font-size:11px; margin-top:4px;">${lang === 'de' ? 'Oben suchen oder aus Leads wählen' : 'Search above or select from Leads'}</div>
      </div>
    `;
  }
  const d = lead.data;
  const fields = [
    { label: 'Name', value: d.Name || d.name || '' },
    { label: 'Email', value: d.Email || d.email || '' },
    { label: lang === 'de' ? 'Personen' : 'Group', value: d.group_size || d.GroupSize || '' },
    { label: 'Stage', value: d.stage || '' },
    { label: lang === 'de' ? 'Quelle' : 'Source', value: d.source || '' },
    { label: lang === 'de' ? 'Datum' : 'Date', value: d.event_date || '' },
  ].filter(f => f.value);

  return fields.map(f => `
    <div style="margin-bottom:10px;">
      <div style="font-size:10px; font-weight:700; color:var(--ink3); text-transform:uppercase;">${f.label}</div>
      <div style="font-size:12px; color:var(--navy); font-weight:500;">${f.value}</div>
    </div>
  `).join('');
}

function buildEmailBody(tmpl, lead, lang) {
  if (!tmpl || !tmpl.body) return '';
  let body = tmpl.body;
  const d = lead?.data || {};
  const mirror = (tmpl.mirrors || [])[selectedMirrorIdx] || '';
  // Replace placeholders
  body = body.replace(/\{MIRROR\}/g, mirror);
  body = body.replace(/\{NAME\}/g, d.Name || d.name || '');
  body = body.replace(/\{GROUP\}/g, d.group_size || d.GroupSize || '');
  body = body.replace(/\{DATE\}/g, d.event_date || '');
  body = body.replace(/\{TIME\}/g, d.event_time || '');
  body = body.replace(/\{SIGNOFF\}/g, lang === 'de' ? 'Mit freundlichen Grüßen,\nIhr Team' : 'Best regards,\nYour Team');
  body = body.replace(/\{AVAIL_NOTE\}/g, '');
  body = body.replace(/\{PHOTO_NOTE\}/g, '');
  return escHtml(body);
}

function escHtml(s) {
  return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function attachEvents() {
  // Stage buttons
  _root.querySelectorAll('.ob-stage-btn').forEach(btn => {
    btn.onclick = () => {
      activeStage = btn.dataset.stage;
      selectedSignalIdx = -1;
      selectedMirrorIdx = 0;
      render();
    };
  });

  // Signal cards
  _root.querySelectorAll('.ob-signal-card').forEach(card => {
    card.onclick = () => {
      selectedSignalIdx = parseInt(card.dataset.idx);
      selectedMirrorIdx = 0;
      render();
    };
  });

  // Mirror selection
  _root.querySelectorAll('.ob-mirror').forEach(mir => {
    mir.onclick = (e) => {
      // Don't re-render if contenteditable is being used for editing
      if (e.target === mir && !mir.classList.contains('selected')) {
        selectedMirrorIdx = parseInt(mir.dataset.midx);
        render();
      }
    };
  });

  // Copy button
  const copyBtn = _root.querySelector('#ob-btn-copy');
  if (copyBtn) {
    copyBtn.onclick = () => {
      const body = _root.querySelector('#ob-email-body');
      if (body) {
        navigator.clipboard.writeText(body.value).then(() => {
          copyBtn.textContent = '✓ Copied!';
          setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000);
        });
      }
    };
  }

  // Send button (mailto)
  const sendBtn = _root.querySelector('#ob-btn-send');
  if (sendBtn) {
    sendBtn.onclick = () => {
      const body = _root.querySelector('#ob-email-body');
      const subj = _root.querySelector('#ob-subject');
      if (body) {
        const lead = _ctx.state.get('activeLead');
        const email = lead?.data?.Email || lead?.data?.email || '';
        const subject = encodeURIComponent(subj?.value || 'Angebot');
        const bodyEnc = encodeURIComponent(body.value);
        window.location.href = `mailto:${email}?subject=${subject}&body=${bodyEnc}`;
      }
    };
  }
}

export function unmount() {
  _ctx = null;
  _root = null;
}
