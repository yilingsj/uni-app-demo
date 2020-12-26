<template>
  <div class="page">
    <button type="primary" @click.stop="handleClickStop({type: 'qrcode'})">后端-生成二维码</button>
    <div class="qrcode-wrap" v-if="qrcode">
      <div class="qrcode__inner" @click.stop="handleClickStop({type: 'updateQrcode'})">
        <img :src="qrcode" alt="" show-menu-by-longpress class="qrcode">
      </div>
      <div class="uPopup__text">{{canIUse ? '长按图片即可保存' : '当前微信版本过低，暂时无法长按保存图片'}}</div>
    </div>
    <div>说明：请先修改data中的url地址为您自己的后端地址，否则无法生成小程序码。</div>
    <div>
      更多骚操作请访问原文：
      <textarea name="">http://www.yilingsj.com/xwzj/2020-12-26/uni-app-wxacode-getUnlimited.html</textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: 'wxQrcode',
  data () {
    return {
      qrcode: '', // 二维码
      scene: '', // 携带参数
      invite: '', // 邀请码
      canIUse: true, // 判断API是否可用
      url: '', // 后端生成小程序码的API地址
    }
  },
  mounted () {
    this.canIUse = wx.canIUse('image.show-menu-by-longpress')
  },
  methods: {
    /**
     * @author: yilingsj（315800015@qq.com）
     * @description: 点击事件
     * @param {type}
     * @return:
     * @Date: 2020-07-31 21:01:14
     */
    handleClickStop (options) {
      const { type } = options
      switch (type) {
        case 'qrcode':
          this.$showLoading('生成中...')
          this.handleUpdateQrcode()
          break;
        case 'updateQrcode': // 手动生成二维码
          this.$showLoading('生成中...')
          this.handleUpdateQrcode()
          break;
      }
    },
    /**
     * @author: yilingsj（315800015@qq.com）
     * @description: 刷新二维码
     * @param {*}
     * @return {*}
     * @Date: 2020-11-20 17:36:10
     */
    handleUpdateQrcode () {
      this.handleGetInviteKey(() => {
        this.handleGetXcxQrcode()
      })
    },
    /**
     * @author: yilingsj（315800015@qq.com）
     * @description: 获取邀请码参数
     * @param {type}
     * @return {type}
     * @Date: 2020-08-06 09:26:54
     */
    handleGetInviteKey (callback) {
      const invite = Math.floor(Math.random() * 100000)
      this.scene = '?invite=' + invite
      callback && callback()
    },
    /**
     * @author: yilingsj（315800015@qq.com）
     * @description: 生成小程序码
     * @param {type}
     * @return {type}
     * @Date: 2020-08-06 13:31:50
     */
    handleGetXcxQrcode () {
      const data = {
        scene: this.scene,
        page: 'pages/user/login'
      }
      if (!this.url) {
        this.$toast('请先更换data中的url地址')
        return
      }
      // 未封装前的普通写法
      uni.request({
        url: this.url,
        data: data,
        responseType: 'arraybuffer', /* 必须 */
        success: (result) => {
          const res = result.data
          uni.hideLoading()
          if (res.errcode === 41030) {
            setTimeout(() => {
              this.$toast('请先发布小程序')
            }, 0)
          } else if (res.errcode === 45009) {
            setTimeout(() => {
              this.$toast('调用频繁')
            }, 0)
          } else {
            const url = 'data:image/png;base64,' + uni.arrayBufferToBase64(res)
            if (uni.arrayBufferToBase64(res)) {
              this.qrcode = url
            }
          }
        }
      })
    },
  }
}
</script>

<style lang="stylus" scoped>
.page
  padding 20rpx
// 二维码
.qrcode
  width 100%
  height 100%
  position relative
  z-index 5
  &-wrap
    text-align center
  &__inner
    width 316rpx
    height 316rpx
    margin 40rpx auto
    overflow hidden
    background #ccc
    position relative
    &::after
      content '点击刷新'
      position absolute
      width 100%
      height 100%
      left 0
      top 40%
      text-align center
      color #666
      font-size 32rpx
  &__text
    font-size 32rpx
    font-family PingFang SC
    font-weight bold
    color #333
    padding 20rpx
    text-align center
.textarea
  width 100%
</style>
