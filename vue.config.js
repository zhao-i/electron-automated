module.exports = {
    pluginOptions: {
      electronBuilder: {
        preload:'src/preload.js',//预加载文件指定存放目录
        builderOptions: { //构建配置
          appId:"com.zhaoli.app",//应用ID
          productName:"Easy Games",//产品名称、安装目录
          copyright:"Copyright ©2022 zhaoli",//应用程序的可读版权行
          directories:{
            buildResources:"build",
          },
          win:{
            icon:"build/icon.ico",
            publisherName:"zhaoli",
            requestedExecutionLevel:"highestAvailable"
          }
        }
      }
    }
  }