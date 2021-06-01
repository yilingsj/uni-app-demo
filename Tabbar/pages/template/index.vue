<template>
	<view class="content">
		<view class="title">页面跳转方式：</view>
		<u-radio-group v-model="value">
			<u-radio v-for="(item, index) in list" :key="index" :name="item.name">{{ item.name }}</u-radio>
		</u-radio-group>
		<div>当前是demo1，页面跳转时底部导航栏会随页面飘动或闪一下。</div>
		<navigator url="../tabdiy/index" class="u-m-20">
			<button type="primary">前往demo2</button>
		</navigator>
		<u-tabbar :list="tabbar" :mid-button="true" @change="change"></u-tabbar>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: '模板',
			tabbar: [],
			list: [
				{
					name: 'navigateTo'
				},
				{
					name: 'reLaunch'
				},
				{
					name: 'redirectTo'
				}
			],
			value: 'redirectTo'
		};
	},
	onLoad(e) {
		this.tabbar = [
			{
				iconPath: '/static/uview/example/component.png',
				selectedIconPath: '/static/uview/example/component_select.png',
				text: '组件',
				count: 2,
				isDot: true,
				pagePath: '/pages/index/index'
			},
			{
				iconPath: '/static/uview/example/js.png',
				selectedIconPath: '/static/uview/example/js_select.png',
				text: '工具',
				midButton: true,
				pagePath: '/pages/js/index'
			},
			{
				iconPath: '/static/uview/example/template.png',
				selectedIconPath: '/static/uview/example/template_select.png',
				text: '模板',
				pagePath: '/pages/template/index'
			}
		];
		const { type } = e;
		if (type) {
			this.value = type;
		}
		console.log('template页面 onLoad', e, Date.now());
	},
	onShow() {
		console.log('template页面 onShow', Date.now());
	},
	created() {
		console.log('template页面 created', Date.now());
	},
	onHide() {
		console.log('template页面 onHide', Date.now());
	},
	updated() {
		console.log('template页面 updated', Date.now());
	},
	mounted() {
		console.log('template页面 mounted', Date.now());
	}, // 生命周期-挂载完成(可以访问DOM元素)
	onReady() {
		console.log('template页面 onReady', Date.now());
	}, // 生命周期回调—监听页面初次渲染完成
	onUnload() {
		console.log('template页面 onUnload', Date.now());
	}, // 生命周期回调—监听页面卸载
	onPullDownRefresh: function() {
		// 触发下拉刷新时执行
		console.log('template页面 onPullDownRefresh', Date.now());
	},
	onReachBottom: function() {
		// 页面触底时执行
		console.log('template页面 onReachBottom', Date.now());
	},
	onShareAppMessage: function() {
		// 页面被用户分享时执行
		console.log('template页面 onShareAppMessage', Date.now());
	},
	onPageScroll: function() {
		// 页面滚动时执行
		console.log('template页面 onPageScroll', Date.now());
	},
	watch: {
		tabbar: {
			handler(val) {
				console.log('template页面 watch', Date.now());
			},
			deep: true,
			immediate: true
		}
	}, // 监控data中数据变化
	methods: {
		change(val) {
			console.log('index change==', val);
			wx[this.value]({ url: this.tabbar[val].pagePath + '?type=' + this.value });
		}
	}
};
</script>

<style>
.content {
	padding: 200rpx 30rpx;
}
.title {
	line-height: 1.5;
}
</style>
