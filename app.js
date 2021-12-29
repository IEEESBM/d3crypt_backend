require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')

const app = express();

app.use(express.json());

// connect to database then setup express app
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(app.listen(3000))
  .catch((err) => console.log(err));


app.use(authRoutes);
const router = Router();

//get all users
User.get("/AllUsers", checkAuth, (req, res, next) => {
  return res.status(200).json(req.userData);
});

//get single user
app.get("/User/:id", (request, response) => {
  const UserId = Number(request.params.id);
  const getuser = User.find((User) => User.id === UserId);

  if (!getuser) {
    response.status(500).send("Account not found.");
  } else {
    response.json(getuser);
  }
});

//edit user
router.put("/edit/:userId", checkAuth, function (req, res, next) {
  if (req.userData.role === "superadmin") {
    const id = req.params.userId;
    User.findOneAndUpdate({ _id: id }, { $set: req.body });
  }
});
