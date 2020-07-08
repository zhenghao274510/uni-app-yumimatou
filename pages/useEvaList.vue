<template>
	<view class="content">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabCurrentIndex == index }"
			 @click="tabClick(index)">{{ item.text }}</view>
		</view>
		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item v-for="(tabItem, tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadDataMore">
					<!-- 空白页 -->
					<empty v-if="tabItem.dataList.length === 0"></empty>
					<!-- 列表 -->
					<eva :list="tabItem.dataList" v-else></eva>
					<uni-load-more :status="tabItem.loadingType" v-if="tabItem.dataList.length != 0"></uni-load-more>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import empty from "@/components/mycom/empty";
	import eva from '@/components/mycom/eva.vue';
	export default {
		components: {
			uniLoadMore,
			eva,
			empty
		},
		data() {
			return {
				show: false,
				tabCurrentIndex: 0,
				productId: '',
				first: 0,
				navList: [{
						load: false,
						text: '全部',
						dataList: [],
						type: '',
						loadingType: 'loading',
						totalPage: 1,
						page: 1
					},
					{
						load: false,
						text: '好评',
						dataList: [],
						loadingType: 'loading',
						type: 0,
						totalPage: 1,
						page: 1
					},
					{
						load: false,
						text: '差评',
						dataList: [],
						loadingType: 'loading',
						type: 1,
						totalPage: 1,
						page: 1
					}
				]
			};
		},

		onLoad(options) {
			this.productId = options.id;
			this.loadData()
		},
		methods: {
			loadData() {
				let num = this.tabCurrentIndex,
					data = this.navList[num];
				let parmas = {
					cmd: "goodsevaluatelist",
					goodsid: this.productId,
					type: data.type,
					nowPage: data.page,
					pageCount: '10'
				};
				this._reqw
					.ipost(parmas, 'productCommentList')
					.then(res => {
						res.result == 0 ?
							((res.totalPage == 1 ? data.loadingType = "noMore" : data.loadingType = "more"), data.totalPage = res.totalPage,
								this.formNav(res),
								res.dataList.forEach(item => {
									data.dataList.push(item);
								})
							) :
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			formNav(res) {
				if (this.first == 0) {
					this.first = 1;
					this.navList.forEach((item, index) => {
						if (index == 0) {
							item.text = `全部(${res.allnum})`
						} else if (index == 1) {
							item.text = `好评(${res.goodnum})`
						} else {
							item.text =`差评(${res.badnum})`
						}
					})
				} else {
					return;
				}
			},
			loadDataMore() {
				let num = this.tabCurrentIndex,
					data = this.navList[num];
				data.totalPage > data.page ?
					((data.page += 1), this.loadData()) :
					setTimeout(() => {
						data.loadingType = 'noMore';
					}, 30);
			},
			//swiper 切换
			changeTab(e) {
				console.log(e);
				this.tabCurrentIndex = e.target.current;
				let num = this.tabCurrentIndex,
					data = this.navList[num];
				if (data.dataList.length == 0) {
					this.loadData()
				}
			},
			//顶部tab点击
			tabClick(k) {
				this.tabCurrentIndex = k;
			}
		}
	};
</script>

<style lang="scss">
	.del-btn {
		width: 155upx;
		height: 50upx;
		text-align: center;
		line-height: 50upx;
		font-size: 24upx;
		background: rgba(255, 255, 255, 1);
		border: 1px solid rgba(238, 238, 238, 1);
		border-radius: 25upx;
	}

	page,
	.content {
		background: #f6f6f6;
		height: 100%;
	}

	.swiper-box {
		height: calc(100% - 40px);
		padding-top: 40px;
	}

	.list-scroll-content {
		height: 100%;
		width: 100%;
	}

	.navbar {
		display: flex;
		height: 40px;
		width: 100%;
		box-sizing: border-box;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0, 0, 0, 0.06);
		position: relative;
		z-index: 10;
		position: fixed;
		top: 0;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: #666666;
			position: relative;

			&.current {
				color: #6FD758;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 100%;
					height: 0;
					border-bottom: 2px solid #6FD758;
				}
			}
		}
	}
</style>
