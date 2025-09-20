const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

function extractValue(obj, path) {
  // support nested paths like a.b[0].c
  return path.split('.').reduce((acc, part) => {
    const match = part.match(/(.*)\[(\d+)\]/);
    if(match){
      acc = acc?.[match[1]];
      return acc && acc[parseInt(match[2])];
    }
    return acc?.[part];
  }, obj);
}

function classifyValue(key, value, classificationRanges){
  if(value === null || value === undefined) return null;
  const ranges = classificationRanges[key];
  if(!ranges) return null;
  const num = Number(value);
  for(const r of ranges){
    if(num >= r.min && num <= r.max) return r.level || r.label;
  }
  return null;
}

async function renderHtmlTemplate(templateName, context){
  const templatesDir = path.join(__dirname, '..', 'templates');
  const templateFile = path.join(templatesDir, templateName);
  
  if(!fs.existsSync(templateFile)){
    throw new Error('Template not found: ' + templateName);
  }
  
  const src = fs.readFileSync(templateFile, 'utf8');
  const template = handlebars.compile(src);
  return template(context);
}

async function generatePDF(assessmentData, config, savePath){
  try{
    // Load classification ranges
    const classificationRanges = require('../config/classificationRanges');
    
    // Process sections with enhanced data
    const sections = config.sections.map(section => ({
      title: section.title,
      items: [{
        fields: section.fields.map(field => {
          const value = extractValue(assessmentData, field.path);
          const classification = classifyValue(field.path, value, config.classification);
          
          return {
            label: field.label,
            value: value || 'N/A',
            unit: field.unit || '',
            classification: classification
          };
        })
      }]
    }));

    // Prepare template context
    const context = {
      session_id: assessmentData.session_id,
      assessment_id: assessmentData.assessment_id,
      timestamp: new Date().toLocaleString(),
      sections: sections
    };

    // Render HTML template
    const html = await renderHtmlTemplate('base.hbs', context);

    // Generate PDF with Puppeteer
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true
    });
    
    try{
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });
      await page.emulateMediaType('screen');
      
      await page.pdf({
        path: savePath,
        format: 'A4',
        printBackground: true,
        margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' }
      });
    } 
    finally {
      await browser.close();
    }
    
    console.log(`PDF generated successfully: ${savePath}`);
  } 
  catch (error){
    console.error('PDF generation error:', error);
    throw error;
  }
}

module.exports = generatePDF;



