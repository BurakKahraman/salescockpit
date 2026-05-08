/* ══════════════════════════════════════════════════════════
 * SalesCockpit — core/storage.js
 * localStorage wrapper — keeps backward compatibility
 * with existing LS_* keys from the monolith
 * ══════════════════════════════════════════════════════════ */

/* Legacy localStorage keys — DO NOT change these values!
 * Existing Varpoint data depends on them. */
export const LS_KEYS = {
  TMPL:     'vp_tmpl_v8',
  CFG:      'vp_cfg_v8',
  PL:       'vp_pl_v8',
  BIZ:      'vp_biz_v8',
  LOGO:     'vp_logo_v8',
  LASTACT:  'vp_lastact_v1',
  LEADS:    'vp_leads_v1',
  TASKS:    'vp_tasks_v1',
  WF:       'vp_wf13_v1',
  PERMS:    'vp_perms13_v1',
  OBJ:      'vp_obj13_v1',
  APIKEY:   'vp_sheets_key',
};

/**
 * Safe JSON read from localStorage
 * @param {string} key
 * @param {*} fallback
 * @returns {*}
 */
export function load(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    console.warn(`[storage] Failed to parse "${key}":`, e);
    return fallback;
  }
}

/**
 * Safe JSON write to localStorage
 * @param {string} key
 * @param {*} value
 */
export function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`[storage] Failed to save "${key}":`, e);
  }
}

/**
 * Read raw string from localStorage
 */
export function loadRaw(key, fallback = '') {
  return localStorage.getItem(key) || fallback;
}

/**
 * Write raw string to localStorage
 */
export function saveRaw(key, value) {
  localStorage.setItem(key, value);
}

/**
 * Remove a key
 */
export function remove(key) {
  localStorage.removeItem(key);
}
