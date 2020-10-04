/*
 * @Description: 引入ui及调用一些公用方法
 * @Author: yilingsj（315800015@qq.com）
 * @Date: 2020-09-08 20:11:53
 * @LastEditors: yilingsj（315800015@qq.com）
 * @LastEditTime: 2020-10-04 21:00:41
 */
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
