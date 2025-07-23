const express = require('express');
const { 
  createCheckoutSession, 
  handleWebhook, 
  getSubscriptionStatus 
} = require('../controllers/paymentController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/checkout', authenticateToken, createCheckoutSession);
router.post('/webhook', express.raw({type: 'application/json'}), handleWebhook);
router.get('/subscription', authenticateToken, getSubscriptionStatus);

module.exports = router;
