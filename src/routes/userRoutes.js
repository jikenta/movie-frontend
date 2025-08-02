
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/favorites', async (req, res) => {
  const { userId, movie } = req.body;
  const user = await User.findById(userId);
  user.favorites.push(movie);
  await user.save();
  res.json(user.favorites);
});

router.post('/watchlist', async (req, res) => {
  const { userId, movie } = req.body;
  const user = await User.findById(userId);
  user.watchlist.push(movie);
  await user.save();
  res.json(user.watchlist);
});

module.exports = router;
