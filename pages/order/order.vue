<template>
	<view class="content">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{current: tabCurrentIndex == index}"
			 @click="tabClick(index)">
				{{item.text}}
			</view>
		</view>
		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadDataMore">
					<!-- 订单列表 -->
					<block v-for="(item,index) in tabItem.dataList" :key="index">
						<view class="order-item bottom-border" @click.stop="gotoDetails(item)">
							<view class="uni-flex pad">
								<view class="uni-flex-item">
									订单号:{{item.ordernum}}
								</view>
								<view class="order-status-right uni-flex uni-align-center">
									<!-- "state":""//订单状态 0待付款 1待发货 2待收货 3待评价 4 已完成 5退款中 6 已退款 7已取消 -->
									<view class="order-status-right-one" v-if="item.state==0">
										待付款
									</view>
									<view class="order-status-right-one" v-if="item.state==1">
										待发货
									</view>
									<view class="order-status-right-one" v-if="item.state==2">
										待收货
									</view>
									<view class="order-status-right-one" v-if="item.state==3">
										待评价
									</view>
									<view class="order-status-right-one" v-if="item.state==4">
										已完成
									</view>
									<view class="order-status-right-one" v-if="item.state==5">
										退款中
									</view>
									<view class="order-status-right-one" v-if="item.state==6">
										已退款
									</view>
									<view class="order-status-right-one" v-if="item.state==7">
										已取消
									</view>
									<view class="uni-flex del-icon uni-space" v-if="item.state==7||item.state==6||item.state==4" @click.stop="deleteOrder(item.ordernum,index)">
										<view class="iconfont icon-delete">
										</view>
									</view>
								</view>
							</view>
							<block v-for="(v,k) in item.ordertailList" :key="k">
								<view class="uni-flex pad">
									<view class="order-img-con">
										<image class="goods-img" :src="v.goodsimage"></image>
									</view>
									<view class="uni-flex-item" style="margin-left: 10px;">
										<view class="uni-flex uni-space">
											<text class="title uni-ellipsis">{{v.goodsname}}</text>
										</view>
										<view class="skuname"> <text>{{v.skuname}}</text> </view>
										<view class="price-box uni-flex uni-space">
											<text class="order-status-right-price">￥{{v.skuprice}}</text>
											<view style="font-size: 20rpx;">× {{v.goodsnum}}</view>
										</view>
									</view>
								</view>
							</block>
							<!-- "state":""//订单状态 0待付款 1待发货 2待收货 3待评价 4 已完成 5退款中 6 已退款 7已取消 -->
							<view class="uni-flex uni-space uni-align-center">
								<view class="">
								</view>
								<view class=" uni-flex uni-space uni-align-center" style="padding: 30upx 0;">
									<view class="uni-badge-green pay" v-if="item.state==0" @click.stop="payOrder(item)">去支付</view>
									<view class="uni-badge-green" v-if="item.state==3" @click.stop="evaOrder(item.ordernum)">评价晒单</view>
									<view class="uni-badge-green" v-if="item.state==2" @click.stop="finishedOrder(item.ordernum,index)">确认收货</view>
									<!-- <view v-if="item.state==4" class="action-btn" @click.stop="deleteOrder(item.ordernum,index)">删除订单</view> -->
								</view>
							</view>
						</view>
					</block>
					<!-- 结束 -->
					<uni-load-more :status="tabItem.loadingType" v-if="tabItem.dataList.length!=0"></uni-load-more>
					<empty v-else></empty>
				</scroll-view>
			</swiper-item>
		</swiper>
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
				navList: [{
						text: '全部',
						dataList: [],
						loadingType: "loading",
						type: '',
						load: false
					},
					{
						text: '待付款',
						dataList: [],
						loadingType: "loading",
						type: 0,
						load: false
					},
					{
						text: '待收货',
						dataList: [],
						loadingType: "loading",
						type: 1,
						load: false
					},
					{
						text: '待评价',
						dataList: [],
						loadingType: "loading",
						type: 2,
						load: false
					},
					{
						text: '退款售后',
						dataList: [],
						loadingType: "loading",
						type: 3,
						load: false
					}
				],
			};
		},
		onLoad(options) {
			this.tabCurrentIndex = options.id;
		},
		onShow() {
			this.loadData();
		},
		// 0待付款 1待收货 2待评价 3退款售后
		methods: {
			initData() {
				let data = this.navList[0];
				data.page = data.totalPage = 1;
				data.dataList = [];
				this.loadData();
			},
			loadData() {
				let n = this.tabCurrentIndex,
					data = this.navList[n];
				let parmas = {
					cmd: 'myorderlist',
					uid: getApp().globalData.uid,
					type: data.type,
					nowPage: this.page,
					pageCount: '10'
				};
				if (!data.load) {
					console.log(parmas)
					data.load = true;
					this._reqw.ipost(parmas).then(res => {
						res.result == 0 ? ((res.totalPage > 1 ? data.loadingType = 'more' : data.loadingType = "noMore"), data.load =
							false, this.totalPage = res.totalPage, res.dataList
							.forEach(item => {
								data.dataList.push(item)
							})) : this.$api.tip(res.resultNote)
					}).catch(err => {})
				}
			},
			loadDataMore() {
				console.log('加载')
				let num = this.tabCurrentIndex;
				this.totalPage > this.page ? (this.page += 1, this.loadData()) : setTimeout(() => {
					this.navList[num].loadingType = "noMore"
				}, 1000)
			},
			//swiper 切换
			changeTab(e) {
				this.tabCurrentIndex = e.target.current;
				let n=e.target.current,data=this.navList[n];
				data.dataList=[];
				this.page = this.totalPage = 1;
				this.initData()
			},
			//顶部tab点击
			tabClick(k) {
				this.tabCurrentIndex = k;
			},
			evaOrder(id) {
				this.$api.navTo(`/pages/order/addEva?id=${id}`)
			},
			//  确认收货
			finishedOrder(id, k) {
				let n = this.tabCurrentIndex,
					data = this.navList[n];
					console.log(n,data)
				let parmas = {
					cmd: 'orderconfirm',
					uid: getApp().globalData.uid,
					ordernum: id
				};
				console.log(parmas);
				this._reqw
					.ipost(parmas)
					.then(res => {
						res.result == 0 ? (this.$api.tip('收货成功'),n==0?this.initData():data.dataList.splice(k,1)) :
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			gotoDetails(e) {
				let n=this.tabCurrentIndex,url='';
				if(e.state==5||e.state==6){
					url=`/pages/order/tuiDetails?id=${e.ordernum}`
				}else{
					url=`/pages/order/orderDetails?id=${e.ordernum}`
				}
				this.$api.navTo(url)
			},
			payOrder(e) {
				this.$api.navTo(`/pages/order/payOrder?id=${e.ordernum}&price=${e.allprice}`)
			},
			//  删除订单
			deleteOrder(id, k) {
				let n = this.tabCurrentIndex,
					data = this.navList[n],
					self = this;
				uni.showModal({
					cancelText: "取消",
					confirmText: "确定",
					content: "确定删除吗",
					success(res) {
						if (res.confirm) {
							let parmas = {
								cmd: 'orderdelete',
								uid: getApp().globalData.uid,
								ordernum: id
							};
							console.log(parmas);
							self._reqw
								.ipost(parmas)
								.then(res => {
									res.result == 0 ? (self.$api.tip('删除成功'), n == 0 ? self.initData() : data.dataList.slice(k, 1)) :
										self.$api.tip(res.resultNote);
								})
								.catch(err => {});
						}
					}
				})
			}
		},
		onHide() {
			let n = this.tabCurrentIndex,
				data = this.navList[n];
			data.page = data.totalPage = 1;
			data.dataList = [];
			data.load = false;
		}
	}
</script>

<style lang="scss">
	.pad {
		padding: 20upx 0;
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
		background: #FFFFFF;
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
		height: 126upx;
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
