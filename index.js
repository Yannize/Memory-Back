require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const router = require('./app/router');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));

app.use(router);

app.listen(PORT, () => {
  mongoose.connect(process.env.MONGO_ATLAS_URL);
  console.log(`🚀 http://localhost:${PORT}`);
});
