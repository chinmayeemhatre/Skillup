/**
 * SKILLUP — Progress Routes
 * GET  /api/progress/me            — Full progress summary for current user
 * POST /api/progress/submit-code   — Submit a coding challenge solution
 * GET  /api/progress/leaderboard   — Top 20 users by XP
 * PATCH /api/progress/task         — Mark a task as complete
 */

const express  = require('express');
const { body } = require('express-validator');
const User     = require('../models/User');
const Level    = require('../models/Level');
const Score    = require('../models/Score');
const { protect } = require('../middleware/auth');

const router = express.Router();

/* ─────────────────────────────────────────────────────────────
   GET /api/progress/me  — Protected
   Returns dashboard-ready data: XP, level, streak, badges,
   recent scores, and per-level progress map.
   ───────────────────────────────────────────────────────────── */
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    // Fetch last 10 score records for the score history chart
    const recentScores = await Score
      .find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10)
      .select('levelNumber type score xpEarned createdAt');

    // XP thresholds per level
    const xpThresholds = [0, 100, 500, 1000, 1400, 2000, 2500, 3500];
    const prevXP       = xpThresholds[user.level - 1] || 0;
    const nextXP       = xpThresholds[user.level]     || 0;
    const xpInLevel    = user.xp - prevXP;
    const xpNeeded     = nextXP - prevXP;
    const levelPct     = nextXP > prevXP
      ? Math.min(100, Math.round((xpInLevel / xpNeeded) * 100))
      : 100;

    res.json({
      success: true,
      progress: {
        user: {
          _id:    user._id,
          name:   user.name,
          email:  user.email,
          avatar: user.avatar,
          college:user.college,
          role:   user.role
        },
        gamification: {
          xp:          user.xp,
          level:       user.level,
          levelPct,
          xpInLevel,
          xpNeeded,
          streak:      user.streak,
          badges:      user.badges,
          badgeCount:  user.badges.length
        },
        levelProgress: Object.fromEntries(user.levelProgress),
        recentScores
      }
    });
  } catch (err) {
    console.error('Progress fetch error:', err);
    res.status(500).json({ success: false, message: 'Server error fetching progress' });
  }
});

/* ─────────────────────────────────────────────────────────────
   POST /api/progress/submit-code  — Protected
   Body: { levelNumber, language, code }
   Stores the submission and awards challenge XP.
   ───────────────────────────────────────────────────────────── */
router.post('/submit-code', protect, [
  body('levelNumber').isInt({ min: 1, max: 7 }),
  body('language').isIn(['python','javascript','cpp']),
  body('code').isLength({ min: 10, max: 50000 })
], async (req, res) => {
  try {
    const { levelNumber, language, code } = req.body;

    const level = await Level.findOne({ levelNumber });
    if (!level) {
      return res.status(404).json({ success: false, message: 'Level not found' });
    }

    const xpEarned = Math.round(level.totalXP * 0.3);  // 30% of level XP for challenge

    // Save submission record
    await Score.create({
      userId:        req.user._id,
      levelId:       level._id,
      levelNumber,
      type:          'challenge',
      xpEarned,
      language,
      codeSubmitted: code,
      passed:        true,   // In production, run test cases here
      score:         100
    });

    // Award XP and mark challenge complete
    const user = await User.findById(req.user._id);
    user.xp += xpEarned;

    const key = String(levelNumber);
    const prog = user.levelProgress.get(key) || {};
    user.levelProgress.set(key, { ...prog, challengeCompleted: true });

    // Check for "Builder" badge
    if (!user.badges.find(b => b.id === 'builder')) {
      user.badges.push({ id: 'builder', name: 'Builder', icon: '🛠️' });
    }
    await user.save();

    res.json({
      success: true,
      message: 'Challenge submitted! Great work 🎉',
      xpEarned,
      totalXP: user.xp
    });
  } catch (err) {
    console.error('Code submit error:', err);
    res.status(500).json({ success: false, message: 'Server error submitting code' });
  }
});

/* ─────────────────────────────────────────────────────────────
   GET /api/progress/leaderboard
   Top 20 users sorted by XP — public endpoint
   ───────────────────────────────────────────────────────────── */
router.get('/leaderboard', async (req, res) => {
  try {
    const top = await User
      .find({})
      .sort({ xp: -1 })
      .limit(20)
      .select('name xp level streak badges college');

    const leaderboard = top.map((u, i) => ({
      rank:       i + 1,
      name:       u.name,
      xp:         u.xp,
      level:      u.level,
      streak:     u.streak.current,
      badgeCount: u.badges.length,
      college:    u.college
    }));

    res.json({ success: true, leaderboard });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error fetching leaderboard' });
  }
});

/* ─────────────────────────────────────────────────────────────
   GET /api/progress/mentors
   Returns all users with 'mentor' role
   ───────────────────────────────────────────────────────────── */
router.get('/mentors', async (req, res) => {
  try {
    const mentors = await User
      .find({ role: 'mentor' })
      .select('name xp level badges college bio github linkedin');

    res.json({ success: true, mentors });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error fetching mentors' });
  }
});

/* ─────────────────────────────────────────────────────────────
   PATCH /api/progress/task  — Protected
   Body: { levelNumber, taskIndex, completed }
   Marks an individual task as complete and awards small XP.
   ───────────────────────────────────────────────────────────── */
router.patch('/task', protect, [
  body('levelNumber').isInt({ min: 1, max: 7 }),
  body('taskIndex').isInt({ min: 0 }),
  body('completed').isBoolean()
], async (req, res) => {
  try {
    const { levelNumber, taskIndex, completed } = req.body;
    const user = await User.findById(req.user._id);

    const key  = String(levelNumber);
    const prog = user.levelProgress.get(key) || { tasksCompleted: [] };
    const tasks = prog.tasksCompleted || [];

    if (completed && !tasks.includes(taskIndex)) {
      tasks.push(taskIndex);
      user.xp += 10;  // +10 XP per task
    } else if (!completed) {
      const idx = tasks.indexOf(taskIndex);
      if (idx > -1) tasks.splice(idx, 1);
    }

    user.levelProgress.set(key, { ...prog, tasksCompleted: tasks });
    await user.save();

    res.json({ success: true, tasksCompleted: tasks, totalXP: user.xp });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error updating task' });
  }
});

module.exports = router;
