const data = require('../data/data');
const configs = require('../config/assessmentConfig');
const generatePDF = require('../utils/pdfGenerator');
const path = require('path');
const fs = require('fs');

exports.generateReport = async (req, res) => {
  const { session_id } = req.body;

  // Convert data object values to array
  const dataArray = Object.values(data);

  // Find record
  const record = dataArray.find(d => d.session_id === session_id);
  if(!record) return res.status(404).json({ msg: 'Session not found' });

  const config = configs[record.assessment_id];
  if(!config) return res.status(400).json({ msg: 'Assessment config missing' });

  // Ensure the reports directory exists - crucial step
  const reportsDir = path.join(__dirname, '../reports');
  if(!fs.existsSync(reportsDir)){
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  // Full path for PDF output
  const pdfPath = path.join(reportsDir, `${session_id}.pdf`);

  try{
    await generatePDF(record, config, pdfPath);
    res.json({ success: true, file: `${session_id}.pdf` });
  } 
  catch(e){
    console.error(e);
    res.status(500).json({ success: false, msg: 'PDF generation failed' });
  }
};


