require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')

const app = express();

app.use(express.json());

// connect to database then setup express app
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(app.listen(3000))
  .catch((err) => console.log(err));


app.use(authRoutes);