const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')

const app = express();

app.use(express.json());

const databaseURI = 'mongodb+srv://shreyaslshah:shreyasshah@shreyas-cluster.ehzs0.mongodb.net/node-auth';

// connect to database then setup express app
mongoose.connect(databaseURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(app.listen(3000))
  .catch((err) => console.log(err));


app.use(authRoutes);