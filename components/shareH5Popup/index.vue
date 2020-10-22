<!--
 * @Description: 顶部左侧当前位置
 * @Author: yilingsj（315800015@qq.com）
 * @Date: 2020-06-28 14:50:15
 * @LastEditors: yilingsj（315800015@qq.com）
 * @LastEditTime: 2020-10-22 11:53:14
-->
<template>
  <div class="shareH5_popup" @click.stop="handleClickStop({type: 'popupHide'})">
    <div class="shareH5_menu flex" v-if="!show">
      <div class="column-2" @click.stop="handleClickStop({type: 'weixin'})">
        <img class="icon" :src="weixin">
        分享给朋友
      </div>
      <div class="column-2" @click.stop="handleClickStop({type: 'pengyouquan'})">
        <img class="icon" :src="pengyouquan">
        分享到朋友圈
      </div>
    </div>
    <img :src="share" v-if="show" alt="" class="icon-share">
  </div>
</template>

<script>
export default {
  name: 'shareH5Popup',
  computed: {},
  data () {
    return {
      show: false,
      weixin: require('@/static/icon-weixin.png'),
      pengyouquan: require('@/static/icon-pengyouquan.png'),
      share: require('@/static/icon-share.png'),
    }
  },
  watch: {},
  mounted () { },
  onShow () {
    console.log('分享 onShow', Date.now())
  },
  onLoad () {
    console.log('分享 onLoad', Date.now())
  },
  methods: {
    /**
    * @author: yilingsj（315800015@qq.com）
    * @description: 点击事件
    * @param {type}
    * @return:
    * @Date: 2020-07-17 14:56:54
    */
    handleClickStop (options) {
      const { type } = options
      switch (type) {
        case 'weixin':
        case 'pengyouquan':
          this.show = true
          break;
      }
      this.$emit('clickStop', options)
    },
  },
}
</script>

<style lang="stylus" scoped>
.shareH5
  &_popup
    position absolute
    left 0
    right 0
    bottom 0
    top 0
  &_menu
    position absolute
    left 0
    right 0
    bottom 0
    background #fff
    padding 20rpx
    font-size 28rpx
    font-family PingFang SC
    font-weight 400
    color #333
    line-height 1.5
    text-align center
    img
      display block
      margin 0 auto 20rpx
      width 50px
      height 50px
.icon-share
  position fixed
  right 0
  top 0
  cursor pointer
.flex
  display flex
  flex-wrap nowrap
.column-2
  width 50%
  cursor pointer
</style>
