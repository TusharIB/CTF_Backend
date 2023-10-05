const express = require('express');
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  game_id: String,
  challengeName: String,
  description: String,
  setup: String,
  contractCode: String,
  challenge: String,
  hints: String,
  explanation: String,
  captured: Boolean,
  address: String,
  difficulty_level: Number,
  solution: String, 
  flag: String,
  created_date: { type: Date, default: Date.now }
});

const Game = mongoose.model('Game', gameSchema);

const router = express.Router();

// Get One Game by challengeName
router.get('/game/:game_id', async (req, res) => {
  try {
    const game = await Game.findOne({ game_id: req.params.game_id });
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get All Games
router.get('/getall_games', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a New Game
router.post('/create_challenge', async (req, res) => {
  try {
    const newGame = new Game(req.body);
    const savedGame = await newGame.save();
    res.status(201).json(savedGame);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Check if any user has played the game and has a successful result
router.get('/check_game_played/:game_id', async (req, res) => {
    try {
      const game_id = req.params.game_id;
      const usersWithGamePlayed = await User.find({
        'playedChallenges.challengeName': challengeName,
      'playedChallenges.captured': true,
      });
  
      if (usersWithGamePlayed.length > 0) {
        res.json({ gamePlayed: true, users: usersWithGamePlayed });
      } else {
        res.json({ gamePlayed: false });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

router.delete('/game/:game_id', async (req, res) => {
  try {
    const game = await Game.findOne({ game_id: req.params.game_id });
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    
    // Perform the deletion
    await game.remove();

    res.json({ message: 'Game deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
