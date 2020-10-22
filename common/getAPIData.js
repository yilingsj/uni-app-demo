/*
 * @Description: 全局API接口
 * @Author: yilingsj（315800015@qq.com）
 * @Date: 2020-10-22 10:55:25
 * @LastEditors: yilingsj（315800015@qq.com）
 * @LastEditTime: 2020-10-22 14:37:50
 */

/* #ifdef H5 */
import { browser } from '@/common/ua.js'
import wx from 'weixin-js-sdk'
/* #endif */

/**
 * @author: yilingsj（315800015@qq.com）
 * @description: 微信sdk
 * @param {type}
 * @return {type}
 * @Date: 2020-10-14 11:22:32
 */
const getJsSDK = function ({ url, data, callback }) {
  if (data && data.url) {
    data.url = data.url.split('#')[0]
  }
  console.log('getJsSDK=', data)
  return uni.request({
    url: url,
    data: data,
  }).then(resData => {
    const res = resData[1].data
    if (res && res.data) {
      console.log('wx====', wx, res.data.appId)
      wx.config({
        debug: false,
        appId: res.data.appId,
        timestamp: res.data.timestamp,
        nonceStr: res.data.nonceStr,
        signature: res.data.signature,
        jsApiList: res.data.jsApiList
      })
      wx.ready(function () {
        wx.checkJsApi({
          jsApiList: res.data.jsApiList,
          success: (res) => {
            console.log('%c 支持的接口 ', 'color:#f00', res);
          },
          fail: (res) => {
            console.log('支持的接口 fail', res);
          },
        });
      })
      wx.error(function (res) {
        console.log('%c 微信jssdk配置失败', 'color:#f00', res)
      })
      callback && callback(res)
    }
  }).catch(err => {
    console.log('%c jsSDK初始化失败', 'color:#f00', err)
  })
}
/**
 * @author: yilingsj（315800015@qq.com）
 * @description: 分享
 * @param {*} data 分享的data（包含标题、描述、url、图片）
 * @param {*} wx 微信jssdk
 * @param {*} callback 回调方法
 * @param {*} browser 浏览器ua
 * @param {*} bridge 与app通信的方法
 * @return {*}
 * @Date: 2020-10-21 17:24:11
 */
const goShare = function ({ data, callback, }) {
  /* #ifdef H5 */
  let msg = {
    code: 10000,
    type: 'shareurl',
    message: '分享',
    result: data || {
      url: location.href,
      title: '邀请好友得红包',
      describe: '快快邀请好友加入吧，加入享福利',
      imgUrl: 'http://images.fengshengshuqi.com/avatar/noavatar.jpg',
    }
  }
  if (browser.versions.weixin) { // 微信公众号中
    callback && callback()
    const shareData = {
      title: msg.result.title, // 分享标题
      desc: msg.result.describe, // 分享描述
      link: msg.result.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: msg.result.imgUrl,
      success: function (res) {
        console.log('微信sdk分享 成功', res)
      },
      fail: function (res) {
        console.log('微信sdk分享 失败', res)
      },
      cancel: function (res) {
        console.log('微信sdk分享 取消', res)
      }
    }
    wx.onMenuShareAppMessage(shareData)
    wx.onMenuShareTimeline(shareData)
    wx.onMenuShareQQ(shareData)
    wx.onMenuShareWeibo(shareData)
    wx.onMenuShareQZone(shareData)
    wx.updateAppMessageShareData(shareData)
    wx.updateTimelineShareData(shareData)
  } else {
    uni.showToast({
      title: '当前客户端不支持此操作！请在微信中打开',
      icon: 'none'
    })
  }
  /* #endif  */
}

export { getJsSDK, goShare }
