<template>
	<view class="content">
		<div>当前是demo2，tab的形式切换页面，底部导航栏无闪动。但相关页面的生命周期函数只会执行部分，在使用时需要注意！</div>
		<navigator url="../index/index" class="u-m-20">
			<button type="warn">前往demo1</button>
		</navigator>
		<div v-if="current === 0"><indexTem id="indexTem"></indexTem></div>
		<div v-if="current === 1"><jsTem id="jsTem"></jsTem></div>
		<div v-if="current === 2"><templateTem id="templateTem"></templateTem></div>
		<u-tabbar :list="tabbar" :current="current" :mid-button="true" @change="change"></u-tabbar>
	</view>
</template>

<script>
import indexTem from '../index/index';
import jsTem from '../js/index';
import templateTem from '../template/index';

export default {
	data() {
		return {
			title: '模板',
			tabbar: [],
			current: 0
		};
	},
	components: { indexTem, jsTem, templateTem },
	onLoad() {
		this.tabbar = [
			{
				iconPath: '/static/uview/example/component.png',
				selectedIconPath: '/static/uview/example/component_select.png',
				text: '组件',
				count: 2,
				isDot: true,
				pagePath: '/pages/index/index',
				name: 'indexTem'
			},
			{
				iconPath: '/static/uview/example/js.png',
				selectedIconPath: '/static/uview/example/js_select.png',
				text: '工具',
				midButton: true,
				pagePath: '/pages/js/index',
				name: 'jsTem'
			},
			{
				iconPath: '/static/uview/example/template.png',
				selectedIconPath: '/static/uview/example/template_select.png',
				text: '模板',
				pagePath: '/pages/template/index',
				name: 'templateTem'
			}
		];
		console.log('tab切换页面 onLoad', Date.now());
	},
	onShow() {
		console.log('tab页面 onShow', Date.now());
	},
	created() {
		console.log('tab页面 created', Date.now());
	},
	onHide() {
		console.log('tab页面 onHide', Date.now());
	},
	updated() {
		console.log('tab页面 updated', Date.now());
	},
	mounted() {
		console.log('tab页面 mounted', Date.now());
	}, // 生命周期-挂载完成(可以访问DOM元素)
	onReady() {
		console.log('tab页面 onReady', Date.now());
	}, // 生命周期回调—监听页面初次渲染完成
	onUnload() {
		console.log('tab页面 onUnload', Date.now());
	}, // 生命周期回调—监听页面卸载
	onPullDownRefresh: function() {
		// 触发下拉刷新时执行
		console.log('tab页面 onPullDownRefresh', Date.now());
		this.componentName = this.tabbar[this.current].name;
		this.$nextTick(() => {
			const selectComponentName = this.selectComponent('#' + this.componentName);
			if (selectComponentName) {
				selectComponentName.onPullDownRefresh && selectComponentName.onPullDownRefresh();
			}
		});
	},
	onReachBottom: function() {
		// 页面触底时执行
		console.log('tab页面 onReachBottom', Date.now());
	},
	onShareAppMessage: function() {
		// 页面被用户分享时执行
		console.log('tab页面 onShareAppMessage', Date.now());
	},
	onPageScroll: function() {
		// 页面滚动时执行
		console.log('tab页面 onPageScroll', Date.now());
	},
	methods: {
		change(val) {
			this.current = val;
		}
	}
};
</script>

<style>

.title {
	line-height: 1.5;
}
</style>
