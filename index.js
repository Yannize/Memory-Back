// import des dépendances
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const router = require('./app/router');

const bodyParser = multer();
const app = express();

const PORT = process.env.PORT || 3000;

// connection à la bdd mongo atlas
mongoose.connect(process.env.MONGO_ATLAS_URL);

// cors middleware pour n'authoriser que les requêtes qui viennent du site en origin
app.use(
  cors({
    origin: 'https://yannize.github.io',
  })
);

// middleware multer pour parser le FormData en objet dans le body de la requête
app.use(bodyParser.none());

// middleware du router
app.use(router);

// Lance le serveur sur le port spécifié
app.listen(PORT, () => {
  console.log(`🚀 https://memory-back.herokuapp.com/:${PORT}`);
});
