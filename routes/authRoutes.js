const { Router } = require("express");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const sessionstorage = require("sessionstorage");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const { checkIsVerified, checkJWT } = require("../middleware/authMiddleware");
const res = require("express/lib/response");
const JWT_SECRET = "decryptjwtsecret";

const router = Router();

/* *********************************************************** */

const handleErrors = (error) => {
  console.log(error);

  let errorMessage = {
    username: "",
    email: "",
    password: "",
    phone: "",
    ID: "",
    mem: "",
    verify: "",
  };
  console.log(error.message);
  // wrong email/password during login error
  if (error.message === "incorrect email") {
    errorMessage.email = "Invalid Email Id";
  }
  if (error.message === "incorrect password") {
    errorMessage.password = "Password is Incorrect";
  }
  if (error.message === "not verified") {
    errorMessage.verify = "Account is not Verified";
  }

  // username/email not available during signup error
  if (error.code === 11000) {
    if (error.keyValue.username) {
      errorMessage.username = "That username is not available";
    }
    if (error.keyValue.email) {
      errorMessage.email = "That email is already registered";
    }
    if (error.keyValue.phone) {
      errorMessage.phone = "This phone number is already registered";
    }
    if (error.keyValue.mem) {
      errorMessage.mem = "Please choose one option";
    }
  }

  // validation failed during signup error
  if (error.message.includes("users validation failed")) {
    Object.values(error.errors).forEach((err) => {
      errorMessage[err.properties.path] = err.properties.message;
    });
  }

  return errorMessage;
};

/* *********************************************************** */

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "jwt secret", {
    expiresIn: maxAge,
  });
};

/* *********************************************************** */

router.get("/", checkIsVerified, checkJWT, async (req, res) => {
  res.send("home page");
});

/* *********************************************************** */

router.get('/check-verified', checkIsVerified, checkJWT, async (req, res) => {
  res.send("allow_access");
})


/* *********************************************************** */

router.get("/signup", (req, res) => {
  res.send("signup page");
});

/* *********************************************************** */

router.post("/signup", async (req, res) => {
  const {
    username,
    email,
    password,
    phone,
    college,
    ID,
    mem,
    memNo,
  } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
      phone,
      college,
      ID,
      mem,
      memNo,
      isVerified: false,
    });
    const token = createToken(user._id);
    sessionstorage.setItem("jwt", token);

    var transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: "shreyas.shah@learner.manipal.edu",
        pass: "shahlshreyas@19",
      },
    });

    const options = {
      from: "shreyas.shah@learner.manipal.edu",
      to: email,
      subject: "email verification",
      text: `go to this link: `,
      html: `<a href='http://${req.headers.host}/verify-email?uid=${user._id}'>click to verify</a>`,
    };

    transporter.sendMail(options, function (err, info) {
      if (err) {
        console.log(err);
        return;
      }
      console.log("verification email sent");
    });

    // res.status(201).json(user);
    res.status(201).json(token);
  } catch (error) {
    console.log(error);
    let errorMessage = handleErrors(error);
    console.log(errorMessage);
    // res.status(400).json({ errorMessage, 'err': error.toString() })
    res.status(400).json({ errorMessage });
  }
});

/* *********************************************************** */

router.get("/verify-email", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.query.uid });
    if (!user) {
      console.log("could not find user");
    } else {
      await user
        .updateOne({ isVerified: true })
        .then(console.log("user email is verified"));
    }
  } catch (error) {
    console.log(error);
  }
  res.send("verfy email page");
});

/* *********************************************************** */

router.get("/login", (req, res) => {
  res.send("login page");
});

/* *********************************************************** */

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    sessionstorage.setItem("jwt", token);

    res.status(200).json(token);
  } catch (error) {
    console.log(error);
    let errorMessage = handleErrors(error);
    console.log("err:", errorMessage);

    res.status(400).json(errorMessage);
  }
});

/* *********************************************************** */

router.post("/forgot", async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const user = await User.findOne({ email }).lean();
  if (!user) {
    return res.json({
      status: "error",
      error: "User does not exist!",
      data: "",
    });
  } else if (user.isVerified == false) {
    return res.json({
      status: "error",
      error: "User is not verified!",
      data: "",
    });
  } else {
    const secret = JWT_SECRET + user.password;
    const payload = {
      email: user.email,
      id: user._id,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "15m" });

    const link = `http://localhost:3000/reset/${user._id}/${token}`;

    console.log(link);

    let transporter = nodemailer.createTransport({
      service: "Outlook365",
      host: "smtp.office365.com",
      port: "587",
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
      auth: {
        user: "temp_certman@outlook.com",
        pass: "123@ABC@abc",
      },
    });

    const options = {
      from: "temp_certman@outlook.com",
      to: email,
      subject: "password reset link",
      text: `go to this link: `,
      html: `<a href=${link}>click to reset password</a>`,
    };

    transporter.sendMail(options, function (err, info) {
      if (err) {
        console.log(err);
        return;
      }
      res.json({ status: "success", error: "", data: "" });
    });
  }
});

router.patch("/reset", async (req, res) => {
  const { id, token, newPass } = req.body;
  const user = await User.findOne({ id }).lean();
  if (!user) {
    return res.json({
      status: "error",
      error: "User does not exist!",
      data: "",
    });
  } else if (!token) {
    return res.json({
      status: "error",
      error: "No valid token!",
      data: "",
    });
  } else {
    try {
      console.log(newPass);
      const hash_password = await bcrypt.hash(newPass, 10);
      const updatedUser = await User.updateOne(
        { _id: id },
        {
          $set: {
            password: hash_password,
          },
        }
      );
      res.json({ status: "success", error: "", data: updatedUser });
    } catch (error) {
      res.json({ status: "error", error: error.message, data: "" });
    }
  }
});

router.post("/get-user", async (req, res) => {
  var { uid } = req.body;

  try {
    // console.log(uid);
    const user = await User.findOne({ _id: uid });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    console.log(user);
    return res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.get("/user", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;


