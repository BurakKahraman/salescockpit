/* ══════════════════════════════════════════════════════════
 * SalesCockpit — engine/pricing.js
 * Pricing calculation and package logic
 * ══════════════════════════════════════════════════════════ */

import * as state from '../core/state.js';

/**
 * Get the price for a specific tier
 * @param {string} tierKey - e.g. 'venue3'
 * @param {string} type - 'b2b' or 'b2c'
 * @returns {number}
 */
export function getPrice(tierKey, type = null) {
  const t = type || state.get('type') || 'b2b';
  const prices = state.get('prices') || {};
  return (prices[t] && prices[t][tierKey]) || 0;
}

/**
 * Get full package details
 * @param {string} tierKey
 * @param {string} type
 * @returns {object|null}
 */
export function getPackageDetails(tierKey, type = null) {
  const t = type || state.get('type') || 'b2b';
  const priceList = state.get('priceList') || {};
  
  if (!priceList[t]) return null;
  
  for (const family of priceList[t]) {
    const tier = family.tiers.find(tr => tr.key === tierKey);
    if (tier) return { ...tier, family: family.name, color: family.color };
  }
  
  return null;
}

/**
 * Get contents (bullet points) for a package
 * @param {string} tierKey
 * @param {string} lang
 * @returns {string}
 */
export function getPackageContents(tierKey, lang = null) {
  const l = lang || state.get('lang') || 'de';
  const pkgContents = state.get('pkgContents') || {};
  return (pkgContents[tierKey] && pkgContents[tierKey][l]) || '';
}

/**
 * Calculate total price for B2C (person supplement etc.)
 * @param {string} tierKey
 * @param {number} headcount
 * @returns {number}
 */
export function calculateB2CTotal(tierKey, headcount) {
  const base = getPrice(tierKey, 'b2c');
  // Add logic for supplements if needed (legacy apps had person limits)
  return base; 
}
