<template>
	<view class="container">
		<view class="carousel">
			<swiper indicator-dots circular="true" duration="400" autoplay="true" interval='3000' indicator-active-color="#72BD54"
			 indicator-color="#ff55ff">
				<swiper-item class="swiper-item" v-for="(v,k) in dataobject.goodsimages" :key="k">
					<view class="image-wrapper">
						<image :src="v" class="loaded" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="introduce-section">
			<text class="title">{{dataobject.goodsname}}{{dataobject.name}}</text>
			<view class="price-box">
				<text class="price-tip">{{dataobject.goodsdescs}}</text>
			</view>
			<view class="uni-flex">
				<view class="price-box">
					<text class="">¥</text>
					<text class="price">{{dataobject.groupprice}}</text>
					<text v-if="dataobject.units!=''">/{{dataobject.units}}</text>
				</view>
				<view class="sku">
					月售 {{dataobject.goodsnum}}
				</view>
			</view>
		</view>
		<view class="s-line">
		</view>
		<view class="uni-flex uni-align-center  c-list">
			<text class="uni-flex-tit">配送</text>
			<view class="con" v-if="Showtime">19:00～8:00下单的,8:00开始配送,1～2小时送达！</view>
			<view class="con" v-else>8:00～19:00下单的,当天配送,1～2小时送达！</view>
		</view>
		<view class="uni-flex uni-align-center  c-list" v-if="display">
			<text class="uni-flex-tit">已领劵</text>
			<view class="uni-flex">
				<block v-for="(v,k) in complineList" :key="k">
					<view class="uni-com" v-if="k<=2">
						<image src="/static/img/home/bg_com.png" class="uni-com-bg"></image>
						满{{v.fullprice}}减{{v.price}}
					</view>
				</block>
			</view>
		</view>
		<!-- 评价 -->
		<eva :dataList='evaList' :productId="productId" @click="moreEva"></eva>
		<view class="detail-desc">
			<view class="d-header"><text>商品详情</text></view>
			<rich-text :nodes="content"></rich-text>
		</view>
		<!-- <home-list></home-list> -->

		<!-- 底部操作菜单 -->
		<uni-goods-nav :fill="true" @click="onClick" @buttonClick="buttonClick"></uni-goods-nav>
	</view>
</template>

