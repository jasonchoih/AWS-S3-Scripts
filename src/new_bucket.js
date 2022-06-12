const AWS = require('aws-sdk');
AWS.config.loadFromPath('../config/aws_sdk.json');
// 
const bucketName = 'www.sd28.com';
// 
// Create a promise on S3 service object
const bucketPromise = new AWS.S3({apiVersion: '2006-03-01'}).createBucket({Bucket: bucketName}).promise();
// 
bucketPromise.then((data) =>
    {
      console.log(`Bucket ${bucketName} created!`);
    })
    .catch((err) => 
    {
      console.error(err, err.stack);
    });