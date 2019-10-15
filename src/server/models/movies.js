const mongoose = require('mongoose');

const { Schema } = mongoose;

const movieSchema = new Schema({
  title: String,
  year: Number,
  released: String,
  poster: String,
  type: String,
  fullplot: String,
  imdb: String,
  directors: Array,
  genres: Array,
  plot: String,

});

module.exports = mongoose.model('Movie', movieSchema);
