<template>
	<view class="list-scroll-content">
		<!-- 订单列表 -->
		<view class="order-item" @click="gotoDetails" >
			<view class="uni-flex bottom-border pad">
				<view class="order-img-con">
					<image class="goods-img" src="/static/img/test/p1.jpg"></image>
				</view>
				<view class="uni-flex-item" style="margin-left: 10px;">
					<view class="uni-flex uni-space">
						<text class="title uni-ellipsis">白玉豆腐</text>
						<view class="order-status-right uni-flex uni-align-center">
							<view class="order-status-right-one">
								退款中
							</view>
							<view class="iconfont icon-delete">
							</view>
						</view>
					</view>
					<view class="skuname"> <text>385G</text> </view>
					<view class="price-box uni-flex uni-space">
						<text class="order-status-right-price">￥69</text>
						<view style="font-size: 20rpx;">× 1</view>
					</view>
				</view>
			</view>
			<view class="uni-flex uni-space uni-align-center">
				<view class="">
				</view>
				<view class=" uni-flex uni-space uni-align-center" style="padding: 30upx 0;">
					<view class="uni-badge-green pay" @click.stop="gotoDetails()">取消退款</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="state" v-if="dataList.length!=0"></uni-load-more>
		<empty v-else></empty>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import empty from "@/components/mycom/empty";
	export default {
		components: {
			uniLoadMore,
			empty
		},
		data() {
			return {
				tabCurrentIndex: 0,
				totalPage: 1,
				page: 1,
				dataList: [],
				state: 'loading'
			};
		},
		onShow() {
			this.initData()
		},
		onReachBottom() {
			this.totalPage > this.page ? (this.page += 1, this.loadData()) : setTimeout(() => {
				this.state = "noMore"
			}, 30)
		},
		methods: {
			loadData() {
				let parmas = {
					uid: getApp().globalData.uid,
					type: type,
					pageNo: this.page
				};
				this._reqw.ipost(parmas, "orderList").then(res => {
					this.change = true;
					res.result == 0 ? (this.totalPage = res.totalPage, res.dataList != undefined && res.dataList.length != 0 ? res.dataList
						.forEach(item => {
							this.dataList.push(item)
						}) : this.load = true) : this.$api.tip(res.resultNote)
				}).catch(err => {})

			},
			//删除订单
			deleteOrder(id, k) {
				uni.showLoading({
					title: '请稍后'
				})
				this._reqw.ipost({
					orderId: id
				}, "delOrder").then(res => {
					res.result == 0 ? (this.$api.tip('删除成功'), this.initData(), uni.hideLoading()) :
						this.$api.tip(res.reultNote)
				}).catch(err => {})
			},
			gotoDetails() {
				this.$api.navTo(`/pages/order/tuiDetails`)
			}

		},
	}
</script>

<style lang="scss">
	.pad {
		padding: 30upx 0;
	}

	.pay {
		background-color: #F55555;
	}

	.uni-badge-green {
		width: 160upx;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		color: #FFFFFF;
		font-size: 26upx;
		border-radius: 5px;
		margin: 0 5px;
	}

	.del-icon {
		justify-content: center;
	}

	.icon-delete {
		font-size: 32upx;
		color: #999999;
	}

	.skuname {
		font-size: 20upx;
		font-size: #999999;
	}

	page,
	.content {
		height: 100%;
	}

	.order-status-right-price {
		color: #FE2C2C;
		font-size: 26upx;
	}

	.order-status-right {
		display: flex;
		width: 140px;
		align-items: center;
		justify-content: flex-end;

		.order-status-right-one {
			color: #33CC66;
		}
	}


	.swiper-box {
		height: calc(100% - 40px);
	}

	.list-scroll-content {
		height: 100%;
	}

	// 订单列表部分
	.order-item {
		padding: 0 30upx;
		border-top: 2px solid #FAFAFA;
	}

	.order-img-con,
	.goods-img {
		width: 220upx;
		height: 130upx;
	}

	//头部导航部分

	.navbar {
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0, 0, 0, .06);
		position: relative;
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 28upx;
			color: #666666;
			position: relative;

			&.current {
				color: #6BD453;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 30upx;
					height: 0;
					border-bottom: 2px solid #6BD453;
				}
			}
		}
	}
</style>
