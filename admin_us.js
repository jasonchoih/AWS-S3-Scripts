const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');
const { fileType } = require('./config/config');
// AWS.config.loadFromPath('./config/aws_sdk_us.json'); //US
AWS.config.loadFromPath('./config/aws_sdk_euc.json'); //EUC
const s3 = new AWS.S3({apiVersion: '2006-03-01'});
// 
const basePath = '/Users/jasonchoi/Server/';
// 
const location = 'a41';
// 
const conf = 
{
    sd : [
        basePath + 'mg28.com_116.10.189.115/umi/umi_20211013_2100/file/admin/' + location ,
        'psj.1voc.com/' + location
        // 'psj.mausedap.com/' + location
    ],
    // 
    // sj: [
    //     basePath + 'cc28.com_116.10.189.66/umi/umi_20211013_2100/file/admin/' + location,
    //     'pjj.1voc.com/' + location
    //     // 'pjj.mausedap.com/' + location
    // ],
    // 
    // wn: [
    //     basePath + 'wn28.com_116.10.184.155/umi/umi_20211013_2100/file/admin/' + location,
    //     'pww.1voc.com/' + location
    //     // 'pww.mausedap.com/' + location
    // ]
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
// US File + Bucket
{Object.keys(conf).map(k=>(
    uploadDir(conf[k][0],conf[k][1])
))}