/**
 * SKILLUP — Feedback Routes
 * POST /api/feedback — Submit new feedback
 * GET /api/feedback — Admin view (managed via admin route)
 */

const express  = require('express');
const { body, validationResult } = require('express-validator');
const Feedback = require('../models/Feedback');
const { protect } = require('../middleware/auth');

const router = express.Router();

/* ─────────────────────────────────────────────────────────────
   POST /api/feedback  — Protected
   Body: { rating, type, title, content }
   ───────────────────────────────────────────────────────────── */
router.post('/', protect, [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('type').isIn(['suggestion', 'bug', 'praise']).withMessage('Invalid feedback type'),
  body('content').isLength({ min: 10, max: 2000 }).withMessage('Content must be 10–2000 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { rating, type, title, content } = req.body;

    const feedback = await Feedback.create({
      user: req.user._id,
      rating,
      type,
      title: title || '',
      content
    });

    res.status(201).json({
      success: true,
      message: 'Feedback received! Thank you for helping us grow 🚀',
      feedback
    });

  } catch (err) {
    console.error('Feedback submission error:', err);
    res.status(500).json({ success: false, message: 'Server error submitting feedback' });
  }
});

module.exports = router;
