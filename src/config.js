/*
 * @Description: 多环境配置文件
 * @Author: yiling (315800015@qq.com)
 * @Date: 2021-04-20 21:47:54
 * @LastEditors: yilingsj（315800015@qq.com）
 * @LastEditTime: 2021-05-03 19:12:58
 * @FilePath: \v3-mini\src\config.js
 */
const GLOBALCONFIG = {
  VUE_APP_BASE_API: 'https://api.xxxx.com/api', // api请求地址
  VUE_APP_PREVIEW_PICTURE: 'https://cdn.xxx.com/', // 图片域名
  VUE_APP_TITLE : '当前是开发环境',
  APPID: 'touristappid',
  TITLE: '开发环境',
}
if (process.env.NODE_ENV === 'development') {
  // 开发环境
} else if (process.env.NODE_ENV === 'test') {
  GLOBALCONFIG.VUE_APP_TITLE = '当前是测试环境'
  GLOBALCONFIG.APPID = '建议换成真实appid，避免运行异常'
  GLOBALCONFIG.TITLE = '测试环境'
} else if (process.env.NODE_ENV === 'pre') {
  GLOBALCONFIG.VUE_APP_BASE_API = 'https://xxx.com/api'
  GLOBALCONFIG.VUE_APP_PREVIEW_PICTURE = 'https://cdn.xxx.com/'
  GLOBALCONFIG.VUE_APP_TITLE = '当前是预发布环境'
  GLOBALCONFIG.APPID = '建议换成真实appid，避免运行异常'
  GLOBALCONFIG.TITLE = '预发布环境'
} else if (process.env.NODE_ENV === 'production') {
  GLOBALCONFIG.VUE_APP_BASE_API = 'https://xxx.com/wxapis'
  GLOBALCONFIG.VUE_APP_PREVIEW_PICTURE = 'https://cdn.xxx.com/'
  GLOBALCONFIG.VUE_APP_TITLE = '当前是正式环境'
  GLOBALCONFIG.APPID = '建议换成真实appid，避免运行异常'
  GLOBALCONFIG.TITLE = '正式环境'
}
console.log('当前环境：', process.env.NODE_ENV, ';title=', GLOBALCONFIG.VUE_APP_TITLE)
module.exports = GLOBALCONFIG
