/**
 * SKILLUP — User Model (Mongoose Schema)
 *
 * Stores all user data including authentication info,
 * gamification state (XP, level, streak, badges), and progress.
 */

const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const badgeSchema = new mongoose.Schema({
  id:        { type: String, required: true },  // e.g. 'first_step'
  name:      { type: String, required: true },  // e.g. 'First Step'
  icon:      { type: String, required: true },  // emoji
  earnedAt:  { type: Date,   default: Date.now }
}, { _id: false });

const userSchema = new mongoose.Schema({
  // ── Authentication ──────────────────────────────────────────
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2,  'Name must be at least 2 characters'],
    maxlength: [50, 'Name must be at most 50 characters']
  },
  email: {
    type: String,
    required:  [true, 'Email is required'],
    unique:    true,
    lowercase: true,
    trim:      true,
    match:     [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  password: {
    type:      String,
    required:  [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select:    false  // never return password in queries by default
  },
  avatar: { type: String, default: '' },  // URL to profile image

  // ── Gamification ─────────────────────────────────────────────
  xp: {
    type:    Number,
    default: 0,
    min:     0
  },
  level: {
    type:    Number,
    default: 1,
    min:     1,
    max:     7
  },
  streak: {
    current:  { type: Number, default: 0 },
    longest:  { type: Number, default: 0 },
    lastLogin: { type: Date, default: null }
  },
  badges: [badgeSchema],

  // ── Progress ─────────────────────────────────────────────────
  // levelProgress[2] = { completed: true, tasksCompleted: [0,1,2], quizScore: 80 }
  levelProgress: {
    type:    Map,
    of:      new mongoose.Schema({
      completed:      { type: Boolean, default: false },
      quizScore:      { type: Number,  default: 0 },
      tasksCompleted: [Number],
      unlockedAt:     { type: Date,    default: null },
      completedAt:    { type: Date,    default: null }
    }, { _id: false }),
    default: {}
  },

  // ── Leaderboard ───────────────────────────────────────────────
  rank:  { type: Number, default: 0 },

  // ── Social ────────────────────────────────────────────────────
  role: {
    type:    String,
    enum:    ['student', 'mentor', 'admin'],
    default: 'student'
  },
  college:  { type: String, default: '', trim: true },
  bio:      { type: String, default: '', maxlength: 300 },
  github:   { type: String, default: '' },
  linkedin: { type: String, default: '' },

  // ── Timestamps ────────────────────────────────────────────────
  createdAt:   { type: Date, default: Date.now },
  lastActiveAt:{ type: Date, default: Date.now }

}, {
  timestamps: true,    // adds createdAt & updatedAt automatically
  toJSON:     { virtuals: true },
  toObject:   { virtuals: true }
});

// ── Virtual: XP needed for next level ────────────────────────
userSchema.virtual('xpToNextLevel').get(function () {
  const thresholds = [0, 100, 500, 1000, 1400, 2000, 2500, 3500];
  return thresholds[this.level] || 0;
});

// ── Virtual: percentage progress within current level ────────
userSchema.virtual('levelProgressPct').get(function () {
  const thresholds = [0, 100, 500, 1000, 1400, 2000, 2500, 3500];
  const prev = thresholds[this.level - 1] || 0;
  const next = thresholds[this.level]     || 0;
  if (next === prev) return 100;
  return Math.min(100, Math.round(((this.xp - prev) / (next - prev)) * 100));
});

// ── Pre-save: Hash password before storing ───────────────────
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt  = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ── Instance method: compare password for login ──────────────
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// ── Instance method: update streak ───────────────────────────
userSchema.methods.updateStreak = function () {
  const now      = new Date();
  const lastDate = this.streak.lastLogin;

  if (!lastDate) {
    // First ever login
    this.streak.current = 1;
  } else {
    const diffDays = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      // Consecutive day
      this.streak.current += 1;
    } else if (diffDays > 1) {
      // Broken streak — reset
      this.streak.current = 1;
    }
    // Same day — no change
  }

  this.streak.longest   = Math.max(this.streak.longest, this.streak.current);
  this.streak.lastLogin = now;
  this.lastActiveAt     = now;
};

// ── Index: fast email lookups ─────────────────────────────────
userSchema.index({ email: 1 });
userSchema.index({ xp: -1 }); // leaderboard queries

module.exports = mongoose.model('User', userSchema);
