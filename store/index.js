/*
 * @Description:
 * @Author: yilingsj（315800015@qq.com）
 * @Date: 2020-06-28 15:47:04
 * @LastEditors: yilingsj（315800015@qq.com）
 * @LastEditTime: 2020-10-04 10:59:04
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    nowLocation: {
      city: '',
      address: '',
    }, // 全局位置
  },
  mutations: {
    // 修改全局定位
    setNowLocation (state, value) {
      console.log('修改了全局位置', value)
      state.nowLocation = value
      uni.setStorageSync('nowLocation', value)
    },
  },
  getters: {},
  actions: {}
})

export default store
