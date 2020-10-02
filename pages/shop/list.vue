<!--
 * @Description: 列表页
 * @Author: yilingsj（315800015@qq.com）
 * @Date: 2020-10-02 11:39:37
 * @LastEditors: yilingsj（315800015@qq.com）
 * @LastEditTime: 2020-10-02 13:12:16
-->
<template>
  <view class="content">
    <view class="cell">当前商品id为 {{id}}</view>
    <view class="cell red">当前页面栈数量为：{{leng}}</view>
    <navigator url="/pages/shop/detail?id=123">
      <button>navigateTo 的方式跳到商品详情页，页面栈+1</button>
    </navigator>
    <button type="primary" @tap="handleLinkJump">linkJump的方式跳转到商品页</button>
    <view class="cell" v-if="info">当前页面接收到的信息为：
      <view class="red">{{info}}</view>
    </view>
  </view>
</template>

<script>
import { linkJump } from '@/common/util'

export default {
  name: 'detail',
  data () {
    return {
      id: '', // 商品id
      info: '', // 接收的参数
    }
  },
  computed: {
    leng () { // 页面栈长度
      return getCurrentPages().length
    }
  },
  onLoad (options) {
    if (Object.keys(options)) {
      const { id } = options
      this.id = id
    }
  },
  onShow () {
    /* 此处也可以借助vuex来实现全局监听 */
    uni.getStorage({
      key: 'info',
      success: (res) => {
        this.info = res.data
        setTimeout(() => {
          uni.removeStorage({
            key: 'info',
          })
        }, 200)
      }
    });
  },
  methods: {
    /**
     * @author: yilingsj（315800015@qq.com）
     * @description: 拦截跳转
     * @param {type}
     * @return {type}
     * @Date: 2020-10-02 12:53:11
     */
    handleLinkJump () {
      linkJump({
        url: '/pages/shop/detail?id=' + Date.now(),
      });
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
