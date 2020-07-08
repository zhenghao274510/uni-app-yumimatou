<template>
	<view>
		<view class="uni-flex">
			<image src="/static/img/cp/cphot@2x.png" mode="" class="img"></image>
			<text class="img-tip">今日推荐</text>
		</view>
		<scroll-view scroll-x="true" class="scroll-x">
			<view class="item-wrapper">
				<view class="item" v-for="(item,index) of list" :key="index" @click="detail(item)">
					<view class="icon">
						<img class="img" lazy-load :src="item.goods_pic">
					</view>
					<view class="tip">
						{{item.name}}
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				list:[]
			}
		},
		methods: {
			set(val){
				this.list=val
			},
			detail(data) {
				uni.showToast({
					title: '进入详情页',
					duration: 2000
				});
			}
		}
	}
</script>

<style scoped>
	.uni-flex{
		line-height: 70upx;
		align-items: center;
		padding: 0 20upx;
	}
	.img{
		width: 50upx;
		height: 50upx;
		margin-right: 20upx;
	}
	.img-tip{
		font-size:34upx;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	view {
		font-size: 24upx;
	}

	.scroll-x {
		width: 100%;
		height: 380upx;
		padding: 0 20upx;
		box-sizing: border-box;
	}

	.item-wrapper {
		height: 380upx;
		width: 3792upx;
	}

	.scroll-x .item {
		float: left;
		width: 300upx;
		height: 380upx;
		background: #fff;
		margin: 0 8upx;
		border-radius: 15upx;
		overflow: hidden;
		position: relative;
	}

	.icon {
		width: 100%;
		height:80%;
		position: relative;
	}

	.icon .img {
		width: 100%;
		height: 100%;
	}

	.tip {
		height: 50upx;
		width: 100%;
		text-align: center;
		color: #333;
		font-size: 30upx;
		font-weight: bold;
		line-height: 50upx;
	}
</style>
