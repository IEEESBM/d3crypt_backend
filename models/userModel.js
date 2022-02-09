const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const Question = require('../models/questionModel');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    // lowercase: true,
    //     unique: true,    //inter-college event and hence students participating can have same names, hence commented 
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
  phone: {
    type: Number,
    unique: true,
    required: [true, 'Please enter a phone number'],
    // min : [1000000000, 'Sorry that is not a valid phone number'],
    // max : [9999999999 ,'Sorry that is not a valid phone number']
  },
  college: {
    type: String,
    required: [true, 'Please enter the name of your college'],
  },
  ID: {
    type: Number,
  },
  mem: {
    type: Boolean,
    required: [true, 'Please choose one option'],
  },
  memNo: {
    type: Number,
  },


  noofattempts: {
    type: Number
  },

  responses: {
    type: Array
  },

  isVerified: Boolean,
  imgKey: {
    type: String,
    default: ""
  },
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

  hint1_used: {
    type: Boolean,
  },

  hint2_used: {
    type: Boolean,
  },

});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  this.noofattempts = 1;

  //Random Set alloc
  console.log("saving a new set to db");

  let totalQuestions = 30;
  let set = new Array(totalQuestions).fill(0);

  let totalQuestions_user = 15;
  let randomqs = new Array(totalQuestions_user).fill(-1);

  await generate(randomqs, set, totalQuestions);

  console.log(randomqs);
  this.questions = randomqs;
  this.currentQuestion = 0;
  this.points = 0;
  this.hint1_used = false;
  this.hint2_used = false;
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email: email });
  if (user) {
    if (user.isVerified == false) {
      throw Error('not verified')
    }
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    else {
      throw Error('incorrect password');
    }
  }
  else {
    throw Error('incorrect email');
  }
}

async function generate(randomqs, set, totalQuestions) {
  const easyidx = 0;
  const medidx = 10;
  const hardidx = 20;

  //change number of easy/med/hard questions to be solved by the user.
  const easy_questions = 10;
  const med_questions = 10;
  const hard_questions = 10;

  await generate_easy(easy_questions, 0, easyidx, randomqs, set, totalQuestions);
  await generate_med(med_questions, 0, medidx, randomqs, set, totalQuestions);
  await generate_hard(hard_questions, 0, hardidx, randomqs, set, totalQuestions);
}

async function generate_easy(easy, curr, idx1, randomqs, set, totalQuestions) {
  if (easy == curr) return;
  randomIndex1 = Math.floor(Math.random() * (14));

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

  // console.log(randomqs);
}

async function generate_med(med, curr, idx2, randomqs, set, totalQuestions) {
  if (med == curr) return;
  // randomIndex = Math.floor(Math.random() * (totalQuestions + 1));
  randomIndex2 = 14 + Math.floor(Math.random() * (14));
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

  // console.log(randomqs);
}

async function generate_hard(hard, curr, idx3, randomqs, set, totalQuestions) {
  if (hard == curr) return;
  randomIndex3 = 28 + Math.floor(Math.random() * (11));
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
  // console.log(randomqs);
}

const User = mongoose.model("users", userSchema);

module.exports = User;
