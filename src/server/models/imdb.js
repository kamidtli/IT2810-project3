const mongoose = require('mongoose');

const { Schema } = mongoose;

const ImdbSchema = new Schema({
  id: String,
  rating: String,
  votes: Number,
});

module.exports = mongoose.model('Imbd', ImdbSchema);
