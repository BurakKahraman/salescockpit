/* ══════════════════════════════════════════════════════════
 * SalesCockpit Module — stats.js (Analytics)
 * Real Supabase data: pipeline, conversion, revenue, DATEV export
 * ══════════════════════════════════════════════════════════ */

export const meta = {
  id: 'stats',
  title: { de: 'Statistik', en: 'Statistics' },
  icon: '📊'
};

const STAGES = ['discovery', 'offer', 'slot', 'booked', 'other'];
const STAGE_LABELS = { discovery: 'Erstkontakt', offer: 'Angebot', slot: 'Termin', booked: 'Gebucht', other: 'Sonstiges' };
const STAGE_COLORS = { discovery: '#1B5E9B', offer: '#6B21A8', slot: '#0d7985', booked: '#15803d', other: '#b45309' };
const AVG_REVENUE_PER_EVENT = 2800;

export async function mount(rootEl, ctx) {
  const { state, supabase, utils } = ctx;

  rootEl.innerHTML = `
    <div style="height:100%;overflow-y:auto;padding:24px 28px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">
        <div>
          <h1 style="font-size:20px;font-weight:800;color:var(--navy)">Analytics & Accounting</h1>
          <div style="font-size:12px;color:var(--ink3);margin-top:2px">Echtzeit-Auswertung · Live aus der Datenbank</div>
        </div>
        <button class="btn-secondary" id="btn-export-datev" style="opacity:.5;cursor:not-allowed" disabled>↓ DATEV / sevDesk Export</button>
      </div>
      <div id="stats-body" style="padding:80px 0;text-align:center;color:var(--ink3)">
        <div style="font-size:24px;margin-bottom:8px">⏳</div>
        Lädt Daten…
      </div>
    </div>
  `;

  try {
    const [leads, tasks] = await Promise.all([
      supabase.db.getLeads(),
      supabase.db.getTasks()
    ]);
    _render(rootEl, leads, tasks, state, utils);
  } catch (err) {
    rootEl.querySelector('#stats-body').innerHTML =
      `<div style="color:var(--red);padding:40px;text-align:center">
        <div style="font-size:24px;margin-bottom:8px">⚠️</div>
        Fehler beim Laden: ${err.message}
      </div>`;
  }
}

