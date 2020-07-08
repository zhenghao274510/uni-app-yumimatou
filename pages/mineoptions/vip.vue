<template>
	<view class="content">
		<view class="shouyi-top">
			<image src="/static/img/home/huiyuankabg.png" mode="" class="imgbg"></image>
			<view class="shouyi-one">
				会员卡
			</view>
			<view class="btn">
				<view>
					余额:{{balance}}
				</view>
				<view>
					NO:{{vipNum}}
				</view>
			</view>
		</view>
		<view class="uni-flex uni-space uni-align-center pad" style="margin-bottom:30px;">
			<navigator url="/pages/mineoptions/vipDetails" class="chose-pay-info">
				查看消费明细
			</navigator>
			<view class="money">
			</view>
		</view>
		<view class="uni-flex uni-space uni-align-center pad">
			<view class="chose-pay-info">
				选择充值金额
			</view>
			<view class="money">
				￥{{currentObj.money}}
			</view>
		</view>
		<view class="shouyi-con">
			<view class="shouyi-list" v-for="(v,k) in dataList" :key="k" @click="getCurrent(v,k)" :class="{active:k==active}">
				<text class="mian-price">{{v.money}}元</text>
				<text class="song-price">送{{v.money1}}元</text>
			</view>
		</view>
		<view class="pay-money">
			应支付{{currentObj.money}}元
		</view>
		<view class="pay-btn" @click="getOrderId">
			立即支付
		</view>
		
		
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: 0,
				page:1,
				totalPage:1,
				dataList: [],
				detailsList:[],
				vipNum: '',
				currentObj: {
					money: '',
					cid: ''
				},
				balance: ''
			}
		},
		onLoad(options) {
			this.balance = options.id
			console.log(this.balance)
			this.loadData();
			this.getVipNum();
		},
		watch: {
			active(newVal) {
				this.currentObj = this.dataList[newVal]
			}
		},
		methods: {
			getVipNum() {
				if (uni.getStorageSync('vipNum')) {
					this.vipNum = uni.getStorageSync('vipNum');
				} else {
					this.vipNum = parseInt(Math.random() * 100000000);
					uni.setStorageSync('vipNum', this.vipNum)
				}
			},
			loadData() {
				let parmas = {
					cmd: 'getrecharges'
				}
				this._reqw.ipost(parmas).then(res => {
					res.result == 0 ? (this.dataList = res.dataList, this.currentObj = res.dataList[0]) : this.$api.tip(
						res.resultNote)
				}).catch(err => {})
			},
			getCurrent(e, k) {
				this.active = k;
				this.currentObj=e;
				this.getOrderId();
			},
			getOrderId() {
				let parmas = {
					cmd: 'getrechargesorder',
					uid: getApp().globalData.uid,
					rid: this.currentObj.rid
				}
				this._reqw.ipost(parmas).then(res => {
					res.result == 0 ? this.pay(res.ordernum) : this.$api.tip(
						res.resultNote)
				}).catch(err => {})
			},
			pay(id) {
				let parmas = {
					cmd: 'weixinpay',
					uid: getApp().globalData.uid,
					ordernum: id,
					money: this.currentObj.money
				}
				this._reqw.ipost(parmas).then(res => {
					res.result == 0 ? this.$api.PayBywx(res.body,0) : this.$api.tip(
						res.resultNote)
				}).catch(err => {})
			}

		}
	}
</script>

<style scoped lang="scss">
	.money {
		height: 30upx;
		font-weight: bold;
		color: #666666;
		font-size: 28upx;
	}

	.pad {
		padding: 0 30upx;
	}

	.pay-money {
		color: #FF5152;
		line-height: 100upx;
		text-align: center;
	}

	.pay-btn {
		width: 95%;
		margin: 0 auto;
		height: 88upx;
		background: rgba(107, 212, 83, 1);
		box-shadow: 0px 2px 10px 0px rgba(107, 212, 83, 0.5);
		border-radius: 5px;
		text-align: center;
		color: #FFFFFF;
		line-height: 88upx;
	}

	.mian-price {
		font-size: 26upx;
	}

	.active {
		background: rgb(108, 212, 84);
		color: #FFFFFF !important;
	}

	.song-price {
		font-size: 22upx;
	}

	.content {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;

		.shouyi-top {
			display: flex;
			padding: 20upx;
			height: 345upx;
			flex-direction: column;
			position: relative;

			.shouyi-one {
				margin-left: 8%;
				font-size: 40upx;
				font-weight: bold;
				color: rgba(233, 175, 124, 1);
				background: linear-gradient(0deg, rgba(255, 232, 211, 1) 0%, rgba(229, 180, 147, 1) 100%);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
				z-index: 66;
			}

			.shouyi-two {
				font-size: 30px;
				color: #fff;
				text-indent: 30px;
			}

			.imgbg {
				position: absolute;
				top: 0;
				left: 20upx;
				right: 20upx;
				width: calc(100% - 40upx);
				height: 345upx;
				// z-index: -1;
			}

			.btn {
				position: absolute;
				bottom: 80upx;
				left: 20%;
				width: 70%;
				height: 60upx;
				color: #E9AF7C;
				text-align: center;
				line-height: 60upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}

		.shouyi-con {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			padding: 0 30upx;
			margin: 40upx 0;

			.shouyi-list {
				width: 30%;
				padding: 0 30upx;
				height: 82upx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border: 1px solid #6CD454;
				border-radius: 7px;
				color: #6CD454;
				box-sizing: border-box;
				margin-bottom: 32upx;
			}
		}

	}
	
	
</style>
