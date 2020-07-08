<template>
	<view class="content">
		<view class="top-nav">
			<view class="search-pop">
				<view class="top-input">
					<view class="uni-icon uni-icon-search"></view>
					<input type="text" value="" placeholder-style="color:#74738e;font-size:13px;" placeholder="请输入关键字" v-model="keywords" />
				</view>
				<view class="search-btn" @click="submitSearch">
					搜索
				</view>
			</view>
			<view class="uni-flex nav-item-com">
				<block v-for="(v, k) in navList" :key="k">
					<view class="top-nav-item" @click="changeTab(v,k)">
						<view class="top-nav-item-title" :class="{ iconColor: k == current }">{{ v.title }}</view>
						<view class="top-nav-item-icon" v-if="k==2">
							<view class="iconfont icon-shangjiantou " :class="{ iconColor: v.flag==1 }"></view>
							<view class="iconfont icon-xiajiantou" :class="{ iconColor: v.flag==2 }"></view>
						</view>
					</view>
				</block>
			</view>
		</view>
		<view class="spacle-height">
			
		</view>
		<view class="goods-list">
			<view class="product-list">
				<view class="product" v-for="(v,k) in dataList" :key="k" @tap="toGoods(v.goodsid)">
					<image :src="v.goodsimage" class="img"></image>
					<view class="info-con">
						<view class="name">{{ v.goodsname }}</view>
						<view class="info">
							<!-- <view class="slogan">{{ product.sales }}</view> -->
							<view class="price">￥{{ v.goodsprice }}</view>
						</view>
					</view>
				
				</view>
			</view>
		</view>
		<empty v-if="dataList.length==0"></empty>
		<uni-load-more :status="status" v-else></uni-load-more>
	</view>
</template>

<script>
	import empty from "@/components/mycom/empty.vue"
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import homeList from "@/components/mycom/homeList.vue"
	export default {
		data() {
			return {
				dataList: [],
				page: 1,
				totalPage: 1,
				status: 'loading',
				sort:'',
				keywords: '',
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
						sort: 1
					}
				],
				current: 0
			};
		},
		components: {
			uniLoadMore,
			empty,
			homeList
		},
		onLoad(options) {
			this.keywords = options.id;
			this.$api.setNav(this.keywords)
			console.log(this.keywords);
			this.loadData();
		},
		methods: {
			submitSearch(){
				this.initData();
				this.$api.setNav(this.keywords)
			},
			loadData() {
				let parmas = {
					cmd: 'searchGoodsList',
					uid:getApp().globalData.uid,
					content: this.keywords,
					sort: this.sort,
					nowPage: this.page,
					pageCount: '10'
				};
				console.log(parmas);
				this._reqw
					.ipost(parmas)
					.then(res => {
						res.result == 0 ?
							((res.totalPage == 1 ? this.status = 'noMore' : this.status = 'more'), this.totalPage = res.totalPage,
								res.dataList.forEach(item => {
									this.dataList.push(item)
								})
							) :
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			toGoods(id) {
				this.$api.navTo(`/pages/goodDetails/gooddetails?id=${id}`)
			},
			changeTab(e, ind) {
				
				if (this.current != ind) {
					this.current = ind;
					this.sort = this.navList[ind].sort;
					this.initData();
				} else {
					if (ind == 2) {
						e.flag == 1 ? (this.sort = this.navList[ind].flag = this.navList[ind].sort = 2) : (this.sort = this.navList[ind].flag =
							this.navList[ind].sort = 1);
						this.initData();
					} else {
						this.sort = this.navList[ind].sort;
					}
				}
			},
			initData() {
				this.dataList = [];
				this.page = 1;
				this.totalPage = 1;
				this.status = 'loading';
				this.loadData();
			}
		},
		//  加载
		onReachBottom() {
			console.log('到底');
			this.status = 'loading';
			this.totalPage > this.page ?
				((this.page += 1), this.loadData()) :
				setTimeout(() => {
					this.status = 'noMore';
				}, 30);
		}
	};
</script>

<style lang="scss">
	view {
		line-height: 0.7;
	}
	.spacle-height{
		height: 200upx;
	}
	.search-pop {
		padding: 14px 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		// background-color: #F5F5F5;
		width: 100%;
		box-sizing: border-box;
	}
	
	.top-input {
		flex: 1;
		margin-right: 20px;
		height: 30px;
		line-height: 30px;
		display: flex;
		padding-left: 20px;
		box-sizing: border-box;
		background: #FFFFFF;
		border-radius: 50upx;
		color: #74718c;
		align-items: center;
	}
	
	.top-inptu input {
		height: 100%;
	}
	
	.search-btn {
		width: 50px;
		height: 100%;
		color: #333333;
		font-size: 27upx;
	}
	.nav-item-com{
		width: 100%;
		height: 80upx;
	}

	.iconColor {
		color: #6BD453 !important;
	}

	page {
		height: 100%;
		background: #FAFAFA;
	}

	.content {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
     .info-con{
		 padding: 20upx 0;
	 }
	.img {
		height: 334upx;
		width: 339upx;
	}

	.iconfont {
		// margin-right: 10px;
		color: #ccc;
		font-size: 10px !important;
	}

	.top-nav {
		position: fixed;
		left: 0;
		right: 0;
		// height: 50px;
		background-color: #F5F5F5;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.top-nav-item {
		flex: 1;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.top-nav-item-title {
		text-align: center;
	}

	.top-nav-item-icon {
		// width: 30px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-left: 10upx;
	}

	.uni-flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	// 列表

	.goods-list {
		// padding-top:60px;

		.title {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60upx;
			color: #979797;
			font-size: 24upx;
		}

		.loading-text {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60upx;
			color: #979797;
			font-size: 24upx;
		}

		.product-list {
			width: 95%;
			padding: 0 2.5% 2.5vw 2.5%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.product {
				width: 48.75%;
				border-radius: 20upx;
				background-color: #fff;
				margin: 0 0 15upx 0;

				image {
					width: 100%;
					border-radius: 8upx;
				}

				.name {
					width: 92%;
					padding: 10upx 4%;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					text-align: justify;
					overflow: hidden;
				}

				.info {
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					width: 92%;
					padding: 10upx 4% 10upx 4%;

					.price {
						color: #e65339;
						font-size: 30upx;
						font-weight: 600;
					}

					.slogan {
						color: #807c87;
						font-size: 24upx;
					}
				}
			}
		}
	}
</style>
