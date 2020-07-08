<template>
	<view class="container">
		<view class="carousel">
			<swiper indicator-dots circular="true" duration="400" interval='3000' indicator-active-color="#72BD54"
			 indicator-color="#ff55ff">
				<swiper-item class="swiper-item" v-if="dataobject.menusvideo!=''">
					<view class="image-wrapper">
						<video class="image-wrapper" :src="dataobject.menusvideo"  custom-cache="false" autoplay controls show-center-play-btn  enable-play-gesture
						  :poster="dataobject.menusimages[0]" object-fit="cover"></video>
					</view>
				</swiper-item>
				<swiper-item class="swiper-item" v-for="(v,k) in dataobject.menusimages" :key="k">
					<view class="image-wrapper">
						<image :src="v" class="loaded" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="introduce-section c-list">
			<text class="title">{{dataobject.menusname}}</text>
			<view class="price-box">
				<text class="price-tip">{{dataobject.menusdescs}}</text>
			</view>
		</view>
		<view class="food-step-con">
			<view class="cpdetails-title">
				用料展示
			</view>
			<m-table :options="dataobject.materialList" />
		</view>
		<view class="food-step-con">
			<view class="cpdetails-title">
				烹饪步骤
			</view>
			<view class="cpdetails-img-icon" v-for="(v,k) in dataobject.stepList" :key="k">
				<view class="cpdetails-img">
					<image :src="v.stepimage" mode=""></image>
					<view class="cpdetails-step">
						第{{k+1}}步
					</view>
				</view>
				<view class="cpdetails-info">
					{{v.stepname}}
				</view>
			</view>
		</view>
		<!-- 3个推荐菜谱 -->
		<cp-details ref="cpdetails"></cp-details>
		<!-- 底部操作菜单 -->
		<uni-goods-nav :fill="true" @click="onClick" @buttonClick="buttonClick"></uni-goods-nav>
		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="stopPrevent" @click.stop="toggleSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop='stopPrevent'>
				<cp-scoll-x ref="cpDetailsScoll"></cp-scoll-x>
				<view class="uni-flex uni-align-center pos-btn">
					<view class="uni-flex-item one">
						组合结算价： <text class="price">￥{{groupPrice}}</text>
					</view>
					<view class="uni-flex-item two" @click="groupCart">
						一键加车
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniGoodsNav from "@/components/mycom/cp-good-nav.vue"
	import cpDetails from "@/components/mycom/cpDetails.vue"
	import cpScollX from "@/components/mycom/cp-scoll-x.vue"
	import mTable from '@/components/p-table/mtable/mtable.vue'
	export default {
		components: {
			uniGoodsNav,
			cpDetails,
			cpScollX,
			mTable
		},
		data() {
			return {
				active: 0,
				num: 1,
				specClass: 'none',
				id: '',
				showLoading:false,
				dataobject: {
					menusid: "", //菜谱id
					menusname: "", //菜谱名称
					menusimage: "", //菜谱图片
					menusimages: [], //菜谱轮播图
					menusvideo: "", //菜谱视频
					menusdescs: "", //菜谱简介
					looknum: "", //观看人数
					materialList: [], //  用料
					stepList: [],
					goodsList: []
				},
				complineList: []
			};
		},
		onLoad(options) {
			this.id = options.id;
			this.$nextTick(()=>{
				this.loadData();
			})
			
		},
		computed: {
			groupPrice() {
				let price = 0;
				if(this.dataobject.goodsList!=undefined){
					this.dataobject.goodsList.forEach(item => {
						price += item.price - 0
					})
					return this.$api.parsePrice(price)
				}else{
					return 0
				}

			}
		},
		onShow() {
			if (uni.getStorageSync('uid')) {
				getApp().globalData.uid = uni.getStorageSync('uid');
			}
		},
		onShareAppMessage(){},
		methods: {
			pause(){
				
			},
			waite(){
				console.log('waite')
			},
			stopPrevent() {},
			//  组合购买
			groupCart() {
				let parmas = {
					cmd: "addmenusgoodscar",
					uid: getApp().globalData.uid,
					menusid: this.id
				}
				this._reqw.ipost(parmas).then(res => {
					res.result == 0 ? (this.specClass = 'none', this.$api.tip('添加成功')) : this.$api.tip(res.resultNote)
				}).catch(err => {})

			},
			loadData() {
				let parmas = {
					menusid: this.id,
					cmd: "menusdetail"
				}
				this._reqw.ipost(parmas).then(res => {
					console.log(res)
					res.result == 0 ? (res.dataobject.menusdescs = this.$api.fromDesc(res.dataobject.menusdescs), this.dataobject =
						res.dataobject, this.$refs.cpDetailsScoll.set(res.dataobject.goodsList), this.$refs.cpdetails.set(res.dataobject
							.recommendList)) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			//  底部操作栏
			onClick(e) {
				if (getApp().globalData.uid == '') {
					this.$api.navTo('/pages/author')
				} else{
				this.$api.navTo('/pages/carts')
				}
			},
			buttonClick(e) {
				this.toggleSpec(e.index)
			},
			//规格弹窗开关
			toggleSpec(n) {
				if (getApp().globalData.uid == '') {
					this.$api.navTo('/pages/author')
				} else {
					if (this.specClass === 'show') {
						this.specClass = 'hide';
						setTimeout(() => {
							this.specClass = 'none';
						}, 250);
					} else if (this.specClass === 'none') {
						this.specClass = 'show';
					}
				}

			}
		}
	};
</script>

<style lang="scss" scoped>
	.loadingImg{
		width: 124upx !important;
		height: 124upx !important;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		z-index: 9999;
	}
	.detail-desc {
		padding: 0 20upx;
	}

	.cpdetails-cailiao {
		border: 1px solid #CCCCCC;
		padding: 30upx;
		display: flex;
		flex-wrap: wrap;
		border-radius: 10upx;
	}

	.cpdetails-cailiao-item {
		width: 50%;
		display: flex;
		justify-content: space-around;
		border-bottom: 2upx solid #CCCCCC;
	}

	.border-left {
		border-left: 2upx solid #CCCCCC;
	}

	.food-step-con {
		padding: 0 30upx;
	}

	.cpdetails-img-icon {
		margin-bottom: 20upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.cpdetails-img {
		position: relative;
		width: 690upx;
		border-radius: 4upx;

		image {
			width: 690upx;
			height: 437upx;
			border-radius: 4upx;
		}
	}

	.cpdetails-step {
		position: absolute;
		top: 0;
		left: 0;
		background: rgba(111, 215, 88, 1);
		color: #FFFFFF;
		font-size: 26upx;
		width: 117upx;
		height: 43upx;
		text-align: center;
	}

	.cpdetails-info {
		font-size: 26upx;
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
		text-align: left;
		width: 100%;
		padding: 10upx 0;
	}

	.cpdetails-title {
		font-size: 30upx;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		line-height: 64upx;
	}

	.price {
		color: #FF0000;
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
		color: #333333;

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
		padding-bottom: 100px;
	}

	.carousel {
		height: 722upx;
		position: relative;
		.image-wrapper {
			width: 750upx;
			height: 722upx;
		}
         swiper{
			width: 750upx;
			height: 722upx; 
		 }
		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			width: 750upx;
			overflow: hidden;
			position: relative;
			image {
				height: 750upx;
				width: 750upx;
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

	/*  详情 */
	.detail-desc {
		margin-top: 16upx;
		padding-bottom: 80upx;

		.d-header {
			display: flex;
			align-items: center;
			height: 80upx;
			position: relative;

			text {
				padding: 0 20upx;
				position: relative;
				z-index: 1;
				color: #333333;
				font-weight: 600;
			}
		}
	}

	/* 规格选择弹窗 */
	/* 规格选择弹窗 */
	.attr-content {
		padding: 10upx 0;
		width: 100%;
		box-sizing: border-box;

		.a-t {
			display: flex;
			justify-content: space-between;
			padding: 30upx;
			position: relative;


			image {
				width: 200upx;
				height: 200upx;
				flex-shrink: 0;
				border-radius: 8upx;
			}

			.right {
				display: flex;
				flex: 1;
				flex-direction: column;
				justify-content: space-around;
				padding-left: 224upx;
				line-height: 42upx;

				.price {
					margin-bottom: 10upx;
				}

				.selected-text {
					margin-right: 10upx;
				}
			}
		}
	}

	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.2s linear both;
			}

			.layer {
				animation: showLayer 0.2s linear both;
			}
		}

		&.hide {
			.mask {
				animation: hidePopup 0.2s linear both;
			}

			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}

		&.none {
			display: none;
		}

		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}

		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			min-height: 40vh;
			background-color: #fff;
		}

		@keyframes showPopup {
			0% {
				opacity: 0;
			}

			100% {
				opacity: 1;
			}
		}

		@keyframes hidePopup {
			0% {
				opacity: 1;
			}

			100% {
				opacity: 0;
			}
		}

		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}

			100% {
				transform: translateY(0%);
			}
		}

		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}

			100% {
				transform: translateY(120%);
			}
		}
	}
</style>
