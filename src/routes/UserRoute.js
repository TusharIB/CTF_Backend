const express = require('express');
const User = require('../models/UserModel.js');

const router = express.Router();

// Check if old user is present based on main_address
router.get('/check_user/:main_address', async (req, res) => {
  try {
    const user = await User.findOne({ main_address: req.params.main_address });
    res.json({ exists: user !== null });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// User login based on main_address
router.get('/login/:main_address', async (req, res) => {
  try {
    const user = await User.findOne({ main_address: req.params.main_address });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Register new user
router.post('/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/get_points/:main_address', async (req, res) => {
  try {
    const user = await User.findOne({ main_address: req.params.main_address });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ points: user.points });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
