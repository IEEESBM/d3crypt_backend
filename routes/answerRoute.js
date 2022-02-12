const { Router } = require('express');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const Question = require('../models/questionModel');
const bodyParser = require('body-parser');
const { checkIsVerified, checkJWT } = require("../middleware/authMiddleware");

const handleAnswer = require('../middleware/answerHandling');
const handleScore = require('../middleware/scoreHandling');

const router = Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.post('/submit', async (req, res) => {
  console.log("entered submit route");
  //get data from user
  let userInput = req.body.answer;
  let token = req.body.token;
  var base64Payload = token.split(".")[1];
  var payload = Buffer.from(base64Payload, "base64");
  var id = JSON.parse(payload.toString()).id;


  //find user in db  
  let user = await User.findOne({ _id: id });
  let currScore = user.points;
  let allResponses = user.responses;
  let noofattempts = user.noofattempts;
  let currQues = user.currentQuestion;
  let qIndex = user.questions[currQues];
  console.log(currScore, allResponses, noofattempts, qIndex)

  //edge-case
  if (currQues == 30) {
    res.send("CONGRATULATIONS! YOU'RE DONE!!!");
    //show leaderboard
  } else {
    //check answer and if correct calculate score
    if (await handleAnswer.checkAnswer(userInput, qIndex).catch(err => console.log(err))) {

      console.log(req.body.answer + ' is the correct answer');
      await handleScore.updateResponses(true, id);
      await handleScore.scoreHandling(currScore, true, noofattempts, allResponses, id);
      await user.updateOne({ noofattempts: 1 });

      //go to next question:
      let next = user.currentQuestion + 1;
      await user.updateOne({ currentQuestion: next });
      await user.updateOne({ hint1_used: false });
      await user.updateOne({ hint2_used: false });
      console.log("User advanced to the next question");

      res.status(200).json({ isCorrect: true });

    } else {
      console.log("WRONG ANSWER")
      await handleScore.updateResponses(false, id);
      noofattempts += 1;
      await user.updateOne({ noofattempts: noofattempts })

      res.status(200).json({ isCorrect: false });
    }
  }
  // res.redirect('/');
});

router.put('/hint',checkIsVerified, checkJWT, async (req, res) => {
  try {
    let u = await User.findById(req.userId);
    console.log('user: ', u);
    let current = u.currentQuestion;
    console.log(u.currentQuestion);
    let cq = await Question.findOne({ index: u.questions[current] });

    //change hint cost here
    let hint_cost = 30;
    let hint_cost2 = 50;
    let pts = u.points;

    if (u.hint1_used == false) {
      await User.findByIdAndUpdate(u.id, { "hint1_used": true });
      await User.findByIdAndUpdate(u.id, { "points": (pts - hint_cost) });
      res.json({"hint1":cq.hint_1,
      "hint2":""
    });

    } else {
      if (u.hint2_used == false) {
        await User.findByIdAndUpdate(u.id, { "hint2_used": true });
        await User.findByIdAndUpdate(u.id, { "points": (pts - hint_cost2) });
        res.json(
          {"hint1":cq.hint_1,
        "hint2":cq.hint_2
      });
      } else {
        res.json(
          {"hint1":cq.hint_1,
        "hint2":cq.hint_2
      });
      }
    }
    console.log(u.hint1_used, u.hint2_used);
    console.log(u);

  } catch (err) {
    res.status(404).json({
      msg: "Error",
      body: err
    });
  }
});


module.exports = router;