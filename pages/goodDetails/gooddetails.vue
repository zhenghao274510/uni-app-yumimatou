<template>
	<view class="container">
		<view class="carousel">
			<swiper indicator-dots circular="true" duration="400" autoplay="true" interval="3000" indicator-active-color="#72BD54" indicator-color="#ff55ff">
				<swiper-item class="swiper-item" v-for="(v, k) in dataobject.goodsimages" :key="k">
					<view class="image-wrapper">
						<image :src="v" class="loaded" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="introduce-section">
			<text class="title">{{ dataobject.goodsname }}</text>
			<view class="price-box">
				<text class="price-tip">{{ dataobject.goodsdescs }}</text>
			</view>
			<view class="uni-flex">
				<view class="price-box">
					<text class="">¥</text>
					<text class="price">{{firstObj.price}}</text>
					<text v-if="firstObj.units!=''">/{{firstObj.units}}</text>
				</view>
				<view class="sku">
					月售 {{dataobject.goodsnum}}
				</view>
			</view>
		</view>
		<view class="s-line"></view>
		<view class="uni-flex uni-align-center uni-space c-list" @click="toggleSpec(1)">
			<view class="uni-flex-tit" v-if="showObj.name==''">请选择商品规格</view>
			<view class="uni-flex-tit" v-else>已选择商品规格</view>
			<view class="uni-flex-item" style="display: flex;align-items: center;">
				<view class="uni-ellipsis showName" v-if="showObj.name!=''" style="color: #666666;margin-right: 20rpx;">
					{{showObj.name}}
				</view>
				<view class="uni-flex-item" v-else>
					
				</view>
				<view class="uni-icon uni-icon-arrowright"></view>
			</view>
			
		</view>
		<view class="choseNum" v-if="showNum">
			<view style="margin-bottom: 10upx;">购买数量</view>
			<uni-number-box class="step" min="1" @change="numberChange" :value="num"></uni-number-box>
		</view>
		<view class="uni-flex uni-align-center  c-list">
			<text class="uni-flex-pei">配送</text>
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
		<home-list ref="homeList" :type="2"></home-list>
		<cp-details ref="cpdetails"></cp-details>
		<!-- 底部操作菜单 -->
		<uni-goods-nav :fill="true" @click="onClick" @buttonClick="buttonClick" :collect="dataobject.collect"></uni-goods-nav>
		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="stopPrevent" @click.stop="toggleSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<scroll-view scroll-y="true" class="layer attr-content" @click.stop="stopPrevent">
				<view class="sku-content">
					<view class="a-t">
						<image :src="dataobject.goodsimage" class="img"></image>
						<view class="right">
							<text class="guge-price" style="color: #ff0000;"><text style="font-size: 12px;">￥</text> <text style="font-size: 30upx;">{{ currentObj.price }}</text>
							</text>
							<!-- <text class="stock" style="color: #999999;">库存：{{ currentObj.stocks }}</text> -->
							<view class="selected">
								已选：
								<text class="selected-text">{{ currentObj.name }}</text>
							</view>
						</view>
						<view class="uni-icon uni-icon-close" style="color: #999999;" @click.stop="specClass ='none'"></view>
					</view>
					<view class="attr-list">
						<view class="item-list">
							<text v-for="(v, k) in dataobject.skuList" :key="k" class="tit" :class="{selected:active==k}" @click.stop="choseSku(v,k)">{{ v.name }}</text>
						</view>
					</view>
					<!-- <view class="choseNum">
						<view style="margin-bottom: 10upx;">购买数量</view>
						<uni-number-box class="step" min="1" @change="numberChange" :value="num"></uni-number-box>
					</view> -->
					<view class="uni-flex uni-align-center pos-btn">
						<view class="uni-flex-item two" @click.stop="choseOk">确 定</view>
					</view>
				</view>

			</scroll-view>
		</view>
	</view>
</template>

