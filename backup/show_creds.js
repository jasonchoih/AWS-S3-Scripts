const AWS = require('aws-sdk');
AWS.config.loadFromPath('../config/aws_sdk.json');
// 
s3 = new AWS.S3({apiVersion: '2006-03-01'});
// 
// Call S3 to display credentials
AWS.config.getCredentials((err) =>
{
    if (err) console.log(err.stack);
    // credentials not loaded
    else {
      console.log("Access key:", AWS.config.credentials.accessKeyId);
      console.log("Secret Access key:", AWS.config.credentials.secretAccessKey);
    }
});