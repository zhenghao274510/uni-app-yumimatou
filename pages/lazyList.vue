<template>
	<view class="">
		<banner-swiper @search="search" :show="1" :dataList="swiperList"></banner-swiper>
		<lazy-new :dataList="todayDataList"></lazy-new>
		<lazy-class-list ref="cpLing" :cpClass="cpClassList" :dataList="cplingganList" @click="changeCp" @details="gotToCpDetails"></lazy-class-list>
		<uni-load-more :status="status"></uni-load-more>
	</view>
</template>

<script>
	import bannerSwiper from "@/components/mycom/swiper.vue"
	import lazyNew from '@/components/mycom/lazy-new.vue'
	import lazyClassList from "@/components/mycom/lazy-class-list.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		components: {
			bannerSwiper,
			lazyNew,
			lazyClassList,
			uniLoadMore
		},
		data() {
			return {
				title: '菜谱',
				totalPage: 1,
				page: 1,
				todayDataList: [],
				cpClassList: [],
				cplingganList: [],
				swiperList: [],
				cid: '',
				status:'loading'
			}
		},
		onLoad() {
			this.getCpClass();
			this.getToday();
			this.getSwiper();
		},
		onReachBottom() {
			this.totalPage > this.page ?
				((this.page += 1),this.status = 'loading',this.getLingGan(this.cid)) :
				setTimeout(() => {
					this.status = "noMore"
				}, 300)
		},
		methods: {
			search() {
				if (getApp().globalData.uid == '') {
					this.$api.navTo('/pages/author')
				} else {
					this.$api.navTo('/pages/search/searchLazy')
				}
			},
			getSwiper() {
				let parmas = {
					cmd: 'goodslazybannerList'
				}
				this._reqw.ipost(parmas).then(res => {
					res.result == 0 ? this.swiperList = res.dataList : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			//  今日推荐
			getToday() {
				let parmas = {
					cmd: 'tuilazyGoodsList'
				}
				this._reqw.ipost(parmas).then(res => {
					res.result == 0 ? this.todayDataList = res.dataList : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			//  灵感下标题
			getCpClass() {
				let parmas = {
					cmd: 'goodslazyclassList'
				}
				this._reqw.ipost(parmas).then(res => {
					res.result == 0 ? (this.$refs.cpLing.setClass(res.dataList), this.getLingGan(res.dataList[0].cid)) : this.$api.tip(
						res.resultNote)
				}).catch(err => {})
			},
			getLingGan(cid) {
				let parmas = {
					cmd: 'classlazyGoodsList',
					cid: cid,
					nowPage:this.page,
					pageCount:'10'
				}
				this._reqw.ipost(parmas).then(res => {
					res.result == 0 ? (res.dataList != undefined ? this.$refs.cpLing.setLing(res.dataList) : this.$refs.cpLing.initData()) :
						this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			changeCp(e) {
				if (e.cid==this.cid) {
					return
				} else {
					this.cid=e.cid;
					this.cplingganList = [];
					this.$refs.cpLing.init();
					this.getLingGan(this.cid)
				}
			},
			gotToCpDetails(e) {
				this.$api.navTo(`/pages/goodDetails/lazyDetails?id=${e}`)
			}
		}
	}
</script>

<style lang="scss">
	.main_box {
		width: 100vw;
		height: 100vh;
		padding-bottom: 120rpx;
		box-sizing: border-box;
	}

	.main_centent {
		width: 100%;
		height: 100vh;
		color: #fff;
		letter-spacing: 4rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	image {
		width: 750rpx;
		height: 750rpx;
	}
</style>
