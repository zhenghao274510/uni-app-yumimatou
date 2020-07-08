<template>
	<view class="content">
		<view class="top-nav">
			<block v-for="(v, k) in navList" :key="k">
				<view class="top-nav-item" @click="changeTab(v,k)">
					<view class="top-nav-item-title" :class="{ iconColor:current == k }">{{ v.title }}</view>
					<view class="top-nav-item-icon" v-if="k==2">
						<view class="iconfont icon-shangjiantou " :class="{iconColor:v.flag==1 }"></view>
						<view class="iconfont icon-xiajiantou" :class="{iconColor: v.flag==2 }"></view>
					</view>
				</view>
			</block>
		</view>
		<view class="splce">
		</view>
		<homeList :type="3" ref="productList"></homeList>
		<!-- <empty v-if="dataList.length==0"></empty> -->
		<uni-load-more :status="status"></uni-load-more>
	</view>
</template>

<script>
	// import empty from "@/components/mycom/empty.vue"
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import homeList from "@/components/mycom/homeList.vue"
	export default {
		data() {
			return {
				dataList: [],
				page: 1,
				type: 3,
				totalPage: 1,
				status: 'loading',
				sort: '',
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
				current: 0
			};
		},
		components: {
			uniLoadMore,
			// empty,
			homeList
		},
		onLoad() {
			this.loadData();
		},
		methods: {
			loadData() {
				let parmas = {
					cmd: "sellwellGoodsList",
					sort: this.sort,
					nowPage: this.page,
					pageCount: "10",
				};
				if (this.current == 1) {
					parmas.sort = 0;
				}
				if (this.current == 2) {
					parmas.sort = this.sort;
				}
				console.log(parmas);
				this._reqw
					.ipost(parmas)
					.then(res => {
						res.result == 0 ?
							((res.totalPage == 1 ? this.status = 'noMore' : this.status = 'more'), this.totalPage = res.totalPage,
								this.$refs.productList.set(res.dataList)
							) :
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			toGoods(e) {
				console.log(e)
				this.$api.navTo(`/pages/goodDetails/gooddetails?id=${e.goodsid}`)
			},
			changeTab(e, ind) {
				if (this.current != ind) {
					this.current = ind;
					this.sort = this.navList[ind].sort;
					this.initData();
				} else {
					if (ind == 2) {
						e.flag == 1 ? (this.navList[ind].flag=2,this.sort=this.navList[ind].sort=1) : (this.navList[ind].flag =1,this.sort=this.navList[ind].sort =2);
						this.clear();
					} else {
						this.sort = this.navList[ind].sort;
					}
				}
			},
			clear() {
				this.dataList = [];
				this.totalPage = this.page = 1;
				this.initData()
			},
			initData() {
				this.dataList = [];
				this.$refs.productList.init();
				this.page = 1;
				this.totalPage = 1;
				this.status = 'loading';
				// this.$refs.productList.init()
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

<style lang="scss" scoped>
	.splce{
		height: 50px;
	}
	.iconColor {
		color: #6BD453 !important;
	}
	view {
		line-height: 0.7;
	}
	.content {
		width: 100%;
		min-height:100% ;
		display: flex;
		flex-direction: column;
	}

	.img {
		height: 348upx;
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
		height: 50px;
		background: #ffffff;
		display: flex;
		align-items: center;
		z-index: 999;
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
	}

	.uni-flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	// 列表

	.goods-list {
		padding-top: 60px;

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
					border-radius: 20upx 20upx 0 0;
				}

				.name {
					width: 92%;
					padding: 10upx 4%;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					text-align: justify;
					overflow: hidden;
					font-size: 30upx;
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
