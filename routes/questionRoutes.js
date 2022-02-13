const { Router } = require("express");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const Question = require("../models/questionModel");
const res = require("express/lib/response");
const { checkJWT, checkIsVerified } = require("../middleware/authMiddleware");

const router = Router();

router.get("/check", (req, res) => {
  res.send("OK");
});

router.get("/", checkJWT, checkIsVerified, async (req, res) => {
  try {

    // let token = req.headers["x-access-token"];
    // console.log(req)
    // var base64Payload = token.split(".")[1];
    // var payload = Buffer.from(base64Payload, "base64");
    var userID = req.userId;
    console.log(userID);
    var u = await User.findOne({ _id: userID }).select("-_id -password -noofattempts");
    let current = u.currentQuestion;

    if (current >= 30) {
       return res.send("Congratulations!, you're done with all the questions");
    }

    console.log(u.currentQuestion);
    let cq = await Question.findOne({ index: u.questions[current] }).select("-answer -hint_1 -hint_2");
    // console.log(cq);
    console.log(cq.index);
    res.json({ question: cq, user: u });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      msg: "Question Not Found!",
      body: err,
    });
  }
});

// router.get("/show_all", async (req, res) => {
//   try {
//     const questions = await Question.find();
//     res.json(questions);
//   } catch (err) {
//     res.send("Error " + err);
//   }
// });

// router.post("/add", async (req, res) => {
//   try {
//     const newq = await Question.create(
//       {
//         title: req.body.title,
//         difficulty: req.body.difficulty,
//         answer: req.body.answer,
//         index: req.body.index,
//         image_1: req.body.image_1,
//         image_2: req.body.image_2,
//         image_3: req.body.image_3,
//         image_4: req.body.image_4,
//         hint_1: req.body.hint_1,
//         hint_2: req.body.hint_2,
//       }
//       // ,
//       // function (err) {
//       //   console.log(err);
//       //   res.status(400).json(err);
//       // }
//     );
//     // console.log(newq);
//     res.send(newq);
//   }
//   catch (error) {
//     res.status(500).json(error);
//   }
// });

// router.get("/:id", async (req, res) => {
//   try {
//     const question = await Question.findById(req.params.id);
//     res.json(question);
//   } catch (err) {
//     res.send("Error " + err);
//   }
// });

// router.patch("/:id", async (req, res) => {
//   try {
//     const q = await Question.findById(req.params.id);
//     const data = req.body;
//     q.image_1 = data.image_1;
//     q.image_2 = data.image_2;
//     q.image_3 = data.image_3;
//     q.image_4 = data.image_4;
//     q.question = data.question;
//     q.difficulty = data.difficulty;
//     q.points = data.points;
//     q.answer = data.answer;
//     q.hint = data.hint;
//     const a1 = await q.save();
//     res.json(a1);
//   } catch (err) {
//     res.send("Error " + err);
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     const question = await Question.findById(req.params.id);
//     const a1 = await question.remove();
//     res.send("Removed");
//   } catch (err) {
//     res.send("Error " + err);
//   }
// });

module.exports = router;
