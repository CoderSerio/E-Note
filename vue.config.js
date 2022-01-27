//在根目录下创建vue.config.js,如下配置：
module.exports = {
    devServer: {
      proxy: {  
        '/back': {
            target: 'http://localhost:3456',
            changeOrigin: true,
            ws: true,
            pathRewrite: {
                '^/back': ''
            }
        }
      }
    }
  }
