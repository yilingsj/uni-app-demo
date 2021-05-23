#!/usr/bin/env node
/*
 * @Description: 自动打开小程序的配置
 * @Author: yilingsj（315800015@qq.com）
 * @Date: 2021-05-01 10:14:14
 * @LastEditors: yilingsj（315800015@qq.com）
 * @LastEditTime: 2021-05-03 18:58:38
 */
// 先获取微信开发者工具安装路径
const config = require('./openDevTools/config.js')
const WEIXIN_DEVTOOLS_PATH = config.weixin.path

// 执行vue-cli编译命令
const path = require('path')
const shell = require('shelljs')
const fs = require('fs')
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
    shell.cd(WEIXIN_DEVTOOLS_PATH)
    // 打开小程序项目
    const openDevToolsShell = `cli open --project ${WEIXIN_PRESET_PATH} --color=always`
    shell.exec(openDevToolsShell, { async: true })
  }
})

childProcess.stderr.on('data', function (data) {
  console.log('stderr: ' + data)
})
