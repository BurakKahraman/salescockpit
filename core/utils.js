/* ══════════════════════════════════════════════════════════
 * SalesCockpit — core/utils.js
 * Shared utility functions
 * ══════════════════════════════════════════════════════════ */

import * as state from './state.js';

export const q  = sel => document.querySelector(sel);
export const qa = sel => [...document.querySelectorAll(sel)];
export const g  = id  => document.getElementById(id);

export function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

export function escHtml(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function formatDate(d) {
  if (!d) return '';
  try {
    const dt = new Date(d);
    const lang = state.get('lang') || 'de';
    return dt.toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch (e) { return d; }
}

export function daysSince(dateStr) {
  if (!dateStr) return null;
  try { return Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000); }
  catch (e) { return null; }
}

export function leadKey(lead) {
  return (lead.EMAIL || lead.NAME || '').toLowerCase().trim();
}

export function copyToClipboard(text) {
  return navigator.clipboard.writeText(text).catch(() => {});
}

export function showToast(msg, type = '', dur = 2200) {
  const t = g('toast');
  if (!t) return;
  const item = el('div', `toast-item ${type}`, escHtml(msg));
  t.appendChild(item);
  setTimeout(() => item.remove(), dur);
}

export function debounce(fn, ms = 300) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}
