/* ══════════════════════════════════════════════════════════
 * SalesCockpit — core/state.js
 * Centralized reactive state management
 * Uses bus.js for change notifications
 * ══════════════════════════════════════════════════════════ */

import * as bus from './bus.js';

const _state = {
  // Auth
  user: null,
  isAuthenticated: false,

  // UI state
  lang: 'de',
  type: 'b2b',
  view: 'builder',
  stage: 'discovery',

  // Data
  leads: [],
  tasks: [],
  wfStages: null,
  perms: {},
  objections: { de: [], en: [] },

  // Module-specific transient state
  activeLeadForCall: null,
  builderSearchLead: null,
  calMonth: new Date().getMonth(),
  calYear: new Date().getFullYear(),
  selectedSlotDate: null,
  selectedSlotTime: null,
  objEditing: false,
  cgStageKey: 'discovery',
};

/**
 * Get a state value
 * @param {string} key
 * @returns {*}
 */
export function get(key) {
  return _state[key];
}

/**
 * Set a state value and emit change event
 * @param {string} key
 * @param {*} value
 */
export function set(key, value) {
  const old = _state[key];
  _state[key] = value;
  if (old !== value) {
    bus.emit(`state:${key}`, { key, value, old });
    bus.emit('state:changed', { key, value, old });
  }
}

/**
 * Batch-update multiple state keys
 * @param {Object} updates - { key: value, ... }
 */
export function patch(updates) {
  for (const [key, value] of Object.entries(updates)) {
    set(key, value);
  }
}

/**
 * Get entire state snapshot (read-only copy)
 * @returns {Object}
 */
export function snapshot() {
  return { ..._state };
}

/**
 * Subscribe to a specific state key change
 * @param {string} key
 * @param {Function} handler - ({ key, value, old }) => void
 * @returns {Function} Unsubscribe
 */
export function watch(key, handler) {
  return bus.on(`state:${key}`, handler);
}
