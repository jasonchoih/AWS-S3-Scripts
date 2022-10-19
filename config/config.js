const umiBuildFolder = {
    desktop: 'nw_tx_desktop_ver2_20221011_0000',  
    mobile: 'nw_tx_mobile_ver2_20221011_0000'
}
// Choose which platform to upload Desktop or Mobile or Both together
const Platform = { 
    desktop: 'w', // 电脑版
    mobile: 'm'   // 手机版
};
// No need to comment out. Only change name when new bucket is created
const ossBucket = {
    MG28: 'jason-sd28-starwy-top-2022-01-30',
    NW28: 'nw-a-xuwang123-top-20221009',
    WN28: 'john-cometchat-test-20220711' //cheng-hua.top
}
//
const myDomains = {
    // Choose which domain to upload & Tip: Choose one domain to test
    // MG28:[       
    //     // 'yanyh.top',      
    //     // 'chatterfu.com',
    //     // 'tcphb.com',       
    //     // 'shubaokt.com',
    
    //     'mycprpro.com',
    //     'shdihua.com',       
    //     'saikmusic.com',
    //     'couponze.com',
    //     'bribruce.com',     
    //     'saimx.com',    
    // ],
    // 
    NW28:[
        // 'nw28.vip',          // Aliyun
        // 'naowan28.com',
        // 'naowan28.net',
        // 'dannyholding.com',

        // 'odorlessgas.com', // Tencent
        // 'rwdata.top',
        // 'testca.top',
        // 'ryhdot.com'     
    ],
    // 
    // WN28:[
    //     // 'wn28.com',
    //     // 'woniu28.com',
    //     // 'woniu28.vip',
    //     // 'wangnanbei.top',
    //     // 'jinronghangye.top',
    //     // 'too3.top',
    //     // 'zourundong.top',
        
    //     'yichang666.top'     // Tencent
    // ]
};
// ===============================Change Here Only Above=================================
// 
const WebsiteMacFolderPath = {
    MG28: 'umi_mg28.com_116.10.189.115/umi',
    NW28: 'umi_nw28.com_116.10.189.66/umi',
    WN28: 'umi_wn28.com_116.10.184.155/umi'
};
// 
const fileExtension = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'text/javascript'
};
// 
const sitePath = {};
for(let j in myDomains)
{
    sitePath[j] = {};
    for(let i in Platform)
    {
        sitePath[j][Platform[i]] = {};
        for(let k in myDomains[j])
        {
            sitePath[j][Platform[i]][myDomains[j][k]] = `/Users/jasonchoi/Server_Production/${WebsiteMacFolderPath[j]}/umi_20211013_2100/file/${umiBuildFolder[i]}`;
        }
    }
}
// 
const siteRootPath = {};
for(let j in myDomains)
{
    siteRootPath[j] = {};
    for(let i in Platform)
    {
        siteRootPath[j][Platform[i]] = `/Users/jasonchoi/Server_Production/${WebsiteMacFolderPath[j]}/umi_20211013_2100/file/${umiBuildFolder[i]}`;
    }
}
// 
module.exports={
    fileExtension,
    sitePath,
    siteRootPath,
    // 
    umiBuildFolder,
    // 
    ossBucket,
    myDomains
};