function incrementScore(currentScore, isCorrect, attemptNumber) {
  if (isCorrect) {
    currentScore =
      attemptNumber == 1
        ? currentScore + 100
        : attemptNumber == 2
        ? currentScore + 90
        : attemptNumber == 2
        ? currentScore + 80
        : currentScore + 50;
  }
  return currentScore;
}

function addStreakBonus(responses) {
  var bonus = 0;
  for (let i = 2; i < responses.length; i += 3) {
    if (responses[i] && responses[i - 1] && responses[i - 2]) bonus += 20;
  }
  return bonus;
}

// console.log(incrementScore(20, true, 1));
// console.log(addStreakBonus(50, [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1]));

// to be done
function scoreHandling(currentScore, isCorrect, attemptNumber, responses) {
  let score = incrementScore(currentScore, isCorrect, attemptNumber);
  let currBonus = addStreakBonus(responses);

  //update user db
  
}



module.exports = {scoreHandling}
