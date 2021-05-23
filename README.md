# uni-app跨端开发微信小程序之HBuilderX项目实现多环境开发

## 解决的问题
由于项目有测试环境、预上线环境、正式环境，而通过HBuilderX编译器打包的话只有两个环境，所以我们需要用命令行的方式创建多个环境以适用于公司项目。

## 修改说明：
1、根据自己的项目情况来修改src/config.js中的相关配置

2、package.json 中新增的3行打包命令（见下方如何使用），可根据实际情况进行修改


## 如何使用：
在终端工具中输入下方命令，然后手动打开微信开发者工具

dev:mp-weixin-test 测试环境

dev:mp-weixin-pre  预上线环境

dev:mp-weixin-prod  正式环境

## 原文地址：
[uni-app跨端开发微信小程序之HBuilderX项目实现多环境开发](http://www.yilingsj.com/xwzj/2021-05-02/uni-app-HBuilderX-to-vue-cli.html)