## uni-app跨端开发之生成小程序码和调试scene参数爬坑指南
分支：dev-pagestack-20201002

### 动态gif
[gif演示](https://img.alicdn.com/imgextra/i2/759415648/O1CN017eD5Ut1rapco7tKYm_!!759415648.gif)
### 总结：
1、必须由后端提供小程序码，前端虽也能直接生成，但线上版本无法生成；
2、在请求中需要添加responseType: 'arraybuffer',参数；
3、在请求成功后前端无法直接显示图片，需要使用uni.arrayBufferToBase64(res)将 ArrayBuffer 对象转成 Base64 字符串；
4、通过微信开发者工具中提供的二维码编译和编译模式，我们可以在本地构造和解析小程序码，无需频繁发版。

### 原文地址：
[访问原文](http://www.yilingsj.com/xwzj/2020-12-26/uni-app-wxacode-getUnlimited.html)