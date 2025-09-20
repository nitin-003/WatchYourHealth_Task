const express = require('express');
const router = express.Router();
const sessionCtrl = require('../controllers/sessionController');
const auth = require('../middleware/authMiddleware');

router.get('/sessions', auth, sessionCtrl.getSessions);
module.exports = router;



