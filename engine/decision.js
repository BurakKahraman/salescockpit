/* ══════════════════════════════════════════════════════════
 * SalesCockpit — engine/decision.js
 * Lead analysis and recommendation engine
 * ══════════════════════════════════════════════════════════ */

import * as state from '../core/state.js';

/**
 * Analyze a lead and return recommendations
 * @param {object} lead
 * @returns {object} { recommendation, questions, signals }
 */
export function analyze(lead) {
  const stageKey = lead.STATUS || state.get('stage') || 'discovery';
  const lang = state.get('lang') || 'de';
  const stagesDef = state.get('stagesDef') || [];
  
  const stage = stagesDef.find(s => s.key === stageKey) || stagesDef[0];
  
  // Basic analysis based on lead fields
  const signals = [];
  if (!lead.GROUP) signals.push(lang === 'de' ? 'Gruppensize unbekannt' : 'Group size unknown');
  if (!lead['EVENT DATE']) signals.push(lang === 'de' ? 'Datum offen' : 'Date open');
  
  // Rule-based package recommendation
  let recPackage = null;
  const group = parseInt(lead.GROUP) || 0;
  
  if (group > 20) recPackage = 'prem3';
  else if (group > 10) recPackage = 'venue3';
  else recPackage = 'arena3';

  return {
    stage: stageKey,
    goal: stage.goal[lang],
    recommendation: stage.rec?.[lang] || (lang === 'de' ? `Empfehlung: ${recPackage} vorschlagen.` : `Recommendation: Suggest ${recPackage}.`),
    questions: stage.questions || [],
    suggestedPackage: recPackage,
    signals: [...(stage.signals?.[lang] || []), ...signals]
  };
}

/**
 * Get available transitions for a package
 * @param {string} currentTierKey
 * @returns {object} { up, down, alt }
 */
export function getTransitions(currentTierKey) {
  const lang = state.get('lang') || 'de';
  const type = state.get('type') || 'b2b';
  const priceList = state.get('priceList') || {};
  
  if (!priceList[type]) return { up: null, down: null };

  // Logic to find current family and tier neighbors
  // ... (extracted from plm logic)
  
  return {
    up: null, // to be populated from priceList structure
    down: null
  };
}