function _render(rootEl, leads, tasks, state, utils) {
  const total   = leads.length;
  const counts  = {};
  STAGES.forEach(s => { counts[s] = leads.filter(l => l.status === s).length; });

  const booked     = counts.booked;
  const conversion = total > 0 ? Math.round((booked / total) * 100) : 0;
  const revenue    = booked * AVG_REVENUE_PER_EVENT;
  const maxCount   = Math.max(...STAGES.map(s => counts[s]), 1);

  const now = new Date();
  const overdueCount   = tasks.filter(t => t.due_date && new Date(t.due_date) < now).length;
  const dueTodayCount  = tasks.filter(t => {
    if (!t.due_date) return false;
    const d = new Date(t.due_date);
    return d >= now && d.toDateString() === now.toDateString();
  }).length;

  const tenant = state.get('tenant') || {};

  rootEl.querySelector('#stats-body').innerHTML = `
    <!-- KPI row -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:22px">
      ${_kpi('Leads gesamt',      total,                    'var(--navy)')}
      ${_kpi('Conversion',        conversion + '%',         'var(--green)')}
      ${_kpi('Umsatz (est.)',     '€' + revenue.toLocaleString('de-DE'), 'var(--navy)')}
      ${_kpi('Überfällig',        overdueCount,             overdueCount > 0 ? 'var(--red)' : 'var(--green)')}
    </div>

    <!-- Pipeline funnel -->
    <div style="background:#fff;border:1px solid var(--bd);border-radius:var(--rlg);padding:20px 24px;margin-bottom:18px">
      <div style="font-size:10px;font-weight:700;letter-spacing:.7px;text-transform:uppercase;color:var(--ink3);margin-bottom:14px">Sales Pipeline</div>
      <div style="display:flex;flex-direction:column;gap:9px">
        ${STAGES.map(s => {
          const pct = Math.round((counts[s] / maxCount) * 100);
          return `
          <div style="display:flex;align-items:center;gap:12px">
            <div style="width:96px;font-size:11px;font-weight:600;color:var(--ink2);text-align:right;flex-shrink:0">${STAGE_LABELS[s]}</div>
            <div style="flex:1;height:26px;background:var(--s1);border-radius:4px;overflow:hidden">
              <div style="height:100%;width:${pct || 0}%;background:${STAGE_COLORS[s]};border-radius:4px;display:flex;align-items:center;padding:0 8px;min-width:${counts[s] ? '36px' : '0'}">
                ${counts[s] ? `<span style="font-size:11px;font-weight:700;color:#fff">${counts[s]}</span>` : ''}
              </div>
            </div>
            <div style="width:28px;font-size:11px;color:var(--ink3);text-align:right;flex-shrink:0">${counts[s]}</div>
          </div>`;
        }).join('')}
      </div>
    </div>

    <!-- Summary + Financials -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:18px">
      <div style="background:#fff;border:1px solid var(--bd);border-radius:var(--rlg);padding:20px 24px">
        <div style="font-size:10px;font-weight:700;letter-spacing:.7px;text-transform:uppercase;color:var(--ink3);margin-bottom:12px">Pipeline Zusammenfassung</div>
        <div style="display:flex;flex-direction:column;gap:8px;font-size:12px">
          ${_row('Aktive Leads (Erstkontakt–Termin)', (counts.discovery + counts.offer + counts.slot) + '', 'var(--ink2)')}
          ${_row('Gebuchte Events', booked + '', 'var(--green)')}
          ${_row('Ø Umsatz / Event (est.)', '€' + AVG_REVENUE_PER_EVENT.toLocaleString('de-DE'), 'var(--ink2)')}
          <div style="border-top:1px solid var(--bd);padding-top:8px;margin-top:2px">
            ${_row('Gesamt-Umsatz (est.)', '€' + revenue.toLocaleString('de-DE'), 'var(--navy)', true)}
          </div>
          ${_row('Aufgaben heute', dueTodayCount + '', 'var(--amber)')}
          ${_row('Überfällige Aufgaben', overdueCount + '', overdueCount > 0 ? 'var(--red)' : 'var(--green)')}
        </div>
      </div>

      <div style="background:#fff;border:1px solid var(--bd);border-radius:var(--rlg);padding:20px 24px">
        <div style="font-size:10px;font-weight:700;letter-spacing:.7px;text-transform:uppercase;color:var(--ink3);margin-bottom:12px">Finanzdaten (DATEV)</div>
        <div style="display:flex;flex-direction:column;gap:8px;font-size:12px">
          ${_row('Firmenname', tenant.name || '–', 'var(--navy)')}
          ${_row('IBAN', tenant.iban ? `<span style="font-family:monospace;font-size:10px">${tenant.iban}</span>` : '–', 'var(--ink2)')}
          ${_row('Bank', tenant.bank_name || '–', 'var(--ink2)')}
          ${_row('USt-ID', tenant.tax_id || '–', 'var(--ink2)')}
        </div>
        <div style="margin-top:14px;padding:10px 12px;background:var(--s1);border-radius:var(--r);font-size:11px;color:var(--ink3)">
          💡 Finanzdaten unter <strong>Einstellungen</strong> konfigurieren
        </div>
      </div>
    </div>

    <!-- Recent leads -->
    <div style="background:#fff;border:1px solid var(--bd);border-radius:var(--rlg);padding:20px 24px">
      <div style="font-size:10px;font-weight:700;letter-spacing:.7px;text-transform:uppercase;color:var(--ink3);margin-bottom:14px">Letzte 10 Leads</div>
      ${total === 0
        ? '<div style="padding:24px;text-align:center;color:var(--ink3)">Noch keine Leads vorhanden.</div>'
        : `<table style="width:100%;border-collapse:collapse;font-size:12px">
            <thead>
              <tr>
                <th style="text-align:left;padding:6px 8px;font-weight:600;color:var(--ink3);font-size:10px;text-transform:uppercase;letter-spacing:.5px">Name</th>
                <th style="text-align:left;padding:6px 8px;font-weight:600;color:var(--ink3);font-size:10px;text-transform:uppercase;letter-spacing:.5px">Status</th>
                <th style="text-align:left;padding:6px 8px;font-weight:600;color:var(--ink3);font-size:10px;text-transform:uppercase;letter-spacing:.5px">Event-Datum</th>
                <th style="text-align:right;padding:6px 8px;font-weight:600;color:var(--ink3);font-size:10px;text-transform:uppercase;letter-spacing:.5px">Erstellt</th>
              </tr>
            </thead>
            <tbody>
              ${leads.slice(0, 10).map(l => `
                <tr style="border-top:1px solid var(--bd)">
                  <td style="padding:7px 8px;color:var(--navy);font-weight:600">${l.data?.Name || l.data?.NAME || '–'}</td>
                  <td style="padding:7px 8px">
                    <span style="background:${STAGE_COLORS[l.status] || '#999'}18;color:${STAGE_COLORS[l.status] || '#999'};font-size:10px;font-weight:700;padding:2px 8px;border-radius:100px">
                      ${STAGE_LABELS[l.status] || l.status}
                    </span>
                  </td>
                  <td style="padding:7px 8px;color:var(--ink3)">${l.data?.['EVENT DATE'] || l.data?.date || '–'}</td>
                  <td style="padding:7px 8px;color:var(--ink3);text-align:right">${new Date(l.created_at).toLocaleDateString('de-DE')}</td>
                </tr>`).join('')}
            </tbody>
          </table>`}
    </div>
  `;

  // Enable export button now that data is loaded
  const exportBtn = rootEl.querySelector('#btn-export-datev');
  exportBtn.disabled = false;
  exportBtn.style.opacity = '1';
  exportBtn.style.cursor  = 'pointer';

  exportBtn.onclick = () => {
    const rows = leads.map(l => ({
      ID:           l.id,
      Name:         l.data?.Name  || l.data?.NAME  || '',
      Email:        l.data?.Email || l.data?.EMAIL || '',
      Telefon:      l.data?.Phone || l.data?.PHONE || '',
      Gruppe:       l.data?.GROUP || l.data?.group || '',
      Event_Datum:  l.data?.['EVENT DATE'] || l.data?.date || '',
      Status:       STAGE_LABELS[l.status] || l.status,
      Umsatz_est:   l.status === 'booked' ? AVG_REVENUE_PER_EVENT : 0,
      Erstellt:     new Date(l.created_at).toLocaleDateString('de-DE'),
      Aktualisiert: l.updated_at ? new Date(l.updated_at).toLocaleDateString('de-DE') : ''
    }));
    utils.exportToCSV(rows, `salescockpit_export_${new Date().toISOString().split('T')[0]}.csv`);
  };
}

function _kpi(label, value, color) {
  return `
    <div style="background:#fff;border:1px solid var(--bd);border-radius:var(--rlg);padding:18px 20px">
      <div style="font-size:10px;font-weight:700;letter-spacing:.7px;text-transform:uppercase;color:var(--ink3);margin-bottom:6px">${label}</div>
      <div style="font-size:26px;font-weight:800;color:${color};line-height:1">${value}</div>
    </div>`;
}

function _row(label, value, color, bold = false) {
  return `
    <div style="display:flex;justify-content:space-between;align-items:center">
      <span style="color:var(--ink3)">${label}</span>
      <span style="color:${color};${bold ? 'font-size:14px;' : ''}font-weight:${bold ? '800' : '600'}">${value}</span>
    </div>`;
}

export function unmount() {}
