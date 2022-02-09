const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


const checkJWT = async (req, res, next) => {

  let token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, 'jwt secret', (err) => {
      if (err) {
        console.log(err.message, token);
        res.json({ error: 'jwt_error' });
      } else {
        next();
      }
    });
  } else {
    res.json({ error: 'jwt_error' });
  }
}

const checkIsVerified = async (req, res, next) => {

  try {
    // const token = sessionstorage.getItem('jwt');
    let token = req.headers['x-access-token'];
    var base64Payload = token.split('.')[1];
    var payload = Buffer.from(base64Payload, 'base64');
    var userID = JSON.parse(payload.toString()).id;
    req.userId = userID;
    var user = await User.findOne({ _id: userID });
    console.log(user);
    if (user.isVerified === true) {
      next();
    }
    else {
      return res.json({ error: "not_verified" });
    }
  } catch (error) {
    return res.json({ error: "not_verified" });
  }

}

module.exports = { checkIsVerified, checkJWT };