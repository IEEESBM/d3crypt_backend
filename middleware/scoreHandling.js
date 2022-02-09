const User = require('../models/userModel');
const Question = require('../models/questionModel');


async function incrementScore(currentScore, isCorrect, attemptNumber, qpoints) {
  if (isCorrect) {
    currentScore =
      attemptNumber == 1
        ? currentScore + qpoints
        : attemptNumber == 2
          ? currentScore + 0.9*qpoints
          : attemptNumber == 3
            ? currentScore + 0.8*qpoints
            : currentScore + 0.5*qpoints;
  }
  return currentScore;
}

async function addStreakBonus(responses) {
  var bonus = 0;
  for (let i = 2; i < responses.length; i += 3) {
    if (responses[i] == 1 && responses[i - 1] == 1 && responses[i - 2] == 1) bonus += 20;
  }
  return bonus;
}

async function updateResponses(isCorrect, id) {
  const user = await User.findById(id);
  prevResponses = user.responses;
  let p;
  if (isCorrect) {
    p = 1;
  } else {
    p = 0;
  }

  //updating prevResponses
  for (let i = 0; i < 3; i++) {
    prevResponses[i] = prevResponses[i + 1];
  }
  prevResponses[3] = p;

  //update db
  await user.updateOne({ responses: prevResponses })

}

// to be done
async function scoreHandling(currentScore, isCorrect, attemptNumber, responses, id) {
  const user = await User.findById(id);
  let currQues = user.currentQuestion;
  let qIndex = user.questions[currQues];
  let question = await Question.findOne({index: qIndex});
  let qpoints = question.points;
  let currPoints = await incrementScore(currentScore, isCorrect, attemptNumber, qpoints);
  let currBonus = await addStreakBonus(responses);
  

  //update user db

  console.log('score is ' + currPoints);
  console.log('bonus is ' + currBonus);


  await user.updateOne({ points: currPoints + currBonus })
}



module.exports = { scoreHandling, updateResponses }
