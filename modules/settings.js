/* ══════════════════════════════════════════════════════════
 * SalesCockpit Module — settings.js (Venue Management)
 * Loads from Supabase on mount, saves back with updateTenant()
 * ══════════════════════════════════════════════════════════ */

export const meta = {
  id: 'settings',
  title: { de: 'Einstellungen', en: 'Venue Settings' },
  icon: '⚙️'
};

let _ctx = null;

export async function mount(rootEl, ctx) {
  _ctx = ctx;
  const { supabase, state } = ctx;

  rootEl.innerHTML = `
    <div style="height:100%;overflow-y:auto;padding:24px 28px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;flex-shrink:0">
        <div>
          <h1 style="font-size:20px;font-weight:800;color:var(--navy)">Einstellungen</h1>
          <div style="font-size:12px;color:var(--ink3);margin-top:2px">Venue-Konfiguration & Integrationen</div>
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          <span id="set-status" style="font-size:12px;min-width:180px;text-align:right"></span>
          <button class="btn-primary" id="btn-save-settings">Speichern</button>
        </div>
      </div>
      <div id="set-body" style="padding:80px 0;text-align:center;color:var(--ink3)">
        <div style="font-size:24px;margin-bottom:8px">⏳</div>
        Lädt Einstellungen…
      </div>
    </div>
  `;

  let tenant = state.get('tenant') || {};
  try {
    const dbTenant = await supabase.db.getTenant();
    if (dbTenant) {
      tenant = dbTenant;
      state.set('tenant', dbTenant);
    }
  } catch (err) {
    console.warn('Could not load tenant from DB:', err.message);
  }

  _renderForm(rootEl, tenant);
}

