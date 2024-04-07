// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup controller
exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ status: false, message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({ firstName, lastName, username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ status: true, message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login controller
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ status: false, message: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: false, message: 'Invalid credentials' });
    }

    // Generate a JSON Web Token (JWT)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ status: true, token: token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Logout controller
exports.logout = async (req, res) => {
  try {
    // Clear the JWT token from the client-side
    res.clearCookie('token');
    res.status(200).json({ status: true, message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

exports.test = async (req, res) => {
  res.status(200).json({ status: true, message: 'Test route' });
};