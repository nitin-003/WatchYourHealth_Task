const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/authMiddleware');

// Existing generate-report route here...
const { generateReport } = require('../controllers/reportController');
router.post('/generate-report', auth, generateReport);

// New route for PDF download by session_id
router.get('/download/:session_id', auth, (req, res) => {
  const sessionId = req.params.session_id;
  const pdfPath = path.join(__dirname, '../reports', `${sessionId}.pdf`);

  if(fs.existsSync(pdfPath)){
    res.download(pdfPath, `${sessionId}.pdf`, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).json({ msg: 'Could not download the file.' });
      }
    });
  } 
  else{
    res.status(404).json({ msg: 'PDF file not found, please generate the report first.' });
  }
});

module.exports = router;


