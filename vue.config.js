//在根目录下创建vue.config.js,如下配置：
module.exports = {
    devServer: {
      proxy: {  
        // 这个是生产环境下（部署上线时）用的,服务器上url要加前缀/back,端口是80
        // '/back': {
        //   target: 'http://124.221.86.145:80',
        //   changeOrigin: true,
        //   ws: true,
        //   pathRewrite: {
        //     '^/back': ''
        //   }
        // },
        // '/back_after': {
        //   target: 'http://192.168.195.70:8080',
        //   changeOrigin: true,
        //   ws: true,
        //   pathRewrite: {
        //     '^/back_after': ''
        //   }
        // },
        // 这个是本地开发的时候用的,本地环境80端口可能已经被占用了所以用3456
        '/back': {
            target: 'http://localhost:3456',
            changeOrigin: true,
            ws: true,
            pathRewrite: {
                '^/back': ''
            }
        },
        '/yb': {
          target: 'https://openapi.yiban.cn',
          // target: 'https://oauth.yiban.cn/code/html',
          // target: 'https://www.baidu.com',
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            '^/yb': ''
          }
        }
        
        // 'https://oauth.yiban.cn/code': {
        //   target:'https://oauth.yiban.cn/code',  
        //   changeOrigin: true,
        //   pathRewrite: {
        //     '^/https://oauth.yiban.cn/code': ''
        //   }
        // }
      }
    }
  }
