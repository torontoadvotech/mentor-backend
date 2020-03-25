const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'A session must have a date']
  },
  mentee: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A session must have a mentee']
  },
  mentor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A session must have a mentor']
  },
  requestedAt: {
    type: Date,
    default: Date.now()
  },
  confirmed: {
    type: Boolean,
    default: false
  },
  confirmedAt: Date
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
