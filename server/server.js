/**
 * SKILLUP — Express Backend Entry Point
 * Connects to MongoDB, registers all API routes, and starts the server.
 */

const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');
const dotenv     = require('dotenv');
const path       = require('path');

// Load environment variables from .env
dotenv.config();

const app = express();

// ── Middleware ────────────────────────────────────────────────
app.use(cors({
  origin: '*',  // Allow all origins for local development
  credentials: true
}));
app.use(express.json({ limit: '10kb' }));                       // parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files in production
app.use(express.static(path.join(__dirname, '../')));

// ── API Routes ────────────────────────────────────────────────
app.use('/api/auth',     require('./routes/auth'));
app.use('/api/levels',   require('./routes/levels'));
app.use('/api/quiz',     require('./routes/quiz'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/admin',    require('./routes/admin'));
app.use('/api/feedback', require('./routes/feedback'));

// ── Health check ──────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'SKILLUP API is running 🚀',
    timestamp: new Date().toISOString()
  });
});

// Serve frontend for all non-API routes (SPA support)
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../index.html'));
  }
});

// ── Global Error Handler ──────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

// ── Connect to MongoDB & Start Server ────────────────────────
const PORT     = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI is not defined in .env file');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`🚀 SKILLUP server running on http://localhost:${PORT}`);
      console.log(`📖 API docs at http://localhost:${PORT}/api/health`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
