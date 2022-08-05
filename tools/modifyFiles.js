//
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
// 
const readFile = async(_path) => 
{
    return new Promise((resolve,reject) =>
    {
        fs.readFile(_path, (err, msg)=>{
            if(err)
                reject(err);
            else
                resolve(msg);
        })
    })
}
const mkdirFolder = async(_path) => 
{
    return new Promise((resolve,reject) =>
    {
        fs.mkdir(_path, (err, msg)=>{
            if(err&&err['code'] == 'EEXIST') resolve(msg)
            else
                resolve(msg);
        })
    })
}
const writeFile = async(d) => 
{
    const { contents, file_put } = d;
    return new Promise((resolve,reject) =>
    {
        const writeStream = fs.createWriteStream(file_put);
        writeStream.write(contents);
        writeStream.end();
        writeStream.on('finish', ()=> 
        {
            resolve('已完成！');
        })
    });
}
//
const changeHtml = async(d) => 
{
    const { file_from, file_put, content_data } = d;
    const { title, keywords, description } = content_data;
    // 
    let content = await readFile(file_from);
    content = content.toString();
    // 
    const $ = cheerio.load(content);
    // 
    $('title').text(title);
    $('[name="keywords"]').attr('content', keywords);
    $('[name="description"]').attr('content', description);
    // 
    // console.log($.html());
    // 
    const is_ok = await writeFile({ contents:$.html(), file_put });
    console.log(is_ok);
}
// 
module.exports={
    changeHtml,
    readFile,
    mkdirFolder,
    writeFile,
    cheerio
}