require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
var bodyParser = require('body-parser');

const handleAnswer = require ('./middleware/answerHandling');
const handleScore = require ('./middleware/scoreHandling');

const app = express();

app.use(express.json());

// connect to database then setup express app
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(app.listen(3000))
//   .catch((err) => console.log(err));


app.use(authRoutes);

app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/submit', async (req, res) => {
    userInput = req.body.answer;
    console.log(req.body.answer + ' is the correct answer');
    if (await handleAnswer.checkAnswer(userInput)){
      handleScore.scoreHandling(20, true, 1, [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1]);
    }else {
      console.log("WRONG ANSWER")
    }
    res.send('Recieved your data successfully!');
  })


app.listen(3000, () => {
  console.log('Server started!');
})