const { Router } = require('express');
const router = Router();
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
const {uploadFile, getFileStream} = require('./s3');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const BUCKET_NAME = 'decrypt-photo-bucket';
const BUCKET_REGION = 'us-east-1';
const ACCESS_KEY = 'AKIA24WWKNQWBUJHBHX4';
const SECRET_KEY = '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';

router.post('/image', upload.single('image'), async (req, res) => {
  const file = req.file;
  console.log(file);
  const result = await uploadFile(file);
  await unlinkFile(file.path);
  console.log(result);
  res.send({imagePath: `/image/${result.Key}`});
});

router.get('/image/:key', async(req, res)=>{
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

module.exports = router;