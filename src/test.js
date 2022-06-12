const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');
// 
AWS.config.loadFromPath('../config/aws_sdk.json');
const s3 = new AWS.S3({apiVersion: '2006-03-01'});
// 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
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
const createBucket = async() =>
{
    const bucketName = [
        'test1.sd28.com',
        'test2.sd28.com',
        'test3.sd28.com'
    ];
    //
    for (let i in bucketName)
    {
        let bucketPromise = new AWS.S3({apiVersion: '2006-03-01'})
        .createBucket({Bucket: bucketName[i]}).promise();
        // 
        bucketPromise.then((data) =>
        {
            setBucketWebsite(bucketName[i]);
            console.log(`Bucket ${bucketName[i]} created!`);
        })
        .catch((err) => 
        {
            console.error(err, err.stack);
        });
    };
};
//
const uploadRootTest = async(d) =>
{
    const file = '/Volumes/Macintosh HD - Data/Server/wn28.com - 116.10.184.155/'+
    'umi/umi_20211013_2100/root/index.html';
    // 
    let uploadParams = 
    {
        Bucket:d,
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
    const uploadRootTest = await s3.upload (uploadParams, (err, data) =>
    {
    if (err) {
        console.log("Error", err);
    } if (data) {
        console.log("Upload Success", data.Location);
    }
    });
};
// 
const uploadFileToBucketTest = async () =>
{
    const folderWM = [ 'w', 'm' ];
    const bucketName = [
        'test1.sd28.com',
        'test2.sd28.com',
        'test3.sd28.com'
    ];
    // 
    const file = '/Volumes/Macintosh HD - Data/Server/sd28.com - 116.10.189.115/'+
    'umi/umi_20211013_2100/file/desktop_ver2_20211013_0100/index.html';
    // 
    const buckets = [];
    // 
    {bucketName.map((v)=>(
        folderWM.map((vv)=>(
            buckets.push(v+'/'+vv)
        ))
    ))};
    console.log(buckets);
    // 
    for(let i =0; i<bucketName.length; i++)
    {
        uploadRootTest(bucketName[i]);
    };
    // 
    for (let i in buckets)
    {
        await delay(200);
        // 
        let fileStream = fs.createReadStream(file);
        fileStream.on('error', (err) =>
        {
            console.log('File Error', err);
        });
        // 
        let params = {
            Bucket: buckets[i],
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
};
// 
// createBucket();
uploadRootTest();
// uploadFileToBucketTest();