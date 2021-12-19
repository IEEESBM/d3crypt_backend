// user id
// questions_id{array} (generate randomly)

const mongoose = require('mongoose');
const User = require('./models/userModel');
const Question = require('./models/questionModel');

const userQuestions = new mongoose.Schema({

    uid: {
        type: String,
    },

    questions: [{
        type: Number,
    }],
});

userSchema.pre('save', async function (next) {
    console.log("saving a new set to db");

    this.uid = User.__id;

    let totalQuestions = 30;
    let set = [];
    for (var i = 0; i < totalQuestions; i++) {
        set[i] = 0;
    }

    let randomIndex = 0;
    let easy = 5, med = 5, hard = 3;

    let curr = 0;
    while (curr != easy) {
        randomIndex = Math.floor(Math.random() * 31);
        let difficulty = Question.index[randomIndex];
        if (set[randomIndex] != 1 && difficulty == 1) {
            set[randomIndex] = 1;
            this.questions.push(randomIndex);
            curr++;
        }
    }

    curr = 0;
    while (curr != med) {
        randomIndex = Math.floor(Math.random() * 31);
        let difficulty = Question.index[randomIndex];
        if (set[randomIndex] != 1 && difficulty == 2) {
            set[randomIndex] = 1;
            this.questions.push(randomIndex);
            curr++;
        }
    }

    curr = 0;
    while (curr != hard) {
        randomIndex = Math.floor(Math.random() * 31);
        let difficulty = Question.index[randomIndex];
        if (set[randomIndex] != 1 && difficulty == 3) {
            set[randomIndex] = 1;
            this.questions.push(randomIndex);
            curr++;
        }
    }
    next();
});


const questionSets = mongoose.model('questionSets', userQuestions);

module.exports = questionSets;