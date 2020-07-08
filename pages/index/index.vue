<template>
	<view>
		<home v-if="show_index==0" ref="home"></home>
		<mine v-if="show_index==4" ref="mine"></mine>
		<cp v-if="show_index==2" ref="cp"></cp>
		<first-class v-if="show_index==1" ref="cl"></first-class>
		<cart v-if="show_index==3" ref="cart"></cart>
		<!-- 底部导航区域 -->
		<!-- is_lhp判断是否为刘海屏在main.js里 -->
		<view class="tabBar" :style="{height:is_lhp?'140rpx':'98rpx'}">
			<!-- 导航的中间圆圈 -->
			<block v-for="(v,k) in tab_nav_list" :key="k">
				<view class="border_box" :style="{paddingBottom:is_lhp?'40rpx':''}">
					<view class="border_box_con" v-for="(v,k) in 5" :key='k'>
						<view class="tabBar_miden_border" v-if="show_index ==k"></view>
					</view>
				</view>
				<view class="tabBar_list" :style="{paddingBottom:is_lhp?'40rpx':''}">
					<view class="tabBar_item" :class="{'tabBar_item2':show_index ==k}" @tap="cut_index(k)">
						<image v-if="show_index ==k" :src="v.aimg"></image>
						<image v-else :src="v.dimg"></image>
						<view :class="{'tabBar_name':true,'nav_active':show_index == k}">{{v.name}}</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import home from '@/components/tabBar/home.vue'
	import mine from '@/components/tabBar/mine.vue'
	import firstClass from "@/components/tabBar/class.vue"
	import cp from "@/components/tabBar/cp.vue"
	import cart from "@/components/tabBar/cart.vue"
	/*
	home     0首页
	mine      4 我的
	firstClass    1分类
	cart        3购物车
	cp         2菜谱
	*/
	export default {
		components: {
			home,
			mine,
			firstClass,
			cp,
			cart
		},
		data() {
			return {
				scollTop: 0,
				show_index: 0, //控制显示那个组件
				tab_nav_list: [{
					'name': '首页',
					'dimg': '/static/tabBar/homed@2x.png',
					'aimg': '/static/tabBar/home@2x.png'
				}, {
					'name': '分类',
					'dimg': '/static/tabBar/cd@2x.png',
					'aimg': '/static/tabBar/c@2x.png'
				}, {
					'name': '菜谱',
					'dimg': '/static/tabBar/cpd@2x.png',
					'aimg': '/static/tabBar/cp@2x.png'
				}, {
					'name': '购物车',
					'dimg': '/static/tabBar/cartd@2x.png',
					'aimg': '/static/tabBar/cart.png'
				}, {
					'name': '我的',
					'dimg': '/static/tabBar/md@2x.png',
					'aimg': '/static/tabBar/m@2x.png'
				}], //菜单列表
				is_lhp: false
			}
		},
		onLoad(options) {
			console.log('onload')
			if (options.scene) {
				getApp().globalData.pid = decodeURIComponent(options.scene);
				// this.$api.tip(getApp().globalData.pid)
			}
			this.is_lhp = this.$is_bang;
			this.cut_index(0)
		},
		onShow() {
			console.log('onshow')
			if (uni.getStorageSync('uid')) {
				getApp().globalData.uid = uni.getStorageSync('uid');
			}
			if (this.show_index == 0) {
				if (uni.getStorageSync('address')) {
					this.$nextTick(() => {
						this.$refs.home.set(uni.getStorageSync('address'));
						if (getApp().globalData.uid != ''){
							this.$refs.home.getPerson();
						}
					});
				}
			} else if (this.show_index == 4) {
				this.$nextTick(() => {
					this.$refs.mine.initData()
				});
			}

		},
		onShareAppMessage() {
			return {
				path: `/pages/index/index?scene=${getApp().globalData.uid}`,
			}
		},
		onPageScroll(e) {
			this.scollTop = e.scollTop;
		},
		//   各组件 数据加载更多
		onReachBottom() {
			console.log('more')
			let num = this.show_index;
			switch (num) {
				case 0:
					this.$refs.home.loadMore();
					break;
				case 1:
					this.$refs.cl.loadMore();
					console.log('加载')
					break;
				case 3:
					this.$refs.cart.loadMore();
					break;
				case 4:
					this.$refs.mine.loadMore();
					break;
			}
		},
		methods: {
			cut_index(type) {
				//   切换显示 当前的 组件
				this.show_index = type;
				//   当前页面  回到原来位置 scrollTop===0
				if (this.scollTop != 0) {
					uni.pageScrollTo({
						duration: 20,
						scrollTop: 0
					})
				}
				switch (type) {
					case 0:
						this.$nextTick(() => {
							this.$refs.home.initData()
						});
						break;
					case 1:
						this.$nextTick(() => {
							this.$refs.cl.initData()
						});
						break;
					case 2:
						this.$nextTick(() => {
							this.$refs.cp.initData()
						});
						break;
					case 3:
						this.$nextTick(() => {
							this.$refs.cart.initData()
						});
						break;
					case 4:
						this.$nextTick(() => {
							this.$refs.mine.initData()
						});
						break;
				}
			}
		}
	}
</script>

<style lang="scss">
	.tabBar {
		width: 100%;
		height: 98rpx;
		background: #fff;
		border-top: 1px solid #E5E5E5;
		position: fixed;
		bottom: 0px;
		left: 0px;
		right: 0px;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;

		.tabBar_list {
			width: 100%;
			display: flex;

			image {
				width: 60rpx;
				height: 60rpx;
			}

			.tabBar_item {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				font-size: 24upx;
				color: #969BA3;

				.tabBar_name {
					font-size: 24upx;
				}
			}

			.tabBar_item2 {
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				color: #969BA3;
				margin-top: -20rpx;
				position: relative;
				z-index: 101;

				image {
					width: 68rpx;
					height: 68rpx;
				}
			}
		}
	}

	.border_box {
		// pointer-events: none; 事件穿透解决z-index层级问题
		width: 100%;
		height: 100rpx;
		display: flex;
		position: fixed;
		left: 0px;
		bottom: 48rpx;
		z-index: 100;
		pointer-events: none;

		.border_box_con {
			width: 20%;
			height: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			.tabBar_miden_border {
				width: 80rpx;
				height: 48rpx;
				border-top: 2rpx solid #E5E5E5;
				border-radius: 48rpx 48rpx 0 0;
				/* 左上、右上、右下、左下 */
				background: #fff;
			}
		}


	}

	.nav_active {
		color: #72BD53;
		font-size: 24upx;
	}
</style>
