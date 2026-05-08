/* ══════════════════════════════════════════════════════════
 * SalesCockpit — core/utils.js
 * Shared utility functions
 * ══════════════════════════════════════════════════════════ */

import * as state from './state.js';

export const q  = sel => document.querySelector(sel);
export const qa = sel => [...document.querySelectorAll(sel)];
export const g  = id  => document.getElementById(id);

/**
 * Export array of objects to CSV and download
 * @param {Array} data - Array of objects
 * @param {string} filename - Filename
 */
export function exportToCSV(data, filename) {
  if (!data.length) return;
  const headers = Object.keys(data[0]);
  const rows = data.map(obj => headers.map(h => `"${obj[h] || ''}"`).join(','));
  const csvContent = [headers.join(','), ...rows].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Show a graceful error card within a container
 * @param {HTMLElement} el - Target element
 * @param {string} title - Error title
 * @param {string} msg - Error message
 */
export function showErrorCard(el, title, msg) {
  el.innerHTML = `
    <div style="padding:40px; text-align:center; background:var(--bg); border-radius:12px; border:1px solid var(--red); margin:20px;">
      <div style="font-size:32px; margin-bottom:16px;">⚠️</div>
      <h2 style="color:var(--navy); margin-bottom:8px;">Modul-Fehler: ${title}</h2>
      <p style="color:var(--ink3); font-size:13px; max-width:400px; margin:0 auto;">${msg}</p>
      <button class="btn-secondary" style="margin-top:20px;" onclick="location.reload()">App neu laden</button>
    </div>
  `;
}

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

/**
 * Send notification to Telegram
 * @param {string} message 
 */
export async function notifyTelegram(message) {
  const botToken = 'YOUR_BOT_TOKEN'; 
  const chatId = 'YOUR_CHAT_ID';
  if (botToken === 'YOUR_BOT_TOKEN') return;

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message })
    });
  } catch (err) {
    console.error('Telegram notification failed:', err);
  }
}
