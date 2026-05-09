export const meta = {
  id: 'wf',
  title: { de: 'Workflow Architect', en: 'Workflow Architect' },
  icon: '⚡'
};

export async function mount(rootEl, ctx) {
  rootEl.innerHTML = `
    <div id="wf-view" style="display:flex; height:100%; background:var(--s1);">
      <!-- Canvas -->
      <div class="wf-canvas-wrap" style="flex:1; position:relative; overflow:hidden;">
        <svg class="wf-arrows" id="wf-arrows-svg" style="position:absolute; inset:0; pointer-events:none; width:100%; height:100%;"></svg>
        <div id="wf-canvas" style="position:absolute; inset:0; padding:20px; overflow:auto;">
          <!-- Placeholder Nodes -->
          <div style="background:var(--s0); border:1px solid var(--bd); padding:16px; border-radius:var(--r); width:200px; margin-bottom:20px;">
            <div style="font-size:10px; color:var(--ink3); text-transform:uppercase;">Stage</div>
            <div style="font-weight:700; color:var(--navy);">Discovery</div>
          </div>
          <div style="background:var(--s0); border:1px solid var(--bd); padding:16px; border-radius:var(--r); width:200px; margin-left:40px; margin-bottom:20px;">
            <div style="font-size:10px; color:var(--ink3); text-transform:uppercase;">Stage</div>
            <div style="font-weight:700; color:var(--navy);">Quote</div>
          </div>
        </div>
        
        <div class="wf-toolbar" style="position:absolute; bottom:20px; left:20px; display:flex; gap:10px; background:var(--s0); padding:10px; border-radius:var(--r); box-shadow:0 4px 12px rgba(0,0,0,0.05); border:1px solid var(--bd);">
          <button class="btn-primary" style="padding:6px 14px; font-size:12px;">+ Add Stage</button>
          <button style="padding:6px 14px; font-size:12px; background:var(--s1); border:1px solid var(--bd); border-radius:4px; cursor:pointer;">Save workflow</button>
          <button style="padding:6px 14px; font-size:12px; background:var(--s1); border:1px solid var(--bd); border-radius:4px; cursor:pointer;">Reset</button>
        </div>
      </div>

      <!-- Editor -->
      <div class="wf-editor" style="width:320px; border-left:1px solid var(--bd); background:var(--s0); display:flex; flex-direction:column;">
        <div class="wf-ed-head" style="padding:16px; border-bottom:1px solid var(--bd);">
          <div class="wf-ed-title" id="wf-ed-title" style="font-weight:700; color:var(--navy);">Stage Editor</div>
        </div>
        <div class="wf-ed-scroll" id="wf-ed-content" style="flex:1; padding:16px; overflow-y:auto;">
          <div class="wf-ed-empty" style="text-align:center; padding-top:40px; color:var(--ink3); font-size:12px;">Click a stage node to edit it</div>
        </div>
      </div>
    </div>
  `;
}

export function unmount() {
  console.log('[module:wf] unmounted');
}
