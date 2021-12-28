const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const Question = require('../models/questionModel');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "Please enter a Username"],
  },

  email: {
    type: String,
    required: [true, "Please enter your Email ID"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid Email ID"],
  },

  password: {
    type: String,
    required: [true, "Please enter a Password"],
    minlength: [4, "Minimum Password length must be 4 characters"],
  },

  isVerified: Boolean,

  questions: [
    {
      type: Number,
    },
  ],

  currentQuestion: {
    type: Number,
  },

  points: {
    type: Number,
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  //Random Set alloc
  console.log("saving a new set to db");

  let totalQuestions = 20;
  let set = new Array(totalQuestions).fill(0);

  let totalQuestions_user = 15;
  let randomqs = new Array(totalQuestions_user).fill(-1);

  await generate(randomqs, set, totalQuestions);

  console.log(randomqs);
  this.questions = randomqs;
  this.currentQuestion = 0;
  this.points = 0;
  next();

});

async function generate(randomqs, set, totalQuestions) {
  const easyidx = 0;
  const medidx = 5;
  const hardidx = 10;

  //change number of easy/med/hard questions to be solved by the user.
  const easy_questions = 5;
  const med_questions = 5;
  const hard_questions = 5;

  await generate_easy(easy_questions, 0, easyidx, randomqs, set, totalQuestions);
  await generate_med(med_questions, 0, medidx, randomqs, set, totalQuestions);
  await generate_hard(hard_questions, 0, hardidx, randomqs, set, totalQuestions);
}

async function generate_easy(easy, curr, idx1, randomqs, set, totalQuestions) {
  if (easy == curr) return;
  randomIndex1 = Math.floor(Math.random() * (9));

  try {
    let doc = await Question.findOne({ index: randomIndex1 });

    if (doc != null && set[randomIndex1] != 1 && doc.difficulty == 1) {
      set[randomIndex1] = 1;
      // console.log('easy idx:',idx1);
      randomqs[idx1++] = randomIndex1;
      curr++;
    }

    await generate_easy(easy, curr, idx1, randomqs, set, totalQuestions);
  }
  catch (error) {
    console.log(error);
  }

  console.log(randomqs);
}

async function generate_med(med, curr, idx2, randomqs, set, totalQuestions) {
  if (med == curr) return;
  // randomIndex = Math.floor(Math.random() * (totalQuestions + 1));
  randomIndex2 = 9 + Math.floor(Math.random() * (7));
  try {
    let doc = await Question.findOne({ index: randomIndex2 });

    if (doc != null && set[randomIndex2] != 1 && doc.difficulty == 2) {
      set[randomIndex2] = 1;
      // console.log('med idx:',idx2);
      randomqs[idx2++] = randomIndex2;
      curr++;
    }

    await generate_med(med, curr, idx2, randomqs, set, totalQuestions);
  }
  catch (error) {
    console.log(error);
  }

  console.log(randomqs);
}

async function generate_hard(hard, curr, idx3, randomqs, set, totalQuestions) {
  if (hard == curr) return;
  randomIndex3 = 16 + Math.floor(Math.random() * (5));
  try {
    let doc = await Question.findOne({ index: randomIndex3 });

    if (doc != null && set[randomIndex3] != 1 && doc.difficulty == 3) {
      set[randomIndex3] = 1;
      randomqs[idx3++] = randomIndex3;
      curr++;
    }

    await generate_hard(hard, curr, idx3, randomqs, set, totalQuestions);
  }
  catch (error) {
    console.log(error);
  }
  console.log(randomqs);
}

const User = mongoose.model("users", userSchema);

module.exports = User;
