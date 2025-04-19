const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationToken: String,
  resetToken: String,
  tokenExpiry: Date,
});

module.exports = mongoose.model('User', userSchema);