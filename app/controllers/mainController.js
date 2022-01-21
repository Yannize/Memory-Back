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
    }
  },

  addNewScore: async (req, res) => {
    let score = new Score({
      pseudo: req.body.pseudo,
      time: req.body.time,
    });

    try {
      score = await score.save();
    } catch (error) {
      res.status(400).send('404');
    }
    res.redirect('/');
  },
};

module.exports = mainController;
