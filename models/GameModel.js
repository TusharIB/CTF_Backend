// gameModel.js
import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  game_id: String,
  game_icon: String,
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

export default Game;
