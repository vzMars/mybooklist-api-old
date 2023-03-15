const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static signup method
UserSchema.statics.signup = async function (email, userName, password) {
  if (!email || !userName || !password) {
    throw Error('Please complete all required fields.');
  }

  if (!validator.isEmail(email)) {
    throw Error('The email must be a valid email address.');
  }

  if (!validator.isLength(userName, { min: 2, max: 20 })) {
    if (userName.length < 2) {
      throw Error('The username must be at least 2 characters.');
    }
    throw Error('The username may not be greater than 20 characters.');
  }

  if (!validator.isAlphanumeric(userName)) {
    throw Error('The username may only contain letters and numbers.');
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('The password is not strong enough.');
  }

  const existingUser = await this.findOne({
    $or: [{ email }, { userName }],
  }).collation({ locale: 'en', strength: 2 });

  if (existingUser) {
    throw Error('The username or email has already been taken.');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, userName, password: hash });

  return user;
};

// Helper method for validating user's password.
UserSchema.methods.comparePassword = async function (password) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

module.exports = mongoose.model('User', UserSchema);
