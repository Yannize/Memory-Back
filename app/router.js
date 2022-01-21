const express = require('express');
const mainController = require('./controllers/mainController');
const router = express.Router();

router.get('/', mainController.getScoreBoard);

router.post('/add-score', mainController.addNewScore);

module.exports = router;
