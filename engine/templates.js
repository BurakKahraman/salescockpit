/* ══════════════════════════════════════════════════════════
 * SalesCockpit — engine/templates.js
 * Template rendering and placeholder logic
 * ══════════════════════════════════════════════════════════ */

import * as state from '../core/state.js';
import { TMPL_DEFAULT } from '../data/templates.js';
import { CFG } from '../data/config.js';

/**
 * Replace placeholders in a string with data
 * @param {string} text - Text with {PLACEHOLDERS}
 * @param {object} lead - Lead data
 * @param {object} extra - Extra variables { PRICE_SELECTED, etc }
 * @returns {string} Processed text
 */
export function render(text, lead = {}, extra = {}) {
  if (!text) return '';
  
  const lang = state.get('lang') || 'de';
  const biz = state.get('biz') || {};
  
  // Basic lead info
  let result = text
    .replace(/{NAME}/g, lead.NAME || '')
    .replace(/{EMAIL}/g, lead.EMAIL || '')
    .replace(/{PHONE}/g, lead.PHONE || '')
    .replace(/{GROUP}/g, lead.GROUP || lead.headcount || '')
    .replace(/{DATE}/g, lead['EVENT DATE'] || lead.date || '')
    .replace(/{TIME}/g, lead.time || '')
    .replace(/{CHILD_NAME}/g, lead.childName || '');

  // Derived dates
  if (extra.dates) {
    Object.entries(extra.dates).forEach(([key, val]) => {
      result = result.replace(new RegExp(`{${key}}`, 'g'), val);
    });
  }

  // Prices
  const prices = state.get('prices') || {};
  const type = state.get('type') || 'b2b';
  if (prices[type]) {
    Object.entries(prices[type]).forEach(([key, val]) => {
      const priceStr = val ? val.toLocaleString(lang === 'de' ? 'de-DE' : 'en-GB') : '-';
      result = result.replace(new RegExp(`{PRICE_${key}}`, 'g'), priceStr);
    });
  }

  // Extra placeholders
  if (extra.placeholders) {
    Object.entries(extra.placeholders).forEach(([key, val]) => {
      result = result.replace(new RegExp(`{${key}}`, 'g'), val);
    });
  }

  // Standard blocks
  result = result
    .replace(/{SIGNOFF}/g, biz.sig?.[lang] || '')
    .replace(/{ANZ}/g, biz.anz?.[`${type}_${lang}`] || '')
    .replace(/{PHOTO_NOTE}/g, biz.photo?.[`${lang}_${type}`] || '');

  return result;
}

/**
 * Find a template by criteria
 * @param {string} type - 'b2b' | 'b2c'
 * @param {string} lang - 'de' | 'en'
 * @param {string} stage - 'discovery' | 'offer' etc
 * @param {string} id - Specific template ID
 * @returns {object|null}
 */
export function findTemplate(type, lang, stage, id) {
  const templates = state.get('templates');
  if (!templates || !templates[type] || !templates[type][lang]) return null;
  
  const list = templates[type][lang][stage] || [];
  return list.find(t => t.id === id) || null;
}
