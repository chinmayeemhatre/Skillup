
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  user: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'User',
    required: true
  },
  rating: {
    type:     Number,
    required: true,
    min:      1,
    max:      5
  },
  type: {
    type:     String,
    enum:     ['suggestion', 'bug', 'praise'],
    required: true
  },
  title: {
    type:     String,
    trim:     true,
    maxlength: 100
  },
  content: {
    type:     String,
    required: true,
    trim:     true,
    maxlength: 2000
  },
  status: {
    type:     String,
    enum:     ['new', 'reviewed', 'resolved'],
    default:  'new'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Feedback', feedbackSchema);