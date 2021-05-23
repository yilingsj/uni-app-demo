#!/usr/bin/env node
/*
 * @Description: 自动打开小程序的配置
 * @Author: yilingsj（315800015@qq.com）
 * @Date: 2021-05-01 10:14:14
 * @LastEditors: yilingsj（315800015@qq.com）
 * @LastEditTime: 2021-05-23 11:30:39
 */
// 第一步：先获取微信开发者工具安装路径
const config = require('./openDevTools/config.js')
const WEIXIN_DEVTOOLS_PATH = config.weixin.path

// 第二步：执行vue-cli编译命令
const path = require('path')
const shell = require('shelljs')
const fs = require('fs')
const request = require('request')
const GLOBALCONFIG = require('./src/config')
// 运行项目路径读取
const PRESET_PATH = path.resolve(__dirname)
// 当前运行环境变量与运行命令
const NODE_ENV = process.env.NODE_ENV
// 微信项目源码路径
const EXEC_CODE_TYPE = NODE_ENV !== 'production' ? 'dev' : 'build'
const WEIXIN_PROJECT_PATH = `dist/${EXEC_CODE_TYPE}/mp-weixin`

console.log('微信小程序编译后的路径是：', WEIXIN_PROJECT_PATH)

// 微信项目源码路径
const WEIXIN_PRESET_PATH = path.resolve(PRESET_PATH, WEIXIN_PROJECT_PATH)
const PROJECT = path.resolve(WEIXIN_PRESET_PATH, './project.config.json')
const APP_JSON = path.resolve(WEIXIN_PRESET_PATH, './app.json') // 新增
const EXEC_CODE = `npx cross-env NODE_ENV=${NODE_ENV} UNI_PLATFORM=mp-weixin vue-cli-service uni-build --watch --color=always`

shell.cd(PRESET_PATH)
const childProcess = shell.exec(EXEC_CODE, { async: true })
childProcess.stdout.on('data', function (data) {
  console.log('stdout: ' + data)
  if (data.match('Build complete')) {
    console.log('微信小程序编译成功', Date.now())
    const PROJECT_CONFIG = JSON.parse(fs.readFileSync(PROJECT).toString())
    PROJECT_CONFIG.appid = GLOBALCONFIG.APPID
    PROJECT_CONFIG.projectname = GLOBALCONFIG.TITLE
    const writeFileStr = JSON.stringify(PROJECT_CONFIG, null, '\t')
    fs.writeFileSync(PROJECT, writeFileStr)
    // 请求后端接口，获取一些配置信息
    const url = GLOBALCONFIG.VUE_APP_BASE_API + '/api/xxx/xxx' // 请求后端接口，获取一些配置信息，（复制后请修改成自己的）
    const SEND_REQUEST = process.env.SEND_REQUEST // 获取自定义变量，判断是否要发起请求
    if (SEND_REQUEST === 'true') {
      requestApi({
        url: url,
        success: (res) => {
          // 有直播权限时动态配置直播的appid和修改app.json文件
          if (res.live) {
            const APP_JSON_CONFIG = JSON.parse(fs.readFileSync(APP_JSON).toString())
            // 动态添加直播插件相关的代码
            APP_JSON_CONFIG.plugins = {
              'live-player-plugin': {
                version: res.LIVE_VERSION || '1.0.0',
                provider: res.LIVE_PROVIDER || 'wx2b03c6e691cd7370'
              }
            }
            const writeFileStrAppJson = JSON.stringify(APP_JSON_CONFIG, null, '\t')
            fs.writeFileSync(APP_JSON, writeFileStrAppJson)
            shell.cd(WEIXIN_DEVTOOLS_PATH)
            // 打开小程序项目
            const openDevToolsShell = `cli open --project ${WEIXIN_PRESET_PATH} --color=always`
            shell.exec(openDevToolsShell, { async: true })
          }
        }
      })
    } else {
      shell.cd(WEIXIN_DEVTOOLS_PATH)
      // 打开小程序项目
      const openDevToolsShell = `cli open --project ${WEIXIN_PRESET_PATH} --color=always`
      shell.exec(openDevToolsShell, { async: true })
    }
  }
})

childProcess.stderr.on('data', function (data) {
  console.log('stderr: ' + data)
})
/**
 * @author: yilingsj（315800015@qq.com）
 * @description: 封装请求
 * @param {String} url 请求地址
 * @param {Function} fail 失败回调
 * @param {Function} success 成功回调
 * @return {*}
 * @Date: 2021-05-22 17:27:42
 */
function requestApi ({ url, fail, success } = {}) {
  if (!url) {
    shell.echo('url不能为空')
    shell.exit()
  }
  request(url, { json: true }, (err, res, body) => {
    console.log('err=', err)
    if (err) {
      fail && fail(err)
      return
    }
    console.log('成功==', body.data)
    if (body.code === 200) {
      success && success(body.data)
    }
  })
}
