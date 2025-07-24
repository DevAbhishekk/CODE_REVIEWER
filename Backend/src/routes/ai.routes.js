const express = require('express');
const aiController = require('../config/controllers/ai.controller');

const router = express.Router();

// POST route to get AI review for submitted code
// Endpoint: POST /ai/review
router.post('/review', aiController.getReview);

module.exports = router;
