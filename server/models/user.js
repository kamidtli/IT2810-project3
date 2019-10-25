const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  watchlist: {
    type: [Object], // List of movies
    required: true,
  },
});

module.exports = mongoose.model('User', userSchema);
