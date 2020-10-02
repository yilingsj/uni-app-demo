<!--
 * @Description: 首页
 * @Author: yilingsj（315800015@qq.com）
 * @Date: 2020-10-02 11:11:05
 * @LastEditors: yilingsj（315800015@qq.com）
 * @LastEditTime: 2020-10-02 14:42:53
-->
<template>
  <view class="content">
    <view class="cell">此demo作用：1是为了复现页面栈超10层无法点击；2是提供linkJump 这个方法解决问题。</view>
    <view class="cell red">当前页面栈数量为：{{leng}}</view>
    <navigator url="/pages/shop/detail?id=1" hover-class="className">
      <button>前往商品详情页</button>
    </navigator>
    <view>
      原文地址：<textarea name="" id="" cols="30" rows="10">http://www.yilingsj.com/xwzj/2020-10-01/uni-app-mistakes-made.html</textarea>
    </view>
  </view>
</template>

<script>
export default {
  computed: {
    leng () { // 页面栈长度
      return getCurrentPages().length
    }
  },
  onLoad () {

  },
  methods: {

  }
}
</script>

<style lang="stylus" scoped>
</style>
