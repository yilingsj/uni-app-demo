/*
 * @Description: 公共方法
 * @Author: yilingsj（315800015@qq.com）
 * @Date: 2020-10-02 12:13:57
 * @LastEditors: yilingsj（315800015@qq.com）
 * @LastEditTime: 2020-10-02 13:18:32
 */
/**
 * @author: yilingsj（315800015@qq.com）
 * @description: 拦截超链接跳转，解决页面栈10层限制
 * @param {String} url 要跳转的链接，可带参数
 * @param {Function} callback 回调方法，做些特殊的事情
 * @return {void}
 * @Date: 2020-10-02 12:15:24
 */
function linkJump ({ url, callback }) {
  if (!url) { return }
  let newUrl = url
  if (url[0] === '/') { /* 过滤首位的/ */
    newUrl = url.substring(1)
  }
  const pathname = newUrl.split('?')[0]
  const tabBarUrl = ['pages/index/index', 'pages/find/index', 'pages/user/index', 'pages/cart/index'] /* Tab页中的路径，请根据自己项目实际情况进行修改 */
  const page = getCurrentPages()
  const index = page.findIndex(item => item.route === pathname)
  /* 如果是Tab中的链接，直接跳转 */
  if (tabBarUrl.includes(pathname)) {
    uni.switchTab({
      url: pathname,
      success: () => {
        callback && callback()
      }
    })
    return
  }
  if (index !== -1) { /* 在页面栈中找到时 */
    const step = page.length - 1 - index
    if (step === 0) {
      uni.redirectTo({
        url: url,
        success: () => {
          callback && callback()
        }
      })
    } else {
      uni.navigateBack({ delta: step })
      callback && callback()
    }
    return
  }
  /* 否则就直接跳转 */
  uni.navigateTo({
    url: url,
    success: () => {
      callback && callback()
    }
  })
}

module.exports = {
  linkJump: linkJump
}
