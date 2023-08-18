import express from 'express';
import Game from '../models/GameModel.js';

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
  

export default router;
