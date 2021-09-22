const { Router } = require('express');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const sessionstorage = require('sessionstorage');
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const { checkIsVerified, checkJWT } = require('../middleware/authMiddleware');

const router = Router();


/* *********************************************************** */

const handleErrors = (error) => {

  let errorMessage = { username: '', email: '', password: '' };

  // wrong email/password during login error
  if (error.message === 'incorrect email') {
    errorMessage.email = 'that email is not registered';
  }
  if (error.message === 'incorrect password') {
    errorMessage.password = 'password is incorrect';
  }

  // username/email not available during signup error
  if (error.code === 11000) {
    if (error.keyValue.username) {
      errorMessage.username = 'That username is not available';
    }
    if (error.keyValue.email) {
      errorMessage.email = 'That email is already registered';
    }
  }

  // validation failed during signup error
  if (error.message.includes('users validation failed')) {
    Object.values(error.errors).forEach((err) => {
      errorMessage[err.properties.path] = err.properties.message;
    });
  }

  return errorMessage;
}

/* *********************************************************** */

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'jwt secret', {
    expiresIn: maxAge
  })
}

/* *********************************************************** */

router.get('/', checkIsVerified, checkJWT, async (req, res) => {
  res.send('home page');
})

/* *********************************************************** */

router.get('/signup', (req, res) => {
  res.send('signup page');
})

/* *********************************************************** */

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
      isVerified: false
    });
    const token = createToken(user._id);
    sessionstorage.setItem('jwt', token);

    var transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: "shreyas.shah@learner.manipal.edu",
        pass: "shahlshreyas@19"
      }
    });

    const options = {
      from: 'shreyas.shah@learner.manipal.edu',
      to: 'shreyaslshah@gmail.com',
      subject: 'email verification',
      text: `go to this link: `,
      html: `<a href='http://${req.headers.host}/verify-email?uid=${user._id}'>click to verify</a>`
    }

    transporter.sendMail(options, function (err, info) {
      if (err) {
        console.log(err);
        return;
      }
      console.log('verification email sent');
    })

    res.status(201).json(user);
  }

  catch (error) {
    let errorMessage = handleErrors(error);
    res.status(400).json({ errorMessage });
  }

})

/* *********************************************************** */

router.get('/verify-email', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.query.uid });
    if (!user) {
      console.log('could not find user');
    }
    else {
      await user.updateOne({ isVerified: true })
        .then(console.log('user email is verified'));
    }
  } catch (error) {
    console.log(error);
  }
  res.send('verfy email page');
})

/* *********************************************************** */

router.get('/login', (req, res) => {
  res.send('login page');
})

/* *********************************************************** */

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    sessionstorage.setItem('jwt', token);

    res.status(200).json({ user: user.username });
  }
  catch (error) {
    let errorMessage = handleErrors(error);
    res.status(400).json({ errorMessage });
  }
})

/* *********************************************************** */

router.post('/forgot-password', async (req, res) => {

  const { email } = req.body;

  var user = await User.findOne({ email: email });

  if (!user) {
    console.log('that email id is not registered');
  }

  var transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "shreyas.shah@learner.manipal.edu",
      pass: "shahlshreyas@19"
    }
  });

  const options = {
    from: 'shreyas.shah@learner.manipal.edu',
    to: 'shreyaslshah@gmail.com',
    subject: 'password reset link',
    text: `go to this link: `,
    html: `<a href='http://${req.headers.host}/reset-password?uid=${user._id}'>click to reset password</a>`
  }

  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('reset password email sent');
  })

  res.status(201).json(user);

})

/* *********************************************************** */

router.post('/reset-password', async (req, res) => {

  var { password } = req.body;
  const salt = await bcrypt.genSalt();
  password = await bcrypt.hash(password, salt);

  try {
    const user = await User.findOne({ _id: req.query.uid });
    await user.updateOne({ password: password })
      .then(console.log('password has been updated'));
  } catch (error) {
    console.log(error);
    res.status(400).send('there was an error');
    return;
  }

  res.status(201).send('password has been reset');

})

module.exports = router;
