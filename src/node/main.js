const http = require('http')
const fs = require('fs')

// fs.writeFile()


const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5500')
    res.setHeader("Access-Control-Allow-Methods", "PUT,POST,DELETE")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,token")
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Content-Type', 'application/json;charset=utf-8;')

    const method = req.method
    const url = req.url
    const path = url.split('?')[0]
    const query = url.split('?')[1]

    console.log(method, url, path, query)
    if(path == '/set') {
        let postData = ''
        req.on('data', chunk => {
            console.log(chunk.toString())
            postData += chunk.toString()
        })
        req.on('end', () => {
            console.log('这是数据', JSON.parse(postData))
            fs.writeFile(`E:/COMPILE/SUBLIME/BigFront/yb_elec_note/src/notes/${JSON.parse(postData).id}.json`, postData, err => {
                if(err) {
                    console.warn('数据写入失败', err)
                } else {
                    console.log('数据写入成功')
                }
                res.end(JSON.stringify({code:'1'}))
            })
        })
    }
})

server.listen(3456, () => {
    console.log('服务器正在3456端口上打开')
})