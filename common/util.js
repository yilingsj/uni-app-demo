/*
 * @Description: 公用方法
 * @Author: yilingsj（315800015@qq.com）
 * @Date: 2020-06-28 14:06:23
 * @LastEditors: yilingsj（315800015@qq.com）
 * @LastEditTime: 2020-12-26 21:49:18
 */
/**
 * @author: yilingsj（315800015@qq.com）
 * @description: 计算长度
 * @param {type}
 * @return:
 * @Date: 2020-07-22 16:01:38
 */
function leng (options) {
  if (options) {
    if (options.constructor === Object) {
      return Object.keys(options).length
    }
    if (options.constructor === Array) {
      return options.length
    }
  }
  return 0
}

/**
 * @author: yilingsj（315800015@qq.com）
 * @description: 封装toast
 * @param {type}
 * @return {type}
 * @Date: 2020-09-05 21:36:30
 */
function toast (options) {
  let title = ''
  let callback = null
  let duration = 2000
  if (options.constructor === Object) {
    title = options.title
    callback = options.callback
    duration = options.duration || 2000
  }
  if (options.constructor === String) {
    title = options
  }
  console.log('全局toast=', options)
  uni.showToast({
    title: title || '操作中...',
    icon: 'none',
    duration: duration,
    mask: true,
    complete: res => {
      setTimeout(() => {
        callback && callback(res)
      }, duration - 500)
    }
  })
}
/**
 * @author: yilingsj（315800015@qq.com）
 * @description: 封装loading
 * @param {type}
 * @return {type}
 * @Date: 2020-09-05 21:52:02
 */
function showLoading (options) {
  let title = ''
  let callback = null
  if (options.constructor === Object) {
    title = options.title
    callback = options.callback
  }
  if (options.constructor === String) {
    title = options
  }
  console.log('全局showLoading=', options)
  uni.showLoading({
    title: title || '加载中...',
    mask: true,
    complete: res => {
      callback && callback(res)
    }
  })
}

/**
 * @author: yilingsj（315800015@qq.com）
 * @description: 将url中的参数转成对象
 * @param {*}
 * @return {*}
 * @Date: 2020-11-20 16:40:37
 */
function urlParams (scene) {
  const str = decodeURIComponent(scene).replace('?', '&')
  let strArr = str.split('&')
  strArr = strArr.filter(item => item)
  const result = {}
  strArr.filter(item => {
    const ele = item.split('=')
    result[ele[0]] = ele[1]
  })
  return result
}

module.exports = {
  leng: leng,
  toast: toast,
  showLoading: showLoading,
  urlParams: urlParams
}
