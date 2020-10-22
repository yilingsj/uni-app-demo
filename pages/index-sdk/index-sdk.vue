<!--
 * @Description:
 * @Author: yilingsj（315800015@qq.com）
 * @Date: 2020-10-22 10:55:46
 * @LastEditors: yilingsj（315800015@qq.com）
 * @LastEditTime: 2020-10-22 22:12:38
-->
<template>
  <div class="content">
    <input type="text" v-model="title" class="input" placeholder="请输入分享的标题">
    <button @click="handleShare">点我分享</button>
    <a href="/weixin-sdk/hybrid/html/jssdk-share.html">前往html页面</a>
    <!-- 分享弹层 -->
    <div v-if="show" class="popupH5">
      <shareH5Popup @clickStop="handleClickStop"></shareH5Popup>
    </div>
    <h3 style="margin-top:200px"><a href="http://www.yilingsj.com/xwzj/2020-10-22/uni-app-weixin-jssdk.html">查看原文</a></h3>
  </div>
</template>

<script>
import { getJsSDK, goShare } from '@/common/getAPIData'
import shareH5Popup from '@/components/shareH5Popup/index'

export default {
  data () {
    return {
      title: '', // 分享的标题
      show: false, // 分享弹窗
    }
  },
  components: {
    shareH5Popup
  },
  onLoad () { },
  mounted () {
    /* #ifdef  H5 */
    const url = location.href.split('#')[0]
    const data = {
      url: url
    }
    getJsSDK({
      url: 'https://换成你的服务器地址/api/index/getJsSDK',
      data: data,
      callback: res => {
        console.log('res=', res)
      }
    })
    /* #endif */
  },
  methods: {
    /**
     * @author: yilingsj（315800015@qq.com）
     * @description: 点击分享
     * @param {*}
     * @return {*}
     * @Date: 2020-10-22 11:54:49
     */
    handleShare () {
      /* #ifdef  H5 */
      const url = location.href.split('#')[0]
      let data = {
        url: url,
        title: this.title || '分享标题',
        describe: '分享描述',
        imgUrl: 'http://images.fengshengshuqi.com/avatar/noavatar.jpg',
      }
      goShare({
        data: data,
        callback: () => {
          this.show = true
        },
      })
      /* #endif */
    },
    /**
     * @author: yilingsj（315800015@qq.com）
     * @description: 监听点击
     * @param {*} options
     * @return {*}
     * @Date: 2020-10-22 11:54:44
     */
    handleClickStop (options) {
      const { type } = options
      switch (type) {
        case 'popupHide': // 弹窗关闭
          this.show = false
          break;
      }
    },
  }
}
</script>

<style lang="stylus" scoped>
.content
  padding 30rpx
.input
  min-height 80rpx
  border 1px solid #ccc
  border-radius 10rpx
  padding 10rpx
  box-sizing border-box
button
  margin 20rpx auto
  cursor pointer
.popupH5
  position fixed
  left 0
  top 0
  right 0
  bottom 0
  background-color rgba(0, 0, 0, .7)
  z-index 999
  cursor pointer
</style>
