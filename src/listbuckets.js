const AWS = require('aws-sdk');
AWS.config.loadFromPath('../config/aws_sdk.json');
// 
s3 = new AWS.S3({apiVersion: '2006-03-01'});
// 
// Call S3 to list the buckets
s3.listBuckets((err, data) =>
{
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Buckets);
  }
});