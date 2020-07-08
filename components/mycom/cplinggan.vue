<template>
	<view style="margin-top: 10px;">
		<view class="uni-flex-title">
			<image src="/static/img/cp/cplinggan@2x.png" mode="" class="img"></image>
			<text class="img-tip">做饭灵感</text>
		</view>
		<scroll-view class="ss-scroll-navbar" scroll-x :scroll-left="scrollLeft" scroll-with-animation="true">
			<view v-for="(item,index) in navArr" :key="index" class="nav-item" 
			 @click="tabChange(item,index)" :id="'item-' + index">
				<text class="title" :class="{current: index === tabCurrentIndex}">{{item.name}}</text>
			</view>
		</scroll-view>
		<view class="uni-second-list">
			<view class="uni-second" :class="{margin:k%2==0}" @click="stockDetails(v.menusid)" v-for="(v,k) in list" :key="k">
				<view class="image-second">
					<image class="uni-second-image" :src="v.menusimage"></image>
				</view>
				<view class="uni-second-price">
					<view class="uni-flex uni-align-center ">
						<text class="sku-name uni-ellipsis">{{v.menusname}} </text> <text class="num">{{v.looknum}}人已观看</text>
					</view>
					<!-- <view class="uni-flex uni-align-center uni-two-cut"> -->
					<view class="price uni-two-cut">{{v.menusdescs}}</view>
					<!-- </view> -->
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				tabCurrentIndex: 0,
				navArr: [],
				list: [],
				width: '',
				scrollLeft: 0,
				widthList: [],
				screenWidth: 0,
			}
		},
		methods: {
			/**
			 * 导航栏navbar
			 * 点击事件
			 */
			tabChange(e,index) {
				console.log(e)
				this.tabCurrentIndex = index;
				this.$parent.getLingGan(e.cid);

				var widthArr = this.widthList;
				var scrollWidth = 0;
				for (var i = 0; i < index + 1; i++) {
					scrollWidth += widthArr[i];
				}
				let currentWidth = widthArr[index];
				// scrollView 居中算法
				// 减去固定宽度位移
				// 减去选中的bar的宽度的一半
				scrollWidth -= this.screenWidth / 2;
				scrollWidth -= currentWidth / 2;
				this.scrollLeft = scrollWidth;
			},
			calculateItemWidth() {
				var that = this;
				var arr = [];
				let w = 0;
				this.navArr.forEach((item, index) => {
					let view = uni.createSelectorQuery().in(this).select("#item-" + index);
					view.fields({
						size: true
					}, data => {
						console.log(data)
						arr.push(data.width);
					}).exec();
				})
				this.widthList = arr;
			},
			calculateWindowWidth() {
				var info = uni.getSystemInfoSync();
				this.screenWidth = info.screenWidth;
			},
			init() {
				this.list = [];
			},
			setClass(val) {
				this.navArr = val;
				var that = this;
				this.calculateWindowWidth();
				setTimeout(function() {
					that.calculateItemWidth();
				}, 1000);

			},
			setLing(val) {
				this.list = val;
				
			},
			initData() {
				this.list = []
			},
			stockDetails(id) {
				this.$api.navTo(`/pages/goodDetails/cpdetails?id=${id}`)
			},
		}
	}
</script>
<style scoped lang="scss">
	.on {
		color: #09BB07;
		border-color: #09BB07 !important;
	}

	.scroll-x .item .tip {
		border: 2upx solid rgb(204, 204, 204);
		border-radius: 24upx;
		text-align: center;
		font-size: 24upx;
		padding: 4upx 20upx;
	}

	.num {
		font-size: 20upx;
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
	}

	.uni-flex-title {
		line-height: 70upx;
		align-items: center;
		padding: 0 20upx;
		display: flex;
	}

	.img {
		width: 50upx;
		height: 50upx;
		margin-right: 20upx;
	}

	.img-tip {
		font-size: 34upx;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
	}

	.content {
		background: #ffffff;
		box-sizing: border-box;
	}

	.price {
		color: #666666;
		font-size: 24upx;
	}

	.sku-name {
		color: #333333;
		width: 60%;
	}

	.second-title {
		height: 54upx;
		display: flex;
		align-items: center;
		justify-content: center;

		image {
			height: 54upx;
		}
	}

	.uni-second-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 20upx;
		margin-bottom: 20upx;
		background-color: #f7f7f7;
	}

	.margin {
		margin-right: 15upx;
	}

	.uni-second {
		display: flex;
		flex-direction: column;
		width: 48.5%;
		box-sizing: border-box;
		background-color: #FFFFFF;
		margin-top: 20upx;
	}

	.image-second {
		width: 95%;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.uni-second-image {
		// width:315upx;
		height: 253upx;
		border-radius: 10upx;
	}

	.uni-second-price {
		flex: 1;
		font-size: 28upx;
		line-height: 1.5;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 15upx;
	}

	.uni-flex {
		justify-content: space-between;
		margin-bottom: 10px;
		align-items: center;
	}

	.ss-scroll-navbar {
		width: 100%;
		height: 90upx;
		// box-shadow: 0 2upx 8upx rgba(0, 0, 0, .06);
		background-color: #fff;
		white-space: nowrap;

		.nav-item {
			height: 90upx;
			text-align: center;
			padding: 0upx 20upx;
			color: #303133;
			display: inline-block;
			position: relative;
			font-size: 30upx;
			

			.title {
				line-height: 90upx;
				border: 1px solid #f0f0f0;
				padding: 5upx 14upx;
				border-radius: 30upx;
			}
		}

		.current {
			color: #09BB07;
			border-color: #09BB07 !important;

		}
	}
</style>
