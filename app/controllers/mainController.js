// import du modèle score
const Score = require('../models/score');

const mainController = {
  /**
   * fonction qui récupère tous les scores dans la bdd (asynchrone car on va attendre la réponse de la bdd)
   *
   * @param {Object} req - Objet request fourni par Express
   * @param {Object} res - Objet response fourni par Express
   */
  getScoreBoard: async (req, res) => {
    try {
      // on cherche TOUT ce qui se trouve dans la collection Score
      const data = await Score.find();
      // s'il n'y a pas d'erreur la bdd nous renvoi un tableau d'objet de cette forme :
      // [
      //   {
      //     _id: new ObjectId("61ebdb62d754850133bda038"),
      //     pseudo: 'Yann H. 😁',
      //     time: '30',
      //     __v: 0
      //   },
      //   {
      //     _id: new ObjectId("61ec27ea92d93b0e6e94ffcc"),
      //     pseudo: 'Jean Bon',
      //     time: '15',
      //     __v: 0
      //   }
      // ]
      const scores = data

        // on boucle et on fait un trie ascendant des objets en fonction des temps enregistrés (des temps les plus cours au plus long)
        .sort((a, b) => +a.time - +b.time)

        // puis on map pour nettoyer les informations inutiles au front comme _id et __v
        // et on ajoute dans chaque objet une propriété "place" contenant le classement (en utilise l'index de l'itération)
        // [
        //   {
        //     "place": 1,
        //     "pseudo": "Jean Bon",
        //     "time": "15"
        //   },
        //   {
        //     "place": 2,
        //     "pseudo": "Yann H. 😁",
        //     "time": "30"
        //   }
        // ]
        .map((score, i) => {
          return {
            place: i + 1,
            pseudo: score.pseudo,
            time: score.time,
          };
        });

      // on renvoi ce tableau d'objet dans un format JSON au Front
      res.status(200).json(scores);
    } catch (error) {
      console.trace(error);
      res.status(400).json({ getScore: 'une erreur est survenue' });
    }
  },

  /**
   * fonction qui enregistre un nouveau score (asynchrone aussi)
   *
   * @param {Object} req - Objet request fourni par Express
   * @param {Object} res - Objet response fourni par Express
   */
  addNewScore: async (req, res) => {
    // on destructure pseudo et time de l'objet body qui contient le FormData envoyé par le Front
    let { pseudo, time } = req.body;

    // on met un petit message surprise pour ceux qui auraient trifouillé l'input hidden pour tricher 😈
    // et les dévoiler au grand jour ! (optionnel)
    if (+time <= 6) {
      pseudo += ' (Soupçons de tricherie !)';
    }

    // on crée une instance du modèle Score qui n'accepte que 2 propriétés pseudo(de type String et required) time(de type String et required)
    let score = new Score({
      pseudo,
      time,
    });

    // l'opération asynchrone dans un try catch
    try {
      // .save() permet d'envoyer l'instance score à la bdd (on attend, si pas de catch, tout s'est bien passé)
      score = await score.save();
      // on peut renvoyer quelque chose au Front pour dire que tout est ok.
      res.status(200).json({ save: 'ok' });
    } catch (error) {
      console.trace(error);
      res.status(400).json({ save: 'une erreur est survenue' });
    }
  },
};

// on export le mainController pour pouvoir l'utiliser dans le fichier router.js
module.exports = mainController;
