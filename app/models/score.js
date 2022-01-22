// import de la dépendance mongoose
const mongoose = require('mongoose');

// création d'un schema mongoose
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

// on export le schema mongoose, qui représentera la collection scores dans la bdd
module.exports = mongoose.model('Score', scoreSchema);
