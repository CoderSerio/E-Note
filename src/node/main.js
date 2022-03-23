const http = require('http')
const fs = require('fs')
const p = require('path')
// let filePath = path.resolve('../notes')
// const { dir } = require('console')

// fs.writeFile()

function isFileExist (path) {
    try {
        fs.accessSync(path, fs.F_OK)
    } catch (e) {
        return false
    }
    return true
}


const server = http.createServer((req, res) => {
    res.on('error', (err) => {
        console.warn ('响应报错', err)
    })
    req.on('err', (err) => {
        console.warn ('请求报错', err)
    })
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
    res.setHeader("Access-Control-Allow-Methods", "PUT,POST,DELETE")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,token")
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Content-Type', 'text/html,application/json;charset=utf-8;')

    const method = req.method
    const url = req.url
    const path = url.split('?')[0]
    const query = url.split('?')[1]
    let yb_userid = query.split('=')[1]
    // for(let i = 0; i < query.length; i += 2) { // 偶数是键，奇数是值
    //     if(query[i] == 'yb_userid') {
    //         yb_userid = query[i + 1]
    //         break
    //     }
    // }
    if(path == '/set') {
        let postData = ''
        req.on('data', chunk => {
            console.log(chunk.toString())
            postData += chunk.toString()
        })
        req.on('end', () => {
            console.log('这是数据', JSON.parse(postData))
            fs.writeFile(`./${JSON.parse(postData).id}.json`, postData, err => {
                if(err) {
                    console.warn('数据写入失败', err)
                } else {
                    console.log('数据写入成功')
                }
                res.end(JSON.stringify({code:'1'}))
            })
        })
    } else if(path === '/get') {
        let ans = []
        let fileNum = 0 // 这是已经遍历的文件的数目
        let filePath = '../yb_elec_note/src/notes'
        fs.readdir(filePath, (err, files) => {
            if(err) {
                console.warn('获取文件名称失败', err)
                // res.end({"code":"0"})
            } else {
                
                files.forEach((fileName) => {
                    let fileDir = p.join(filePath, fileName)
                    fs.stat(fileDir, (err, stats) => {
                        if(err) {
                            console.warn('获取文件stats失败')
                            res.end(JSON.stringify({"code":0}))
                        } else {
                            if(stats.isFile()) {
                                // console.log(fileName, fileDir)
                                // notesPath.push(fileDir)
                                fs.readFile(fileDir, (err, data) => {
                                    if(err) {
                                        console.warn('获取文件内容失败')
                                        res.end(JSON.stringify({"code":0}))
                                        // res.end({"code":"0"})
                                    } else {
                                        fileNum ++
                                        if(JSON.parse(data).yb_userid == yb_userid) {
                                            ans.push(data.toString())
                                        }
                                        if(fileNum == files.length) {
                                            // console.log(ans)
                                            res.end(JSON.stringify({'data':ans}))        
                                        }
                                    }
                                })
                            } 
                        }
                    })
                })
            } 
                // if(i == files.length) {
                //     console.log('已获取文件名称：', dirs)
                //     // 读取完毕之后，就开始统一信息
                //     for(let j = 0; j < dirs; j ++) {
                //         fs.readFile(`${basePath + dirs[i]}`, (err, data) => {
                //             if(err)
                //                 throw err
                //             ans.push(data.toString())
                //         })
                //     }
                //     console.log('全部文章数据:', ans)
                //     res.end(ans)
                //     return
        }) 
    }  else if(path === '/delete') {
        let filePath = '../yb_elec_note/src/notes'
        fs.readdir(filePath, (err, files) => {
            if(err) {
                console.warn('获取文件名称失败', err)
            } else {
                files.forEach((fileName) => {
                    let fileDir = p.join(filePath, fileName)
                    fs.stat(fileDir, (err, stats) => {
                        if(err) {
                            console.warn('获取文件stats失败')
                            res.end(JSON.stringify({"code":0}))
                        } else {
                            if(stats.isFile()) {
                                let id = query.split('=')[1]
                                let deleteSrc = filePath + id + '.json'
                                if(isFileExist(deleteSrc)) {
                                    fs.unlinkSync(deleteSrc)
                                    // fs.unlink(deleteSrc, (err) => {
                                    //     if (err) {
                                    //         res.end(JSON.stringify({"code":0}))
                                    //         throw err
                                    //     } else {
                                    //         console.log('删除成功', deleteSrc)
                                    //         res.end(JSON.stringify({"code":1}))
                                    //     }   
                                    // }
                                }
                            }
                        }
                    })
                })
            } 
        }) 
    }   
})
server.listen(3456, () => {
    console.log('服务器正在3456端口上打开')
})