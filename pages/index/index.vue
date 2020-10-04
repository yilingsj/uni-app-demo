<!--
 * @Description: 首页
 * @Author: yilingsj（315800015@qq.com）
 * @Date: 2020-10-04 10:46:10
 * @LastEditors: yilingsj（315800015@qq.com）
 * @LastEditTime: 2020-10-04 20:59:52
-->
<template>
  <div class="page">
    <div class="cell">此demo作用：提供一个可直接用于项目中的地图定位功能，包括权限验证、重新拉起授权等。</div>
    <button type="primary" @tap="authVerification">请选择位置</button>
    <template v-if="currentLocation.address">
      <div>name：{{currentLocation.name}}</div>
      <div>address：{{currentLocation.address}}</div>
      <div>latitude：{{currentLocation.latitude}}</div>
      <div>longitude：{{currentLocation.longitude}}</div>
    </template>
    <div>原文地址：<textarea name="" id="" cols="30" rows="10">http://www.yilingsj.com/xwzj/2020-10-04/uni-app-wx-chooseLocation.html</textarea></div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      currentLocation: {}, // 当前定位信息
    }
  },
  onLoad () { },
  onShow () {
    uni.getStorage({
      key: 'currentLocation',
      success: (res) => {
        console.log('index=', res);
        this.currentLocation = res.data
      }
    })
  },
  methods: {
    /**
     * @author: yilingsj（315800015@qq.com）
     * @description: 验证用户授权情况
     * @param {type}
     * @return {type}
     * @Date: 2020-09-15 10:18:19
     */
    authVerification () {
      uni.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userLocation']) { /* 用户授权成功时走这里 */
            this.handerChooseLocation()
          } else if (res.authSetting['scope.userLocation'] === undefined) { /* 用户未授权时走这里 */
            console.log('没有授权')
            this.handleOpenSetting()
          } else { /* 用户拒绝了授权后走这里 */
            console.log('拒绝了授权 false')
            this.handleOpenSetting()
          }
        },
      })
    },
    /**
     * @author: yilingsj（315800015@qq.com）
     * @description: 唤醒地图
     * @param {type}
     * @return {type}
     * @Date: 2020-09-27 17:53:31
     */
    handerChooseLocation (latitude, longitude) {
      uni.chooseLocation({
        latitude: latitude || '',
        longitude: longitude || '', // 经度 -180~180
        success: (res) => {
          console.log('wx.chooseLocation res=', res)
          uni.setStorageSync('currentLocation', res)
        },
        fail: function (err) {
          console.log('取消按钮', err)
        }
      })
    },
    /**
     * @author: yilingsj（315800015@qq.com）
     * @description: 引导用户开启权限
     * @param {type}
     * @return {type}
     * @Date: 2020-10-04 11:07:51
     */
    handleOpenSetting () {
      wx.openSetting({
        success: (res) => {
          console.log('定位 openSetting', res)
          if (res.authSetting["scope.userLocation"]) {
            this.handerChooseLocation()
          }
        }
      })
    },
  }
}
</script>

<style lang="stylus" scoped>
.page
  padding 50rpx 30rpx
  box-sizing border-box
.cell
  padding 20rpx
  border-bottom 1px solid rgba(0, 0, 0, .3)
  margin-bottom 20rpx
</style>
