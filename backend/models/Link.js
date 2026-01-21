const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  originalUrl: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  tags: {
    type: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Link', LinkSchema);
