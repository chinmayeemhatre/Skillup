
const express  = require('express');
const Level    = require('../models/Level');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const levels = await Level
      .find({ isPublished: true })
      .sort({ levelNumber: 1 })
      .select('levelNumber title shortTitle icon totalXP description isPublished');

    res.json({ success: true, count: levels.length, levels });
  } catch (err) {
    console.error('Get levels error:', err);
    res.status(500).json({ success: false, message: 'Server error fetching levels' });
  }
});

router.get('/:number', protect, async (req, res) => {
  try {
    const levelNumber = parseInt(req.params.number);
    if (isNaN(levelNumber) || levelNumber < 1 || levelNumber > 7) {
      return res.status(400).json({ success: false, message: 'Invalid level number (1–7)' });
    }

    const level = await Level.findOne({ levelNumber, isPublished: true });
    if (!level) {
      return res.status(404).json({ success: false, message: 'Level not found' });
    }

    const userLevel = req.user.level;
    const isUnlocked = levelNumber <= userLevel;

    if (!isUnlocked) {
      return res.json({
        success:    true,
        level: {
          levelNumber: level.levelNumber,
          title:       level.title,
          shortTitle:  level.shortTitle,
          icon:        level.icon,
          totalXP:     level.totalXP,
          description: level.description,
          locked:      true
        }
      });
    }

    res.json({ success: true, level, locked: false });
  } catch (err) {
    console.error('Get level error:', err);
    res.status(500).json({ success: false, message: 'Server error fetching level' });
  }
});

module.exports = router;