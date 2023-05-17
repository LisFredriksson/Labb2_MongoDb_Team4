const config = require('./config');
const mongoose = require('mongoose');


const FilmSchema = new mongoose.Schema({   //Schema
  titel: String,
  regissör: String,
  genre: String,
  år: Number,
  betyg: Number,
  skådespelare: [String]
});

module.exports = mongoose.model('Film', FilmSchema);
