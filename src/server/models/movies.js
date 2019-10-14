const mongoose = require('mongoose');

const { Schema } = mongoose;

const movieSchema = new Schema({
  title: String,
  year: String,
  released: String,
  poster: String,
  type: String,
  fullplot: String,
  imdb: String,
  directors: [String],
  genres: [String],
  plot: String,

});

module.exports = mongoose.model('Movie', movieSchema);
