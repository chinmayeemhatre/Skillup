/**
 * SKILLUP — Level Model (Mongoose Schema)
 *
 * Stores all content for each learning level:
 * theory sections, quiz questions, and coding challenges.
 */

const mongoose = require('mongoose');

// ── Quiz Question Sub-schema ──────────────────────────────────
const quizQuestionSchema = new mongoose.Schema({
  question:     { type: String, required: true },
  options:      { type: [String], required: true },  // 4 choices
  answerIndex:  { type: Number,  required: true },   // 0-3
  explanation:  { type: String,  default: '' }       // shown after answering
}, { _id: false });

// ── Theory Section Sub-schema ─────────────────────────────────
const theorySectionSchema = new mongoose.Schema({
  title:   { type: String, required: true },
  content: { type: String, required: true },  // HTML-safe text
  code:    { type: String, default: '' }       // code snippet
}, { _id: false });

// ── Resource Link Sub-schema ──────────────────────────────────
const resourceSchema = new mongoose.Schema({
  icon:  { type: String, default: '🔗' },
  title: { type: String, required: true },
  type:  { type: String, default: 'Resource' },
  url:   { type: String, required: true }
}, { _id: false });

// ── Challenge Sub-schema ──────────────────────────────────────
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
  // For auto-evaluation (future feature)
  testCases: [{
    input:          String,
    expectedOutput: String
  }]
}, { _id: false });

// ── Main Level Schema ─────────────────────────────────────────
const levelSchema = new mongoose.Schema({
  levelNumber: {
    type:     Number,
    required: true,
    unique:   true,
    min: 1, max: 7
  },
  title:     { type: String, required: true },  // "Level 2: DSA"
  shortTitle:{ type: String, required: true },  // "DSA"
  icon:      { type: String, default: '⚡' },   // emoji
  totalXP:   { type: Number, default: 100, min: 0 },
  description:{ type: String, default: '' },

  // ── Content ──────────────────────────────────────────────────
  theory: {
    sections:  [theorySectionSchema],
    resources: [resourceSchema]
  },
  quiz:      [quizQuestionSchema],
  challenge: challengeSchema,

  // ── Meta ─────────────────────────────────────────────────────
  isPublished: { type: Boolean, default: true },
  order:       { type: Number,  default: 0 }    // for sorting

}, {
  timestamps: true
});

// Main model export

module.exports = mongoose.model('Level', levelSchema);
