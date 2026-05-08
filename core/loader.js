/* ══════════════════════════════════════════════════════════
 * SalesCockpit — core/loader.js
 * Module loader with error isolation
 * A crashing module shows an error card, others keep working
 * ══════════════════════════════════════════════════════════ */

const _modules = new Map();

/**
 * Register and load a module dynamically
 * @param {string} id - Module id (e.g. 'leads')
 * @param {string} path - Path to module JS file
 * @returns {Promise<object|null>} Module exports or null on error
 */
export async function load(id, path) {
  try {
    const mod = await import(path);
    _modules.set(id, mod);
    return mod;
  } catch (err) {
    console.error(`[loader] Failed to load module "${id}" from ${path}:`, err);
    _modules.set(id, { _error: err });
    return null;
  }
}

/**
 * Mount a module into a root element with error isolation
 * @param {string} id - Module id
 * @param {HTMLElement} rootEl - Container element
 * @param {object} ctx - Shared context { state, bus, i18n, utils, supabase }
 */
export async function mount(id, rootEl, ctx) {
  const mod = _modules.get(id);
  if (!mod) {
    showErrorCard(rootEl, id, 'Module not loaded');
    return;
  }
  if (mod._error) {
    showErrorCard(rootEl, id, mod._error.message);
    return;
  }

  // 1. Unmount previous module if exists
  if (activeModule && typeof activeModule.unmount === 'function') {
    try {
      await activeModule.unmount();
    } catch (err) {
      console.warn(`[loader] Unmount error in ${currentModuleId}:`, err);
    }
  }

  // 2. Clear element and mount new
  rootEl.innerHTML = '';
  try {
    if (typeof mod.mount === 'function') {
      await mod.mount(rootEl, ctx);
      activeModule = mod;
      currentModuleId = id;
    }
  } catch (err) {
    console.error(`[loader] Error mounting "${id}":`, err);
    showErrorCard(rootEl, id, err.message);
  }
}

/**
 * Unmount a module (cleanup)
 * @param {string} id
 */
export function unmount(id) {
  const mod = _modules.get(id);
  if (mod && typeof mod.unmount === 'function') {
    try { mod.unmount(); }
    catch (err) { console.warn(`[loader] Error unmounting "${id}":`, err); }
  }
}

/**
 * Get a loaded module's exports
 * @param {string} id
 * @returns {object|null}
 */
export function get(id) {
  return _modules.get(id) || null;
}

/**
 * Show an error card when a module fails to load/mount
 */
function showErrorCard(rootEl, id, message) {
  rootEl.innerHTML = `
    <div style="padding:20px;margin:16px;background:#fef2f2;border:1px solid rgba(220,38,38,.2);border-radius:12px;text-align:center">
      <div style="font-size:28px;margin-bottom:8px">⚠️</div>
      <div style="font-size:13px;font-weight:700;color:#dc2626;margin-bottom:4px">Module "${id}" failed to load</div>
      <div style="font-size:11px;color:#6b7a94;line-height:1.5">${message || 'Unknown error'}</div>
      <button onclick="location.reload()" style="margin-top:12px;padding:6px 16px;border-radius:6px;border:1px solid #dc2626;background:none;color:#dc2626;font-size:11px;font-weight:600;cursor:pointer">Reload</button>
    </div>`;
}
