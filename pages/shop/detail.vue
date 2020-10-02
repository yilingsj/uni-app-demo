<!--
 * @Description:
 * @Author: yilingsj（315800015@qq.com）
 * @Date: 2020-10-02 11:39:37
 * @LastEditors: yilingsj（315800015@qq.com）
 * @LastEditTime: 2020-10-02 13:09:24
-->
<template>
  <view class="content">
    <view class="cell">当前商品id为 {{id}}</view>
    <view class="cell red">当前页面栈数量为：{{leng}}</view>
    <button type="primary" @tap="handleTap">navigateTo 跳转到其他商品，每次页面栈+1
      <view class=" red" v-if="leng === 10">页面栈已达上限，无法再使用navigateTo 进行跳转页面了，不信你点我会没有反应</view>
    </button>
    <button @tap="handleRedirectTo">redirectTo 跳转到其他商品，页面栈数量不变</button>
    <navigator open-type="navigateBack">
      <button>navigateBack 返回到上一页，页面栈-1</button>
    </navigator>
    <navigator url="/pages/index/index" open-type="switchTab">
      <button>switchTab 回到首页</button>
    </navigator>
    <navigator url="/pages/shop/list">
      <button>navigateTo 的方式跳转到列表页，页面栈+1</button>
    </navigator>
    <button type="primary" @tap="handleLinkJump">linkJump的方式跳转到商品列表页</button>
  </view>
</template>

<script>
import { linkJump } from '@/common/util'

export default {
  name: 'detail',
  data () {
    return {
      id: '', // 商品id
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
  methods: {
    /**
     * @author: yilingsj（315800015@qq.com）
     * @description: 点击事件
     * @param {type}
     * @return {type}
     * @Date: 2020-10-02 11:52:35
     */
    handleTap () {
      uni.navigateTo({
        url: '/pages/shop/detail?id=' + Date.now()
      });
    },
    /**
     * @author: yilingsj（315800015@qq.com）
     * @description: 重定向
     * @param {type}
     * @return {type}
     * @Date: 2020-10-02 12:04:46
     */
    handleRedirectTo () {
      uni.redirectTo({
        url: '/pages/shop/detail?id=' + Date.now()
      });
    },
    handleLinkJump () {
      const id = Date.now()
      linkJump({
        url: '/pages/shop/list?id=' + id,
        callback: () => {
          uni.setStorageSync('info', '详情页可以设置一些参数，比如商品id=' + id)
        }
      });
    }

  }
}
</script>

<style lang="stylus" scoped>
</style>
