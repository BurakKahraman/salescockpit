/* ══════════════════════════════════════════════════════════
 * SalesCockpit Module — tasks.js
 * ══════════════════════════════════════════════════════════ */

export const meta = {
  id: 'tasks',
  title: { de: 'Aufgaben', en: 'Tasks' },
  icon: '✅'
};

let _ctx = null;
let _tasks = [];

export async function mount(rootEl, ctx) {
  _ctx = ctx;
  rootEl.innerHTML = `
    <div style="padding: 24px; display: flex; flex-direction: column; gap: 20px; height: 100%;">
      <h1 style="font-size: 24px; font-weight: 800; color: var(--navy)">Tasks</h1>
      <div id="tasks-list" style="display:flex; flex-direction:column; gap:12px;">
        <div style="padding:40px; text-align:center; color:var(--ink3)">Loading tasks...</div>
      </div>
    </div>
  `;
  loadTasks(rootEl);
}

async function loadTasks(rootEl) {
  const container = rootEl.querySelector('#tasks-list');
  try {
    const data = await _ctx.supabase.db.getTasks();
    _tasks = data;
    renderTasks(container);
  } catch (err) {
    container.innerHTML = `<div style="padding:40px; color:var(--red)">Error: ${err.message}</div>`;
  }
}

function renderTasks(container) {
  if (!_tasks.length) {
    container.innerHTML = `<div style="padding:40px; text-align:center; background:var(--bg); border-radius:12px; color:var(--ink3)">No pending tasks. Great job!</div>`;
    return;
  }

  container.innerHTML = _tasks.map(task => `
    <div style="background:#fff; border:1px solid var(--bd); border-radius:10px; padding:16px; display:flex; align-items:center; gap:16px; transition:transform 0.2s;" onmouseover="this.style.transform='translateX(4px)'" onmouseout="this.style.transform='none'">
      <div style="width:24px; height:24px; border:2px solid var(--bd); border-radius:6px; cursor:pointer;" onclick="alert('Complete task')"></div>
      <div style="flex:1">
        <div style="font-weight:700; color:var(--navy); font-size:14px;">${task.title}</div>
        <div style="font-size:11px; color:var(--ink3); margin-top:2px;">Lead: ${task.leads?.data?.Name || 'N/A'} · Due: ${task.due_date ? new Date(task.due_date).toLocaleDateString() : 'Today'}</div>
      </div>
    </div>
  `).join('');
}

export function unmount() {
  _tasks = [];
  _ctx = null;
}
