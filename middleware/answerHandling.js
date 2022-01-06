const Question = require('../models/questionModel');


async function checkAnswer(input, quesIndex) {
    let question = await Question.findOne({index: quesIndex});
    let answerArray = question.answer;
    console.log(answerArray, answerArray.length)

    for(let i=0; i<answerArray.length; i++){
        if(await compareInput(input, answerArray[i])){
            return true;
        }
    }
    throw 'Wrong Answer!';
}


async function compareInput(input, correctAns) {
    return input.toLowerCase() === correctAns.toLowerCase();
}



module.exports = { checkAnswer }
