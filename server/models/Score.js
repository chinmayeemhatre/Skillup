/**
 * SKILLUP — Score Model (Mongoose Schema)
 *
 * Records every quiz submission and coding challenge submission.
 * Used for score history, leaderboards, and analytics.
 */

const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  // ── References ────────────────────────────────────────────────
  userId: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'User',
    required: true,
    index:    true
  },
  levelId: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'Level',
    required: true
  },
  levelNumber: {
    type:     Number,
    required: true
  },

  // ── Quiz Results ──────────────────────────────────────────────
  type: {
    type:    String,
    enum:    ['quiz', 'challenge'],
    required: true
  },
  score: {
    type: Number,
    min:  0,
    max:  100,
    default: 0
  },
  correctAnswers: { type: Number, default: 0 },
  totalQuestions: { type: Number, default: 0 },
  xpEarned:       { type: Number, default: 0 },
  timeTaken:      { type: Number, default: 0 },  // seconds

  // ── Challenge Results ─────────────────────────────────────────
  language:     { type: String, enum: ['python','javascript','cpp',''], default: '' },
  codeSubmitted:{ type: String, default: '' },
  passed:       { type: Boolean, default: false },

  // ── Meta ─────────────────────────────────────────────────────
  attempt: { type: Number, default: 1 }  // which attempt number

}, {
  timestamps: true  // createdAt = submission time
});

// Compound index for fetching a user's scores per level
scoreSchema.index({ userId: 1, levelId: 1 });

// Index for leaderboard queries sorted by score
scoreSchema.index({ levelId: 1, score: -1 });

module.exports = mongoose.model('Score', scoreSchema);
