/*
 * @Description:
 * @Author: yilingsj（315800015@qq.com）
 * @Date: 2020-12-26 21:24:11
 * @LastEditors: yilingsj（315800015@qq.com）
 * @LastEditTime: 2020-12-26 22:09:43
 */
import Vue from 'vue'
import App from './App'
import { leng, toast, showLoading } from '@/common/util'

Vue.config.productionTip = false
Vue.prototype.$leng = leng
Vue.prototype.$toast = toast
Vue.prototype.$showLoading = showLoading

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
