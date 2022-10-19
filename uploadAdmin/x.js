const { uploadDir } = require('../tools/bucket')
const basePath = '/Users/jasonchoi/Server_Production/';
// 
const location = 'a42';
// 
const conf = {
    // sd : [
    //     basePath + 'umi_mg28.com_116.10.189.115/umi/umi_20211013_2100/file/admin/x/' + location ,
    //     'psjx.xxcrs1.top/' + location
    // ],
    // // 
    sj: [
        basePath + 'umi_nw28.com_116.10.189.66/umi/umi_20211013_2100/file/admin/x/' + location,
        'pjjx.xxcrs1.top/' + location
    ],
    // 
    // wn: [
    //     basePath + 'umi_wn28.com_116.10.184.155/umi/umi_20211013_2100/file/admin/x/' + location,
    //     'pwwx.xxcrs1.top/' + location
    // ]
};
// 
{Object.keys(conf).map(k=>(
    uploadDir(conf[k][0],conf[k][1])
))}