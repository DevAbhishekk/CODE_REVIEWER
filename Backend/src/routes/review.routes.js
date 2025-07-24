const express = require('express');
const Review = require('../models/User'); // adjust path if your file is named review.js exactly

const router = express.Router();

// Create a new review
router.post('/', async (req, res) => {
  try {
    const { code, review } = req.body;
    const newReview = new Review({ code, review });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create review' });
  }
});

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

module.exports = router;
