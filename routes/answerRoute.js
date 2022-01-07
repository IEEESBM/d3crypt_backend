const { Router } = require('express');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const Question = require('../models/questionModel');
const bodyParser = require('body-parser');

const handleAnswer = require ('../middleware/answerHandling');
const handleScore = require ('../middleware/scoreHandling');

const router = Router();

router.use(bodyParser.urlencoded({ extended: true }));

//from answers-branch
router.post('/submit', async (req, res) => {
    //get data from user
      userInput = req.body.answer;
      id = req.body.userId;
    
    //find user in db  
      let user = await User.findById(id);
      let currScore = user.points;
      let allResponses = user.responses;
      let noofattempts = user.noofattempts;
      let currQues = user.currentQuestion;
      let qIndex = user.questions[currQues-1];
      console.log(currScore,allResponses,noofattempts,qIndex)

    //check answer and if correct calculate score
  
      
      if (await handleAnswer.checkAnswer(userInput, qIndex).catch(err => console.log(err))){
  
        console.log(req.body.answer + ' is the correct answer');
        await handleScore.updateResponses(true, id);
        await handleScore.scoreHandling(currScore, true, noofattempts, allResponses, id);
        await user.updateOne({ noofattempts: 1 });

        //go to next question:
        let next = user.currentQuestion + 1;
        await user.updateOne({currentQuestion: next});
        console.log("User advanced to the next question");

        res.status(200).json({isCorrect: true});

      }else {
        console.log("WRONG ANSWER")
        await handleScore.updateResponses(false, id);
        noofattempts += 1;
        await user.updateOne({ noofattempts: noofattempts })
        
        res.status(200).json({isCorrect: false});
      }
  
      // user = await User.findById(id);
      // console.log(user.points,user.responses,user.noofattempts)
      //res.send('Recieved your data successfully!');

      //redirects to the next/curr question;
      //will change the route name if necessary
      // res.redirect('/');
    })
  
    module.exports = router;