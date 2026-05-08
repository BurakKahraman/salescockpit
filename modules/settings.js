/* ══════════════════════════════════════════════════════════
 * SalesCockpit Module — settings.js (Venue Management)
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
  const tenant = state.get('tenant') || { name: 'Venue Name' };

  rootEl.innerHTML = `
    <div style="padding: 24px; display: flex; flex-direction: column; gap: 32px; height: 100%; overflow-y: auto;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h1 style="font-size: 24px; font-weight: 800; color: var(--navy)">Venue Settings</h1>
        <button class="btn-primary" id="btn-save-settings">Save Changes</button>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
        <!-- Business Info -->
        <section>
          <h2 style="font-size: 14px; font-weight: 700; color: var(--ink3); margin-bottom: 16px; text-transform: uppercase; letter-spacing: 1px;">Business Details</h2>
          <div class="ef-group"><label class="ef-lbl">Company Name</label>
            <input class="ef-input" id="set-name" value="${tenant.name || ''}"></div>
          <div class="ef-group"><label class="ef-lbl">IBAN</label>
            <input class="ef-input" id="set-iban" value="${tenant.iban || ''}"></div>
          <div class="ef-group"><label class="ef-lbl">Bank Name</label>
            <input class="ef-input" id="set-bank" value="${tenant.bank_name || ''}"></div>
          <div class="ef-group"><label class="ef-lbl">Business Address</label>
            <textarea class="ef-textarea" id="set-addr" rows="3">${tenant.address || ''}</textarea></div>
        </section>

        <!-- Calendar Sync -->
        <section>
          <h2 style="font-size: 14px; font-weight: 700; color: var(--ink3); margin-bottom: 16px; text-transform: uppercase; letter-spacing: 1px;">Calendar Integration</h2>
          <p style="font-size: 12px; color: var(--ink3); margin-bottom: 20px;">Paste your public calendar links or iCal URLs to sync availability.</p>
          
          <div class="ef-group">
            <label class="ef-lbl">Google Calendar Link</label>
            <input class="ef-input" id="set-google" value="${tenant.google_cal_id || ''}" placeholder="https://calendar.google.com/...">
          </div>
          
          <div class="ef-group">
            <label class="ef-lbl">Outlook Calendar Link</label>
            <input class="ef-input" id="set-outlook" value="${tenant.outlook_cal_id || ''}" placeholder="https://outlook.office.com/...">
          </div>

          <div style="margin-top: 24px; padding: 16px; background: var(--bg); border-radius: 12px; border: 1px dashed var(--bd);">
             <div style="font-size: 12px; font-weight: 700; color: var(--navy); margin-bottom: 4px;">💡 Pro Tip</div>
             <div style="font-size: 11px; color: var(--ink3);">Synchronized calendars will be visible to all sales reps in the Availability tab to prevent double bookings.</div>
          </div>
        </section>
      </div>
    </div>
  `;

  rootEl.querySelector('#btn-save-settings').onclick = () => saveSettings(rootEl);
}

async function saveSettings(rootEl) {
  const btn = rootEl.querySelector('#btn-save-settings');
  btn.textContent = 'Saving...';
  btn.disabled = true;

  const updates = {
    name: rootEl.querySelector('#set-name').value,
    iban: rootEl.querySelector('#set-iban').value,
    bank_name: rootEl.querySelector('#set-bank').value,
    address: rootEl.querySelector('#set-addr').value,
    google_cal_id: rootEl.querySelector('#set-google').value,
    outlook_cal_id: rootEl.querySelector('#set-outlook').value
  };

  try {
    // Supabase update logic here
    await new Promise(r => setTimeout(r, 1000)); // Simulating
    _ctx.state.patch({ tenant: { ..._ctx.state.get('tenant'), ...updates } });
    alert('Settings saved successfully!');
  } catch (err) {
    alert('Error saving settings: ' + err.message);
  } finally {
    btn.textContent = 'Save Changes';
    btn.disabled = false;
  }
}

export function unmount() {
  _ctx = null;
}
