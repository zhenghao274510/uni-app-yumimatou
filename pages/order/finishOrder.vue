<template>
	<view class="content-warpe">
		<view class="" v-if="addressData.addressid!=''">
			<view class="address-tit">
				收货人信息
			</view>
			<!-- 地址 -->
			<view class="address-section" @click="choseAddress">
				<view class="order-content">
					<view class="cen">
						<view class="top uni-flex">
							<view class="mobile">
								<text>{{addressData.name}}</text> <text style="margin-left: 15px;">{{addressData.phone}}</text>
							</view>
						</view>
						<text class="cell-tit">{{addressData.address}}{{addressData.addressdetail}}</text>
					</view>
					<view class="uni-icon uni-icon-arrowright"></view>
				</view>

			</view>

		</view>
		<view class="noAddress" @click="choseAddress" v-else>
			<view class="mobile address-tit">
				选择您的收货地址
			</view>
			<view class="uni-icon uni-icon-arrowright"></view>
		</view>
		<view class="goods-section">
			<!-- 商品列表 -->
			<view class="address-tit">
				商品信息
			</view>
			<!-- "goodscarid": "购物车id", -->
			<block v-for="(v,k) in dataList" :key="k">
				<view class="g-item">
					<image :src="v.goodsimage" class="product-img"></image>
					<view class="right">
						<text class="title clamp">{{v.goodsname}}</text>
						<view style="margin: 5px 0;">
							<text class="spec uni-ellipsis">{{v.name}}</text>
						</view>
						<view class="price-box">
							<text class="price">￥{{v.price}}</text>
							<text class="number">x{{v.numbers}}</text>
						</view>
					</view>
				</view>
			</block>
		</view>
		<!-- 金额明细 -->
		<view class="uni-list-cell" v-if="distance!=''">
			<text class="cell-tip">运费说明</text>
			<view class="cell-tit">{{distance}}</view>
		</view>
		<view class="uni-list-cell" @click="getCompline">
			<text class="cell-tip">选择优惠券</text>
			<view class="" style="display: flex;align-items: center;">
				<text v-if="compline.mycouponid==''" style="margin-right: 20rpx;color: #666666;">请选择</text>
				<text v-else style="margin-right: 20rpx;color: #666666;">您选择了{{compline.price}}元优惠券</text>
				<view class="uni-icon uni-icon-arrowright">
				</view>
			</view>
			
		</view>
		<view class="uni-list-cell">
			<text class="cell-tip">备注</text>
			<input type="text" value="" placeholder="希望配送时间" class="input" v-model="remarks" />
		</view>
		<view class="uni-list-cell">
			<text class="cell-tip"> 商品金额</text>
			<view class="cell-tit">￥{{shopPrice}}</view>
		</view>
		<view class="uni-list-cell" v-if="freight!=0">
			<text class="cell-tip">运费</text>
			<view class="cell-tit">￥{{freight}}</view>
		</view>
		<view class="uni-list-cell" v-if="compline.price!=0">
			<text class="cell-tip">优惠券</text>
			<view class="cell-tit">￥{{compline.price}}</view>
		</view>

		<view class="uni-list-cell">
			<text class="cell-tip">共计</text>
			<view class="cell-tit">
				￥{{endPrice}}
			</view>
		</view>

		<!-- 底部 -->
		<view class="footer">
			<view class="price-content">
				<text class="price-tip" v-if="endPrice!= 0">￥</text>
				<text class="price">{{ endPrice }}</text>
			</view>
			<text class="submit" @click="submit" hover-class="btn-hover">提交订单</text>
		</view>
	</view>
</template>

