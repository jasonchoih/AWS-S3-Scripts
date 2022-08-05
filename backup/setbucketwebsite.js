const AWS = require('aws-sdk');
AWS.config.loadFromPath('../config/aws_sdk.json');
// 
s3 = new AWS.S3({apiVersion: '2006-03-01'});
// 
// Create JSON for putBucketWebsite parameters
const staticHostParams = 
{
  Bucket: 'www.shengda28.com',
  WebsiteConfiguration: {
    ErrorDocument: {
      Key: 'index.html'
    },
    IndexDocument: {
      Suffix: 'index.html'
    },
  }
};
// set the new website configuration on the selected bucket
s3.putBucketWebsite(staticHostParams, (err, data) => 
{
  if (err) {
    // display error message
    console.log("Error", err);
  } else {
    // update the displayed website configuration for the selected bucket
    console.log("Success", data);
  }
});
