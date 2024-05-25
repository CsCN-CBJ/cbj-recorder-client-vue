const {defineConfig} = require('@vue/cli-service')
const fs = require('fs')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false, // 关闭语法检查
    devServer: {
        allowedHosts: process.env.VUE_APP_ALLOWED_HOSTS.split(','),
        port: process.env.VUE_APP_PORT,
        https: {
            key: fs.readFileSync(process.env.VUE_APP_HTTPS_KEY),
            cert: fs.readFileSync(process.env.VUE_APP_HTTPS_CERT),
        },
        client: {
            webSocketURL: 'wss://0.0.0.0:' + process.env.VUE_APP_PORT + '/ws',
        },
    }
})