<script>
	import QQMapWX from "@/common/js/qqmap-wx-jssdk.js"
	export default {
		data() {
			return {
				desc: '', //备注
				addressData: {
					addressid: "", //收货地址ID
					name: "", //收货人姓名
					phone: "", //收货人电话
					address: "", //收货地址
					addressdetail: "", //详细地址
					longitude: "", //经度
					latitude: "", //纬度
					isdefault: "" //是否默认(0否 1是)
				},
				compline:{
					mycouponid: "", //我的优惠券ID
					price: "0", //优惠券金额(元)
				},
				freight: 0,
				distance:'',
				addrId: '',
				dataList: [],
				type: '',
				remarks: '',
				qqmapsdk:''
			};
		},
		computed: {
			shopPrice() {
				let price = 0;
				this.dataList.forEach(item => {
					price += (item.price - 0) * 100 * (item.numbers - 0);
				});
				return this.$api.parsePrice(price / 100);
			},
			endPrice() {
				if (this.freight == '') {
					this.freight = 0;
				}
				return    this.$api.parsePrice(this.shopPrice - 0 + (this.freight - 0)-this.compline.price) ;
			},
			subPrice(){
				if (this.freight == '') {
					this.freight = 0;
				}
				return    this.$api.parsePrice(this.shopPrice - 0 + (this.freight - 0)) ;
			}
		},
		watch: {
			addressData(newVal) {
				if (newVal.addressid != '') {
					this.getfreights()
				}
			}
		},
		onLoad(options) {
			this.dataList = JSON.parse(options.goods);
			console.log(this.dataList)
			this.type = options.type;
			this.qqmapsdk = new QQMapWX({
				key: 'GQZBZ-3CECD-BP443-PBQEY-4R3M6-QMFBO'
			});
			this.getDefault()
		},

		methods: {
			scolsfirget(res){
				let self=this;
				self.distance=res.descs;
				self.qqmapsdk.calculateDistance({
					mode:'straight',
					from:{
						  latitude: res.latitude,
						  longitude: res.longitude
					},
					to:[{
						latitude: self.addressData.latitude,
						longitude: self.addressData.longitude
					}],
					success(mapres){
						let distance=Math.ceil(mapres.result.elements[0].distance/1000-res.distance);
						if(distance>0){
							self.freight=distance*res.price 
						}else{
							self.freight=0;
						}
						self.shopPrice>=20?self.freight=self.$api.parsePrice(self.freight):self.freight=self.$api.parsePrice(self.freight-0+5);
					}
				})
			},
			getfreights() {
				let parmas = {
					cmd: 'getfreights'
				}
				this._reqw
					.ipost(parmas)
					.then(res => {
						console.log(res);
						res.result == 0 ? this.scolsfirget(res.dataobject) : this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			getCompline() {
				this.$api.navTo(`/pages/mineoptions/compline?source=1&price=${this.subPrice}`)
			},
			submit() {
				this.addressData.addressid == '' ? this.$api.tip('请选择收货地址!') : this.getOrderId();
			},
			// //  默认地址
			getDefault() {
				let parmas = {
					cmd: 'myAddressList',
					uid: getApp().globalData.uid
				}
				this._reqw
					.ipost(parmas)
					.then(res => {
						console.log(res);
						res.result == 0 ? (res.dataList.length!= 0? this.addressData =res.dataList[0]:'') : this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			choseAddress() {
				this.$api.navTo(`/pages/mineoptions/address?source=1`);
			},
			// payType  0-直接购买，1-购物车结算
			getOrderId() {
				let cidlist = [];
				let parmas = {
					uid: getApp().globalData.uid,
					addressid: this.addressData.addressid,
					mycouponid: this.compline.mycouponid,
					freightprice: this.freight,
					remarks: this.remarks,
				};
				console.log(this.dataList);

				if (this.type == 'cart') {
					//  购物车结算
					this.dataList.forEach(item => {
						cidlist.push(item.goodscarid)
					})
					parmas.cmd = 'goodscarpurchase';
					parmas.cidlist = cidlist

				} else if (this.type == 'goods') {
					//  普通商品结算
					parmas.cmd = "immediatelypurchase";
					parmas.goodsid = this.dataList[0].goodsid;
					parmas.skuid = this.dataList[0].skuid;
					parmas.count = this.dataList[0].numbers;
				} else if (this.type == 'lz') {
					//  懒人商品结算
					parmas.cmd = "lazyimmediatelypurchase";
					parmas.lazyid = this.dataList[0].lazyid;
					parmas.count = this.dataList[0].numbers;
				} else if (this.type == 'second') {
					//  秒杀商品结算
					parmas.cmd = "seckillimmediatelypurchase";
					parmas.seckillid = this.dataList[0].seckillid;
					parmas.count = this.dataList[0].numbers;
				} else {
					//  团购商品结算
					parmas.cmd = "groupimmediatelypurchase";
					parmas.groupid = this.dataList[0].groupid;
					parmas.count = this.dataList[0].numbers;
				}
				console.log(parmas);
				this._reqw
					.ipost(parmas)
					.then(res => {
						res.result == 0 ? uni.redirectTo({
							url: `/pages/order/payOrder?id=${res.ordernum}&price=${this.endPrice}`
						}) : this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			}
		}
	};
</script>

<style lang="scss">
	.noAddress{
		height: 150upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.input {
		flex: 1;
		text-align: right;
	}

	.uni-icon {
		font-size: 26upx;
		color: #666666;
	}

	.cell-tit {
		color: #666666;
		font-size: 24upx;
	}

	.cell-tip {
		color: #333;
		font-size: 26upx;
	}

	.uni-list-cell {
		padding: 30upx 0;
	}

	.address-tit {
		font-size: 30upx;
		font-weight: bold;
		color: rgb(51, 51, 51);
		line-height: 70upx;
		position: relative;
		padding: 30upx 0 30upx 30upx;
		border-bottom: 1px solid #F2F2F2;
	}

	.address-tit::before {
		content: '';
		width: 6upx;
		height: 27upx;
		background: rgba(111, 215, 88, 1);
		border-radius: 3upx;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
	}



	.content-warpe {
		padding: 0 2.5%;
		margin: 0 auto;
		background: #FFFFFF;
	}
	.mobile {
		font-weight: bold;
		color: #333333;
	}

	.icon-swiper {
		display: flex;
		align-items: center;
	}

	.address-section {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;

		.order-content {
			display: flex;
			align-items: center;
			width: 100%;
		}

		.cen {
			display: flex;
			flex-direction: column;
			flex: 1;
			font-size: 28upx;
		}

		.name {
			font-size: 34upx;
			margin-right: 24upx;
		}

		.address {
			margin-top: 16upx;
			margin-right: 20upx;
		}
	}

	.goods-section {
		margin-top: 16upx;

		.g-header {
			display: flex;
			align-items: center;
			height: 84upx;
			padding: 0 30upx;
			position: relative;
		}

		.name {
			font-size: 30upx;
			margin-left: 24upx;
		}

		.g-item {
			display: flex;
			padding: 20upx;

			.product-img {
				flex-shrink: 0;
				display: block;
				width: 160upx;
				height: 160upx;
				border-radius: 6upx;
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
				word-break: break-all;
				display: -webkit-box;
				overflow: hidden;
				line-height: 1.5;
				text-overflow: ellipsis;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				font-weight: bold;
				color: #333333;
			}

			.spec {
				font-size: 24upx;
				color: #999999;
			}

			.price-box {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 32upx;
				margin-topl: 20upx;

				.price {
					font-size: 15px;
					font-weight: bold;
					color: #fe2c2c;
				}

				.number {
					font-size: 13px;
					color: #111111;
					margin-left: 20upx;
				}
			}

			.step-box {
				position: relative;
			}
		}
	}

	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 995;
		display: flex;
		align-items: center;
		width: 100%;
		height: 90upx;
		justify-content: space-between;
		font-size: 30upx;
		background-color: #fff;
		z-index: 998;
		box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
		box-sizing: border-box;

		.price-content {
			padding-left: 30upx;
			color: #F55555;
		}

		.price-tip {
			margin-left: 8upx;
		}

		.price {
			font-size: 36upx;
		}

		.submit {
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #F55555;
			color: #fff;
			height: 90upx;
			font-size: 28upx;
			width: 308upx;
		}
	}
</style>
