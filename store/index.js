/*
 * @Description:
 * @Author: yilingsj（315800015@qq.com）
 * @Date: 2020-06-28 15:47:04
 * @LastEditors: yilingsj（315800015@qq.com）
 * @LastEditTime: 2020-09-30 23:24:07
 */
import Vue from 'vue'
import Vuex from 'vuex'
import { updateTabBarBadge } from '@/common/util'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    systemInfos: {}, // 系统信息
    backUrl: '', // 返回页面的路由
    navigateBackInfo: {}, // 由于页面栈限制，此处使用back进行跳转 20200905
    nowLocation: {
      city: '杭州',
      address: '萧山商会大厦',
    }, // 全局位置
    storageAddress: [], // 地址
    storageCartTotalNum: 0, // 购物车数量
    wxUserInfo: {}, // 微信用户信息
    storageUserInfoDatas: {}, // 用户信息
    isWxLogin: false, // 微信登录
    host: 'https://api.fengshengshuqi.com/api/', // host
    imgDefault: 'http://images.fengshengshuqi.com/adv/5eb3c900ef3121588840704.jpg',
    addressLists: [], // 地址列表storageAddress
    hasLogin: false, // 是否登录
    loginProvider: "",
    openid: null,
    color: {
      primary: '',
      price: '#FB5746',
    }
  },
  mutations: {
    login (state) {
      state.hasLogin = true
      uni.setStorageSync('hasLogin', true)
    },
    logout (state) {
      state.hasLogin = false
      state.openid = null
      state.isWxLogin = false
      state.wxUserInfo = {}
      uni.setStorageSync('hasLogin', false)
      uni.setStorageSync('isWxLogin', false)
      uni.setStorageSync('wxUserInfo', {})
    },
    setBackUrl (state, value) {
      state.backUrl = value
      uni.setStorageSync('backUrl', value)
    },
    setStorageCartTotalNum (state, value) {
      state.storageCartTotalNum = value
      uni.setStorageSync('storageCartTotalNum', value)
      updateTabBarBadge(value)
    },
    setNavigateBackInfo (state, value) {
      state.navigateBackInfo = value
      uni.setStorageSync('navigateBackInfo', value)
      console.log('state.navigateBackInfo=', value)
    },
    setToken (state, value) {
      state.token = value
      uni.setStorageSync('token', value)
    },
    setSystemInfos (state, value) {
      state.systemInfos = value || {}
    }, // 设置系统信息
    setIsWxLogin (state, value) { // 微信授权
      console.log('微信授权 vuex', value)
      state.isWxLogin = value
      uni.setStorageSync('isWxLogin', value)
    },
    setStorageUserInfoDatas (state, value) { // 用户信息
      state.storageUserInfoDatas = value
      uni.setStorageSync('storageUserInfoDatas', value)
      console.log('更新用户信息', value)
    },
    setWxUserInfo (state, value) { // 用户信息
      state.wxUserInfo = value
      uni.setStorageSync('wxUserInfo', value)
      console.log('微信 用户信息', value)
    },
    setStorageAddress (state, value) { // 存储地址
      console.log('storageAddress vuex', value)
      state.storageAddress = value
      uni.setStorageSync('storageAddress', value)
    },
    setStorageCurrentAddressId (state, value) {
      state.storageCurrentAddressId = value
    }

  },
  getters: {
    currentColor (state) {
      return state.colorList[state.colorIndex]
    }
  },
  actions: {
    // lazy loading openid
    getUserOpenId: async function ({
      commit,
      state
    }) {
      return await new Promise((resolve, reject) => {
        if (state.openid) {
          resolve(state.openid)
        } else {
          uni.login({
            success: (data) => {
              commit('login')
              setTimeout(function () { //模拟异步请求服务器获取 openid
                const openid = '123456789'
                console.log('uni.request mock openid[' + openid + ']');
                commit('setOpenid', openid)
                resolve(openid)
              }, 1000)
            },
            fail: (err) => {
              console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
              reject(err)
            }
          })
        }
      })
    }
  }
})

export default store
