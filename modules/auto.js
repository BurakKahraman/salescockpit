/* ══════════════════════════════════════════════════════════
 * SalesCockpit Module — auto.js (Automation Rules)
 * ══════════════════════════════════════════════════════════ */

export const meta = {
  id: 'auto',
  title: { de: 'Automation', en: 'Automation' },
  icon: '⚡'
};

const RULES = [
  { id: 1, active: true,  stage: 'offer',     days: 3, action: 'Follow-up Task erstellen', desc: 'Lead ist seit 3 Tagen im Angebot-Stadium ohne Antwort' },
  { id: 2, active: true,  stage: 'discovery',  days: 5, action: 'Reminder senden',          desc: 'Erstkontakt ohne Reaktion nach 5 Tagen' },
  { id: 3, active: false, stage: 'slot',       days: 1, action: 'Slot bestätigen',           desc: 'Terminslot offen — 24h vor Ablauf benachrichtigen' },
  { id: 4, active: true,  stage: 'booked',     days: 7, action: 'Review anfragen',           desc: 'Gebuchtes Event — 7 Tage danach Feedback anfordern' },
];

let _ctx = null;

export async function mount(rootEl, ctx) {
  _ctx = ctx;

  rootEl.innerHTML = `
    <div style="flex:1;overflow-y:auto;padding:24px;display:flex;flex-direction:column;gap:20px;">

      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div>
          <h1 style="font-size:22px;font-weight:800;color:var(--navy);letter-spacing:-.3px">Automation</h1>
          <p style="font-size:12px;color:var(--ink3);margin-top:2px">Automatische Regeln für Leads und Follow-ups</p>
        </div>
        <button class="btn-primary" id="btn-add-rule">+ Regel hinzufügen</button>
      </div>

      <!-- Rule Cards -->
      <div id="rules-list" style="display:flex;flex-direction:column;gap:10px;">
        ${RULES.map(r => renderRule(r)).join('')}
      </div>

      <!-- Info Banner -->
      <div style="background:var(--s1);border:1px solid var(--bd);border-radius:12px;padding:20px;display:flex;gap:16px;align-items:flex-start;">
        <div style="font-size:24px;flex-shrink:0">💡</div>
        <div>
          <div style="font-size:13px;font-weight:700;color:var(--navy);margin-bottom:4px">Phase 10 — Automation Engine</div>
          <div style="font-size:12px;color:var(--ink3);line-height:1.6">
            In Phase 10 wird die Automation Engine mit Supabase Edge Functions gekoppelt.<br>
            Regeln laufen dann serverseitig und senden Telegram-Benachrichtigungen oder erstellen automatisch Tasks.
          </div>
        </div>
      </div>

      <!-- Telegram Integration -->
      <div style="background:#fff;border:1px solid var(--bd);border-radius:12px;padding:20px;">
        <div style="font-size:13px;font-weight:700;color:var(--navy);margin-bottom:4px;display:flex;align-items:center;gap:8px;">
          <span>📲</span> Telegram Benachrichtigungen
        </div>
        <p style="font-size:12px;color:var(--ink3);margin-bottom:16px;">Benachrichtigungen bei neuen Leads oder überfälligen Tasks direkt im Telegram empfangen.</p>
        <div class="ef-group">
          <label class="ef-lbl">Bot Token</label>
          <input class="ef-input" id="tg-token" placeholder="123456:ABC-DEFxxxx" style="font-family:monospace">
        </div>
        <div class="ef-group">
          <label class="ef-lbl">Chat ID</label>
          <input class="ef-input" id="tg-chat" placeholder="-100123456789" style="font-family:monospace">
        </div>
        <div style="display:flex;gap:8px;margin-top:4px;">
          <button class="btn-secondary" id="btn-test-tg">Test senden</button>
          <button class="btn-primary" id="btn-save-tg">Speichern</button>
        </div>
      </div>

    </div>
  `;

  // Toggle rules
  rootEl.querySelectorAll('.rule-toggle').forEach(toggle => {
    toggle.addEventListener('change', e => {
      const id   = parseInt(e.target.dataset.id);
      const rule = RULES.find(r => r.id === id);
      if (rule) rule.active = e.target.checked;
    });
  });

  rootEl.querySelector('#btn-add-rule').onclick = () =>
    alert('Regel-Editor kommt in Phase 10 mit Supabase Edge Functions.');

  rootEl.querySelector('#btn-test-tg').onclick  = () =>
    alert('Test-Nachricht wird gesendet…\n(Telegram-Integration wird in Phase 10 aktiviert.)');

  rootEl.querySelector('#btn-save-tg').onclick = () => {
    alert('Einstellungen gespeichert.');
  };
}

function renderRule(r) {
  const stageColors = {
    discovery: '#1B5E9B',
    offer:     '#6B21A8',
    slot:      '#0d7985',
    booked:    '#15803d'
  };
  const color = stageColors[r.stage] || 'var(--navy)';

  return `
    <div style="background:#fff;border:1px solid var(--bd);border-radius:12px;padding:16px 20px;display:flex;align-items:center;gap:16px;">
      <label class="rule-toggle-wrap" style="flex-shrink:0;position:relative;width:36px;height:20px;">
        <input type="checkbox" class="rule-toggle" data-id="${r.id}" ${r.active ? 'checked' : ''}
          style="opacity:0;position:absolute;width:0;height:0">
        <span style="
          position:absolute;inset:0;
          background:${r.active ? 'var(--green)' : 'var(--bd2)'};
          border-radius:10px;cursor:pointer;
          transition:background 0.2s;
        "></span>
        <span style="
          position:absolute;
          width:14px;height:14px;
          background:#fff;border-radius:50%;
          top:3px;left:${r.active ? '19px' : '3px'};
          transition:left 0.2s;
          box-shadow:0 1px 3px rgba(0,0,0,.15);
        "></span>
      </label>
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;">
          <span style="font-size:10px;font-weight:700;padding:2px 7px;border-radius:100px;background:${color}18;color:${color};text-transform:uppercase;letter-spacing:.5px;">${r.stage}</span>
          <span style="font-size:13px;font-weight:700;color:var(--navy)">${r.action}</span>
        </div>
        <div style="font-size:11px;color:var(--ink3)">${r.desc}</div>
      </div>
      <div style="text-align:right;flex-shrink:0">
        <div style="font-size:18px;font-weight:800;color:var(--navy)">${r.days}d</div>
        <div style="font-size:9px;color:var(--ink3);font-weight:600">Trigger</div>
      </div>
    </div>
  `;
}

export function unmount() {
  _ctx = null;
}
