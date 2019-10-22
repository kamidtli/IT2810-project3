const mongoose = require('mongoose');

const { Schema } = mongoose;

const movieSchema = new Schema({
  title: String,
  year: Number,
  released: String,
  poster: String,
  type: String,
  fullplot: String,
  imdb: {
    rating: Number,
    id: Number,
    votes: Number,
  },
  directors: [String],
  genres: [String],
  plot: String,

});

module.exports = mongoose.model('Movie', movieSchema);
