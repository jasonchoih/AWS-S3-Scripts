//
const { sitePath, siteRootPath } = require('../config/config');
const { readFile, mkdirFolder, writeFile, cheerio } = require('../tools/modifyFiles');
const { uploadFileRoot, uploadFileToBucket } = require('../tools/bucket');
// 
const replaceText = '//! umi version: 3.5.18';
const replacement = `var zm = navigator.userAgent.toLowerCase().match(/(ipod|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i)!=null?'m':'w';
        window.location.href='https://'+window.location.host+'/'+zm+'/?'+(new Date()).valueOf();`;
// 
const CreateRootNavigator = async(d) => 
{
    const { file_from, file_put, folder_path } = d;
    // 
    let contents = await readFile(file_from);
    contents = contents.toString().replace(replaceText, replacement);
    const $ = cheerio.load(contents)
    // 
    await mkdirFolder(folder_path);
    //
    await writeFile({
        contents: $.html(), 
        file_put
    })
}
// 
const go = async() =>
{
    for(let w in siteRootPath)
    {
        for(let p in siteRootPath[w])
        {
            await CreateRootNavigator({
                file_from: siteRootPath[w][p] + '/index.html', 
                file_put: siteRootPath[w][p] + '/root/index.html', 
                folder_path: siteRootPath[w][p] + '/root'
            })
        }
    }
    // 
    for(let w in siteRootPath)
    {
        for(let p in siteRootPath[w])
        {
            for(let domain in sitePath[w][p])
            {
                await uploadFileRoot(`www.${domain}`, sitePath[w]['w'][domain] + '/root/index.html')
            }
        }
    }
    //
    for(let w in sitePath)
    {
        for(let p in sitePath[w])
        {
            for(let domain in sitePath[w][p])
            {
                await uploadFileToBucket( `www.${domain}/${p}`, sitePath[w][p][domain] + '/index.html')
            }
        }
    }
}
//
go();