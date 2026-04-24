
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const badgeSchema = new mongoose.Schema({
  id:        { type: String, required: true },
  name:      { type: String, required: true },
  icon:      { type: String, required: true },
  earnedAt:  { type: Date,   default: Date.now }
}, { _id: false });

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2,  'Name must be at least 2 characters'],
    maxlength: [50, 'Name must be at most 50 characters']
  },
  username: {
    type:      String,
    unique:    true,
    trim:      true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [30, 'Username must be at most 30 characters'],
    lowercase: true,
    index:     true
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
    select:    false
  },
  avatar: { type: String, default: '' },

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

  rank:  { type: Number, default: 0 },

  role: {
    type:    String,
    enum:    ['student', 'mentor', 'admin'],
    default: 'student'
  },
  college:  { type: String, default: '', trim: true },
  bio:      { type: String, default: '', maxlength: 300 },
  github:   { type: String, default: '' },
  linkedin: { type: String, default: '' },

  createdAt:   { type: Date, default: Date.now },
  lastActiveAt:{ type: Date, default: Date.now }

}, {
  timestamps: true,
  toJSON:     { virtuals: true },
  toObject:   { virtuals: true }
});

userSchema.virtual('xpToNextLevel').get(function () {
  const thresholds = [0, 100, 500, 1000, 1400, 2000, 2500, 3500];
  return thresholds[this.level] || 0;
});

userSchema.virtual('levelProgressPct').get(function () {
  const thresholds = [0, 100, 500, 1000, 1400, 2000, 2500, 3500];
  const prev = thresholds[this.level - 1] || 0;
  const next = thresholds[this.level]     || 0;
  if (next === prev) return 100;
  return Math.min(100, Math.round(((this.xp - prev) / (next - prev)) * 100));
});

userSchema.pre('save', async function (next) {

  if (!this.username && this.email) {
    this.username = this.email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '') + Math.floor(100 + Math.random() * 900);
  }

  if (!this.isModified('password') || this.$skipPasswordHash) return next();
  const salt  = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.updateStreak = function () {
  const now      = new Date();
  const lastDate = this.streak.lastLogin;

  if (!lastDate) {

    this.streak.current = 1;
  } else {
    const diffDays = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {

      this.streak.current += 1;
    } else if (diffDays > 1) {

      this.streak.current = 1;
    }

  }

  this.streak.longest   = Math.max(this.streak.longest, this.streak.current);
  this.streak.lastLogin = now;
  this.lastActiveAt     = now;
};

userSchema.index({ xp: -1 });

module.exports = mongoose.model('User', userSchema);