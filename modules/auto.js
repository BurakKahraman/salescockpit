export const meta = {
  id: 'auto',
  title: { de: 'Automation', en: 'Automation' },
  icon: '🤖'
};

export async function mount(rootEl, ctx) {
  rootEl.innerHTML = `
    <div id="auto-view" style="display:flex; flex-direction:column; height:100%; padding:24px; background:var(--s1); overflow-y:auto;">
      <div style="font-size:24px; font-weight:800; color:var(--navy); margin-bottom:8px;">Automation</div>
      <div style="font-size:12px; color:var(--ink3); margin-bottom:24px;">Automated first touch & follow-up emails via Gmail API</div>
      
      <div style="background:var(--s0); border:1px solid var(--bd); padding:20px; border-radius:var(--rxl); margin-bottom:16px;">
        <div style="font-size:14px; font-weight:700; color:var(--navy); margin-bottom:16px;">First touch — due today</div>
        <div style="font-size:12px; color:var(--ink3); text-align:center; padding:20px 0;">All automated emails sent.</div>
      </div>
      
      <div style="background:var(--s0); border:1px solid var(--bd); padding:20px; border-radius:var(--rxl);">
        <div style="font-size:14px; font-weight:700; color:var(--navy); margin-bottom:16px;">Follow-up — overdue</div>
        <div style="font-size:12px; color:var(--ink3); text-align:center; padding:20px 0;">No overdue follow-ups.</div>
      </div>
    </div>
  `;
}

export function unmount() {
  console.log('[module:auto] unmounted');
}
