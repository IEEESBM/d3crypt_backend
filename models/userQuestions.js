// user id
// questions_id{array} (generate randomly)

const mongoose = require('mongoose');
const User = require('./models/userModel');
const Question = require('./models/questionModel');

const userQuestions = new mongoose.Schema({

    questions: [{
        type: Number,
    }],
});

userSchema.pre('save', async function (next) {
    console.log("saving a new set to db");
    
    let totalQuestions = 30;
    let set = [];
    for(var i = 0 ; i < totalQuestions; i++){
        set[i] = 0;
    }

    let randomIndex = 0;
    let easy = 5, med = 5, hard = 3;

    let curr = 0;
    while(curr!= easy){

        curr++;
    }
    
    curr = 0;
    while(curr!= med){
        
        curr++;
    }
    
    curr = 0;
    while(curr!= hard){
        curr++;
    }
    next();

  });


const questionSets = mongoose.model('questionSets', userQuestions);

module.exports = questionSets;