const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');

const bucketName = 'decrypt-photo-bucket';
const region = 'us-east-1';
const accessKeyId = 'AKIA24WWKNQWBUJHBHX4';
const secretAccessKey = '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';

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

// uploads photo to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }

  return s3.upload(uploadParams).promise();
}

// downloads photo from s3
function getFileStream(fileKey){
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  return s3.getObject(downloadParams).createReadStream();
}



module.exports = {uploadFile, getFileStream};