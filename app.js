require('dotenv').config();

const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(express.json());

const URL = 'mongodb+srv://shreyaslshah:shreyasshah@cluster0.ehzs0.mongodb.net/integration?retryWrites=true&w=majority';

try {
  mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(app.listen(4000));
  console.log("Connected to DB !!");
} catch (e) {
  console.log(e);
  throw e;
}


app.use(authRoutes);