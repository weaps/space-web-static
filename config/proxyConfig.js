module.exports = {
  '/space/backend/mock': { //代理到mock平台，需要修改src/commmon/js/config.js中变量mockBase为const mockBase = '/mock'
    target: 'http://192.168.57.105:8080/mockjsdata/94/',
    changeOrigin: true,
    pathRewrite: {
      '^/operation/backend/mock': '/backend'
    }
  },
  '/space/backend': { // 代理到开发环境后端服务
    // 说明：需要修改index.js中dev配置项assetsPublicPath: '/operation/'为assetsPublicPath: '/operation/'
    target: 'http://localdev.ledc.changyan.cn/',
    changeOrigin: true
    // pathRewrite: {
    //   '^/api': ''
    // }
   },
  '/backend/mock': { //代理到mock平台，需要修改src/commmon/js/config.js中变量mockBase为const mockBase = '/mock'
    target: 'http://192.168.57.105:8080/mockjsdata/94/',
    changeOrigin: true,
    pathRewrite: {
      '^/backend/mock': '/backend'
    }
  },
  '/backend': {//代理到本地后端服务，
    // 说明：需要修改index.js中dev配置项assetsPublicPath: '/operation/'为assetsPublicPath: '/'
    //      需要修改src/commmon/js/config.js中变量mockBase为const mockBase = '/'
    // target: '127.0.0.1:8080',
    // target: 'http://ecsdev.ledc.changyan.cn/operation/',
    target: 'http://10.4.176.33:8080',
    // target: 'http://10.4.176.38:8080',
    changeOrigin: true
    // pathRewrite: {
    //   '^/api': ''
    // }
  },
}
