const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: {
    type: String, 
    required : true,
  },

  index:{
    type: Number,
    required: true,
    unique : true
  },

  difficulty: {
    type : Number,
    required: true,
    validate: [validateDifficulty, 'invalid difficulty']
  },

  image_1: {type: String, required: true},
  image_2: {type: String, required: true},
  image_3: {type: String},
  image_4: {type: String},

  hint_1: {type: String, required: true},
  hint_2: {type: String},

  answer: [{
    type: String, required: true
  }],

  points: {type: Number}

});

function validateDifficulty(n) {return (n <= 3 && n >= 1)}

questionSchema.pre('save', async function (next) {
  console.log("saving a new question to db");

  let diff = await this.difficulty;
  this.points = await this.difficulty*100;
  console.log(this);
  next();
});


questionSchema.post('save', () => {
  console.log("question saved");
});



const Question = mongoose.model('questions', questionSchema);

module.exports = Question;
