const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  pseudo: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Score', scoreSchema);
