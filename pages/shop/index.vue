<!--
 * @Description:
 * @Author: yilingsj（315800015@qq.com）
 * @Date: 2020-10-02 11:35:38
 * @LastEditors: yilingsj（315800015@qq.com）
 * @LastEditTime: 2020-10-02 12:54:39
-->
<template>
  <view class="content">
    <view class="cell red">当前页面栈数量为：{{leng}}</view>
    <navigator url="/pages/shop/list?id=10" hover-class="className">
      <button>前往商品列表页</button>
    </navigator>
  </view>
</template>

<script>
export default {
  data () {
    return {
      title: 'Hello'
    }
  },
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
