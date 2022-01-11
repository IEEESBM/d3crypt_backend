const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


const checkJWT = async (req, res, next) => {

  const token= req.headers['x-access-token'];
  // console.log('Token ',token);
  if (token) {
    jwt.verify(token, 'jwt secret', (err,decoded) => {
      if (err) {
        console.log(err.message);
        return res.json({'err':'Not authorized'});
      } else {
        req.userId= decoded.id;
        // console.log(req.userId);
        next();
      }
    });
  } else {
    return res.status(403).json({message: "Token not found"});
  }
}

const checkIsVerified = async (req, res, next) => {

  try {
    // const token= req.headers['x-access-token'];
    // var base64Payload = token.split('.')[1];
    // var payload = Buffer.from(base64Payload, 'base64');
    // var userID = JSON.parse(payload.toString()).id;
    const userID = req.userId;
    // console.log('Verify ',userID);
    var user = await User.findOne({ _id: userID });
    if (user.isVerified === true) {
      next();
    }
    else {
      return res.status(400).json({'err':'Not verified'});
    }
  } catch (error) {
    return res.status(500).json({'err':error.toString()});
  }

}

module.exports = { checkIsVerified, checkJWT };