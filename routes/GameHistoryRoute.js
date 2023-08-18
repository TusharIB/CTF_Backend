// gameHistoryRoutes.js
import express from 'express';
import GameHistory from './gameHistoryModel.js';

const router = express.Router();

// Submit game answer for a user
router.post('/submit_answer', async (req, res) => {
  try {
    const newGameHistory = new GameHistory(req.body);
    const savedGameHistory = await newGameHistory.save();
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


export default router;