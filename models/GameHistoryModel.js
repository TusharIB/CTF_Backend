import mongoose from 'mongoose';

const gameHistorySchema = new mongoose.Schema({
  main_address: String,
  game_id: String,
  result: Boolean,
  game_name: String,
  game_answer: String,
  created_at: { type: Date, default: Date.now },
});

const GameHistory = mongoose.model('GameHistory', gameHistorySchema);

export default GameHistory;
