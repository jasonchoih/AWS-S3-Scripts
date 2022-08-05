const AWS = require('aws-sdk');
AWS.config.loadFromPath('../config/aws_sdk.json');
// 
const bucketName = 'test1.sd28.com';
const keyName = 'hello_world2.txt';
// 
// Create a promise on S3 service object
const bucketPromise = new AWS.S3({apiVersion: '2006-03-01'}).createBucket({Bucket: bucketName}).promise();
// 
bucketPromise.then(
    (data) =>
    {
      // Create params for putObject call
      // const objectParams = {
      //   Bucket: bucketName,
      //   Key: keyName,
      //   Body: 'Hello World!'
      // };
      // Create object upload promise
      // const uploadPromise = new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();
      // uploadPromise.then(
      //   (data) => {
      //     console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
      //   });
      console.log(`Bucket ${bucketName} created!`);
    }).catch(
      (err) => 
      {
        console.error(err, err.stack);
      });