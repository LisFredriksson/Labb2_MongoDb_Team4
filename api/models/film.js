
const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  titel: String,
  år: Number,
  betyg: Number,
  skådespelare: [String]
}, { collection : 'films' });

module.exports = mongoose.model('Film', filmSchema);
