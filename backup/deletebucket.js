const AWS = require('aws-sdk');
AWS.config.loadFromPath('../config/aws_sdk.json');
// 
s3 = new AWS.S3({apiVersion: '2006-03-01'});
// 
var bucketParams = {
  Bucket : 'test.sd28.com'
};
// 
// Call S3 to delete the bucket
s3.deleteBucket(bucketParams, (err, data) =>
{
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Successful deleted "+ bucketParams,Bucket , data);
  }
});