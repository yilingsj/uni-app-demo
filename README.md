# uni-app跨端开发微信小程序之nodejs与后端通信并动态打包项目以适应多环境开发

## 目的
在使用命令行打包时，自定义脚本会与后端接口通信，动态修改或生成一些新的配置，以适用于不同环境下的定制需求。全程靠命令行自动发起请求、修改配置文件、自动编译，解放双手不是梦！

## 修改说明：
1、修改openDevTools/config.js文件中的微信开发者工具路径

2、根据自己的项目情况来修改src/config.js中的相关配置

3、package.json 中新增的6条打包命令（见下方如何使用），可根据实际情况进行修改


## 如何使用：
自动编译并打开微信开发者工具的命令（开发中使用）：

dev:mp-weixin-test 测试环境

dev:mp-weixin-pre  预上线环境

dev:mp-weixin-prod  正式环境

自动编译并打开微信开发者工具的命令（需要上传时执行）：

build:mp-weixin-test 测试环境

build:mp-weixin-pre  预上线环境

build:mp-weixin-prod  正式环境


## 原文地址：
[uni-app跨端开发微信小程序之手把手带你写一个用程序自动打开微信开发者工具的小插件](http://www.yilingsj.com/xwzj/2021-05-04/uni-app-vue-cli-openDevTools.html)