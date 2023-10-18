const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  mail_id:String,
  main_address: String,
  created: { type: Date, default: Date.now },
  total_wins: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  played_Events: [
    {
      event_id: String,
      name: String,
      result: { type: Boolean, default: false },
    },
  ],
  completedChallenge: [String]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
