/* ══════════════════════════════════════════════════════════
 * SalesCockpit Module — auto.js (Automation Rules)
 * Rules list, Telegram live-test, state-persisted config
 * ══════════════════════════════════════════════════════════ */

export const meta = {
  id: 'auto',
  title: { de: 'Automation', en: 'Automation' },
  icon: '⚡'
};

const STAGE_COLORS = { discovery: '#1B5E9B', offer: '#6B21A8', slot: '#0d7985', booked: '#15803d', other: '#b45309' };
const STAGE_LABELS = { discovery: 'Erstkontakt', offer: 'Angebot', slot: 'Termin', booked: 'Gebucht' };

const DEFAULT_RULES = [
  { id: 1, active: true,  stage: 'offer',     days: 3, action: 'Follow-up Task erstellen',  desc: 'Lead ist seit 3 Tagen im Angebots-Status ohne Reaktion' },
  { id: 2, active: true,  stage: 'discovery', days: 5, action: 'Reminder Task erstellen',   desc: 'Erstkontakt ohne Reaktion nach 5 Tagen' },
  { id: 3, active: false, stage: 'slot',      days: 1, action: 'Slot-Bestätigung Task',     desc: 'Terminslot offen — 24h vor Ablauf benachrichtigen' },
  { id: 4, active: true,  stage: 'booked',    days: 7, action: 'Review anfragen',            desc: 'Gebuchtes Event — 7 Tage danach Feedback anfordern' },
];

let _ctx   = null;
let _rules = null;

export async function mount(rootEl, ctx) {
  _ctx   = ctx;
  _rules = JSON.parse(JSON.stringify(DEFAULT_RULES));

  const tenant = ctx.state.get('tenant') || {};

  rootEl.innerHTML = `
    <div style="height:100%;overflow-y:auto;padding:24px 28px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">
        <div>
          <h1 style="font-size:20px;font-weight:800;color:var(--navy)">Automation</h1>
          <div style="font-size:12px;color:var(--ink3);margin-top:2px">Automatische Follow-up Regeln & Benachrichtigungen</div>
        </div>
      </div>

      <!-- Rule cards -->
      <div id="rules-list" style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px"></div>

      <!-- Telegram section -->
      <div style="background:#fff;border:1px solid var(--bd);border-radius:var(--rlg);padding:20px 24px;margin-bottom:20px">
        <div style="font-size:12px;font-weight:700;color:var(--navy);margin-bottom:4px;display:flex;align-items:center;gap:8px">
          <span style="font-size:18px">📲</span> Telegram Benachrichtigungen
        </div>
        <div style="font-size:12px;color:var(--ink3);margin-bottom:16px">
          Sofort-Benachrichtigung bei neuen Leads, überfälligen Tasks und Buchungen.
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:12px">
          <div class="ef-group">
            <label class="ef-lbl">Bot Token</label>
            <input class="ef-input" id="tg-token" type="password" value="${_esc(tenant.tg_bot_token || '')}" placeholder="123456789:ABC-DEFGhijklmn…">
          </div>
          <div class="ef-group">
            <label class="ef-lbl">Chat ID</label>
            <input class="ef-input" id="tg-chat" value="${_esc(tenant.tg_chat_id || '')}" placeholder="-100123456789">
          </div>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <button class="btn-secondary" id="btn-test-tg" style="font-size:11px;padding:5px 14px">Test senden</button>
          <button class="btn-primary"   id="btn-save-tg" style="font-size:11px;padding:5px 14px">In Einstellungen speichern</button>
          <span id="tg-status" style="font-size:11px;min-height:16px"></span>
        </div>
      </div>

      <!-- Phase info -->
      <div style="background:var(--s1);border:1px solid var(--bd);border-radius:var(--rlg);padding:18px 20px;display:flex;gap:14px;align-items:flex-start">
        <div style="font-size:22px;flex-shrink:0">💡</div>
        <div>
          <div style="font-size:13px;font-weight:700;color:var(--navy);margin-bottom:4px">Phase 10 — Automation Engine</div>
          <div style="font-size:12px;color:var(--ink3);line-height:1.65">
            Regeln laufen in Phase 10 als Supabase Edge Functions (serverseitig, zuverlässig).<br>
            Bis dahin: Tasks manuell aus dem <strong>Aufgaben</strong>-Tab anlegen und Telegram für Sofort-Alerts nutzen.
          </div>
        </div>
      </div>
    </div>
  `;

  _renderRules(rootEl);
  _attachEvents(rootEl);
}

