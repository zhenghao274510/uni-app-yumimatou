<template>
	<view class="order-details-con">
		<view class="uni-flex uni-flex-item uni-align-center" v-if="dataobject.state == 5" style="background: #FFEFEE;justify-content: center;height: 60px;">
			<!-- "state":""//订单状态 0待付款 1待发货 2待收货 3待评价 4 已完成 5退款中 6 已退款 7已取消 -->
			<image src="/static/img/home/tuikuanzhong.png" mode="" class="topstateImg"></image>
			<text style="color: #FF0817;">退款中</text>
		</view>
		<view class="" v-else>
			<view class="orderState">
				<!-- "state":""//订单状态 0待付款 1待发货 2待收货 3待评价 4 已完成 5退款中 6 已退款 7已取消 -->
				<image src="/static/img/home/daifukuan.png" mode="" class="topstateImg"></image>
				<text v-if="dataobject.state == 0">待付款</text>
				<text v-if="dataobject.state == 1">待发货</text>
				<text v-if="dataobject.state == 2">待收货</text>
				<text v-if="dataobject.state == 3">待评价</text>
				<text v-if="dataobject.state == 4">已完成</text>
				<text v-if="dataobject.state == 6">已退款</text>
				<text v-if="dataobject.state == 7">已取消</text>
			</view>
			<view style="text-align: center;" v-if="dataobject.state == 0">
				需支付: <text style="color:#FF0817;">￥{{dataobject.allprice}}</text>
			</view>
			<view class="uni-flex uni-align-center" style="justify-content: center;margin-top: 5px;" v-if="dataobject.state == 0">
				<view class="order-bottom-two one" @click="payOrder">去支付</view>
			</view>
		</view>

		<view class="">


		</view>
		<!-- 地址 -->
		<view class="address-section">
			<view class="order-content">
				<view class="cen">
					<view class="top">
						<text class="name">{{ dataobject.name }}</text>
						<text class="name">{{ dataobject.phone }}</text>
					</view>
					<text class="address">{{ dataobject.address }}</text>
				</view>
			</view>
		</view>
		<!-- 地址 -->
		<view class="goods-section">
			<!-- 商品列表 -->
			<view class="g-item" v-for="(v, k) in dataobject.ordertailList" :key="k">
				<image :src="v.goodsimage"></image>
				<view class="right">
					<view class="title clamp">{{v.goodsname }}</view>
					<view>
						<text class="spec">{{v.skuname}}</text>
					</view>
					<view class="uni-flex uni-align-center">
						<view class="price uni-flex-item">￥{{v.skuprice}}</view>
						<text class="num">× {{v.goodsnum}}</text>
					</view>

				</view>
			</view>
		</view>
		<!-- 金额明细 -->
		<view class="yt-list">
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">订单编号</text>
				<text class="cell-tip red">{{ orderId }}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">下单时间</text>
				<text class="cell-tip">{{ dataobject.adtime }}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">支付方式</text>
				<text class="cell-tip" style="color: #009D37;" v-if="dataobject.paytype==0">会员余额</text>
				<text class="cell-tip" style="color: #009D37;" v-if="dataobject.paytype==1">分销金额</text>
				<text class="cell-tip" style="color: #009D37;" v-if="dataobject.paytype==2">微信</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">商品金额</text>
				<text class="cell-tip">￥{{dataobject.goodsprice}}</text>
			</view>
			<view class="yt-list-cell b-b" v-if="dataobject.freightprice!=0">
				<text class="cell-tit clamp">配送费</text>
				<text class="cell-tip" style="color: #ff0000;">￥{{dataobject.freightprice}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">共计</text>
				<text class="cell-tip">￥{{dataobject.allprice}}</text>
			</view>
			<view class="yt-list-cell b-b" v-if="dataobject.cmprice!=0">
				<text class="cell-tit clamp">优惠券金额</text>
				<text class="cell-tip">￥{{dataobject.cmprice}}</text>
			</view>

			<view class="yt-list-cell b-b" v-if="dataobject.refundreason!=''">
				<text class="cell-tit clamp">退款理由</text>
				<text class="cell-tip">{{dataobject.refundreason}}</text>
			</view>
			<!-- <view class="yt-list-cell b-b" v-if="dataobject.refundimage!=''">
				<image :src="dataobject.refundimage" class="tuiImg"></image>
			</view> -->
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">备注</text>
				<text class="cell-tip" v-if="dataobject.remarks!=''">{{dataobject.remarks}}</text>
				<text class="cell-tip" v-else>-</text>
			</view>
			<view class="yt-list-cell b-b" v-if="dataobject.shtime!=''">
				<text class="cell-tit clamp">成交时间</text>
				<text class="cell-tip">{{dataobject.shtime}}</text>
			</view>
			<view class="yt-list-cell b-b" v-if="dataobject.paytime!=''">
				<text class="cell-tit clamp">付款时间</text>
				<text class="cell-tip">{{dataobject.paytime}}</text>
			</view>
			<view class="yt-list-cell b-b" v-if="dataobject.sendtime!=''">
				<text class="cell-tit clamp">发货时间</text>
				<text class="cell-tip">{{dataobject.sendtime}}</text>
			</view>
		<!-- 	<view class="yt-list-cell b-b" v-if="dataobject.sqtktime!=''">
				<text class="cell-tit clamp">申请退款时间</text>
				<text class="cell-tip">{{dataobject.sqtktime}}</text>
			</view>
			<view class="yt-list-cell b-b" v-if="dataobject.tkshtime!=''">
				<text class="cell-tit clamp">退款审核时间</text>
				<text class="cell-tip">{{dataobject.tkshtime}}</text>
			</view> -->
		</view>
		<!-- "state":""//订单状态 0待付款 1待发货 2待收货 3待评价 4 已完成 5退款中 6 已退款 7已取消 -->
		<view class="tellContent" @click="tellPhone">
			<image src="/static/img/home/kefu.png" mode="" class="tellimg"></image>
			<text>联系客服</text>
		</view>
		<view>
			<view class="order-bottom" v-if="dataobject.state == 2">
				<view class="order-bottom-two one" @click="finishOrder('收货')">确认收货</view>
			</view>
			<view class="order-bottom" v-if="dataobject.state == 1">
				<view class="order-bottom-two" @click="getXOrder(0)">申请退款</view>
			</view>
			<view class="order-bottom" v-if="dataobject.state == 3">
				<view class="order-bottom-two one" @click="getXOrder(1)">去评价</view>
			</view>
			<view class="order-bottom-finish" v-if="dataobject.state == 0">
				<view class="order-bottom-finish-left"></view>
				<view class="order-bottom-finish-left">
					<view class="order-bottom-two" @click="finishOrder('取消')">取消订单</view>
					<view class="order-bottom-two one" @click="payOrder">去支付</view>
				</view>
			</view>
			<view class="order-bottom-finish" v-if="dataobject.state == 4||dataobject.state == 6||dataobject.state == 7">
				<view class="order-bottom-finish-left"></view>
				<view class="order-bottom-canle" @click="finishOrder('删除')">删除订单</view>
			</view>
		</view>
		<refund-list ref="refundList" @click="btnCancle"></refund-list>
		<cancel-success ref="cancelSuccess"></cancel-success>

	</view>
</template>

<script>
	import refundList from "@/components/mycom/poupone.vue"
	import cancelSuccess from "@/components/mycom/cansleSuccess.vue"
	export default {
		components: {
			refundList,
			cancelSuccess
		},
		data() {
			return {
				orderId: '',
				showTip: false,
				dataobject: {
					ordernum: "", //订单号
					name: "", //收货人姓名
					phone: "", //收货人电话
					address: "", //收货地址
					freightprice: "", //运费
					goodsprice: "", //商品总价格
					cmprice: "", //优惠券金额
					allprice: "", //实付总金额
					paytype: "", //支付方式 0会员余额 1分销金额 2微信'
					state: "", //订单状态 0待付款 1待发货 2待收货 3待评价 4 已完成 5退款中 6 已退款 7已取消
					remarks: "", //备注
					cancelreason: "", //取消原因
					refundreason: "", //退款原因
					refunddesc: "", //退款说明
					refundimage: '', //退款图片
					adtime: "", //下单时间
					paytime: "", //支付时间
					sendtime: "", //发货时间
					shtime: "", //收货时间
					pjtime: "", //评价时间
					qxtime: "", //取消时间
					sqtktime: "", //申请退款时间
					tkshtime: "", //退款审核时间
					ordertailList: [{
							ordertailid: "", //订单详情id
							goodsid: "", //商品id
							goodsname: "", //商品名称
							goodsimage: "", //商品图片
							skuname: "", //规格名称
							skuprice: "", //规格价格
							goodsnum: "" //商品数量
						}

					]
				}
			}
		},
		onLoad(options) {
			this.orderId = options.id;
		},
		onShow() {
			this.loadData();
		},
		methods: {
			loadData() {
				let parmas = {
					cmd: 'myorderdetail',
					uid: getApp().globalData.uid,
					ordernum: this.orderId
				}
				this._reqw
					.ipost(parmas)
					.then(res => {
						res.result == 0 ? this.dataobject = res.dataobject : this.$api.tip(res
							.resultNote);
					})
					.catch(err => {});
			},
			//  售后
			getXOrder(n) {
				if (n == 0) {
					this.$api.navTo(`/pages/order/subSouHuo?id=${this.orderId}`);
				} else {
					this.$api.navTo(`/pages/order/addEva?id=${this.orderId}`);
				}
			},

			finishOrder(type) {
				let parmas = {
					uid: getApp().globalData.uid,
					ordernum: this.orderId
				}
				if (type == '删除') {
					parmas.cmd = "orderdelete";
					this.getData(parmas, type)
				} else if (type == "收货") {
					parmas.cmd = "orderconfirm"
					this.getData(parmas, type);
				} else if (type == '取消') {
					console.log(111)
					this.$refs.refundList.showPicker();
				}

			},
			btnCancle(e) {
				console.log(e)
				let parmas = {
					uid: getApp().globalData.uid,
					ordernum: this.orderId,
					cmd: "ordercancel",
					reason: e
				}
				this.getData(parmas, '取消')
			},
			getData(parmas, type) {
				this._reqw
					.ipost(parmas)
					.then(res => {
						res.result == 0 ? (type == '取消' ? (this.$refs.refundList.hidePicker(), this.$refs.cancelSuccess.showPicker(),setTimeout(()=>{
							this.$refs.cancelSuccess.hidePicker()
						}),1000) :
								(this.$api.tip(`${type}成功`), this.$api.back())) :
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			payOrder() {
				this.$api.navTo(`/pages/order/payOrder?id=${this.orderId}&price=${this.dataobject.allprice}`)
			},
			tellPhone() {
				this.$api.callPhone(uni.getStorageSync('phone'))
			}

		}
	}
</script>

<style lang="scss" scoped>
	.tellimg {
		width: 50upx;
		height: 50upx;
	}

	.order-details-con {
		min-height: 100%;
		background: #FFFFFF;
	}

	.topstateImg {
		width: 50upx;
		height: 50upx;
	}

	.tellContent {
		width: 706upx;
		height: 88upx;
		margin: 30upx auto;
		background: rgba(107, 212, 83, 1);
		color: #FFFFFF;
		box-shadow: 0px 2px 10px 0px rgba(107, 212, 83, 0.5);
		border-radius: 10upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.orderState {
		height: 110upx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		width: 100%;
		color: #333333;
		// background: #FFFFFF;
		font-size: 32upx;
	}

	.tellphone {
		color: #FF4848;
		border-bottom: 1px solid #FF4848;
	}

	.one {
		background-color: #FF4848;
		color: #FFFFFF !important;
		border: none !important;
	}

	.bg-img {
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		width: 100%;
		height: 320upx;
	}

	.order-bottom {
		margin-top: 10px;
		height: 50px;
		background: #fff;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 0 15px;
	}

	.order-bottom-orice {
		color: #333333;
		font-size: 13px;
		margin-left: 5px;
	}

	.order-bottom-one {
		color: #999999;
		border: 1px solid #999999;
		border-radius: 16px;
		padding: 5px 10px;
		font-size: 13px;
	}

	.order-bottom-finish {
		margin-top: 10px;
		height: 50px;
		// background: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 15px;
	}

	.order-bottom-finish-left {
		display: flex;
	}

	.order-bottom-canle {
		background: #FF9000 !important;
		color: #FFFFFF;
		border-radius: 10upx;
		margin-left: 15px;
		padding: 2px 10px;
		font-size: 13px;
	}

	.order-bottom-two {
		color: #333;
		border: 1px solid #cccccc;
		border-radius: 10upx;
		margin-left: 15px;
		padding: 2px 10px;
		font-size: 13px;
	}

	.address-section {
		padding: 20upx;
		// background: #fff;
		position: relative;
		border-bottom: 1px solid #EEEEEE;

		.order-content {
			display: flex;
			align-items: center;
			position: relative;
		}

		.cen {
			display: flex;
			flex-direction: column;
			flex: 1;
			font-size: 28upx;
			margin-left: 20upx;
		}

		.name {
			margin-right: 24upx;
			color: #666666;
			font-weight: Bold;
		}

		.address {
			margin-top: 16upx;
			margin-right: 20upx;
			color: #666666;
			font-size: 24upx;
		}
	}

	.goods-section {
		// background: #fff;
		border-bottom: 1px solid #EEEEEE;

		.g-header {
			display: flex;
			align-items: center;
			height: 84upx;
			padding: 0 30upx;
			position: relative;
		}

		.logo {
			display: block;
			width: 50upx;
			height: 50upx;
			border-radius: 100px;
		}

		.g-item {
			display: flex;
			margin: 0 30upx;
			padding: 10px 0;

			image {
				flex-shrink: 0;
				display: block;
				width: 180upx;
				height: 180upx;
				border-radius: 10upx;
			}

			.right {
				flex: 1;
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				overflow: hidden;
			}

			.title {
				font-size: 30upx;
			}

			.spec {
				font-size: 22upx;
				color: #666666;
				line-height: 40upx;
				background-color: #edecf1;
			}

			.price {
				font-size: 32upx;
				padding-top: 10upx;
				margin-bottom: 4upx;
				color: #fe2c2c;
			}
		}
	}

	.yt-list {
		// margin-top: 16upx;
		// background: #fff;
	}

	.yt-list-cell {
		display: flex;
		align-items: center;
		padding: 10upx 30upx 10upx 40upx;
		line-height: 70upx;
		position: relative;
		border-bottom: 1px solid #F2F2F2;

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		.cell-icon {
			height: 32upx;
			width: 32upx;
			font-size: 22upx;
			color: #fff;
			text-align: center;
			line-height: 32upx;
			background: #f85e52;
			border-radius: 4upx;
			margin-right: 12upx;

			&.hb {
				background: #ffaa0e;
			}

			&.lpk {
				background: #3ab54a;
			}
		}

		.cell-more {
			align-self: center;
			font-size: 24upx;
			margin-left: 8upx;
			margin-right: -10upx;
		}

		.cell-tit {
			color: #333333;
			font-size: 26upx;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: 26upx;
			color: #666666;
			flex: 1;
			text-align: right;
		}


		&.desc-cell {
			.cell-tit {
				max-width: 90upx;
			}
		}


	}
</style>
