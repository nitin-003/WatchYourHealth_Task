const path = require('path');
const fs = require('fs');
const assessmentConfig = require('../config/assessmentConfig');
const classificationRanges = require('../config/classificationRanges');
const { getValueByPath, getItemsByPath } = require('../utils/jsonPathMapper');
const { renderHtmlTemplate, htmlToPdf } = require('./pdfGenerator');
const dataStore = require('../data/data');

function classifyValue(key, value) {
  if (value === null || value === undefined) return null;
  const ranges = classificationRanges[key];
  if (!ranges) return null;
  const num = Number(value);
  for (const r of ranges) {
    if (num >= r.min && num <= r.max) return r.label;
  }
  return null;
}

async function generateReport(session_id) {
  const sessionData = dataStore[session_id];
  if (!sessionData) throw new Error('Session not found: ' + session_id);

  const assessmentId = sessionData.assessment_id;
  const config = assessmentConfig[assessmentId];
  if (!config) throw new Error('No configuration for assessment_id: ' + assessmentId);

  const sections = [];

  for (const section of config.sections) {
    const sec = { id: section.id, title: section.title, items: [] };

    if (section.itemsFrom) {
      const items = getItemsByPath(sessionData, section.itemsFrom) || [];
      for (const item of items) {
        const fields = [];
        for (const f of section.fields) {
          const val = getValueByPath(item, f.path) ?? getValueByPath(sessionData, f.path);
          const classification = f.classificationKey ? classifyValue(f.classificationKey, val) : null;
          fields.push({ label: f.label, value: val, classification });
        }
        sec.items.push({ fields });
      }
    } else {
      const fields = [];
      for (const f of section.fields) {
        const val = getValueByPath(sessionData, f.path);
        const classification = f.classificationKey ? classifyValue(f.classificationKey, val) : null;
        fields.push({ label: f.label, value: val, classification });
      }
      sec.items.push({ fields });
    }

    sections.push(sec);
  }

  const context = {
    session_id,
    assessment_id: assessmentId,
    timestamp: new Date().toISOString(),
    sections
  };

  const templateName = config.template || 'base.hbs';
  const outDir = path.join(__dirname, '..', 'reports', '..'); // temp dir compute fix
  // We'll set outDir explicitly to src/reports
  const finalOutDir = path.join(__dirname, '..', 'reports'); // src/reports
  if (!fs.existsSync(finalOutDir)) fs.mkdirSync(finalOutDir, { recursive: true });
  const outFile = path.join(finalOutDir, `${session_id}_${assessmentId}.pdf`);

  const html = await renderHtmlTemplate(templateName, context);
  await htmlToPdf(html, outFile);

  return { outFile, context };
}

module.exports = { generateReport };

