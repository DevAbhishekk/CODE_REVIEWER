const { generateReview } = require('../../services/ai.service');

module.exports.getReview = async (req, res) => {
  try {
    const code = req.body.code;
    if (!code) {
      return res.status(400).json({ error: 'Code snippet is required for review.' });
    }

    const review = await generateReview(code);
    res.status(200).json({ review });
  } catch (error) {
    console.error('Error in getReview:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
