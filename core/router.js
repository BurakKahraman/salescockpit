/* ══════════════════════════════════════════════════════════
 * SalesCockpit — core/router.js
 * Simple view router — switches between sidebar modules
 * ══════════════════════════════════════════════════════════ */

import * as state from './state.js';
import * as bus from './bus.js';
import * as loader from './loader.js';
import { T } from './i18n.js';
import { qa, g } from './utils.js';

const VIEW_MAP = {
  builder: 'nav.builder',
  avail:   'nav.avail',
  call:    'nav.call',
  leads:   'nav.leads',
  tasks:   'nav.tasks',
  wf:      'nav.wf',
  res:     'nav.res',
  analytics: 'nav.analytics',
  auto:    'nav.auto',
  perm:    'nav.perm',
};

/**
 * Navigate to a view
 * @param {string} view - View key (e.g. 'builder', 'leads')
 */
export function navTo(view) {
  const prev = state.get('view');

  // Unmount previous module
  if (prev) loader.unmount(prev);

  // Update state
  state.set('view', view);

  // Hide all views
  qa('.view').forEach(v => v.classList.remove('active'));

  // Show target
  const target = g('view-' + view);
  if (target) target.classList.add('active');

  // Update sidebar active state
  qa('.sbi').forEach(b => b.classList.remove('active'));
  const sbi = g('sbi-' + view);
  if (sbi) sbi.classList.add('active');

  // Update header breadcrumb
  const hd = g('hd-cur');
  if (hd) hd.textContent = T(VIEW_MAP[view] || view);

  // Emit navigation event for modules to react
  bus.emit('nav:changed', { view, prev });
}

/**
 * Get current view
 * @returns {string}
 */
export function currentView() {
  return state.get('view');
}
