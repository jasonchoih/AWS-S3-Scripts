const { uploadDir } = require('../tools/bucket')
const basePath = '/Users/jasonchoi/Server_Production/';
// 
const location = 'a42';
// 
const conf = 
{
    // sd : [
    //     basePath + 'umi_mg28.com_116.10.189.115/umi/umi_20211013_2100/file/admin/' + location ,
    //     'psj.1voc.com/' + location
    // ],
    // 
    // sj: [
    //     basePath + 'umi_nw28.com_116.10.189.66/umi/umi_20211013_2100/file/admin/' + location,
    //     'pjj.1voc.com/' + location
    // ],
    // // 
    wn: [
        basePath + 'umi_wn28.com_116.10.184.155/umi/umi_20211013_2100/file/admin/' + location,
        'pww.1voc.com/' + location
    ]
};
// 
{Object.keys(conf).map(k=>(
    uploadDir(conf[k][0],conf[k][1])
))}