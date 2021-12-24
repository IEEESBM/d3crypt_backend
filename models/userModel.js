const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

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
  next();
});

/// Saving Question Set
userSchema.pre("save", async function (next) {
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
    await Question.findOne({ index: randomIndex }, function (err, doc) {
      if (set[randomIndex] != 1 && this.difficulty == 1) {
        set[randomIndex] = 1;
        randomqs.push(randomIndex);
        curr++;
      }
    });
  }

  curr = 0;
  while (curr != med) {
    randomIndex = Math.floor(Math.random() * 31);
    await Question.findOne({ index: randomIndex }, function (err, doc) {
      if (set[randomIndex] != 1 && this.difficulty == 2) {
        set[randomIndex] = 1;
        randomqs.push(randomIndex);
        curr++;
      }
    });
  }

  curr = 0;
  while (curr != hard) {
    randomIndex = Math.floor(Math.random() * 31);
    await Question.findOne({ index: randomIndex }, function (err, doc) {
      if (set[randomIndex] != 1 && this.difficulty == 3) {
        set[randomIndex] = 1;
        randomqs.push(randomIndex);
        curr++;
      }
    });
  }

  this.question = randomqs;
  next();
});

const User = mongoose.model("users", userSchema);

module.exports = User;
