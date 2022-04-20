const http = require('http')
const fs = require('fs')
const p = require('path')
const email = require('./email.js')

const prep = ''
// let filePath = path.resolve('../notes')
// const { dir } = require('console')

// fs.writeFile()

// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('邮件发送成功 ID：', info.messageId);
// });



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
    req.on('error', (err) => {
        console.warn ('请求报错', err)
    })
   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
   res.setHeader("Access-Control-Allow-Methods", "PUT,POST,DELETE")
   res.setHeader("Access-Control-Allow-Headers", "Content-Type,token")
   res.setHeader('Access-Control-Allow-Credentials', 'true')
   res.setHeader('Content-Type', 'text/html,application/json;charset=utf-8;')

    const method = req.method
    const url = req.url
    const path = url.split('?')[0]
    const query = url.split('?')[1]
    
    
    let yb_userid = '2779066456@qq.com' 
    
    // console.log(query)
    // for(let i = 0; i < query.length; i += 2) { // 偶数是键，奇数是值
    //     if(query[i] == 'yb_userid') {
    //         yb_userid = query[i + 1]
    //         break
    //     }
    // }
    console.log(path);
    if (path == prep + '/set') {
        try {
            let postData = ''
            req.on('data', chunk => {
                // console.log(chunk.toString())
                postData += chunk.toString()
            })
            req.on('end', () => {
                let id = JSON.parse(postData).yb_userid
                // console.log('这是数据', JSON.parse(postData))
                fs.writeFile(`./notes/${id + '-' + JSON.parse(postData).id}.json`, postData, err => {
                    if(err) {
                        console.warn('数据写入失败', err)
                    } else {
                        console.log('数据写入成功')
                    }
                    res.end(JSON.stringify({code:'1'}))
                })
            })
        } catch (err) {
            console.log('set出错', err)
            throw err
        } 
    } else if (path ===  prep + '/get') {
        
        yb_userid =  query.split('=')[1]
        
        let ans = []
        let fileNum = 0 // 这是已经遍历的文件的数目
        let filePath = './notes/'
        fs.readdir(filePath, (err, files) => {
            if(err) {
                console.warn('获取文件名称失败', err)
                res.end({"code":"0"})
            } else {
                if(files.length == 0) {
                    res.end(JSON.stringify({"msg": 'null'}))
                }
                files.forEach((fileName) => {
                    let fileDir = p.join(filePath, fileName)
                    fs.stat(fileDir, (err, stats) => {
                        if(err) {
                            // console.warn('获取文件失败')
                            res.end(JSON.stringify({"code":0}))
                        } else {
                            if(stats.isFile()) {
                                // console.log(fileName, fileDir)
                                // notesPath.push(fileDir)
                                fs.readFile(fileDir, (err, data) => {
                                    if(err) {
                                        // console.warn('获取文件失败')
                                        res.end(JSON.stringify({"code":0}))
                                        // res.end({"code":"0"})
                                    } else {
                                        fileNum ++
                                        if(data != undefined &&JSON.parse(data.toString()).yb_userid == yb_userid.replace('%40', '@') ) {
                                            ans.push(data.toString())
                                            
                                        } else if (yb_userid == 'ALL_PUBLIC' && JSON.parse(data.toString()).public) {
                                            ans.push(data.toString())
                                        }
                                        
                                        if(fileNum >= files.length) {
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
        }) 
    } else if (path === prep + '/delete') {
        try {
            let postData = ''
            let userID = ''
            let id = ''
            req.on('data', chunk => {
                // console.log(chunk.toString())
                postData += chunk.toString()
            })
            req.on('end', () => {
                userID = JSON.parse(postData).userid
                id = JSON.parse(postData).id
            })
            let filePath = './notes/'
            fs.readdir(filePath, (err, files) => {
                if(err) {
                    console.warn('获取文件失败', err)
                } else {
                    files.forEach((fileName) => {
                        let fileDir = p.join(filePath, fileName)
                        fs.stat(fileDir, (err, stats) => {
                            if(err) {
                                console.warn('获取文件失败')
                                res.end(JSON.stringify({"code":0}))
                            } else {
                                if(stats.isFile()) {
                                    let deleteSrc = filePath + userID + '-' + id + '.json'
                                    console.log('删除路径', deleteSrc)
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
        } catch (err) {
            console.log('删除出错')
            throw err
        }
        
    } else if (path === prep + '/userregister') {
        try {
            let filePath = './users_info.json'
            let postDataJSON = ""
            req.on('data', (chunk) => {
                postDataJSON += chunk.toString()
            })
            req.on('end', () => {
                // postData是要注册的用户信息
                let postData = JSON.parse(postDataJSON)
               
                // 先看看这个号注册过没有
                fs.readFile(filePath, (err, dataJSON) => {
                    if (err) {
                        console.warn ('获取用户数据失败', err)
                    }
                    // data是所有用户的信息
                    let data = JSON.parse(dataJSON)
                    let flag = true // 邮箱是否未注册
                    
                    // 不使用forEach,因为不能打断
                    // data.forEach((oneUser) => {
                    //     console.log(oneUser.email, postData.email)
                    //     if  (oneUser.email == postData.email) {
                    //         res.end(JSON.stringify({'msg':'注册失败，邮箱重复', 'code': 0}))                        
                    //         flag = false
                    //         break
                    //     }
                    // })
                
                    // for of直接拿到值，值是一个对象哈
                    for(let one of data) {
                        if  (one.email == postData.email) {
                            res.end(JSON.stringify({'msg':'注册失败，邮箱重复', 'code': 0}))                        
                            flag = false
                            break
                        }
                    }
                    if (flag) { // 邮箱未被注册
                        // 校验验证码
                        let flag2 = false // 检测验证码是否正确
                        fs.readFile('./users_register.json', (err, dataJSON) => {
                            if (err) {
                                console.warn ('校验验证码出错', err)
                                return
                            } 
                            let data2 = JSON.parse(dataJSON)
                            for (let one of data2) {
                                if (one.email == postData.email) {
                                    console.log('验证码', one.verification, data2.verification)
                                    if (one.verification == postData.verification) {
                                        flag2 = true
                                        break
                                    }
                                }
                            }
                            if (flag2) {
                                data.push(postData)
                                // 文件写入，数据则存入，代表正式注册成功
                                fs.writeFile(filePath, JSON.stringify(data), (err) => {
                                    if(err) {
                                        console.log('注册失败，文件写入失败', err)
                                        res.end(JSON.stringify({msg:'注册失败', code:'0'}))
                                    } else {
                                        // 未来如果有需要，可以在这里补一个删除已经用过的验证码的功能
                                        res.end(JSON.stringify({msg:'注册成功', code:'1'}))
                                    }
                                })
                            } else {
                                res.end(JSON.stringify({msg:'注册失败，验证码错误', code:'0'}))
                            }

                        })
                        
                        
                        
                    }
                })
            })
        } catch (err) {
            console.log('注册出错')
            throw err
        }
        
        
    } else if (path === prep + '/userlogin') {
        console.log('进入了')
        let filePath = './users_info.json'
        let postDataJSON = ""
        req.on('data', (chunk) => {
            postDataJSON += chunk.toString()
        })
        req.on('end', () => {
            let postData = JSON.parse(postDataJSON)
            
            fs.readFile(filePath, (err, dataJSON) => {
                // console.log(dataJSON.toString(),'----')
                let data = JSON.parse(dataJSON.toString())
               
                data.forEach((oneUser) => {
                    // console.log('iterating', oneUser, postData)
                    if  (oneUser.email == postData.email && oneUser.password == postData.password) {
                        
                        yb_userid = postData.email
                        console.log('登陆成功', yb_userid)
                        res.end(JSON.stringify({'msg':'登录成功', 'code': 1}))
                    }
                })
                // 这样写会报一个错，但是问题不大不影响
                res.end(JSON.stringify({'msg':'登录失败', 'code': 0}))
                
            })
        })
    } else if (path === prep + '/sendverification') {
        try {
            let postDataJSON = ''
            let filePath = './users_register.json'
            
            req.on('data', (chunk) => {
                postDataJSON = chunk.toString ()
            })
            req.on('end', () => {
                let postData = JSON.parse(postDataJSON)
                let randomCode = email.randomCode()
                
                // 读取注册表
                fs.readFile(filePath, (err, dataJSON) => {
                    if (err) {
                        console.log('读取注册表失败', err)
                        res.end(JSON.stringify({'msg':'获取验证码失败', 'code': 0})) 
                    }
                    let data = JSON.parse(dataJSON.toString())
                    // 遍历，如果之前已经请求过验证码了，那么覆盖
                    // data.forEach((one) => {
                    //     if(postData.email == one.email) {
                    //         one.verification = randomCode
                    //     }
                    // })
                    let flag = false // 之前是否已经发过验证码
                    
                    for (let one of data) {
                        if (one.email == postData.email) {
                            // 如果已发过了那么应该有记录，直接更改就好了
                            one.verification = randomCode
                            flag = !flag
                            // 至少间隔2分钟
                            let nowTime = new Date().getTime()
                            // 注意这里postData的时间是前端请求时的时间
                            if (nowTime < one.date + 5 * 60 * 1000) {
                                // console.log(nowTime, one.date)
                                res.end(JSON.stringify({'msg':'请求过于频繁！请稍后再试', 'code': 0})) 
                                return
                            }
    
                            break
                        }
                    }
                    if (!flag) { // 没有的话还得给新加一个
                        postData.verification = randomCode
                        data.push(postData)
                    }
                    // 保存用户的注册信息
                    
                    fs.writeFile (filePath, JSON.stringify(data), (err) => {
                        if (err) {
                            console.warn ('写入注册信息出错', err)
                            return 
                        } else {
                            // 发送邮件
                            email.mailOptions = {
                                from: '"e笔记" <2779066456@qq.com>', 
                                to: postData.email, 
                                subject: 'e笔记 注册验证码', 
                                html:
                                 `欢迎使用e笔记, 您的验证码为:
                                <h1 style="color:red;text-align:center;font-weight:800;">${randomCode}</h1>
                                <hr>如过程中如果遇到无法解决的问题，请联系开发者 QQ2779066456，感谢您对e笔记的支持`
                            }
                            email.transporter.sendMail(email.mailOptions, (error, info) => {
                                if (error) {
                                    return console.log(error);
                                }
                                res.end(JSON.stringify({'msg':'验证码成功发送，请前往邮箱查看', 'code': 1})) 
    
                                console.log('邮件发送成功, ID：', info.messageId)
                            })
                        }
                    })
                })
            })
        } catch (err) {
            console.log('发送验证码出错')
            throw err
        }
        


        
        
        
    } else if (path === prep + '/share') {
        // 不用单独写unshare了
        try {
            let postDataJSON = ''
            req.on('data', chunk => {
                postDataJSON += chunk.toString()
            })
            req.on('end', () => {
                let postData = JSON.parse(postDataJSON)
                if (!postData.origin) {
                    JSON.stringify({msg:'非原创文章不允许二次发布！', code:'0'})
                }
                let userID = postData.yb_userid
                let id = postData.id
                console.log(postData)
                // console.log('这是数据', JSON.parse(postData))
                fs.writeFile(`./notes/${userID + '-' + id}.json`, postDataJSON, err => {
                    if(err) {
                        console.warn('数据写入失败', err)
                    } else {
                        console.log('数据写入成功')
                    }
                    res.end(JSON.stringify({code:'1'}))
                })
            })
        } catch (err) {
            console.log('分享出错')
            throw err
        }
        
    } else if (path === prep + '/clone') {
        try {
            req.on('data', (chunk) => {
                postDataJSON += chunk.toString()
            })
            req.on('end', () => {
                let postData = JSON.parse(postDataJSON)
                console.log(postData)
                console.log(postData)
                let id = postData.userId // 这个是下载者的id,后面的是文章id
                postData.note.public = false // 不是原创内容禁止二次发布
                // postData.note.origin = postData.note.yb_userid // 原作者id
                postData.note.yb_userid = id
                postData.note.id = Math.floor(Math.random() * 1000) 
                // console.log('这是数据', JSON.parse(postData))
                fs.writeFile(`./notes/${id + '-' + postData.note.id}.json`, JSON.stringify(postData.note), err => {
                    if(err) {
                        console.warn('数据克隆失败', err)
                    } else {
                        console.log('数据克隆成功')
                    }
                    res.end(JSON.stringify({code:'1'}))
                })
            })
        } catch (err) {
            console.log('克隆出错')
            throw err
        }
        let postDataJSON = ''
        
    } else if (path === prep + '/statistics') {
        try {
            let resData = {
                allNum: 0,
                private: 0,
                public: 0,
                origin: 0,
                notOrigin: 0
            }
            
            yb_userid =  query.split('=')[1]
            let filePath = './notes/'
            let fileNum = 0
            fs.readdir(filePath, (err, files) => {
                if(err) {
                    console.warn('获取文件名称失败', err)
                    res.end({"code":"0"})
                } else {
                    if(files.length == 0) {
                        res.end(JSON.stringify({"msg": 'null'}))
                    }
                    files.forEach((fileName) => {
                        let fileDir = p.join(filePath, fileName)
                        fs.stat(fileDir, (err, stats) => {
                            if(err) {
                                res.end(JSON.stringify({"code":0}))
                            } else {
                                if(stats.isFile()) {
                                    fs.readFile(fileDir, (err, data) => {
                                        if(err) {
                                            res.end(JSON.stringify({"code":0}))
                                        } else {
                                            // console.log(stats)
                                            fileNum ++
                                            if(data != undefined &&JSON.parse(data.toString()).yb_userid == yb_userid.replace('%40', '@') ) {
                                                resData.allNum ++
                                                if (JSON.parse(data.toString()).public) {
                                                    resData.public ++
                                                }
                                                if (JSON.parse(data.toString()).origin == yb_userid.replace('%40', '@')) {
                                                    resData.origin ++
                                                }
                                            } 
                                            if(fileNum >= files.length) {
                                                // console.log(ans) 
                                                resData.private = resData.allNum - resData.public
                                                resData.notOrigin = resData.allNum - resData.origin
                                                res.end(JSON.stringify(resData))        
                                            }
                                        }
                                    })
                                } 
                            }
                            
                        })
                    })
                } 
            }) 
        } catch (err) {
            console.log('统计数据出错')
            throw err
        }
        
    }
    else {
        res.end('404 NOT FOUND')
    }
})

server.on('error', (err) => {
    console.warn('出错啦', err)
})

server.listen(3456, () => {
    console.log('服务器正在3456端口上打开')
})