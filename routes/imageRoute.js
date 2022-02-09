const { Router } = require("express");
const router = Router();
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const { uploadFile, getFileStream, deleteImage } = require("./s3");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const User = require("../models/userModel");
const BUCKET_NAME = "decrypt-photo-bucket";
const BUCKET_REGION = "us-east-1";
const ACCESS_KEY = "AKIA24WWKNQWBUJHBHX4";
const SECRET_KEY = "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";
const { checkIsVerified, checkJWT } = require("../middleware/authMiddleware");

router.post("/image", upload.single("image"), async (req, res) => {
  const file = req.file;
  console.log(file);
  const result = await uploadFile(file);
  await unlinkFile(file.path);
  console.log(result);
  res.json(result.Key);
});

router.post("/user-img",checkIsVerified,checkJWT ,async (req, res) => {
  console.log(req.body)
  let doc = await User.findOneAndUpdate({ _id: req.userId }, { imgKey: req.body.key }, {
    new: true
  });
  console.log(doc)
  res.send('user schema updated with image key');
});

router.post("/delete-image/:key", async (req, res) => {
  const key = req.params.key;
  try {
    console.log(`Request to delete image of key ${key}`)
    await deleteImage(key);
    res.send("Image deleted successfully")
  } catch (error) {
    console.log(error);
  }
});


router.get("/image/:key", async (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

router.get('/leaderboad', async (req, res) => {
  let list = await User.find({}).sort({ "points": -1 })
  list = list.filter(user => user.isVerified === true)
  res.send(list)
});


module.exports = router;
