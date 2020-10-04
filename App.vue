<!--
 * @Description: 入口页面
 * @Author: yilingsj（315800015@qq.com）
 * @Date: 2020-10-04 10:46:10
 * @LastEditors: yilingsj（315800015@qq.com）
 * @LastEditTime: 2020-10-04 17:38:51
-->
<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
    // 用户进入小程序便拉起位置授权的两种方法
    /* 法一 */
    wx.authorize({
      scope: 'scope.userLocation',
      success: function () {
        console.log('用户同意了授权')
      }
    })
    /* 法二 */
    // uni.getLocation({
    //   success: (res) => {
    //     uni.setStorageSync('currentLocation', res)
    //   },
    //   fail: (res) => {
    //     console.log('拒绝了授权：', res);
    //   },
    // })
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style>
/*每个页面公共css */
</style>
