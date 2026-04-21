/**
 * SKILLUP — Auth Routes
 * POST /api/auth/register  — Create new account
 * POST /api/auth/login     — Login and receive JWT
 * GET  /api/auth/me        — Get current user profile (protected)
 */

const express  = require('express');
const jwt      = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User     = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// ── Helper: sign a JWT and return it ──────────────────────────
const signToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });

// ── Helper: send token response ───────────────────────────────
const sendTokenResponse = (user, statusCode, res) => {
  const token = signToken(user._id);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    success: true,
    token,
    user: {
      _id:      user._id,
      name:     user.name,
      email:    user.email,
      xp:       user.xp,
      level:    user.level,
      streak:   user.streak,
      badges:   user.badges,
      role:     user.role,
      college:  user.college
    }
  });
};

/* ─────────────────────────────────────────────────────────────
   POST /api/auth/register
   Body: { name, email, password, college? }
   ───────────────────────────────────────────────────────────── */
router.post('/register', [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be 2–50 characters'),
  body('email')
    .isEmail().normalizeEmail()
    .withMessage('Please enter a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
], async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, password, college = '' } = req.body;

    // Check if email already registered
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists'
      });
    }

    // Create user — password is hashed by pre-save hook
    const user = await User.create({ name, email, password, college });

    // Award "First Step" badge for registering
    user.badges.push({ id: 'first_step', name: 'First Step', icon: '🌟' });
    user.streak.current  = 1;
    user.streak.lastLogin = new Date();
    await user.save();

    sendTokenResponse(user, 201, res);

  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
});

/* ─────────────────────────────────────────────────────────────
   POST /api/auth/login
   Body: { email, password }
   ───────────────────────────────────────────────────────────── */
router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user and explicitly SELECT password (it's hidden by default)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Update streak
    user.updateStreak();
    await user.save();

    sendTokenResponse(user, 200, res);

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
});

/* ─────────────────────────────────────────────────────────────
   GET /api/auth/me  — Protected
   Returns the logged-in user's full profile
   ───────────────────────────────────────────────────────────── */
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

/* ─────────────────────────────────────────────────────────────
   PATCH /api/auth/profile  — Protected
   Update name, bio, college, github, linkedin, avatar
   ───────────────────────────────────────────────────────────── */
router.patch('/profile', protect, [
  body('name').optional().trim().isLength({ min: 2, max: 50 }),
  body('bio').optional().isLength({ max: 300 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const allowed = ['name','bio','college','github','linkedin','avatar'];
    const updates = {};
    allowed.forEach(field => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    );
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
