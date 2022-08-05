const AWS = require('aws-sdk');
const path = require('path');
AWS.config.loadFromPath('../config/aws_sdk.json');
// 
const userFolder = 'test1.sd28.com/m';
const file = '/Volumes/Macintosh HD - Data/Server/sd28.com - 116.10.189.115/umi/umi_20211013_2100/file/desktop_ver2_20211013_0100/index.html';
// 
const bucket = new AWS.S3({
    params: {
        Bucket: userFolder
    }
});
// 
const contentToPost = 
{
    Key: '', 
    Body: '',
    ContentEncoding: 'base64',
    ContentType: 'text/html',
    ACL:'public-read'
};
var fs = require('fs');
var fileStream = fs.createReadStream(file);
fileStream.on('error', (err) =>
{
  console.log('File Error', err);
});
contentToPost.Body = fileStream;
contentToPost.Key = path.basename(file);
// 
bucket.putObject(contentToPost, (error, data) => 
{
    if (error) {
        console.log("Error in posting Content [" + error + "]");
        return false;
    } /* end if error */
    else {
        console.log("Successfully posted Content");
    } /* end else error */
})
.on('httpUploadProgress', (progress) => 
{
    // Log Progress Information
    console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
});