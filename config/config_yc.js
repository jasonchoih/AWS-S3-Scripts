const version = [
    'desktop_yc288_20220627_0000',
    'mobile_yc288_20220627_0000'
];
// 
const sitePath = {
   w:  `/Users/jasonchoi/Projects/umi/desktop/file/${version[0]}/index.html`,
   m:  `/Users/jasonchoi/Projects/umi/mobile/file/${version[1]}/index.html`
};
//
const myDomains = [
    // 'yc288.com',
    'yuce-28.com',
    'yuce18.com',
    'ycvip.cn',
    'yc885.com',
    'kingwin88.com',
    'yuce28.net',
    'zujiying.top',
    'winyao888.com',
    'changzhiyuce.com',
    'luking518.com',
    'wine189.com',
    'ycyf.vip',
    'yucefa.cn',
    '988yc.com',
    'yuce365.com',
    'yc698.com',
    'yc5858.com',
    'yc866.com',
    'caishen6.cn',
    'zuoshans.cn',
    'foxage.cn',
    'tangjipin.top',
    'eonym.top',
    'caishen998.com',
    'caishen86.cn',
    'yuce28.vip',
    'dudancaishen.cn',
    'caishen6.cn',
    'jnhfs.cn',
    // 'stc28.com'
];
// 
// Index file Desktop
const fileDesktop = {};
myDomains.map((k=>(
    fileDesktop[k] = sitePath['w']
)));
// 
// Index file Mobile
const fileMobile = {};
myDomains.map((k=>(
    fileMobile[k] = sitePath['m']
)));
// 
const files = {
    w: fileDesktop,
    m: fileMobile
};
// Index Root
const baseRootFile = '/Users/jasonchoi/Projects/umi/root/index.html'
// 
module.exports={
    sitePath,
    files,
    baseRootFile,
    myDomains
};