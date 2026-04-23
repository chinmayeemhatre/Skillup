const express = require('express');
const router  = express.Router();
const { protect, admin } = require('../middleware/auth');
const User  = require('../models/User');
const Level = require('../models/Level');
const Score = require('../models/Score');
const Feedback = require('../models/Feedback');

// Apply protection to all admin routes
router.use(protect);
router.use(admin);

/**
 * GET /api/admin/stats
 * Get overall platform stats for the admin dashboard
 */
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'student' });
    const totalXP    = await User.aggregate([{ $group: { _id: null, total: { $sum: '$xp' } } }]);
    const totalLevels = await Level.countDocuments();
    const recentScores = await Score.find().sort({ createdAt: -1 }).limit(5).populate('user', 'name');

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalXP: totalXP[0]?.total || 0,
        totalLevels,
        recentActivity: recentScores
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching admin stats' });
  }
});

/**
 * GET /api/admin/users
 * List all users with their current progress
 */
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ xp: -1 });
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching users' });
  }
});

/**
 * GET /api/admin/feedback
 * Fetch all platform feedback
 */
router.get('/feedback', async (req, res) => {
  try {
    const feedback = await Feedback.find()
      .populate('user', 'name email username')
      .sort({ createdAt: -1 });
    res.json({ success: true, feedback });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

/**
 * DELETE /api/admin/users/:id
 * Delete a user account
 */
router.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting user' });
  }
});

module.exports = router;
