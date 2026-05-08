/* ══════════════════════════════════════════════════════════
 * SalesCockpit — core/i18n.js
 * Bilingual UI dictionary (DE / EN)
 * Extracted from monolith I18N object
 * ══════════════════════════════════════════════════════════ */

import * as state from './state.js';

const dict = {
  de:{
    'nav.builder':'Offer Builder','nav.avail':'Verfügbarkeit','nav.call':'Gesprächsführung','nav.leads':'Leads','nav.tasks':'Aufgaben',
    'nav.wf':'Workflow Architect','nav.res':'Ressourcen','nav.analytics':'Analytics','nav.auto':'Automation','nav.perm':'Berechtigungen',
    'nav.workspace':'Arbeit','nav.tools':'Tools',
    'hd.title':'Offer Builder',
    'stage.discovery':'Erstkontakt','stage.offer':'Angebot','stage.slot':'Verfügbarkeit','stage.booked':'Gebucht','stage.other':'Follow-up','stage.obj':'Einwandbehandlung',
    'bs.placeholder':'Lead suchen um weiterzumachen...','bs.noResult':'Kein Ergebnis',
    'rb.label':'Letzte 48h','rb.empty':'Keine neuen Anfragen',
    'ws.situation':'Kundensituation','ws.signals':'Gesammelte Signale','ws.questions':'Klärungsfragen','ws.rec':'Empfohlene nächste Aktion',
    'ws.generates':'Reveals:',
    'ws.btn.email':'E-Mail generieren','ws.btn.call':'Gesprächsführung','ws.btn.next':'Weiter zu',
    'em.subj':'Betreff','em.to':'An','em.send':'Via Gmail senden','em.copy':'Mit Format kopieren','em.close':'Schließen','em.edit':'Bearbeiten',
    'cm.title':'Wie möchten Sie kommunizieren?','cm.email.lbl':'E-Mail generieren','cm.email.sub':'Kopieren, senden oder bearbeiten','cm.call.lbl':'Gesprächsskript','cm.call.sub':'Leitfaden für das Gespräch',
    'av.title':'Verfügbarkeit','av.select':'Datum wählen','av.info':'Kundeninformation (optional)','av.name':'Name','av.email':'E-Mail','av.group':'Gruppensize','av.pkg':'Paket','av.stage':'Stage','av.gen':'Kommunikation generieren','av.rec':'Empfohlen','av.leg.avail':'Verfügbar','av.leg.part':'Teilweise belegt','av.leg.full':'Ausgebucht',
    'cg.stage.lbl':'Stage:','cg.lead.title':'Lead-Informationen','cg.lead.sub':'Aktueller Kontakt & Verlauf','cg.guide.title':'Live-Gesprächsführung','cg.guide.sub':'Stage-spezifische Unterstützung','cg.script.title':'Skript-Generator','cg.script.sub':'Klicken Sie auf Generieren','cg.listen':'Was hören Sie:','cg.ask':'Fragen stellen:','cg.cta':'Gespräch-CTA:','cg.obj':'Einwände — zum Kopieren klicken:','cg.gen':'Gesprächsskript generieren','cg.copy':'Kopieren','cg.noLead':'Kein Lead geladen','cg.noLeadSub':'Lead suchen oder aus Leads-Ansicht laden',
    'leads.title':'Leads','leads.sync':'↻ Sync','leads.filter.all':'Alle','leads.api':'Google Sheets API Key','leads.apiSave':'Speichern','leads.empty':'Keine Leads. API-Key eingeben und synchronisieren.',
    'ld.lastact':'Letzte Aktion','ld.status':'Status','ld.product':'Paket','ld.comment':'Kommentar','ld.rep':'Sales Rep','ld.date':'Eventdatum','ld.inquiry':'Anfragedatum','ld.load':'In Builder laden','ld.call':'Für Gesprächsführung laden','ld.status.update':'Status aktualisieren',
    'tasks.title':'Aufgaben & Follow-ups','tasks.new':'Neue Aufgabe','tasks.task.lbl':'Aufgabe beschreiben','tasks.lead.lbl':'Lead verknüpfen','tasks.due':'Fälligkeitsdatum','tasks.add':'Aufgabe hinzufügen','tasks.wfrules':'Workflow-Regeln','tasks.priority':'Priorität: Stornierungen','tasks.empty':'Keine offenen Aufgaben.',
    'wf.title':'Workflow Architect','wf.add':'+ Stage hinzufügen','wf.save':'Workflow speichern','wf.reset':'Zurücksetzen','wf.ed.empty':'Stage-Node anklicken zum Bearbeiten','wf.goal':'Ziel','wf.questions':'Fragen','wf.signals':'Signale','wf.cta':'CTA','wf.days':'Erwartete Tage','wf.action':'Aktion nach Frist',
    'res.title':'Ressourcen','res.pl':'Preisliste','res.tmpl':'Vorlagen','res.ed.empty':'Vorlage aus dem Baum wählen','res.copy':'Text kopieren','res.save':'Änderungen speichern',
    'ana.title':'Analytics','ana.pipeline':'Pipeline nach Stage','ana.month':'Dieser Monat',
    'perm.title':'Berechtigungen','perm.sub':'Modulzugriff pro Nutzer-E-Mail steuern','perm.modules':'Modul-Toggles','perm.obj.access':'Einwandbehandlung — Admin-Zugang','perm.obj.sub':'E-Mail-Adresse eingeben, um Bearbeitungsrechte zu vergeben','perm.add':'Hinzufügen',
    'auto.title':'Automation','auto.sub':'Automatisierte Erst- und Follow-up-E-Mails via Gmail API','auto.ft':'Erstkontakt — heute fällig','auto.fu':'Follow-up — überfällig','auto.send':'E-Mail senden',
    'obj.title':'Einwandbehandlung','obj.sub':'Einwände, Antworten und Prävention','obj.trigger':'Einwand','obj.answer':'Empfohlene Antwort','obj.prevention':'Prävention','obj.add':'Einwand hinzufügen','obj.save':'Speichern','obj.edit':'Bearbeiten',
    'toast.copied':'Kopiert','toast.saved':'Gespeichert','toast.synced':'Synchronisiert','toast.actSaved':'Aktion gespeichert','toast.emailSent':'E-Mail gesendet',
    'global.noLead':'Kein Lead ausgewählt',
    'bs.status':'Status','bs.lastact':'Letzte Aktion','bs.lastEmail':'Letzte E-Mail',
  },
  en:{
    'nav.builder':'Offer Builder','nav.avail':'Availability','nav.call':'Call Guidance','nav.leads':'Leads','nav.tasks':'Tasks',
    'nav.wf':'Workflow Architect','nav.res':'Resources','nav.analytics':'Analytics','nav.auto':'Automation','nav.perm':'Permissions',
    'nav.workspace':'Workspace','nav.tools':'Tools',
    'hd.title':'Offer Builder',
    'stage.discovery':'Discovery','stage.offer':'Quote','stage.slot':'Availability','stage.booked':'Signed','stage.other':'Follow-up','stage.obj':'Objection Handling',
    'bs.placeholder':'Search lead to continue from where left off...','bs.noResult':'No results',
    'rb.label':'Past 48h','rb.empty':'No new inquiries',
    'ws.situation':'Customer situation','ws.signals':'Signals gathered','ws.questions':'Clarification questions','ws.rec':'Recommended next action',
    'ws.generates':'Reveals:',
    'ws.btn.email':'Generate email','ws.btn.call':'Call guidance','ws.btn.next':'Continue to',
    'em.subj':'Subject','em.to':'To','em.send':'Send via Gmail','em.copy':'Copy with format','em.close':'Close','em.edit':'Edit',
    'cm.title':'How would you like to communicate?','cm.email.lbl':'Generate email','cm.email.sub':'Copy, send or edit','cm.call.lbl':'Call script','cm.call.sub':'Spoken word guide',
    'av.title':'Availability','av.select':'Select a date','av.info':'Customer information (optional)','av.name':'Name','av.email':'Email','av.group':'Group size','av.pkg':'Package','av.stage':'Stage','av.gen':'Generate communication','av.rec':'Recommended','av.leg.avail':'Available','av.leg.part':'Partially booked','av.leg.full':'Fully booked',
    'cg.stage.lbl':'Stage:','cg.lead.title':'Lead information','cg.lead.sub':'Current contact & history','cg.guide.title':'Live guidance','cg.guide.sub':'Stage-aware support','cg.script.title':'Script generator','cg.script.sub':'Click generate to reveal','cg.listen':'What to listen for:','cg.ask':'Questions to ask:','cg.cta':'Call CTA:','cg.obj':'Common objections — click to copy:','cg.gen':'Generate call script','cg.copy':'Copy','cg.noLead':'No lead loaded','cg.noLeadSub':'Search a lead above or select from Leads view',
    'leads.title':'Leads','leads.sync':'↻ Sync','leads.filter.all':'All','leads.api':'Google Sheets API Key','leads.apiSave':'Save','leads.empty':'No leads. Enter API key and sync.',
    'ld.lastact':'Last action','ld.status':'Status','ld.product':'Package','ld.comment':'Comment','ld.rep':'Sales rep','ld.date':'Event date','ld.inquiry':'Inquiry date','ld.load':'Load into builder','ld.call':'Load for call guidance','ld.status.update':'Update status',
    'tasks.title':'Tasks & Follow-ups','tasks.new':'New task','tasks.task.lbl':'Describe task','tasks.lead.lbl':'Link lead','tasks.due':'Due date','tasks.add':'Add task','tasks.wfrules':'Workflow rules','tasks.priority':'Priority: Cancellations','tasks.empty':'No open tasks.',
    'wf.title':'Workflow Architect','wf.add':'+ Add stage','wf.save':'Save workflow','wf.reset':'Reset','wf.ed.empty':'Click a stage node to edit','wf.goal':'Goal','wf.questions':'Questions','wf.signals':'Signals','wf.cta':'CTA','wf.days':'Expected days','wf.action':'Action after deadline',
    'res.title':'Resources','res.pl':'Price list','res.tmpl':'Templates','res.ed.empty':'Select a template from the tree','res.copy':'Copy text','res.save':'Save changes',
    'ana.title':'Analytics','ana.pipeline':'Pipeline by stage','ana.month':'This month',
    'perm.title':'Permission Management','perm.sub':'Control module access per user email','perm.modules':'Module toggles','perm.obj.access':'Objection Handler — admin access','perm.obj.sub':'Enter email address to grant edit access to the Objection Handler','perm.add':'Add',
    'auto.title':'Automation','auto.sub':'Automated first touch & follow-up emails via Gmail API','auto.ft':'First touch — due today','auto.fu':'Follow-up — overdue','auto.send':'Send email',
    'obj.title':'Objection Handling','obj.sub':'Objections, answers and prevention strategies','obj.trigger':'Objection','obj.answer':'Recommended answer','obj.prevention':'Prevention','obj.add':'Add objection','obj.save':'Save','obj.edit':'Edit',
    'toast.copied':'Copied','toast.saved':'Saved','toast.synced':'Synced','toast.actSaved':'Action saved','toast.emailSent':'Email sent',
    'global.noLead':'No lead selected',
    'bs.status':'Status','bs.lastact':'Last action','bs.lastEmail':'Last email',
  }
};

/**
 * Translate a key using current language
 * @param {string} key
 * @returns {string}
 */
export function T(key) {
  const lang = state.get('lang') || 'de';
  return (dict[lang] || dict.de)[key] || key;
}

/**
 * Get the full dictionary for a language
 * @param {string} lang - 'de' or 'en'
 * @returns {Object}
 */
export function getDict(lang) {
  return dict[lang] || dict.de;
}

/**
 * Apply translations to DOM elements with data-de / data-en attributes
 * @param {string} lang
 */
export function applyToDom(lang) {
  document.querySelectorAll('[data-de]').forEach(el => {
    el.textContent = lang === 'de' ? (el.dataset.de || el.textContent) : (el.dataset.en || el.textContent);
  });
  document.querySelectorAll('[data-ph-de]').forEach(el => {
    el.placeholder = lang === 'de' ? (el.dataset.phDe || '') : (el.dataset.phEn || '');
  });
}
