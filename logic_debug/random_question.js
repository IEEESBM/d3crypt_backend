const Question = require('../models/questionModel');

console.log("saving a new set to db");
let totalQuestions = 30;
let set = [];
for (var i = 0; i < totalQuestions; i++) {
    set[i] = 0;
}

let randomIndex = 0;
let easy = 5, med = 5, hard = 3;
let randomqs = [];
let curr = 0;
while (curr != easy) {
    randomIndex = Math.floor(Math.random() * 31);
    if (set[randomIndex] != 1) {
        set[randomIndex] = 1;
        randomqs.push(randomIndex);
        curr++;
    }
}

curr = 0;
while (curr != easy) {
    randomIndex = Math.floor(Math.random() * 31);
    if (set[randomIndex] != 1) {
        set[randomIndex] = 1;
        randomqs.push(randomIndex);
        curr++;
    }
}

curr = 0;
while (curr != easy) {
    randomIndex = Math.floor(Math.random() * 31);
    if (set[randomIndex] != 1) {
        set[randomIndex] = 1;
        randomqs.push(randomIndex);
        curr++;
    }
}

question = randomqs;

console.log(question);