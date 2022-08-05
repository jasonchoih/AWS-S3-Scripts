//
const { myDomains, Platform, rootPath } = require('../config/yc');
const { readFile, mkdirFolder, writeFile, changeHtml, cheerio } = require('../tools/modifyFiles');
const { uploadFileRoot, uploadFileToBucket } = require('../tools/bucket');
// 
const replaceText = '//! umi version: 3.5.20';
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
    await CreateRootNavigator({
        file_from: Platform['m'] + '/index.html', 
        file_put: rootPath + '/index.html', 
        folder_path: rootPath 
    })
    // 
    for(let i in myDomains)
    {
        for(let domain in myDomains[i])
        {
            await uploadFileRoot(`www.${domain}`, rootPath + '/index.html')   
        }
    }
    // 
    for(let i in myDomains)
    {
        for(let p in Platform)
        {
            for(let domain in myDomains[i])
            {
                await mkdirFolder(Platform[p] + '/root_' + domain);
                // 
                await changeHtml({
                    file_from: Platform[p] + '/index.html', 
                    file_put: Platform[p] + '/root_' + domain + '/index.html',
                    content_data: myDomains[i][domain]['content_data']
                })
            }
        }
    }
    // 
    for(let i in myDomains)
    {
        for(let p in Platform)
        {
            for(let domain in myDomains[i])
            {
                uploadFileToBucket(`www.${domain}/${p}`, Platform[p] + '/root_' + domain + '/index.html')
            }
        }
    }
}
//
go();