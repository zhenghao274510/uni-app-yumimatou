<template>
	<view>
		<view class="icon">
			<image src="/static/img/home/chenggong@2x.png"></image>
		</view>
		<view class="tis">
			申请提现成功，等待审核
		</view>
		<view class="uni-list-cell">
			<text class="cell-tip">提现金额</text>
			<text class="cell-tit">{{money}}</text>
		</view>
		<view class="uni-list-cell">
			<text class="cell-tip">提现方式</text>
			<text class="cell-tit">微信</text>
		</view>
		<view class="back">
			<view class="btn" @tap="toOrder">完成</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money:''
			};
		},
		onLoad(options) {
           this.money=this.$api.parsePrice(options.money);
		},
		methods: {
			toOrder() {
				uni.reLaunch({
					url:'/pages/index/index'
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.cell-tit {
		color: #666666;
		font-size: 24upx;
	}
	
	.cell-tip {
		color: #333;
		font-size: 26upx;
	}
	.uni-list-cell::after{
		content: '';
		height: 0;
	}
	.uni-list-cell {
		padding:10upx 30upx;
		width: 100%;
		box-sizing: border-box;
		justify-content: space-between;
	}
	view {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.icon {
		width: 100%;
		margin-top: 10vw;

		image {
			width: 25vw;
			height: 25vw;
		}
	}

	.tis {
		width: 100%;
		margin-top: 20upx;
		margin-bottom: 50upx;
		font-size: 30upx;
		color: #333333;
	}

	.pay-amount {
		width: 100%;
		margin-top: 10upx;
		font-size: 32upx;
	}

	.back {
		width: 100%;
		margin-top: 80upx;

		.btn {
			width:629upx;
			height:88upx;
			margin: 0 auto;
			background:#999999;
			font-size:36upx;
			font-weight:bold;
			color:rgba(255,255,255,1);
			text-align: center;
			line-height: 88upx;
		}
	}
</style>
