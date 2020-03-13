const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const User = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: [true, 'This email has already been used'],
    lowercase: true,
    valdate: [validator.isEmail, 'Email is invalid']
  },
  photo: {
    type: String
  },
  role: {
    type: String,
    enum: ['mentor', 'mentee', 'admin'],
    default: 'mentee'
  },
  password: {
    type: String,
    required: [true, 'A password must be provided'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This validator will ONLY work on save or create, not update!
      validator: function(val) {
        return val === this.password;
      },
      message: 'Passwords do not match'
    }
  }
});

module.exports = User;
