const OSS = require('ali-oss');
const fs = require('fs');
// 
const { ossBucket, myDomains, umiBuildFolder } = require('../config/config');
// 
const store = new OSS({
  region: 'oss-cn-shanghai',
  accessKeyId: 'LTAI4G4Mkiv29KmNSPhK8vJn',
  accessKeySecret: 'A9WbMqF5eCX8Y07sf56lgVinpJHKcv',
  bucket: ossBucket[Object.keys(myDomains)]
});
// 
const Platform = { 
  w: 'desktop', // 电脑版
  m: 'mobile'   // 手机版
};
// 
const uploadFile = async(file, buildFolder, p) =>
{
  const response = await store.put(
    `${umiBuildFolder[Platform[p]]}/${file}`,   // name of file
    `${buildFolder}/${file}`,   // path of folder
    {  
        'Content-Encoding': 'UTF-8', 
        'x-oss-storage-class': 'Standard', 
        'x-oss-object-acl': 'public-read', 
        'x-oss-forbid-overwrite': 'false', 
    }
);
  console.log(ossBucket[Object.keys(myDomains)], file, response['res']['statusMessage']);
}
//
const uploadToBucket = async(buildFolder, p) =>
{
  try {
      fs.readdirSync(buildFolder).forEach(file => {
        uploadFile(file, buildFolder, p)
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports={
    uploadToBucket
}