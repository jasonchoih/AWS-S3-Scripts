const AWS = require('aws-sdk');
AWS.config.loadFromPath('../config/aws_sdk.json');
// 
const s3 = new AWS.S3({apiVersion: '2006-03-01'});
// 
const bucketName = 'test1.sd28.com';
// 
const params = {
    Bucket: bucketName,
    Key: 'folderInBucket/',
    ACL: 'public-read',
    Body:'' 
};
// 
s3.upload(params, (err, data) => 
{
    if (err) {
        console.log("Error creating the folder: ", err);
    } else {
        console.log("Successfully created a folder on S3");
    }
});