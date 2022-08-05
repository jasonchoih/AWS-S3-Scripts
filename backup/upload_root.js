const AWS = require('aws-sdk');
const path = require('path');
AWS.config.loadFromPath('../config/aws_sdk.json');
// 
const s3 = new AWS.S3({apiVersion: '2006-03-01'});
// 
const bucketName = 'test1.sd28.com';
const file = '/Volumes/Macintosh HD - Data/Server/sd28.com - 116.10.189.115/umi/umi_20211013_2100/file/desktop_ver2_20211013_0100/index.html';
// 
// call S3 to retrieve upload file to specified bucket
const uploadParams = 
{
    Bucket:bucketName,
    Key: '/',
    Body: '',
    ContentEncoding: 'base64',
    ContentType: 'text/html',
    ACL:'public-read'
};
// 
// Configure the file stream and obtain the upload parameters
var fs = require('fs');
var fileStream = fs.createReadStream(file);
fileStream.on('error', (err) =>
{
  console.log('File Error', err);
});
uploadParams.Body = fileStream;
uploadParams.Key = path.basename(file);
// 
// s3.putObject({
//   Key: `EmptyFolder/`, // This should create an empty object in which we can store files 
//   Bucket: bucketName,
// });
// call S3 to retrieve upload file to specified bucket
s3.upload (uploadParams, (err, data) =>
{
  if (err) {
    console.log("Error", err);
  } if (data) {
    console.log("Upload Success", data.Location);
  }
});
