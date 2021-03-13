module.exports={
  configureWebpack:{
    resolve:{
      // 起的别名
      alias:{
        //vue默认把src起了@这个别名
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'router':'@/router',
        'store':'@/store',
        'views':'@/views',
      }
    }
  }
}