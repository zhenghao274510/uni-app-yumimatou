<template>
	<view class="page-body">
		<cl-scoll-x ref="clScoll" @click="changeOneClass"></cl-scoll-x>
		<view class="category-list">
			<!-- 左侧分类导航 -->
			<scroll-view scroll-y="true" class="left">
				<!-- 	<view class="row"  :class="[k==0?'on':'']" @tap="load(v.cid,k)">
					<image src="/static/img/class/tuijian@2x.png" class="cl-tui-img"></image>
					<view class="text">
						{{v.name}}
					</view>
				
				</view> -->
				<view class="row" v-for="(v,k) in leftDataList" :key="k" :class="[k==showCategoryIndex?'on':'']" @tap="showCategory(v.cid,k)">
					<image src="/static/img/class/tuijian@2x.png" class="cl-tui-img"></image>
					<view class="text">
						{{v.name}}
					</view>

				</view>

			</scroll-view>
			<!-- 右侧子导航 -->
			<scroll-view scroll-y="true" class="right" @scrolltolower="loadMore">
				<view class="category">
					<view class="banner" @tap='toWhere'>
						<image :src="classImgObj.image"></image>
					</view>
					<view class="top-nav">
						<block v-for="(v,k) in navList" :key="k">
							<view class="top-nav-item" @click="changeTab(v,k)">
								<view class="top-nav-item-title" :class="{ iconColor:k == rightRow }">{{ v.title }}</view>
								<view class="top-nav-item-icon" v-if="k==2">
									<view class="iconfont icon-shangjiantou  " :class="{ iconColor: v.flag==1 }"></view>
									<view class="iconfont icon-xiajiantou" :class="{ iconColor: v.flag==2 }"></view>
								</view>
							</view>
						</block>
					</view>
					<view class="list" v-for="(v,k) in rightDataList" :key="k">
						<view class="uni-flex uni-align-center" @click="details(v.goodsid)">
							<image :src="v.goodsimage" class="class-p-img" lazy-load="true"></image>
							<view class="uni-flex-item">
								<view class="text">{{v.goodsname}}</view>
								<view class="sku-name">
									<!-- 规格1 -->
								</view>
								<view class="uni-flex uni-space">
									<view class="price-box">
										<text style="font-size: 22rpx;">￥</text><text class="price">{{v.goodsprice}}</text>
									</view>
									<!-- <image src="/static/img/class/tianjia@2x.png" mode="" class="class-img" @click="addCart(v)"></image> -->
								</view>
							</view>
						</view>
					</view>
				</view>
				<uni-load-more :status="status"></uni-load-more>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import clScollX from "@/components/mycom/cl-scoll-x.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		components: {
			clScollX,
			uniLoadMore
		},
		data() {
			return {
				status: 'loading',
				classImgObj: {
					imageid: "", //图片id
					image: "", //图片
					type: "", //绑定类型 0富文本 1商品
					content: "", //详情内容
					gid: "", //绑定商品id
				},
				topClassList: [],
				showCategoryIndex: 0,
				rightRow: 0,
				sort: '',
				leftCid: '',
				page: 1,
				totalPage: 1,
				leftDataList: [],
				rightDataList: [],
				navList: [{
						title: '综合',
						flag: '',
						sort: ''
					},
					{
						title: '销量',
						flag: '',
						sort: 0
					},
					{
						title: '价格',
						flag: 1,
						sort: 2
					}
				],
			}
		},
		methods: {
			toWhere() {
				let url = '';
				this.classImgObj.type == 0 ? (uni.setStorageSync('content', this.classImgObj.content), url =
					"/pages/mineoptions/webView") : url = `/pages/goodDetails/gooddetails?id=${this.classImgObj.gid}`
				this.$api.navTo(url)

			},
			changeOneClass(e) {
				getApp().globalData.cid = e.cid;
				this.leftDataList = this.rightDataList = [];
				this.showCategoryIndex = 0,
					this.page = this.totalPage = 1;
				this.getLeftData();
				this.getTuijian();
			},
			showCategory(id, k) {
				if (this.showCategoryIndex != k) {
					this.leftCid = id;
					this.showCategoryIndex = k;
					this.clear(0);
				}

			},
			initData() {
				uni.setNavigationBarTitle({
					title: "分类"
				})
				uni.setNavigationBarColor({
					frontColor: '#000000',
					backgroundColor: "#F8F8F8"
				})
				if (uni.getStorageSync('firstClass')) {
					this.$refs.clScoll.set(JSON.parse(uni.getStorageSync('firstClass')));
				}
				this.classImg = uni.getStorageSync('classImg');
				console.log('class')
				this.$nextTick(function() {
					this.getLeftData();
					this.getTuijian();
					this.getImg();
				})
			},
			getImg() {
				let parmas = {
					cmd: 'classimage'
				}
				console.log(parmas)
				this._reqw.ipost(parmas).then(res => {
					res.result == 0 ? this.classImgObj = res.dataobject :
						this.$api.tip(res
							.resultNote)
				}).catch(err => {})
			},
			loadMore() {
				console.log('calss  页面数据加载更多')
				this.status = "loading";
				this.totalPage > this.page ? (this.page += 1, this.getRightData(this.leftCid)) : setTimeout(() => {
					this.status = "noMore"
				}, 300)
			},
			getTuijian() {
				if (getApp().globalData.cid == '') {
					getApp().globalData.cid = JSON.parse(uni.getStorageSync('firstClass'))[0].cid;
				}
				let parmas = {
					cmd: 'firstclassfyGoodsList',
					cid: getApp().globalData.cid
				}
				console.log(parmas)
				this._reqw.ipost(parmas).then(res => {
					res.result == 0 ? (this.status = 'noMore', this.rightDataList = res.dataList) :
						this.$api.tip(res
							.resultNote)
				}).catch(err => {})
			},
			getLeftData() {
				if (getApp().globalData.cid == '') {
					getApp().globalData.cid = JSON.parse(uni.getStorageSync('firstClass'))[0].cid;
				}
				let parmas = {
					cmd: 'twoClassifyList',
					cid: getApp().globalData.cid
				}
				console.log(parmas)
				this._reqw.ipost(parmas).then(res => {
					res.result == 0 ? (res.dataList.unshift({
							cid: '',
							name: '推荐'
						}), this.leftDataList = res.dataList) :
						this.$api.tip(res
							.resultNote)
				}).catch(err => {})

			},
			getRightData(id) {
				let parmas = {
					cmd: 'classfyGoodsList',
					cid: id,
					sort: this.sort,
					nowPage: this.page,
					pageCount: '10'
				}
				console.log(parmas)
				this._reqw.ipost(parmas).then(res => {
					res.result == 0 ? ((res.totalPage > 1 ? this.status = "more" : this.status = 'noMore'), this.totalPage = res.totalPage,
						res.dataList.forEach(item => {
							this.rightDataList.push(item)
						})) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			clear(type) {
				this.rightDataList = [];
				this.totalPage = this.page = 1;
				if (type == 1) {
					this.showCategoryIndex = 0;
					this.getLeftData();
				} else if (type == 2) {
					this.leftCid == '' ? this.getTuijian() : this.getRightData(this.leftCid);

				} else {
					this.leftCid == '' ? this.getTuijian() : this.getRightData(this.leftCid);
				}

			},
			changeTab(e, ind) {
				console.log(e, ind)
				if (this.rightRow != ind) {
					this.rightRow = ind;
					this.sort = this.navList[ind].sort;
					this.clear(2);
				} else {
					if (ind == 2) {
						e.flag == 1 ? (this.navList[ind].flag = 2, this.sort = this.navList[ind].sort = 1) : (this.navList[ind].flag =
							1, this.sort = this.navList[ind].sort = 2);
						this.clear(2);
					} else {
						this.sort = this.navList[ind].sort;
					}
				}

			},
			details(id) {
				this.$api.navTo(`/pages/goodDetails/gooddetails?id=${id}`)
			},
			addCart() {

			}


		}
	}
</script>

<style lang="scss" scoped>
	.iconColor {
		color: #6BD453;
	}

	.iconfont {
		font-size: 24upx;
	}

	.top-nav-left {
		width: 200upx;
	}

	.cl-tui-img {
		width: 30upx;
		height: 30upx;
		position: absolute;
		top: 15upx;
		left: 15upx;
	}

	.price-box {
		font-weight: 500;
		color: rgba(255, 0, 0, 1);
		line-height: 35upx;
	}

	.price {
		color: rgba(255, 0, 0, 1);
		font-weight: 600;
		font-size: 26upx;
	}

	.sku-name {
		font-size: 22upx;
		color: rgba(153, 153, 153, 1);
		line-height: 35upx;
		margin: 20upx 0;
		height: 35upx;
	}

	.uni-space {
		justify-content: space-between;

	}

	.class-p-img {
		width: 160upx;
		height: 160upx;
		border-radius: 8upx;
		margin-right: 10upx;
	}

	.class-img {
		width: 51upx;
		height: 51upx;
	}

	.text {
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		line-height: 35upx;
	}

	.category-list {
		width: 100%;
		background-color: #fff;
		display: flex;

		.left,
		.right {
			position: absolute;
			top: 180upx;
			/*  #ifdef  APP-PLUS  */
			top: calc(180upx + var(--status-bar-height));
			/*  #endif  */
			bottom: 0upx;
			padding-bottom: 150upx;
		}

		.left {
			width: 27%;
			left: 0upx;
			background-color: #f2f2f2;

			.row {
				width: 100%;
				height: 90upx;
				display: flex;
				align-items: center;

				.text {
					width: 100%;
					position: relative;
					font-size: 28upx;
					display: flex;
					justify-content: center;
					color: #666666;

				}

				&.on {
					height: 90upx;
					background-color: #fff;

					.text {
						font-size: 30upx;
						font-weight: 600;
						color: #333333;
					}
				}
			}
		}

		.right {
			width: 73%;
			left: 27%;
			background: #ffffff;

			.category {
				width: 94%;
				padding: 20upx 3%;

				.banner {
					width: 100%;
					height: 24.262vw;
					border-radius: 10upx;
					overflow: hidden;
					// box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.3);

					image {
						width: 100%;
						height: 24.262vw;
					}
				}

				.list {
					margin-top: 40upx;
					width: 100%;
					height: 180upx;
					border-bottom: 1px solid #F2F2F2;

					.box {
						padding: 10upx;
						margin-bottom: 30upx;
						display: flex;
						justify-content: center;
						align-items: center;
						flex-wrap: wrap;

					}
				}
			}
		}
	}



	//  右侧  排序兰
	.top-nav {
		display: flex;
		align-items: center;
		margin: 20upx 0;
	}

	.top-nav-item {
		width: 60%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.top-nav-item-title {
		text-align: center;
		font-size: 24upx;
	}

	.top-nav-item-icon {
		line-height: 0.3;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	view {
		line-height: 0.7;
	}
</style>
