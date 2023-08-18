const express = require('express');
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  game_id: String,
  game_name: String,
  author_name: String,
  game_contract_address: String,
  created: String,
  contract_url: String,
  difficulty_level: Number,
  network: String,
  description: String,
  base_code: String,
  won: { type: Number, default: 0 },
  winner_name: String,
  winning_date: String,
  created_date: { type: Date, default: Date.now }
});

const Game = mongoose.model('Game', gameSchema);


const router = express.Router();

// Get One Game by game_id
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
router.post('/create_contractgame', async (req, res) => {
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
        'played_Events.event_id': game_id,
        'played_Events.result': true,
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
  

  module.exports = router;