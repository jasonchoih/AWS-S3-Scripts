const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');
const { sites, myDomains, uploadSubFolder, files, baseRootFile } = require('../config/config');
// 
AWS.config.loadFromPath('./config/aws_sdk_eu.json');
const s3 = new AWS.S3({apiVersion: '2006-03-01'});
// 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
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
// 
const gxContent = () =>
{
    // www w + m Upload
    {sites.map((v)=>(
        myDomains[v][0].map((vv)=>(
            uploadSubFolder.map((vvv)=>(
                uploadFileToBucket(`www.${vv}/${vvv}`,files[vvv][v])
            ))
        ))
    ))}
};
// 
gxContent();