<script>
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import eva from "@/components/mycom/goodEva.vue"
	import uniGoodsNav from "@/components/group-goods-nav/group-goods-nav.vue"
	import homeList from "@/components/mycom/homeList.vue"
	export default {
		components: {
			uniNumberBox,
			eva,
			uniGoodsNav,
			homeList
		},
		data() {
			return {
				btnText: '立即购买',
				active: 0,
				num: 1,
				display: false,
				productId: '',
				content: '',
				dataobject: {
					groupid: "", //团购商品id
					goodsid: "", //商品id
					goodsname: "", //商品名称
					goodsimage: "", //商品图片
					goodsimages: [], //商品轮播图
					goodsdescs: "", //商品简介
					goodscontent: "", //商品详情
					skuid: "", //规格id
					name: "", //规格名称
					price: "", //规格原价格
					stocks: "", //规格库存
					units: '',
					groupprice: "" //团购价
				},
				evaList: [],
				Showtime: true,
				complineList: []
			};
		},

		onLoad(options) {
			this.productId = options.id;
			this.loadData();

		},
		onShow() {
			if (uni.getStorageSync('uid')) {
				getApp().globalData.uid = uni.getStorageSync('uid');
				this.getCompline();
			}
			let h = new Date().getHours();
			if (h >=19 || h <8) {
				this.Showtime = true
			} else {
				this.Showtime = false
			}

		},
		onShareAppMessage(){},
		methods: {
			stopPrevent() {},
			getCompline() {
				let parmas = {
					cmd: 'getnotreceivecoupon',
					uid: getApp().globalData.uid
				}
				this._reqw.ipost(parmas).then(res => {
					// console.log('compline',res)
					res.result == 0 ? (res.dataList.length != 0 ? (this.display = true, res.dataList.forEach(item => {
						item.fullprice = parseInt(item.fullprice);
						item.price = parseInt(item.price);
					}), this.complineList = res.dataList) : this.display = false) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			loadData() {
				let parmas = {
					cmd: 'groupGoodsdetail',
					groupid: this.productId
				}
				this._reqw.ipost(parmas).then(res => {
					res.result == 0 ? (res.dataobject.goodsdescs = this.$api.fromDesc(res.dataobject.goodsdescs), this.dataobject =
						res.dataobject, (res.evaluateobj ? this.$set(this.evaList, 0, res.evaluateobj) : ''), this.content =
						this.$api.formText(res.dataobject.goodscontent, uni.getStorageSync(
							"screen").screenWidth - 20)) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			moreEva() {
				this.$api.navTo(`/pagesE/shop/evaList?id=${this.productId}`)
			},
			buttonClick() {
				if (getApp().globalData.uid == '') {
					this.$api.navTo('/pages/author')
				} else {
					// 立即成团
					let data = this.dataobject;
					let list = [{
						goodsname: data.goodsname,
						goodsimage: data.goodsimage,
						name: data.name,
						groupid: data.groupid,
						numbers: 1,
						price: data.groupprice

					}]
					this.$api.navTo(`/pages/order/finishOrder?type=group&goods=${JSON.stringify(list)}`)
				}

			},
			//  底部操作栏
			onClick(e) {
				if (getApp().globalData.uid == '') {
					this.$api.navTo('/pages/author')
				} else {
					if (e.index == 0) {
						this.$api.callPhone(uni.getStorageSync('phone'));
					} else {
						this.$api.navTo('/pages/carts')
					}
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.detail-desc {
		padding: 0 20upx;
	}

	.uni-com {
		width: 158upx;
		height: 49upx;
		position: relative;
		color: #F55555;
		font-size: 24upx;
		text-align: center;
		line-height: 49upx;
		margin-right: 30upx;
	}

	.uni-com-bg {
		width: 158upx;
		height: 49upx;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}

	.con {
		color: #999999;
		font-size: 24upx;
	}

	.uni-flex-tit {
		font-size: 30upx;
		font-weight: 600;
		color: rgba(51, 51, 51, 1);
		margin-right: 20upx;
	}

	.uni-space {
		justify-content: space-between;
	}

	.c-list {
		border-bottom: 2px solid #F6F6F6;
		padding: 30upx;
		align-items: center;
	}

	.pos-btn {
		position: fixed;
		bottom: 0;
		width: 100%;
	}

	.uni-flex-item {
		text-align: center;
		color: #FFFFFF;
		height: 88upx;
		line-height: 88upx;
	}

	.one {
		background: #6FD758;

	}

	.two {
		background: #F55555;
	}

	.sku {
		color: #999999;
		font-size: 24upx;
		margin-left: 30upx;
		margin-top: 14upx;
	}

	.price-tip {
		color: #999999;
		font-size: 26upx;
	}

	.uni-icon-arrowright {
		font-size: 30upx;
		color: #CCCCCC;
	}

	.choseNum {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20upx 30upx;
	}

	.container {
		padding-bottom: 50px;
	}

	.carousel {
		height: 722upx;
		position: relative;

		swiper {
			height: 100%;
		}

		.image-wrapper {
			width: 100%;
			height: 100%;
		}

		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	/* 标题简介 */
	.introduce-section {
		padding: 20upx 30upx;

		.title {
			font-size: 32upx;
			height: 50upx;
			line-height: 50upx;
			font-weight: bold;
		}

		.price-box {
			display: flex;
			align-items: baseline;
			color: $uni-bg-color;
		}

		.price {
			font-size: 36upx;
		}

		.coupon-tip {
			align-items: center;
			padding: 4upx 10upx;
			color: #fff;
			border-radius: 6upx;
			line-height: 1;
			transform: translateY(-4upx);
		}

		.bot-row {
			display: flex;
			align-items: center;
			height: 50upx;
			color: #333333;

			text {
				flex: 1;
			}
		}
	}

	.eva-box {
		display: flex;
		padding: 20upx 0;

		.portrait {
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			border-radius: 100px;
		}

		.right {
			flex: 1;
			display: flex;
			flex-direction: column;
			padding-left: 26upx;

			.con {
				padding: 20upx 0;
			}

			.bot {
				display: flex;
				justify-content: space-between;
			}
		}
	}
</style>
