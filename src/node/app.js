// 这个作为新的后端来使用
const https = require('https')
const host = '10.0.0.15'
const port = 8000

const server = https.createServer((req, res) => {
    res.end('HelloWorld')
})

server.listen(port, () => {
    console.log('服务器在8000端口开启')
})