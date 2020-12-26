<!--
 * @Description:
 * @Author: yilingsj（315800015@qq.com）
 * @Date: 2020-12-26 21:47:01
 * @LastEditors: yilingsj（315800015@qq.com）
 * @LastEditTime: 2020-12-26 22:30:21
-->
<template>
  <div>
    小程序码中携带的参数为：
    <div v-for="(item, index) in sceneObj" :key="index">
      {{index}}:{{item}}
    </div>
  </div>
</template>

<script>
import { urlParams, } from '@/common/util'
export default {
  name: 'login',
  data () {
    return {
      scene: '', // 携带参数
      invite: '', // 邀请码
      sceneObj: {}, // 携带参数的对象
    }
  },
  onLoad (options) {
    if (this.$leng(options)) {
      const { invite, referer, scene, channel_id, } = options
      if (scene) { // 扫码进来
        const sceneObj = urlParams(scene)
        this.sceneObj = sceneObj
        if (sceneObj.invite) {
          this.invite = sceneObj.invite
        }
        console.log('登录页 onload=', decodeURIComponent(scene), ';sceneObj=', sceneObj)
      }
      // 正常情况，包括H5端、APP端
      if (invite) {
        this.invite = invite
      }
      // 干点其他事情
    }
  },
}
</script>

<style lang="stylus" scoped>
</style>
