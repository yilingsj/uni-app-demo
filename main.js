/*
 * @Description:
 * @Author: yilingsj（315800015@qq.com）
 * @Date: 2020-10-02 11:11:05
 * @LastEditors: yilingsj（315800015@qq.com）
 * @LastEditTime: 2020-10-02 12:44:43
 */
import Vue from 'vue'
import App from './App'

import '@/common/stylus/common.styl'
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
