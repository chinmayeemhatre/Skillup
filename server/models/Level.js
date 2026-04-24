
const mongoose = require('mongoose');

const quizQuestionSchema = new mongoose.Schema({
  question:     { type: String, required: true },
  options:      { type: [String], required: true },
  answerIndex:  { type: Number,  required: true },
  explanation:  { type: String,  default: '' }
}, { _id: false });

const theorySectionSchema = new mongoose.Schema({
  title:   { type: String, required: true },
  content: { type: String, required: true },
  code:    { type: String, default: '' }
}, { _id: false });

const resourceSchema = new mongoose.Schema({
  icon:  { type: String, default: '🔗' },
  title: { type: String, required: true },
  type:  { type: String, default: 'Resource' },
  url:   { type: String, required: true }
}, { _id: false });

const challengeSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  difficulty: { type: String, enum: ['easy','medium','hard'], default: 'medium' },
  description:{ type: String, required: true },
  examples:   [{
    input:  String,
    output: String
  }],
  constraints:  { type: String, default: '' },
  hints:        [String],
  starterCode:  {
    python:     { type: String, default: '' },
    javascript: { type: String, default: '' },
    cpp:        { type: String, default: '' }
  },
  sampleOutput: { type: String, default: '' },

  testCases: [{
    input:          String,
    expectedOutput: String
  }]
}, { _id: false });

const levelSchema = new mongoose.Schema({
  levelNumber: {
    type:     Number,
    required: true,
    unique:   true,
    min: 1, max: 7
  },
  title:     { type: String, required: true },
  shortTitle:{ type: String, required: true },
  icon:      { type: String, default: '⚡' },
  totalXP:   { type: Number, default: 100, min: 0 },
  description:{ type: String, default: '' },

  theory: {
    sections:  [theorySectionSchema],
    resources: [resourceSchema]
  },
  quiz:      [quizQuestionSchema],
  challenge: challengeSchema,

  isPublished: { type: Boolean, default: true },
  order:       { type: Number,  default: 0 }

}, {
  timestamps: true
});

module.exports = mongoose.model('Level', levelSchema);