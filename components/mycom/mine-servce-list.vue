<template>
	<view class="order-con">
		<view class="orders-title">
			 <text>功能服务</text> <text class="bg-title"></text>
		</view>
		<view class="orders">
			<view class="box">
				<view class="label" v-for="(v,k) in orderTypeList" :key="k" hover-class="hover" @tap="toOrderType(k)">
					<view class="icon">
						<image :src="v.img"></image>
					</view>
					<view class="icon-title">
						{{v.name}}
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				orderTypeList: [
					
					{
							img: '/static/img/mine/16.png',
							name: '我的钱包'
						},
						{
							img: '/static/img/mine/19.png',
							name: '我的粉丝'
						},
						{
							img: '/static/img/mine/21.png',
							name: '优惠卷'
						},
						{
							img: '/static/img/mine/12.png',
							name: '充值会员'
						},
						{
							img: '/static/img/mine/17.png',
							name: '风采展示'
						},
						{
							img: '/static/img/mine/13.png',
							name: '关于我们'
						},
						{
							img: '/static/img/mine/18.png',
							name: '收货地址'
						},
						{
							img: '/static/img/mine/11.png',
							name: '常见问题'
						},
						{
							img: '/static/img/mine/14.png',
							name: '联系客服'
						},
						{
							img: '/static/img/mine/20.png',
							name: '意见反馈'
						}
				]
			}
		},
		methods:{
			toOrderType(ind){
				this.$emit('click',ind)
			}
		}
	}
</script>

<style scoped lang="scss">
	.order-con {
		margin-top: 40upx;
		.orders-title {
			line-height: 80upx;
			padding-left: 40upx;
			z-index: 999;
			font-weight: bold;
			border-bottom: 1px solid #F7F9FA;
			position: relative;
		}
		.bg-title{
			position: absolute;
			top: 50%;
			left:45upx;
			width:108upx;
			height: 15upx;
			transform: translateY(-50%);
			background-color: #D1FFC6;
			z-index: -1;
			}

		.orders {
			display: flex;
			align-items: flex-start;

			.box {
				width:100%;
				display: flex;
				align-items: center;
                flex-wrap: wrap;
				.label {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					width: 25%;
					color: #333333;
					font-size: 24upx;
					margin:30upx 0 10upx 0;
					.icon {
						position: relative;
						margin-bottom: 10upx;
						width: 70upx;
						height: 70upx;
						image {
							width: 100%;
							height: 100%;
							z-index: 9;
						}
					}
					.icon-title{
						color: #666666;
						font-size: 24upx;
					}
				}
			}
		}

	}
</style>
