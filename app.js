require('dotenv').config();

const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const questionRoutes = require('./routes/questionRoutes');
const imageRoute = require('./routes/imageRoute');

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// const URL = 'mongodb+srv://shreyaslshah:shreyasshah@cluster0.ehzs0.mongodb.net/integration?retryWrites=true&w=majority';

// try {
//   mongoose.connect(URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//     .then(app.listen(4000));
//   console.log("Connected to DB !!");
// } catch (e) {
//   console.log(e);
//   throw e;
// }

// connect to database then setup express app
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(app.listen(3000))
//   .catch((err) => console.log(err));

// //testing db
mongoose.connect("mongodb+srv://admin:admin123@cluster0.ltics.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(app.listen(4000))
  .then(console.log("Connected to DB"))
  .catch((err) => console.log(err));


app.use(authRoutes);
app.use('/questions', questionRoutes);
app.use(imageRoute);