function _renderRules(rootEl) {
  rootEl.querySelector('#rules-list').innerHTML = _rules.map(r => `
    <div style="background:#fff;border:1px solid var(--bd);border-radius:var(--rlg);padding:14px 20px;display:flex;align-items:center;gap:16px">
      <!-- Toggle -->
      <div class="rule-toggle" data-id="${r.id}" style="
        position:relative;width:38px;height:22px;flex-shrink:0;cursor:pointer">
        <div style="
          position:absolute;inset:0;border-radius:11px;
          background:${r.active ? 'var(--green)' : 'var(--bd2)'};
          transition:background .2s">
        </div>
        <div style="
          position:absolute;width:16px;height:16px;top:3px;
          left:${r.active ? '19px' : '3px'};
          background:#fff;border-radius:50%;
          box-shadow:0 1px 3px rgba(0,0,0,.18);
          transition:left .2s">
        </div>
      </div>

      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:3px">
          <span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:100px;
            background:${STAGE_COLORS[r.stage] || '#999'}18;color:${STAGE_COLORS[r.stage] || '#999'};
            text-transform:uppercase;letter-spacing:.5px">${STAGE_LABELS[r.stage] || r.stage}</span>
          <span style="font-size:13px;font-weight:700;color:var(--navy)">${r.action}</span>
        </div>
        <div style="font-size:11px;color:var(--ink3)">${r.desc}</div>
      </div>

      <div style="text-align:right;flex-shrink:0">
        <div style="font-size:20px;font-weight:800;color:${r.active ? 'var(--navy)' : 'var(--ink3)'}">${r.days}d</div>
        <div style="font-size:9px;color:var(--ink3);font-weight:600;text-transform:uppercase">Trigger</div>
      </div>
    </div>`).join('');

  rootEl.querySelectorAll('.rule-toggle').forEach(el => {
    el.onclick = () => {
      const id   = parseInt(el.dataset.id);
      const rule = _rules.find(r => r.id === id);
      if (!rule) return;
      rule.active = !rule.active;
      _renderRules(rootEl);
    };
  });
}

function _attachEvents(rootEl) {
  rootEl.querySelector('#btn-test-tg').onclick = async () => {
    const token  = rootEl.querySelector('#tg-token').value.trim();
    const chatId = rootEl.querySelector('#tg-chat').value.trim();
    const status = rootEl.querySelector('#tg-status');

    if (!token || !chatId) {
      _setStatus(status, '⚠ Bot Token und Chat ID sind erforderlich.', 'var(--red)');
      return;
    }
    _setStatus(status, 'Sendet…', 'var(--ink3)');
    try {
      const res  = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: '✅ SalesCockpit Automation: Telegram-Test erfolgreich!' })
      });
      const json = await res.json();
      if (json.ok) {
        _setStatus(status, '✅ Test erfolgreich!', 'var(--green)');
      } else {
        _setStatus(status, '⚠ ' + (json.description || 'Unbekannter Fehler'), 'var(--red)');
      }
    } catch (e) {
      _setStatus(status, '⚠ Netzwerkfehler: ' + e.message, 'var(--red)');
    }
  };

  rootEl.querySelector('#btn-save-tg').onclick = async () => {
    const token  = rootEl.querySelector('#tg-token').value.trim();
    const chatId = rootEl.querySelector('#tg-chat').value.trim();
    const status = rootEl.querySelector('#tg-status');

    const tenant = _ctx.state.get('tenant') || {};
    _ctx.state.set('tenant', { ...tenant, tg_bot_token: token, tg_chat_id: chatId });

    try {
      await _ctx.supabase.db.updateTenant({ tg_bot_token: token, tg_chat_id: chatId });
      _setStatus(status, '✅ Gespeichert.', 'var(--green)');
    } catch (e) {
      _setStatus(status, '⚠ Nur lokal gespeichert — DB-Fehler: ' + e.message, 'var(--amber)');
    }
  };
}

function _setStatus(el, msg, color) {
  el.textContent = msg;
  el.style.color  = color;
  setTimeout(() => { if (el) el.textContent = ''; }, 4000);
}

function _esc(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function unmount() {
  _ctx   = null;
  _rules = null;
}
