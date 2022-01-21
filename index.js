require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const router = require('./app/router');
const bodyParser = multer();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.static('public'));

app.use(bodyParser.none());

app.use(router);

app.listen(PORT, () => {
  mongoose.connect(process.env.MONGO_ATLAS_URL);
  console.log(`🚀 https://memory-back.herokuapp.com/:${PORT}`);
});
