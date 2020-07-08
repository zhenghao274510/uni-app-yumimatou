<template>
	<div class="contain">
		<div class="box">
			<div class="pay">
				<div class="money">
					<div class="price">
						￥
						<span id="jine">{{price}}</span>
					</div>
					<span style="color:#999">需支付</span>
				</div>
			</div>
			<view class="uni-title uni-common-mt uni-common-pl">选择支付方式</view>
			<view class="uni-list">
				<radio-group @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
						<view>
							<radio :value="item.value" :checked="index === current" />
						</view>
						<view>{{item.value}}</view>
					</label>
				</radio-group>
			</view>

			<div class="btns" @click="payOrder">确定</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				items: [{
						value: '微信支付'
					},
					{
						value: '会员余额支付'
					},
					{
						value: '钱包支付'
					},
				],
				current: 0,
				price: "",
				id: ""
			};
		},
		onLoad(options) {
			this.id = options.id;
			this.price = options.price;
		},
		methods: {
			radioChange(e) {
				console.log(e)
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === e.target.value) {
						this.current = i;
						break;
					}
				}
			},
			payOrder() {
				let parmas = {
					uid: getApp().globalData.uid,
					ordernum: this.id,
					money: this.price
				}
				if (this.current == 0) {
					parmas.cmd = "weixinpay"
				} else if (this.current == 1) {
					parmas.cmd = "balancepay"
				} else {
					parmas.cmd = "moneypay"
				}
				console.log(parmas)
				this._reqw.ipost(parmas).then(res => {
					res.result == 0 ? (this.current != 0?this.payOther() : this.$api.PayBywx(res.body)) : this.$api.tip(
						res.resultNote)
				}).catch(err => {})
			},
			payOther(){
				this.$api.tip('支付成功！'), setTimeout(() => {
					uni.redirectTo({
						url: '/pages/order/paySuccess'
					})
				},300)
			}


		}
	}
</script>

<style scoped lang="scss">
	.contain {
		width: 100%;
		height: 100%;
	}

	.box {
		width: 100%;
		padding: 72px 0 0;

		.pay {
			width: 100%;
			padding: 0 0.4rem;
			box-sizing: border-box;
			.money {
				width: 100%;
				padding: 1.2rem 0;
				display: flex;
				flex-direction: column;
				flex-direction: center;
				align-items: center;
				font-size: 14px;
				color: #333;

				.price {
					margin-bottom: 0.5rem;

					span {
						font-size: 30px;
					}
				}
			}
		}

		.btns {
			width: 400upx;
			height: 88upx;
			background: rgba(107, 212, 83, 1);
			box-shadow: 0px 2px 10px 0px rgba(107, 212, 83, 0.5);
			border-radius: 10px;
			line-height: 88upx;
			text-align: center;
			margin: 60upx auto 0;
			color: #fff;
		}
	}
</style>
