<template>
	<view>
		<view class="icon">
			<image src="/static/img/home/zhifuchenggong.png"></image>
		</view>
		<view class="tis">
			订单支付成功
		</view>
		<view class="back">
			<view class="btn" @tap="toOrder">{{text}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text:'返回首页',
				type:0
			};
		},
		onLoad(options) {
            if(options.type){
				this.text='返回会员中心'
				this.type=1
			}
		},
		methods: {
			toOrder() {
				if(this.type==0){
					uni.reLaunch({
						url:'/pages/index/index'
					})
				}else{
					this.$api.back()
				}
				
			}
		},
	}
</script>

<style lang="scss">
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
			width: 500upx;
			height: 70upx;
			margin: 0 auto;
			background-color:#09BB07 ;
			color: #FFFFFF;
			align-items: center;
			border-radius:8upx;
			font-size: 26upx;
		}
	}
</style>
