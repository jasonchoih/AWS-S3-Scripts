const AWS = require('aws-sdk');
const path = require('path');
const async = require('async');
const fs = require('fs');
const { sites, myDomains, uploadSubFolder, files, baseRootFile ,fileType } = require('../config/config');
// 
AWS.config.loadFromPath('./config/aws_sdk.json');
const s3 = new AWS.S3({apiVersion: '2006-03-01'});
// 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
// 
const getList = () =>
{
    s3.listBuckets((err, data) =>
    {
    if (err) {
        console.log("Error", err);
    } else {
        console.log(data.Buckets);
    }
    });
};
// 
const setBucketWebsite = async(d) =>
{
    const staticHostParams = 
    {
        Bucket: d,
        WebsiteConfiguration: {
            ErrorDocument: {
            Key: 'index.html'
            },
            IndexDocument: {
            Suffix: 'index.html'
            },
        }
    };
    s3.putBucketWebsite(staticHostParams, (err, data) => 
    {
    if (err) {
        console.log("Error", err);
    } 
    else {
        console.log("Success", data);
    }
    });
};
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
}
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
const uploadDir = (s3Path, bucketName) =>
{
    const walkSync = (currentDirPath, callback) => 
    {
        fs.readdirSync(currentDirPath).forEach((name) =>
        {
            let filePath = path.join(currentDirPath, name);
            let stat = fs.statSync(filePath);
            if (stat.isFile()) {
                callback(filePath, stat);
            } else if (stat.isDirectory()) {
                walkSync(filePath, callback);
            }
        });
    }
    walkSync(s3Path, (filePath, stat) =>
    {
        let _type = filePath.substring(filePath.lastIndexOf('.')+1, filePath.length) || filePath;
        let bucketPath = filePath.substring(s3Path.length+1);
        let params = 
        {
            Bucket: bucketName, 
            Key: bucketPath, 
            Body: fs.readFileSync(filePath),
            ContentEncoding: 'base64',
            ContentType: fileType[_type],
            ACL:'public-read'
        };
        s3.putObject(params, (err, data) =>
        {
            if (err) {
                console.log(err)
            } else {
                console.log('Successfully uploaded '+ bucketPath +' to ' + bucketName);
            }
        });
    });
};
// 
const gxContent = () =>
{
    // www Root Upload
    {sites.map((v)=>(
        myDomains[v][0].map((vv)=>(
            uploadFileRoot(`www.${vv}`, baseRootFile[v])
            // console.log(`www.${vv}`, '====>', baseRootFile[v])
        ))
    ))}
    // 
    // console.log('======================================================================================================================================================');
    // www w + m Upload
    {sites.map((v)=>(
        myDomains[v][0].map((vv)=>(
            uploadSubFolder.map((vvv)=>(
                uploadFileToBucket(`www.${vv}/${vvv}`,files[vvv][v])
                // console.log(`www.${vv}/${vvv}`, '====>' ,files[vvv][v])
            ))
        ))
    ))}
};
// 
module.exports = {
    getList,
    gxContent,
    uploadDir,
    uploadFileRoot,
    uploadFileToBucket
};