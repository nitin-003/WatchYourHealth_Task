const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const puppeteer = require('puppeteer');

async function renderHtmlTemplate(templateName, context){
  const templatesDir = path.join(__dirname, '..', 'templates');
  const templateFile = path.join(templatesDir, templateName);
  if (!fs.existsSync(templateFile)) {
    throw new Error('Template not found: ' + templateName);
  }
  const src = fs.readFileSync(templateFile, 'utf8');
  const tpl = handlebars.compile(src);
  return tpl(context);
}

async function htmlToPdf(html, outPath){
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.emulateMediaType('screen');
    await page.pdf({
      path: outPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' }
    });
  } finally {
    await browser.close();
  }
}

module.exports = { renderHtmlTemplate, htmlToPdf };



