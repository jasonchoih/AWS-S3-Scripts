const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');
const { fileType } = require('./config/config');
AWS.config.loadFromPath('./config/aws_sdk.json'); //HK
const s3 = new AWS.S3({apiVersion: '2006-03-01'});
// 
const basePath = '/Users/jasonchoi/Server/';
// 
const location = 'a38';
// 
const conf = {
    // sd : [
    //     basePath + 'sd28.com_116.10.189.115/umi/umi_20211013_2100/file/admin/HK/' + location ,
    //     'sdhk.1voc.com/' + location
    // ],
    // 
    // sj: [
    //     basePath + 'sj28.com_116.10.189.66/umi/umi_20211013_2100/file/admin/HK/' + location,
    //     'sjhk.1voc.com/' + location
    // ],
    // 
    wn: [
        basePath + 'wn28.com_116.10.184.155/umi/umi_20211013_2100/file/admin/HK/' + location,
        'wnhk.1voc.com/' + location
    ]
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
// HK  File + Bucket
{Object.keys(conf).map(k=>(
    uploadDir(conf[k][0],conf[k][1])
))}