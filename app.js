require('dotenv').config();

const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes')
var bodyParser = require('body-parser');
const answerRoute = require('./routes/answerRoute')

const cookieParser = require('cookie-parser');
const questionRoutes = require('./routes/questionRoutes');
const imageRoute = require('./routes/imageRoute');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');

const { checkIsVerified, checkJWT } = require('./middleware/authMiddleware');

const port = process.env.PORT || 4000;

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

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

  .then(app.listen(port))



  .then(console.log("Connected to DB"))
  .catch((err) => console.log(err));
  
app.get("/test",checkJWT,checkIsVerified,async(req,res)=>{
  console.log(req.userId);
  return res.json({'user':req.userId});
})

app.use(authRoutes);

app.use(bodyParser.urlencoded({ extended: true })); 



app.use(authRoutes);
app.use('/questions', questionRoutes);
app.use('/users', userRoutes);
app.use(imageRoute);
app.use(answerRoute);
app.use(profileRoutes);
