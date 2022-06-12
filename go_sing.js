const AWS = require('aws-sdk');
const { uploadSubFolder, files, baseRootFile} = require('./config/config');
const fs = require('fs');
const path = require('path');
AWS.config.loadFromPath('./config/aws_sdk_sing.json');
const s3 = new AWS.S3({apiVersion: '2006-03-01'});
// 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
// 
const uploadFileRoot = async(bucket, file) =>
{ 
    console.log('ROOT',file);
    let uploadParams = 
    {
        Bucket:bucket,
        Key: '/',
        Body: '',
        ContentEncoding: 'base64',
        ContentType: 'text/html',
        ACL:'public-read'
    };
    // 
    let fileStream = fs.createReadStream(file);
    fileStream.on('error', (err) =>
    {
        console.log('File Error', err);
    });
    uploadParams.Body = fileStream;
    uploadParams.Key = path.basename(file);
    // 
    const uploadFileRoot = await s3.upload (uploadParams, (err, data) =>
    {
    if (err) {
        console.log("Error", err);
    } if (data) {
        console.log("Upload Success", data.Location);
    }
    });
};
// 
const uploadFileToBucket = async (bucket, file) =>
{ 
    console.log('FILE',file);
    await delay(200);
    // 
    let fileStream = fs.createReadStream(file);
    fileStream.on('error', (err) =>
    {
        console.log('File Error', err);
    });
    // 
    let params = {
        Bucket: bucket,
        ContentEncoding: 'base64',
        ContentType: 'text/html',
        ACL:'public-read',
        Key: '', 
        Body: '',
    };
    params.Body = fileStream;
    params.Key = path.basename(file);
    // 
    const stored = await s3.upload(params, (err, data) => 
    {
        if (err) console.log("error", err, err.stack);
        return console.log(data);
    })
    .on('httpUploadProgress', (progress) => 
    {
        console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
    });
};
const uploadSD28 = () =>
{
    // uploadFileRoot(`www.sd28.com`, baseRootFile['SD28'])
    // console.log(`www.sd28.com`, '====>', baseRootFile['SD28'])
              
    uploadSubFolder.map((vvv)=>(
        uploadFileToBucket(`www.sd28.com/${vvv}`,files[vvv]['SD28'])
        // console.log(`www.sd28.com/${vvv}`, '====>' ,files[vvv]['SD28'])
    ))
}
// 
module.exports={
    uploadSD28
}