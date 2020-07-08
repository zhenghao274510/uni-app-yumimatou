<template>
	<view class="order-con">
		<view class="orders-title" @click="toOrderType(0)">
			<text>我的订单</text> <text class="bg-title"></text>
			<text class="order-more">查看更多</text>
		</view>
		<view class="orders">
			<view class="box">
				<view class="label" v-for="(v,k) in orderTypeList" :key="k" hover-class="hover" @tap="toOrderType(v.id)">
					<view class="icon">
						<image :src="v.img"></image>
					</view>
					<view class="icon-title">
						{{v.name}}
					</view>
					<view class="point" v-if="v.num!=0">
						{{v.num}}
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		props:{
			dataObj:{
				type:Object,
				default:{
					daifukuan: "", //待付款数量
					daishouhuo: "", //待收货数量
					daipingjia: "", //待评价数量
					tuikuan: "" //退款数量
				}
			}
		},
		data() {
			return {
				orderTypeList: [{
						img: '/static/img/mine/1.png',
						name: '待付款',
						id:1,
						num:0
					},
					{
						img: '/static/img/mine/3.png',
						name: '待收货',
						id:2,
						num:0
					},
					{
						img: '/static/img/mine/2.png',
						name: '待评价',
						id:3,
						num:0
					},
					{
						img: '/static/img/mine/4.png',
						name: '退款/售后',
						id:4,
						num:0
					},
					{
						img: '/static/img/mine/0.png',
						name: '全部订单',
						id:5,
						num:0
					}
				]
			}
		},
		watch:{
			dataObj(newVal){
				if(newVal.daifukuan!=''){
					this.orderTypeList[0].num=newVal.daifukuan;
					this.orderTypeList[1].num=newVal.daishouhuo;
					this.orderTypeList[2].num=newVal.daipingjia;
					this.orderTypeList[3].num=newVal.tuikuan;
				}
			}
		},
		methods: {
            toOrderType(ind){
				this.$emit('click',ind)
			}
		}
	}
</script>

<style scoped lang="scss">
	.order-con {
		margin-top: 20px;

		.orders-title {
			line-height: 40px;
			padding: 0 20px;
			z-index: 999;
			border-bottom: 1px solid #F7F9FA;
			position: relative;
			overflow: hidden;
		}

		.order-more {
			float: right;
			color: #666666;
			font-size: 24upx;
		}

		.bg-title {
			position: absolute;
			top: 50%;
			left: 45upx;
			width: 108upx;
			height: 15upx;
			transform: translateY(-50%);
			background-color: #D1FFC6;
			z-index: -1;
		}

		.orders {
			display: flex;
			align-items: flex-start;

			.box {
				width: 100%;
				display: flex;
				align-items: center;

				.label {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					width: 20%;
					color: #333333;
					font-size: 24upx;
					margin: 30upx 0 10upx 0;
					position: relative;
					.point{
						position: absolute;
						top: 0;
						right:20upx;
						width: 26upx;
						height: 26upx;
						background-color: red;
						color: #FFFFFF;
						font-size: 22upx;
						text-align: center;
						line-height: 26upx;
						border-radius: 50%;
					}

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

					.icon-title {
						color: #333333;
						font-size: 24upx;
						font-weight: 600;
					}
				}
			}
		}

	}
</style>
