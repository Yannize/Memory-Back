// import des dépendances et modules nécessaires
const express = require('express');
const mainController = require('./controllers/mainController');

const router = express.Router();

// routes get et post qui selon la requête vont lancer la fonction concerné du mainController
router.get('/', mainController.getScoreBoard);
router.post('/add-score', mainController.addNewScore);

// on exporte le router pour y accéder dans l'index.js
module.exports = router;
