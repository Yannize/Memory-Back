const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  pseudo: String,
  time: String,
});

module.exports = mongoose.model('Score', scoreSchema);
