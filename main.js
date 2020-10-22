/*
 * @Description:
 * @Author: yilingsj（315800015@qq.com）
 * @Date: 2020-06-28 13:45:19
 * @LastEditors: yilingsj（315800015@qq.com）
 * @LastEditTime: 2020-10-22 14:16:35
 */
import Vue from 'vue'
import App from './App'
/* #ifdef H5 */
import { browser } from '@/common/ua.js'
import wx from 'weixin-js-sdk'
import VConsole from 'vconsole'
Vue.prototype.$wx = wx
Vue.prototype.$browser = browser
var vConsole = new VConsole()
/* #endif */

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
