<!--
 * @Description:
 * @Author: yilingsj（315800015@qq.com）
 * @Date: 2021-05-03 14:48:35
 * @LastEditors: yilingsj（315800015@qq.com）
 * @LastEditTime: 2021-05-03 18:19:05
-->
<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view>
      <text class="title">{{ title }}</text>
      已经 启动了哦
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello",
    }
  },
  onLoad() {},
  methods: {},
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
