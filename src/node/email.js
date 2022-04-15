const nodemailer = require('nodemailer')

module.exports = {
    randomCode: function () {
        
        let code = Math.floor((1000 + Math.random() * 1000 % 9000)) 
        return code
        // return code 
    },
    mailOptions: {
        from: '"e笔记" <2779066456@qq.com>', 
        to: '2779066456@qq.com', 
        subject: '测试', 
        text: '测试'
        // html:'这里也可以写html'
    },
    transporter: nodemailer.createTransport({
        //支持列表： https://nodemailer.com/smtp/well-known/
        service: 'QQ', // 老严用的是 QQ
        port: 465, // SMTP 端口 这个不用管
        secureConnection: true, 
        auth: {
            user: '2779066456@qq.com',
            pass: 'opwzqjjpoylydgae', 
        }
    }),
    
}



   
    
    
    
    


