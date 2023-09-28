// gameHistoryRoutes.js
const express = require('express');
const mongoose = require('mongoose');

const User = require('../models/UserModel');


const gameHistorySchema = new mongoose.Schema({
  main_address: String,
  game_id: String,
  result: Boolean,
  game_name: String,
  game_answer: String,
  created_at: { type: Date, default: Date.now },
});

const GameHistory = mongoose.model('GameHistory', gameHistorySchema);



const router = express.Router();

// Submit game answer for a user

router.post('/submit_answer', async (req, res) => {
  try {
    const { main_address, game_id, result, game_name, game_answer } = req.body;

    // Create a new GameHistory entry
    const newGameHistory = new GameHistory({
      main_address,
      game_id,
      result,
      game_name,
      game_answer,
    });
    const savedGameHistory = await newGameHistory.save();

    // Update user's played_Events
    const user = await User.findOne({ main_address });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const playedEvent = {
      event_id: savedGameHistory._id, // Use the GameHistory _id as event_id
      name: game_name,
      result,
    };

    user.played_Events.push(playedEvent);
    await user.save();

    res.status(201).json(savedGameHistory);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/mark_result/:history_id', async (req, res) => {
    try {
      const historyId = req.params.history_id;
      const { result } = req.body;
  
      const updatedHistory = await GameHistory.findByIdAndUpdate(
        historyId,
        { result },
        { new: true }
      );
  
      if (!updatedHistory) {
        return res.status(404).json({ message: 'Game history not found' });
      }
  
      res.json(updatedHistory);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.get('/get_all_history', async (req, res) => {
    try {
      const history = await GameHistory.find();
      res.json(history);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });


  module.exports = router;
