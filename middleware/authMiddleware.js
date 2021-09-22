const jwt = require('jsonwebtoken');
const sessionstorage = require('sessionstorage');
const User = require('../models/userModel');

const checkIsVerified = async (req, res, next) => {

  try {
    const token = sessionstorage.getItem('jwt');
    var base64Payload = token.split('.')[1];
    var payload = Buffer.from(base64Payload, 'base64');
    var userID = JSON.parse(payload.toString()).id;
    var user = await User.findOne({ _id: userID });
    if (user.isVerified === true) {
      next();
    }
    else {
      res.redirect('/login');
    }
  } catch (error) {
    res.redirect('/login');
  }

}

const checkJWT = async (req, res, next) => {

  const token = sessionstorage.getItem('jwt');
  if (token) {
    jwt.verify(token, 'jwt secret', (err) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
}

module.exports = { checkIsVerified, checkJWT };