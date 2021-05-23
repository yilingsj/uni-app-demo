# uni-app跨端开发微信小程序之手把手带你写一个用程序自动打开微信开发者工具的小插件

## 目的
在使用命令行编译微信小程序的同时，自动打开微信开发者工具，节省开发者手动打开工具的时间，提高开发效率。

## 修改说明：
1、修改openDevTools/config.js文件中的微信开发者工具路径

2、根据自己的项目情况来修改src/config.js中的相关配置

3、package.json 中新增的3行打包命令（见下方如何使用），可根据实际情况进行修改


## 如何使用：
自动编译并打开微信开发者工具的命令（开发中使用）：

dev:mp-weixin-test 测试环境

dev:mp-weixin-pre  预上线环境

dev:mp-weixin-prod  正式环境

## 原文地址：
[uni-app跨端开发微信小程序之手把手带你写一个用程序自动打开微信开发者工具的小插件](http://www.yilingsj.com/xwzj/2021-05-04/uni-app-vue-cli-openDevTools.html)