function _renderForm(rootEl, tenant) {
  rootEl.querySelector('#set-body').innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:36px;max-width:960px">

      <!-- Business Info -->
      <section>
        <div style="font-size:10px;font-weight:700;letter-spacing:.7px;text-transform:uppercase;color:var(--ink3);margin-bottom:16px;padding-bottom:8px;border-bottom:1px solid var(--bd)">
          Firmendaten
        </div>
        <div class="ef-group">
          <label class="ef-lbl">Firmenname *</label>
          <input class="ef-input" id="set-name" value="${_esc(tenant.name || '')}" placeholder="Varpoint GmbH">
        </div>
        <div class="ef-group">
          <label class="ef-lbl">Adresse</label>
          <textarea class="ef-textarea" id="set-addr" rows="3" placeholder="Musterstraße 1&#10;10115 Berlin">${_esc(tenant.address || '')}</textarea>
        </div>
        <div class="ef-group">
          <label class="ef-lbl">IBAN</label>
          <input class="ef-input" id="set-iban" value="${_esc(tenant.iban || '')}" placeholder="DE12 3456 7890 1234 5678 90">
        </div>
        <div class="ef-group">
          <label class="ef-lbl">Bankname</label>
          <input class="ef-input" id="set-bank" value="${_esc(tenant.bank_name || '')}" placeholder="Deutsche Bank">
        </div>
        <div class="ef-group">
          <label class="ef-lbl">USt-ID</label>
          <input class="ef-input" id="set-tax" value="${_esc(tenant.tax_id || '')}" placeholder="DE 123 456 789">
        </div>

        <div style="margin-top:24px">
          <div style="font-size:10px;font-weight:700;letter-spacing:.7px;text-transform:uppercase;color:var(--ink3);margin-bottom:16px;padding-bottom:8px;border-bottom:1px solid var(--bd)">
            Angebot-Signatur
          </div>
          <div class="ef-group">
            <label class="ef-lbl">Ansprechpartner (Signatur)</label>
            <input class="ef-input" id="set-signoff-name" value="${_esc(tenant.signoff_name || '')}" placeholder="Max Mustermann">
          </div>
          <div class="ef-group">
            <label class="ef-lbl">Telefon (Signatur)</label>
            <input class="ef-input" id="set-signoff-phone" value="${_esc(tenant.signoff_phone || '')}" placeholder="+49 30 1234567">
          </div>
        </div>
      </section>

      <!-- Integrations -->
      <section>
        <div style="font-size:10px;font-weight:700;letter-spacing:.7px;text-transform:uppercase;color:var(--ink3);margin-bottom:16px;padding-bottom:8px;border-bottom:1px solid var(--bd)">
          Kalender-Integration
        </div>
        <div class="ef-group">
          <label class="ef-lbl">Google Calendar Link</label>
          <input class="ef-input" id="set-google" value="${_esc(tenant.google_cal_id || '')}" placeholder="https://calendar.google.com/…">
        </div>
        <div class="ef-group">
          <label class="ef-lbl">Outlook Calendar Link</label>
          <input class="ef-input" id="set-outlook" value="${_esc(tenant.outlook_cal_id || '')}" placeholder="https://outlook.office.com/…">
        </div>
        <div style="padding:12px 14px;background:var(--s1);border:1px dashed var(--bd);border-radius:var(--r);font-size:11px;color:var(--ink3);margin-bottom:24px">
          💡 Synchronisierte Kalender erscheinen im Verfügbarkeits-Tab und verhindern Doppelbuchungen.
        </div>

        <div style="font-size:10px;font-weight:700;letter-spacing:.7px;text-transform:uppercase;color:var(--ink3);margin-bottom:16px;padding-bottom:8px;border-bottom:1px solid var(--bd)">
          Telegram Benachrichtigungen
        </div>
        <div class="ef-group">
          <label class="ef-lbl">Bot Token</label>
          <input class="ef-input" id="set-tg-token" type="password" value="${_esc(tenant.tg_bot_token || '')}" placeholder="123456789:ABC-DEFGhijklmn…">
        </div>
        <div class="ef-group">
          <label class="ef-lbl">Chat ID</label>
          <input class="ef-input" id="set-tg-chat" value="${_esc(tenant.tg_chat_id || '')}" placeholder="-100123456789">
        </div>
        <button class="btn-secondary" id="btn-tg-test" style="font-size:11px;padding:5px 14px">Test-Nachricht senden</button>
        <div id="tg-status" style="font-size:11px;min-height:16px;margin-top:6px"></div>
      </section>
    </div>
  `;

  rootEl.querySelector('#btn-save-settings').onclick = _saveSettings.bind(null, rootEl);

  rootEl.querySelector('#btn-tg-test').onclick = async () => {
    const token  = rootEl.querySelector('#set-tg-token').value.trim();
    const chatId = rootEl.querySelector('#set-tg-chat').value.trim();
    const tgSt   = rootEl.querySelector('#tg-status');

    if (!token || !chatId) {
      tgSt.textContent = '⚠ Bot Token und Chat ID sind Pflichtfelder.';
      tgSt.style.color = 'var(--red)';
      return;
    }
    tgSt.textContent = 'Sendet…';
    tgSt.style.color = 'var(--ink3)';
    try {
      const res  = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: '✅ SalesCockpit Telegram-Test erfolgreich!' })
      });
      const json = await res.json();
      if (json.ok) {
        tgSt.textContent = '✅ Test erfolgreich!';
        tgSt.style.color = 'var(--green)';
      } else {
        tgSt.textContent = '⚠ Fehler: ' + json.description;
        tgSt.style.color = 'var(--red)';
      }
    } catch (e) {
      tgSt.textContent = '⚠ Netzwerkfehler: ' + e.message;
      tgSt.style.color = 'var(--red)';
    }
  };
}

async function _saveSettings(rootEl) {
  const btn    = rootEl.querySelector('#btn-save-settings');
  const status = rootEl.querySelector('#set-status');

  const name = rootEl.querySelector('#set-name').value.trim();
  if (!name) {
    status.textContent = '⚠ Firmenname ist Pflichtfeld.';
    status.style.color = 'var(--red)';
    return;
  }

  btn.textContent = 'Speichert…';
  btn.disabled    = true;
  status.textContent = '';

  const updates = {
    name,
    address:        rootEl.querySelector('#set-addr').value.trim(),
    iban:           rootEl.querySelector('#set-iban').value.trim(),
    bank_name:      rootEl.querySelector('#set-bank').value.trim(),
    tax_id:         rootEl.querySelector('#set-tax').value.trim(),
    signoff_name:   rootEl.querySelector('#set-signoff-name').value.trim(),
    signoff_phone:  rootEl.querySelector('#set-signoff-phone').value.trim(),
    google_cal_id:  rootEl.querySelector('#set-google').value.trim(),
    outlook_cal_id: rootEl.querySelector('#set-outlook').value.trim(),
    tg_bot_token:   rootEl.querySelector('#set-tg-token').value.trim(),
    tg_chat_id:     rootEl.querySelector('#set-tg-chat').value.trim()
  };

  try {
    const saved = await _ctx.supabase.db.updateTenant(updates);
    _ctx.state.set('tenant', { ..._ctx.state.get('tenant'), ...updates, ...(saved || {}) });
    status.textContent = '✅ Einstellungen gespeichert.';
    status.style.color = 'var(--green)';
  } catch (err) {
    status.textContent = '⚠ Fehler: ' + err.message;
    status.style.color = 'var(--red)';
  } finally {
    btn.textContent = 'Speichern';
    btn.disabled    = false;
    setTimeout(() => { if (status) status.textContent = ''; }, 4000);
  }
}

function _esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function unmount() {
  _ctx = null;
}
