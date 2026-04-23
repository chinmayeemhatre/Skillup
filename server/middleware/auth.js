/**
 * SKILLUP — JWT Authentication Middleware
 * Verifies the Bearer token from the Authorization header.
 * Attaches decoded user payload to req.user for downstream routes.
 */

const jwt  = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    // 1. Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Not authorised — no token provided'
      });
    }

    const token = authHeader.split(' ')[1];

    // 2. Verify token signature and expiry
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Check user still exists in DB (token could be valid but user deleted)
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorised — user no longer exists'
      });
    }

    // 4. Attach user to request object and proceed
    req.user = user;
    next();

  } catch (err) {
    // Handle specific JWT errors with useful messages
    if (err.name === 'JsonWebTokenError')  {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired — please login again' });
    }
    res.status(500).json({ success: false, message: 'Server error during authentication' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied — Admin only'
    });
  }
};

module.exports = { protect, admin };
