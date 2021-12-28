require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const questionRoutes = require('./routes/questionRoutes');

const app = express();

app.use(express.json());
app.use(cookieParser());

// connect to database then setup express app
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(app.listen(3000))
//   .catch((err) => console.log(err));

//testing db
mongoose.connect("mongodb+srv://admin:admin123@cluster0.ltics.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(app.listen(3000))
  .then(console.log("Connected to DB"))
  .catch((err) => console.log(err));


app.use(authRoutes);
app.use('/questions', questionRoutes);