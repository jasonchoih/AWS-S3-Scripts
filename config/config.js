// 
const umiBuildFolder = {
    desktop: 'wn_ali_desktop_ver2_20220805_0000',  
    mobile: 'wn_ali_mobile_ver2_20220805_0000'      
};
// Choose which platform to upload Desktop or Mobile or Both together
const Platform = { 
    desktop: 'w', // 电脑版
    mobile: 'm'   // 手机版
};
//
const myDomains = {
    // Choose which domain to upload & Tip: Choose one domain to test
    // MG28:[       
    //     'chatterfu.com',
    //     'tcphb.com',        //线路1 
    //     'shubaokt.com',
    // 
    //     'mycprpro.com',
    //     'shdihua.com',       //线路2
    //     'saikmusic.com',
    // 
    //     'couponze.com',
    //     'bribruce.com',      //线路3
    //     'saimx.com',
    // 
    //     'yanyh.top'      // Tencent
    // ],
    // 
    // NW28:[
    //     'nw28.vip',
    //     'naowan28.com',
    //     'naowan28.net',
    //     'dannyholding.com',
    //     'odorlessgas.com',
    //     'rwdata.top',
    //     'testca.top',
    //     // 
    //     'ryhdot.com'     // Tencent
    // ],
    // 
    WN28:[
        // 'wn28.com',
        // 'woniu28.com',
        // 'woniu28.vip',
        // 'wangnanbei.top',
        // 'jinronghangye.top',
        // 'too3.top',
        'zourundong.top',
        // 
        // 'yichang666.top'     // Tencent
    ]
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
    siteRootPath
};