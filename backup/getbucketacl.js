const AWS = require('aws-sdk');
AWS.config.loadFromPath('../config/aws_sdk.json');
// 
// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});
// 
const bucketParams = {
    Bucket: 'test1.sd28.com'
};
// call S3 to retrieve policy for selected bucket
s3.getBucketAcl(bucketParams, (err, data)=>
{
    if (err) {
      console.log("Error", err);
    } else if (data) {
      console.log("Success", data.Grants);
    }
});