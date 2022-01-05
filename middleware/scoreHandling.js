const User = require('../models/userModel');

async function incrementScore(currentScore, isCorrect, attemptNumber) {
  if (isCorrect) {
    currentScore =
      attemptNumber == 1
        ? currentScore + 100
        : attemptNumber == 2
        ? currentScore + 90
        : attemptNumber == 3
        ? currentScore + 80
        : currentScore + 50;
  }
  return currentScore;
}

async function addStreakBonus(responses) {
  var bonus = 0;
  for (let i = 2; i < responses.length; i += 3) {
    if (responses[i] && responses[i - 1] && responses[i - 2]) bonus += 20;
  }
  return bonus;
}

async function updateResponses(isCorrect, id) {
  const user = await User.findById(id);
  prevResponses = user.responses;
  let p;
  if (isCorrect){
    p = 1;
  }else {
    p = 0;
  }

//updating prevResponses
  for(let i = 0; i < 3; i++){
    prevResponses[i] = prevResponses [i+1];
  }
  prevResponses[3] = p;

//update db
await user.updateOne({ responses: prevResponses })

}

// to be done
async function scoreHandling(currentScore, isCorrect, attemptNumber, responses, id) {
  let points = await incrementScore(currentScore, isCorrect, attemptNumber);
  let currBonus = await addStreakBonus(responses);
  const user = await User.findById(id);

  //update user db
  
  console.log('score is ' + points);
  console.log('bonus is ' + currBonus);
  

  await user.updateOne({ points: points + currBonus })
}



module.exports = {scoreHandling, updateResponses}
