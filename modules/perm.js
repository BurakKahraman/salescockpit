export const meta = {
  id: 'perm',
  title: { de: 'Berechtigungen', en: 'Permissions' },
  icon: '🔒'
};

export async function mount(rootEl, ctx) {
  rootEl.innerHTML = `
    <div id="perm-view" style="display:flex; flex-direction:column; height:100%; padding:24px; background:var(--s1); overflow-y:auto;">
      <div style="font-size:24px; font-weight:800; color:var(--navy); margin-bottom:8px;">Permission Management</div>
      <div style="font-size:12px; color:var(--ink3); margin-bottom:24px;">Control module access per user email</div>
      
      <div style="background:var(--s0); border:1px solid var(--bd); padding:20px; border-radius:var(--rxl); margin-bottom:16px;">
        <div style="font-size:14px; font-weight:700; color:var(--navy); margin-bottom:16px;">Module toggles</div>
        <div style="display:flex; gap:12px; align-items:center; margin-bottom:12px;">
          <input type="checkbox" id="mod-builder" checked>
          <label for="mod-builder" style="font-size:13px;">Offer Builder</label>
        </div>
        <div style="display:flex; gap:12px; align-items:center; margin-bottom:12px;">
          <input type="checkbox" id="mod-call" checked>
          <label for="mod-call" style="font-size:13px;">Call Guidance</label>
        </div>
        <div style="display:flex; gap:12px; align-items:center;">
          <input type="checkbox" id="mod-wf" checked>
          <label for="mod-wf" style="font-size:13px;">Workflow Architect</label>
        </div>
      </div>
      
      <div style="background:var(--s0); border:1px solid var(--bd); padding:20px; border-radius:var(--rxl);">
        <div style="font-size:14px; font-weight:700; color:var(--navy); margin-bottom:8px;">Objection Handler — admin access</div>
        <div style="font-size:12px; color:var(--ink3); margin-bottom:16px;">Enter email address to grant edit access to the Objection Handler</div>
        <div style="display:flex; gap:8px;">
          <input type="email" placeholder="admin@varpoint.de" style="flex:1; padding:8px 12px; border:1px solid var(--bd); border-radius:6px;">
          <button class="btn-primary" style="padding:8px 16px;">Add</button>
        </div>
      </div>
    </div>
  `;
}

export function unmount() {
  console.log('[module:perm] unmounted');
}
