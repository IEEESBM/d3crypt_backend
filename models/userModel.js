const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, 'Please enter a Username']
  },

  email: {
    type: String,
    required: [true, 'Please enter your Email ID'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid Email ID']
  },

  password: {
    type: String,
    required: [true, 'Please enter a Password'],
    minlength: [4, 'Minimum Password length must be 4 characters']
  },

  isVerified: Boolean,
});



userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email: email });
  if (user) {
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


const User = mongoose.model('users', userSchema);

module.exports = User;