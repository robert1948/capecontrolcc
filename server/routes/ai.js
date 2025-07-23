const express = require('express');
const { processQuery, getQueryHistory } = require('../controllers/aiController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/query', authenticateToken, processQuery);
router.get('/history', authenticateToken, getQueryHistory);

module.exports = router;
