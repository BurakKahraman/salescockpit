/* ══════════════════════════════════════════════════════════
 * SalesCockpit — core/bus.js
 * Lightweight event bus for inter-module communication
 * ══════════════════════════════════════════════════════════ */

const _listeners = new Map();

/**
 * Subscribe to an event
 * @param {string} event - Event name (e.g. 'lead:selected', 'stage:changed')
 * @param {Function} handler - Callback function
 * @returns {Function} Unsubscribe function
 */
export function on(event, handler) {
  if (!_listeners.has(event)) _listeners.set(event, new Set());
  _listeners.get(event).add(handler);
  return () => _listeners.get(event)?.delete(handler);
}

/**
 * Emit an event
 * @param {string} event - Event name
 * @param {*} data - Event data
 */
export function emit(event, data) {
  const handlers = _listeners.get(event);
  if (!handlers) return;
  for (const fn of handlers) {
    try { fn(data); }
    catch (err) { console.error(`[bus] Error in handler for "${event}":`, err); }
  }
}

/**
 * Subscribe to an event, auto-unsubscribe after first call
 */
export function once(event, handler) {
  const unsub = on(event, (data) => {
    unsub();
    handler(data);
  });
  return unsub;
}

/**
 * Remove all listeners (for cleanup/testing)
 */
export function clear() {
  _listeners.clear();
}
