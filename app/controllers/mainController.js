const Score = require('../models/score');

const mainController = {
  getScoreBoard: async (req, res) => {
    try {
      const data = await Score.find();
      const scores = data
        .sort((a, b) => +a.time - +b.time)
        .map((score, i) => {
          return {
            place: i + 1,
            pseudo: score.pseudo,
            time: score.time,
          };
        });
      res.status(200).json(scores);
    } catch (error) {
      console.trace(error);
      res.status(400).json({ getScore: 'une erreur est survenue' });
    }
  },

  addNewScore: async (req, res) => {
    let { pseudo, time } = req.body;

    if (+time <= 6) {
      pseudo += ' (Soupçons de tricherie !)';
    }

    let score = new Score({
      pseudo,
      time,
    });

    try {
      score = await score.save();
      res.status(200).json({ save: 'ok' });
    } catch (error) {
      res.status(400).json({ save: 'une erreur est survenue' });
    }
  },
};

module.exports = mainController;
