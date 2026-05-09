/* ══════════════════════════════════════════════════════════
 * SalesCockpit Module — tasks.js
 * Tasks: grouped list, complete, create, delete
 * ══════════════════════════════════════════════════════════ */

export const meta = {
  id: 'tasks',
  title: { de: 'Aufgaben', en: 'Tasks' },
  icon: '✅'
};

let _ctx   = null;
let _tasks = [];
let _leads = [];

export async function mount(rootEl, ctx) {
  _ctx = ctx;

  rootEl.innerHTML = `
    <div style="display:flex;height:100%;overflow:hidden">

      <!-- Tasks list -->
      <div style="flex:1;overflow-y:auto;padding:20px 24px" id="tasks-main">
        <div style="padding:40px;text-align:center;color:var(--ink3)">Lädt…</div>
      </div>

      <!-- Sidebar: new task form -->
      <div style="width:280px;border-left:1px solid var(--bd);background:#fff;display:flex;flex-direction:column;overflow:hidden;flex-shrink:0">
        <div style="padding:14px 16px;border-bottom:1px solid var(--bd);font-size:12px;font-weight:700;color:var(--navy)">Neue Aufgabe</div>
        <div style="padding:14px 16px;flex:1;overflow-y:auto">
          <div class="ef-group">
            <label class="ef-lbl">Titel *</label>
            <input class="ef-input" id="nt-title" placeholder="Follow-up anrufen…">
          </div>
          <div class="ef-group">
            <label class="ef-lbl">Fällig am</label>
            <input class="ef-input" id="nt-due" type="date">
          </div>
          <div class="ef-group">
            <label class="ef-lbl">Lead (optional)</label>
            <select class="ef-input" id="nt-lead">
              <option value="">– Kein Lead –</option>
            </select>
          </div>
          <div class="ef-group">
            <label class="ef-lbl">Notiz</label>
            <textarea class="ef-textarea" id="nt-desc" rows="3" placeholder="Details…"></textarea>
          </div>
          <div id="nt-err" style="color:var(--red);font-size:11px;min-height:14px"></div>
          <button class="btn-primary" id="btn-create-task" style="width:100%;margin-top:8px">+ Aufgabe erstellen</button>
        </div>
      </div>

    </div>
  `;

  await _loadAll(rootEl);
  _attachEvents(rootEl);
}

async function _loadAll(rootEl) {
  try {
    [_tasks, _leads] = await Promise.all([
      _ctx.supabase.db.getTasks(),
      _ctx.supabase.db.getLeads()
    ]);
    _renderTasks(rootEl);
    _populateLeadSelect(rootEl);
  } catch (err) {
    rootEl.querySelector('#tasks-main').innerHTML =
      `<div style="padding:40px;color:var(--red)">Fehler: ${err.message}</div>`;
  }
}

function _populateLeadSelect(rootEl) {
  const sel = rootEl.querySelector('#nt-lead');
  sel.innerHTML = '<option value="">– Kein Lead –</option>' +
    _leads.map(l => `<option value="${l.id}">${l.data?.Name || l.data?.NAME || l.id.slice(0,8)}</option>`).join('');
}

function _renderTasks(rootEl) {
  const main  = rootEl.querySelector('#tasks-main');
  const now   = new Date(); now.setHours(0,0,0,0);
  const todayEnd = new Date(now); todayEnd.setHours(23,59,59);
  const weekEnd  = new Date(now); weekEnd.setDate(now.getDate() + 7);

  const overdue  = _tasks.filter(t => t.due_date && new Date(t.due_date) < now);
  const today    = _tasks.filter(t => t.due_date && new Date(t.due_date) >= now && new Date(t.due_date) <= todayEnd);
  const upcoming = _tasks.filter(t => !t.due_date || (new Date(t.due_date) > todayEnd && new Date(t.due_date) <= weekEnd));
  const later    = _tasks.filter(t => t.due_date && new Date(t.due_date) > weekEnd);

  if (!_tasks.length) {
    main.innerHTML = `
      <div style="padding:60px 0;text-align:center;color:var(--ink3)">
        <div style="font-size:32px;margin-bottom:12px">🎉</div>
        <div style="font-size:14px;font-weight:600;color:var(--ink2)">Keine offenen Aufgaben</div>
        <div style="font-size:12px;margin-top:4px">Neue Aufgabe rechts erstellen</div>
      </div>`;
    return;
  }

  let html = '';
  const groups = [
    { label: '🔴 Überfällig',    items: overdue,  color: 'var(--red)' },
    { label: '🟡 Heute',         items: today,    color: 'var(--amber)' },
    { label: '📅 Diese Woche',   items: upcoming, color: 'var(--navy)' },
    { label: '⏳ Später',        items: later,    color: 'var(--ink3)' }
  ];

  groups.forEach(g => {
    if (!g.items.length) return;
    html += `
      <div style="margin-bottom:20px">
        <div style="font-size:10px;font-weight:700;letter-spacing:.7px;text-transform:uppercase;color:${g.color};margin-bottom:8px;display:flex;align-items:center;gap:8px">
          ${g.label}
          <span style="font-weight:400;color:var(--ink3)">· ${g.items.length}</span>
        </div>
        ${g.items.map(t => _renderTaskCard(t)).join('')}
      </div>`;
  });

  main.innerHTML = html;

  // Checkbox: complete task
  main.querySelectorAll('.task-cb').forEach(cb => {
    cb.onclick = async () => {
      const id = cb.dataset.id;
      cb.style.background      = 'var(--navy)';
      cb.style.borderColor     = 'var(--navy)';
      cb.innerHTML             = '<svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#fff" stroke-width="2"><polyline points="1.5,5 4,7.5 8.5,2.5"/></svg>';
      try {
        await _ctx.supabase.db.updateTask(id, { status: 'done' });
        _tasks = _tasks.filter(t => t.id !== id);
        setTimeout(() => _renderTasks(rootEl), 500);
      } catch (e) { alert(e.message); }
    };
  });

  // Delete button
  main.querySelectorAll('.task-del').forEach(btn => {
    btn.onclick = async () => {
      if (!confirm('Aufgabe löschen?')) return;
      try {
        await _ctx.supabase.db.deleteTask(btn.dataset.id);
        _tasks = _tasks.filter(t => t.id !== btn.dataset.id);
        _renderTasks(rootEl);
      } catch (e) { alert(e.message); }
    };
  });

  // Build offer button
  main.querySelectorAll('.task-build').forEach(btn => {
    btn.onclick = () => {
      const lead = _leads.find(l => l.id === btn.dataset.leadId);
      if (lead) {
        _ctx.state.set('activeLead', lead);
        window.dispatchEvent(new CustomEvent('nav', { detail: 'builder' }));
      }
    };
  });
}

