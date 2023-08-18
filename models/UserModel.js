// userModel.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
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
});

const User = mongoose.model('User', userSchema);

export default User;
