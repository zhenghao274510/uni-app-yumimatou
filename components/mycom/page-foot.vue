<template>
		<!-- 底部导航区域 -->
		<!-- is_lhp判断是否为刘海屏在main.js里，好像uniapp有一个css变量获取刘海屏的安全区域 -->
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
</template>

<script>
	export default {
           props:{
			 active:{
				 type:Number||String,
				 default:0
			 }  
		   },
		data() {
			return {
				show_index: this.active, //控制显示那个组件
				tab_nav_list: [{
					'id': 0,
					'name': '首页',
					'dimg': '/static/tabBar/homed@2x.png',
					'aimg': '/static/tabBar/home@2x.png'
				}, {
					'id': 1,
					'name': '分类',
					'dimg': '/static/tabBar/cd@2x.png',
					'aimg': '/static/tabBar/c@2x.png'
				}, {
					'id': 2,
					'name': '菜谱',
					'dimg': '/static/tabBar/cpd@2x.png',
					'aimg': '/static/tabBar/cp@2x.png'
				}, {
					'id': 3,
					'name': '购物车',
					'dimg': '/static/tabBar/cartd@2x.png',
					'aimg': '/static/tabBar/cart.png'
				}, {
					'id': 4,
					'name': '我的',
					'dimg': '/static/tabBar/md@2x.png',
					'aimg': '/static/tabBar/m@2x.png'
				}], //菜单列表
				is_lhp: false
			}
		},
		onLoad() {
			this.is_lhp = this.$is_bang
		},
		methods: {
			cut_index(type) {
				this.show_index = type;
					switch(type){
						case 0:
						this.$api.reLaunch('/pages/tabBar/home');
						break;
						case 1:
						this.$api.reLaunch('/pages/tabBar/class');
						break;
						case 2:
						this.$api.reLaunch('/pages/tabBar/cp');
						break;
						case 3:
						this.$api.reLaunch('/pages/tabBar/cart');
						break;
						case 4:
						this.$api.reLaunch('/pages/tabBar/mine');
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
				width: 50rpx;
				height: 50rpx;
				margin-bottom: 2rpx
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
