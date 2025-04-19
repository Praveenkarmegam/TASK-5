const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendResetEmail, sendActivationEmail } = require('../utils/sendEmail');
const { v4: uuidv4 } = require('uuid');

const register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const token = uuidv4();
    await new User({ email, password: hashed, firstName, lastName, activationToken: token }).save();
    await sendActivationEmail(email, token);
    res.json({ message: 'Activation email sent' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const activateAccount = async (req, res) => {
  try {
    const user = await User.findOne({ activationToken: req.params.token });
    if (!user) return res.status(400).json({ message: 'Invalid or expired activation link' });

    user.isActivated = true;
    user.activationToken = undefined;
    await user.save();
    res.json({ message: 'Account activated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ message: 'Invalid credentials' });

    if (!user.isActivated)
      return res.status(403).json({ message: 'Account not activated. Check your email.' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const token = uuidv4();
    user.resetToken = token;
    user.tokenExpiry = Date.now() + 3600000; // 1 hour
    await user.save();

    await sendResetEmail(email, token);
    res.json({ message: 'Reset link sent' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    const user = await User.findOne({ resetToken: token, tokenExpiry: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ message: 'Token invalid or expired' });

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.tokenExpiry = undefined;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  register,
  activateAccount,
  login,
  forgotPassword,
  resetPassword
 };