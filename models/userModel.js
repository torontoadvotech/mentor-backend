const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
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
  bio: {
    type: String,
    maxlength: [500, 'Maximum of 500 characters for bio']
  },
  role: {
    type: String,
    enum: ['mentor', 'mentee', 'admin'],
    default: 'mentee'
  },
  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point']
    },
    coordinates: [Number],
    description: String
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
  },
  passwordChangedAt: Date,
  mentors: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ],
  mentees: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ]
});

// Document Middleware

// Hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

// Set password changed at if password is changed & user isn't new
userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;

  next();
});

// Query Middleware
userSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name photo bio'
  });

  next();
});

// Methods

userSchema.methods.correctPassword = async function(
  candidatePassword,
  currentPassword
) {
  return await bcrypt.compare(candidatePassword, currentPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const convertedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < convertedTimeStamp;
  }

  // false means NOT changed
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
