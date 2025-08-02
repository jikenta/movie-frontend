const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [
    {
      id: String,
      title: String,
      poster_path: String,
      release_date: String
    }
  ],
  watchlist: [
    {
      id: String,
      title: String,
      poster_path: String,
      release_date: String
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
