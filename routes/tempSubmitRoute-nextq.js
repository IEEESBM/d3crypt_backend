const { Router } = require('express');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const Question = require('../models/questionModel');

const router = Router();

//from answers-branch
router.post('/submit', async (req, res) => {
    //get data from user
      userInput = req.body.answer;
      id = req.body.userId;
    
    //find user in db  
      let user = await User.findById(id);
      let currScore = user.points;
      let allResponses = user.allResponses;
      let noofattempts = user.noofattempts;
      console.log(currScore,allResponses,noofattempts)
  
    //check answer and if correct calculate score
  
      
      if (await handleAnswer.checkAnswer(userInput).catch(err => console.log(err))){
  
        console.log(req.body.answer + ' is the correct answer');
        await handleScore.updateResponses(true, id);
        await handleScore.scoreHandling(currScore, true, noofattempts, allResponses, id);
        await user.updateOne({ noofattempts: 1 });

        //go to next question:
        let next = user.currentQuestion + 1;
        await user.updateOne({currentQuestion: next});
        console.log("User advanced to the next question");
  
      }else {
  
        console.log("WRONG ANSWER")
        await handleScore.updateResponses(false, id);
        noofattempts += 1;
        await user.updateOne({ noofattempts: noofattempts })
        
  
      }
  
      user = await User.findById(id);
      console.log(user.points,user.allResponses,user.noofattempts)
      res.send('Recieved your data successfully!');

      //redirects to the next/curr question;
      res.redirect('/');
    })
  