
const express  = require('express');
const { body, validationResult } = require('express-validator');
const Level    = require('../models/Level');
const Score    = require('../models/Score');
const User     = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/submit', protect, [
  body('levelNumber').isInt({ min: 1, max: 7 }).withMessage('Invalid level number'),
  body('answers').isArray({ min: 1 }).withMessage('Answers array is required'),
  body('timeTaken').optional().isInt({ min: 0 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { levelNumber, answers, timeTaken = 0 } = req.body;

    const level = await Level.findOne({ levelNumber });
    if (!level || !level.quiz.length) {
      return res.status(404).json({ success: false, message: 'Level or quiz not found' });
    }

    let correct = 0;
    level.quiz.forEach((q, i) => {
      if (answers[i] === q.answerIndex) correct++;
    });

    const total     = level.quiz.length;
    const scorePct  = Math.round((correct / total) * 100);
    const xpEarned  = Math.round(level.totalXP * 0.2 * (correct / total));

    const prevAttempts = await Score.countDocuments({
      userId: req.user._id,
      levelId: level._id,
      type: 'quiz'
    });

    const score = await Score.create({
      userId:         req.user._id,
      levelId:        level._id,
      levelNumber,
      type:           'quiz',
      score:          scorePct,
      correctAnswers: correct,
      totalQuestions: total,
      xpEarned,
      timeTaken,
      attempt:        prevAttempts + 1
    });

    const user = await User.findById(req.user._id);
    user.xp += xpEarned;

    const progressKey = String(levelNumber);
    const existing    = user.levelProgress.get(progressKey) || {};
    const prevBest    = existing.quizScore || 0;
    user.levelProgress.set(progressKey, {
      ...existing,
      quizScore: Math.max(prevBest, scorePct)
    });

    const xpThresholds = [0, 100, 500, 1000, 1400, 2000, 2500, 3500];
    let newBadges = [];
    while (user.level < 7 && user.xp >= xpThresholds[user.level]) {
      user.level += 1;
      const levelUpBadge = {
        id:   `level_${user.level}`,
        name: `Level ${user.level} Reached`,
        icon: '⚡'
      };
      if (!user.badges.find(b => b.id === levelUpBadge.id)) {
        user.badges.push(levelUpBadge);
        newBadges.push(levelUpBadge);
      }
    }

    const badgeChecks = [
      { condition: user.streak.current >= 7,  id: 'week_streak',   name: '7-Day Streak',  icon: '🔥' },
      { condition: user.xp >= 500,            id: 'xp_500',        name: 'XP Hunter',     icon: '⭐' },
      { condition: scorePct === 100,           id: 'perfect_quiz',  name: 'Perfect Score', icon: '🎯' },
      { condition: user.badges.length >= 5,   id: 'badge_collector',name:'Badge Collector',icon:'🏅' }
    ];
    badgeChecks.forEach(({ condition, id, name, icon }) => {
      if (condition && !user.badges.find(b => b.id === id)) {
        user.badges.push({ id, name, icon });
        newBadges.push({ id, name, icon });
      }
    });

    await user.save();

    res.json({
      success: true,
      result: {
        score:    scorePct,
        correct,
        total,
        xpEarned,
        newLevel: user.level,
        totalXP:  user.xp,
        newBadges
      }
    });

  } catch (err) {
    console.error('Quiz submit error:', err);
    res.status(500).json({ success: false, message: 'Server error submitting quiz' });
  }
});

router.get('/history', protect, async (req, res) => {
  try {
    const history = await Score
      .find({ userId: req.user._id, type: 'quiz' })
      .sort({ createdAt: -1 })
      .limit(50)
      .select('levelNumber score correctAnswers totalQuestions xpEarned attempt createdAt');

    res.json({ success: true, history });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error fetching quiz history' });
  }
});

module.exports = router;