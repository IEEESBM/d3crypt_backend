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
  let set = [];
  for (var i = 0; i < totalQuestions; i++) {
    set[i] = 0;
  }

  let randomIndex = 0;
  let easy = 5, med = 5, hard = 3;
  let randomqs = [];
  let curr = 0;

  generate_med(5, 0, randomqs, set, totalQuestions);
  generate_easy(5, 0, randomqs, set, totalQuestions);
  generate_hard(5, 0, randomqs, set, totalQuestions);

  console.log(randomqs);
  this.questions = randomqs;
  next();

});

async function generate_easy(easy, curr, randomqs, set, totalQuestions) {
  if (easy == curr) return;
  randomIndex = Math.floor(Math.random() * (totalQuestions + 1));
  let q = await Question.findOne({ index: randomIndex }, function (err, doc) {
    try {
      if (set[randomIndex] != 1 && doc.difficulty == 1) {
        set[randomIndex] = 1;
        randomqs.push(randomIndex);
        curr++;
      }
    } catch (err) {
      console.log(err);
    }
    generate_easy(easy, curr, randomqs, set, totalQuestions);
  }).clone();
  console.log(randomqs);
}

async function generate_med(med, curr, randomqs, set, totalQuestions) {
  if (med == curr) return;
  randomIndex = Math.floor(Math.random() * (totalQuestions + 1));
  let q = await Question.findOne({ index: randomIndex }, function (err, doc) {
    try {
      if (set[randomIndex] != 1 && doc.difficulty == 2) {
        set[randomIndex] = 1;
        randomqs.push(randomIndex);
        curr++;
      }
    } catch (err) {
      console.log(err);
    }
    generate_med(med, curr, randomqs, set, totalQuestions);
  }).clone();
  console.log(randomqs);
}

async function generate_hard(hard, curr, randomqs, set, totalQuestions) {
  if (hard == curr) return;
  randomIndex = Math.floor(Math.random() * (totalQuestions + 1));
  let q = await Question.findOne({ index: randomIndex }, function (err, doc) {
    try {
      if (set[randomIndex] != 1 && doc.difficulty == 3) {
        set[randomIndex] = 1;
        randomqs.push(randomIndex);
        curr++;
      }
    } catch (err) {
      console.log(err);
    }
    generate_hard(hard, curr, randomqs, set, totalQuestions);
  }).clone();
  console.log(randomqs);
}

const User = mongoose.model("users", userSchema);

module.exports = User;
