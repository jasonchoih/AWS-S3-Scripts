const macBasePath = [
    '/Users/jasonchoi/Server/',
    '/index.html'
];
// Same folder structure as local 
const baseFolderPath = {
    SD28: 'sd28.com_116.10.189.115/umi',
    WN28: 'wn28.com_116.10.184.155/umi',
    CC28: 'cc28_com_116.10.189.66/umi'
};
// 
const fileType = {
    'html' : 'text/html',
    'css' : 'text/css',
    'js' : 'text/javascript'
};
// ===============================Change Here Only=================================
// 
const uploadSubFolder = [ 
    'w',
    'm'
];
// 
const sites = [
    // 'SD28',
    // 'CC28',
    'WN28'
    
];
// 
const mainFolder = '/umi_20211013_2100/';
// 
const buildFolder = [
    // 'desktop_ver2_20220523_0900', // Cloud
    // 'mobile_ver2_20220523_0900' //Cloud
    // 
    // 'desktop_ver2_20220523_0800', // Aliyun
    // 'mobile_ver2_20220523_0000', // Aliyun    
    // 
    'desktop_ver2_20220530_0000',
    'mobile_ver2_20220523_0900',
];
// 
const sitePath = {};
for (let i in sites)
{
    sitePath[sites[i]] =[
        `${baseFolderPath[sites[i]]}${mainFolder}file/`,
        buildFolder[0],
        buildFolder[1]
    ]
};
//
const myDomains = {
    SD28: 
    [
        [
            // 'chatterfu.com',
            // 'tcphb.com',
            // 'shubaokt.com',
            // 'mycprpro.com',
            // 'shdihua.com',
            // 'saikmusic.com',
            // 
            // Aliyun
            // 'couponze.com',
            // 'bribruce.com',
            // 'saimx.com'
        ]
    ],
    CC28: [
        [
            // 'cc28.com',
            // 'caicai28.vip',
            // 'caicai28.net',
            // 
            'nw28.vip',
            'naowan28.com',
            'naowan28.net',
            
            'dannyholding.com',
            'odorlessgas.com',
            'rwdata.top',
            // 'testca.top'
        ]
    ],
    WN28: [
        [
            'wn28.com',
            'woniu28.com',
            'woniu28.vip',
            'wangnanbei.top',
            'jinronghangye.top',
            'too3.top',
            'zourundong.top'
        ]
    ]
};
// ===============================Change Here Above=================================
// Index file Desktop
const fileDesktop = {};
for(let i in sites)
{
    fileDesktop[sites[i]] = `${macBasePath[0]}${sitePath[sites[i]][0]}${sitePath[sites[i]][1]}${macBasePath[1]}`
};
// Index file Mobile
const fileMobile = {};
for(let i in sites)
{
    fileMobile[sites[i]] = `${macBasePath[0]}${sitePath[sites[i]][0]}${sitePath[sites[i]][2]}${macBasePath[1]}`
};
// 
const files = {
    w: fileDesktop,
    m: fileMobile
};
// Index Root
const baseRootFile = {};
for(let i in sites)
{
    baseRootFile[sites[i]] = `${macBasePath[0]}${baseFolderPath[sites[i]]}${mainFolder}root${macBasePath[1]}`
};
// 
module.exports={
    uploadSubFolder,
    sitePath,
    myDomains,
    sites,
    baseRootFile,
    files,
    fileDesktop,
    fileType
};