<script>
	import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue';
	import eva from '@/components/mycom/goodEva.vue';
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue';
	import homeList from '@/components/mycom/homeList.vue';
	import cpDetails from "@/components/mycom/cpDetails.vue"
	export default {
		components: {
			uniNumberBox,
			eva,
			uniGoodsNav,
			homeList,
			cpDetails
		},
		data() {
			return {
				active:'',
				num: 1,
				display: false,
				productId: '',
				specClass: 'none',
				showNum:false,
				firstObj:{
					skuid: '', //规格id
					name: '', //规格名称
					price: '', //规格价格
					stocks: '', //规格库存
					units:''
				},
				showObj:{
					skuid: '', //规格id
					name: '', //规格名称
					price: '', //规格价格
					stocks: '', //规格库存
					units:''
				},
				currentObj: {
					skuid: '', //规格id
					name: '', //规格名称
					price: '', //规格价格
					stocks: '' ,//规格库存，
					units:''
				},
				content: '',
				dataobject: {
					goodsid: '', //商品id
					goodsname: '', //商品名称
					goodsimage: '', //商品图片
					goodsimages: [], //商品轮播图
					goodsdescs: '', //商品简介
					goodscontent: '', //商品详情
					goodsnum:'',
					skuList: [{
						//规格
						skuid: '', //规格id
						name: '', //规格名称
						price: '', //规格价格
						stocks: '' //规格库存
					}]
				},
				evaList: [],
				complineList: [],
				Showtime:true
			};
		},
		onLoad(options) {
			this.productId = options.id;
			this.$nextTick(function() {
				this.loadData();
			})
		},
		watch:{
			dataobject:{
				handler(n){
					if(n.skuList.length==1){
						this.showObj=this.currentObj=this.firstObj=n.skuList[0];
					}else{
						this.currentObj=this.firstObj=n.skuList[0];
					}
					
				},
				deep:true
			},
			showObj:{
				handler(n){
					if(n.name!=''){
						this.showNum=true;
					}
				},
				deep:true
			}
		},
		onShow() {
			if (uni.getStorageSync('uid')) {
				getApp().globalData.uid = uni.getStorageSync('uid');
				this.getCompline();
			}
			let h = new Date().getHours();
			if(h>=19||h<8){
				this.Showtime=true
			}else{
				this.Showtime=false
			}
		},
		onShareAppMessage(){},
		methods: {
			choseOk(){
				this.showObj=this.currentObj;
				setTimeout(() => {
					this.specClass = 'none';
				}, 250);
			},
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
					cmd: 'Goodsdetail',
					goodsid: this.productId
				};
				this._reqw
					.ipost(parmas)
					.then(res => {
						console.log(res)
						res.result == 0 ?
							(this.dataobject = res.dataobject,res.dataobject.goodsdescs=this.$api.fromDesc(res.dataobject.goodsdescs), (res.evaluateobj?
									this.$set(this.evaList, 0, res.evaluateobj) : this.evaLis = []),
								(res.goodsList? this.$refs.homeList.set(res.goodsList):''),
								(res.menusList?this.$refs.cpdetails.set(res.menusList):''),
								this.content = this.$api.formText(res.dataobject.goodscontent, uni.getStorageSync('screen').screenWidth - 20)
							) :
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			numberChange(e) {
				this.num = e.number;
			},
			//  底部操作栏
			onClick(e) {
				if (getApp().globalData.uid == ''){
					this.$api.navTo('/pages/author')
				} else{
					if(e.index==0){
						this.$api.callPhone(uni.getStorageSync('phone'));
					}else{
						this.$api.navTo('/pages/carts')
					}
				}
			},
			buttonClick(e) {
				if(getApp().globalData.uid==''){
					this.$api.navTo('/pages/author')
				}else{
					if(this.showObj.skuid==''){
						this.$api.tip('请先选择商品规格')
					}else{
						this.finishChose(e.index);
					}
				}
			},
			//规格弹窗开关
			toggleSpec(n) {
				if (getApp().globalData.uid == ''){
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
			},
			choseSku(v, k) {
				console.log(v, k)
				this.active = k;
				this.currentObj = v;
			},
			finishChose(n) {
				n == 0 ? this.addCart() : this.buyGoods()
			},
			addCart() {
					let parmas = {
						cmd: 'addgoodscar',
						uid: getApp().globalData.uid,
						goodsid: this.productId,
						skuid: this.currentObj.skuid,
						count: this.num
					}
					this._reqw.ipost(parmas).then(res => {
						res.result == 0 ? (this.$api.tip('加入购物车成功！'), this.specClass = "none",this.showObj=this.currentObj) : this.$api.tip(res.resultNote)
					}).catch(err => {})

			},
			buyGoods() {
					let arry = [{
						goodsname: this.dataobject.goodsname,
						goodsimage: this.dataobject.goodsimage,
						skuid: this.currentObj.skuid,
						goodsid: this.productId,
						name: this.currentObj.name,
						numbers: this.num,
						price: this.currentObj.price
					}];
					this.specClass = 'none';
					this.$api.navTo(`/pages/order/finishOrder?goods=${JSON.stringify(arry)}&type=goods`)
			}
		}
	};
</script>

<style lang="scss" scoped>
	.showName{
		width: 400upx;
		text-align: right;
	}
	.sku-content {
		background: #FFFFFF;
		min-height:calc(40vh - 50upx) ;
		margin-top: 50upx;
	}
	.detail-desc {
		padding: 0 20upx;
	}

	.uni-com {
		width: 158upx;
		height: 49upx;
		position: relative;
		color: #f55555;
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
	.uni-flex-pei{
		font-size: 30upx;
		font-weight: 600;
		color: rgba(51, 51, 51, 1);
		margin-right: 20upx;
	}

	.uni-flex-tit {
		font-size: 30upx;
		font-weight: 600;
		color: rgba(51, 51, 51, 1);
		margin-right: 20upx;
		width: 230upx;
	}

	.uni-space {
		justify-content: space-between;
	}

	.c-list {
		border-bottom: 2px solid #f6f6f6;
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
		color: #ffffff;
		height: 88upx;
		line-height: 88upx;
	}

	.one {
		background: #6fd758;
	}

	.two {
		background: #f55555;
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
		color: #cccccc;
	}

	.choseNum {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding:30upx 30upx;
		// background: #FFFFFF;
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

	/* 规格选择弹窗 */
	/* 规格选择弹窗 */
	.attr-content {
		// z-index: 999 !important;
		// padding: 10upx 0;
		width: 100%;
		// box-sizing: border-box;

		.a-t {
			display: flex;
			justify-content: space-between;
			padding: 0 30upx;
			position: relative;
			// z-index: 999 !important;
			padding-top: 40upx;
			// background: #FFFFFF;

			.img {
				width: 200upx;
				height: 200upx;
				// flex-shrink: 0;
				border-radius: 8upx;
				position: absolute;
				top: -40upx;

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

		.attr-list {
			display: flex;
			flex-direction: column;
			margin-top:50upx;
		}

		.item-list {
			padding: 0 30upx;
			display: flex;
			flex-wrap: wrap;

			text {
				display: flex;
				align-items: center;
				justify-content: center;
				/* background: #eee; */
				margin-right: 20upx;
				margin-bottom: 20upx;
				border-radius: 50upx;
				min-width: 60upx;
				height: 60upx;
				padding: 0 20upx;
				border: 1px solid #cccccc;
				font-size: 24upx;
			}

			.selected {
				border: none;
				color: #ffffff;
				background: #6fd758;
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
			// background-color: #fff;
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

	/* 底部操作菜单 */
	.page-bottom {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 95;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100upx;
		background: rgba(255, 255, 255, 0.9);
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, 0.5);

		.p-b-btn {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 96upx;
			height: 80upx;
		}

		.action-btn-group {
			display: flex;
			height: 76upx;
			border-radius: 100px;
			overflow: hidden;
			box-shadow: 0 20upx 40upx -16upx #fa436a;
			box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
			background: linear-gradient(to right, #ffac30, #fa436a, #f56c6c);
			margin-left: 20upx;
			position: relative;

			&:after {
				content: '';
				position: absolute;
				top: 50%;
				right: 50%;
				transform: translateY(-50%);
				height: 28upx;
				width: 0;
				border-right: 1px solid rgba(255, 255, 255, 0.5);
			}

			.action-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28upx;
				width: 180upx;
				height: 100%;
				padding: 0;
				border-radius: 0;
				background: transparent;
			}
		}
	}
</style>
