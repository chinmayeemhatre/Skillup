
const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({

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
  timeTaken:      { type: Number, default: 0 },

  language:     { type: String, enum: ['python','javascript','cpp',''], default: '' },
  codeSubmitted:{ type: String, default: '' },
  passed:       { type: Boolean, default: false },

  attempt: { type: Number, default: 1 }

}, {
  timestamps: true
});

scoreSchema.index({ userId: 1, levelId: 1 });

scoreSchema.index({ levelId: 1, score: -1 });

module.exports = mongoose.model('Score', scoreSchema);