function _renderTaskCard(t) {
  const lead     = t.leads || null;
  const leadName = lead?.data?.Name || lead?.data?.NAME || null;
  const due      = t.due_date ? new Date(t.due_date) : null;
  const isLate   = due && due < new Date();
  const dueStr   = due ? due.toLocaleDateString('de-DE', { day:'2-digit', month:'short' }) : '–';

  return `
    <div style="background:#fff;border:1px solid ${isLate ? 'rgba(220,38,38,.2)' : 'var(--bd)'};border-radius:var(--rsm);padding:12px 14px;
                margin-bottom:6px;display:flex;align-items:flex-start;gap:10px;
                transition:box-shadow .12s" onmouseover="this.style.boxShadow='var(--sh1)'" onmouseout="this.style.boxShadow='none'">
      <div class="task-cb" data-id="${t.id}"
        style="width:18px;height:18px;border-radius:4px;border:1.5px solid var(--bd2);flex-shrink:0;
               margin-top:2px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s">
      </div>
      <div style="flex:1;min-width:0">
        <div style="font-size:13px;font-weight:600;color:var(--navy);margin-bottom:3px">${t.title}</div>
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          ${leadName ? `<span style="font-size:10px;color:var(--ink3)">👤 ${leadName}</span>` : ''}
          <span style="font-size:10px;font-weight:600;color:${isLate ? 'var(--red)' : 'var(--ink3)'}">${isLate ? '⚠' : '📅'} ${dueStr}</span>
          ${t.description ? `<span style="font-size:10px;color:var(--ink3)">${t.description.slice(0,40)}${t.description.length > 40 ? '…' : ''}</span>` : ''}
        </div>
      </div>
      <div style="display:flex;gap:4px;flex-shrink:0">
        ${t.lead_id ? `<button class="task-build" data-lead-id="${t.lead_id}" style="padding:3px 8px;border-radius:var(--r);border:1px solid var(--bd);background:none;font-size:10px;color:var(--ink2);cursor:pointer">Angebot</button>` : ''}
        <button class="task-del" data-id="${t.id}" style="padding:3px 8px;border-radius:var(--r);border:1px solid rgba(220,38,38,.2);background:none;font-size:10px;color:var(--red);cursor:pointer">✕</button>
      </div>
    </div>`;
}

function _attachEvents(rootEl) {
  rootEl.querySelector('#btn-create-task').onclick = async () => {
    const btn   = rootEl.querySelector('#btn-create-task');
    const err   = rootEl.querySelector('#nt-err');
    const title = rootEl.querySelector('#nt-title').value.trim();
    if (!title) { err.textContent = 'Titel ist Pflichtfeld.'; return; }

    btn.textContent = 'Erstellt…'; btn.disabled = true; err.textContent = '';
    try {
      const task = {
        title,
        description: rootEl.querySelector('#nt-desc').value.trim() || null,
        due_date:    rootEl.querySelector('#nt-due').value || null,
        lead_id:     rootEl.querySelector('#nt-lead').value || null,
        status:      'todo'
      };
      await _ctx.supabase.db.createTask(task);
      rootEl.querySelector('#nt-title').value = '';
      rootEl.querySelector('#nt-due').value   = '';
      rootEl.querySelector('#nt-desc').value  = '';
      rootEl.querySelector('#nt-lead').value  = '';
      await _loadAll(rootEl);
    } catch (e) {
      err.textContent = e.message;
    } finally {
      btn.textContent = '+ Aufgabe erstellen'; btn.disabled = false;
    }
  };
}

export function unmount() {
  _tasks = [];
  _leads = [];
  _ctx   = null;
}
