export const meta = {
  id: 'call',
  title: { de: 'Call Guidance', en: 'Call Guidance' },
  icon: '📞'
};

export async function mount(rootEl, ctx) {
  const { state, i18n } = ctx;

  rootEl.innerHTML = `
    <div id="call-view" style="display:flex; flex-direction:column; height:100%; background:var(--s1);">
      <!-- Stage Bar -->
      <div class="cg-stage-bar" style="background:var(--s0); border-bottom:1px solid var(--bd); padding:10px 18px; display:flex; gap:10px; align-items:center;">
        <span class="ss-lbl" id="cg-lbl-stage" style="font-size:11px; font-weight:700; color:var(--ink3);">Stage:</span>
        <button class="cg-sbtn active" data-stage="discovery" style="padding:6px 14px; border-radius:var(--r); border:1px solid var(--bd); background:var(--navy); color:#fff; cursor:pointer;">Discovery</button>
        <button class="cg-sbtn" data-stage="offer" style="padding:6px 14px; border-radius:var(--r); border:1px solid var(--bd); background:var(--s0); cursor:pointer;">Quote</button>
        <button class="cg-sbtn" data-stage="slot" style="padding:6px 14px; border-radius:var(--r); border:1px solid var(--bd); background:var(--s0); cursor:pointer;">Availability</button>
        <button class="cg-sbtn" data-stage="booked" style="padding:6px 14px; border-radius:var(--r); border:1px solid var(--bd); background:var(--s0); cursor:pointer;">Signed</button>
      </div>

      <!-- Main Body -->
      <div class="cg-body" style="flex:1; display:flex; overflow:hidden;">
        
        <!-- Column 1: Lead Info -->
        <div class="cg-col" style="flex:1; border-right:1px solid var(--bd); display:flex; flex-direction:column; background:var(--s0);">
          <div class="cg-col-head" style="padding:16px; border-bottom:1px solid var(--bd);">
            <div style="font-size:14px; font-weight:700; color:var(--navy);">Lead information</div>
            <div style="font-size:11px; color:var(--ink3);">Current contact details & history</div>
          </div>
          <div class="cg-col-scroll" id="cg-lead-content" style="flex:1; padding:16px; overflow-y:auto;">
            <div class="empty-state" style="text-align:center; padding-top:40px; color:var(--ink3);">
              <div style="font-weight:600;">No lead loaded</div>
              <div style="font-size:11px;">Search a lead above or select from Leads view</div>
            </div>
          </div>
        </div>

        <!-- Column 2: Live Guidance -->
        <div class="cg-col" style="flex:1; border-right:1px solid var(--bd); display:flex; flex-direction:column; background:var(--s0);">
          <div class="cg-col-head" style="padding:16px; border-bottom:1px solid var(--bd);">
            <div style="font-size:14px; font-weight:700; color:var(--navy);">Live guidance</div>
            <div style="font-size:11px; color:var(--ink3);">Stage-aware support</div>
          </div>
          <div class="cg-col-scroll" id="cg-guidance-content" style="flex:1; padding:16px; overflow-y:auto;">
            <div style="font-size:12px; color:var(--ink2);">Live guidance content activates when a lead is selected.</div>
          </div>
        </div>

        <!-- Column 3: Script Generator -->
        <div class="cg-col" style="flex:1; display:flex; flex-direction:column; background:var(--s1);">
          <div class="cg-col-head" style="padding:16px; border-bottom:1px solid var(--bd); background:var(--s0);">
            <div style="font-size:14px; font-weight:700; color:var(--navy);">Script generator</div>
            <div style="font-size:11px; color:var(--ink3);">Click generate to reveal</div>
          </div>
          <div class="cg-col-scroll" id="cg-script-content" style="flex:1; padding:16px; overflow-y:auto;">
            <button class="btn-primary" style="width:100%; padding:10px; border-radius:6px; cursor:pointer;" onclick="alert('Script Generator coming soon!')">Generate call script</button>
          </div>
        </div>

      </div>
    </div>
  `;

  // UI logic for stage bar
  const stageBtns = rootEl.querySelectorAll('.cg-sbtn');
  stageBtns.forEach(btn => {
    btn.onclick = () => {
      stageBtns.forEach(b => {
        b.classList.remove('active');
        b.style.background = 'var(--s0)';
        b.style.color = 'var(--ink)';
      });
      btn.classList.add('active');
      btn.style.background = 'var(--navy)';
      btn.style.color = '#fff';
    };
  });
}

export function unmount() {
  console.log('[module:call] unmounted');
}
