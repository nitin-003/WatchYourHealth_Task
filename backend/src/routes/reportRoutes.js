const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/authMiddleware');

// Existing generate-report route here...
const { generateReport } = require('../controllers/reportController');
router.post('/generate-report', auth, generateReport);

// Enhanced route for PDF download by session_id
router.get('/download/:session_id', auth, (req, res) => {
  const sessionId = req.params.session_id;
  
  // Validate session ID format
  if (!sessionId || typeof sessionId !== 'string' || sessionId.trim().length === 0) {
    return res.status(400).json({ msg: 'Invalid session ID provided' });
  }

  const pdfPath = path.join(__dirname, '../reports', `${sessionId}.pdf`);

  if(fs.existsSync(pdfPath)){
    // Set proper headers for PDF download
    res.setHeader('Content-Disposition', `attachment; filename="${sessionId}.pdf"`);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Cache-Control', 'no-cache');
    
    res.download(pdfPath, `${sessionId}.pdf`, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        if (!res.headersSent) {
          res.status(500).json({ msg: 'Could not download the file.' });
        }
      } else {
        console.log(`PDF downloaded successfully: ${sessionId}.pdf`);
      }
    });
  } 
  else{
    console.log(`PDF file not found: ${pdfPath}`);
    res.status(404).json({ msg: 'PDF file not found, please generate the report first.' });
  }
});

module.exports = router;


