<template>
	<view class="page-body">
		<banner-swiper @search="search" :show="1" :dataList="swiperList"></banner-swiper>
		<cp-scroll-new :dataList="todayDataList"></cp-scroll-new>
		<cp-ling ref="cpLing" :cpClass="cpClassList" :dataList="cplingganList" @click="changeCp" @details="gotToCpDetails"></cp-ling>
	</view>
</template>

<script>
	import bannerSwiper from "@/components/mycom/swiper.vue"
	import cpScrollNew from '@/components/mycom/cp-scroll-new.vue'
	import cpLing from "@/components/mycom/cplinggan.vue"
	export default {
		components: {
			bannerSwiper,
			cpScrollNew,
			cpLing
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
				cid: ''
			}
		},
		methods: {
			search() {
				if (getApp().globalData.uid == '') {
					this.$api.navTo('/pages/author')
				} else {
					this.$api.navTo('/pages/search/searchCp')
				}
			},
			initData() {
				uni.setNavigationBarTitle({
					title: "菜谱"
				})
				uni.setNavigationBarColor({
					frontColor: '#000000',
					backgroundColor: "#F8F8F8"
				})
				if (uni.getStorageSync('swiper')) {
					this.swiperList = (JSON.parse(uni.getStorageSync('swiper')))
				}
				this.getCpClass();
				this.getToday();
			},

			loadData() {

			},
			//  今日推荐
			getToday() {
				let parmas = {
					cmd: 'menuRecommendList'
				}
				this._reqw.ipost(parmas).then(res => {
					res.result == 0 ? this.todayDataList = res.dataList : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			//  灵感下标题
			getCpClass() {
				let parmas = {
					cmd: 'menuClassifyList'
				}
				this._reqw.ipost(parmas).then(res => {
					res.result == 0 ? (this.$refs.cpLing.setClass(res.dataList), this.getLingGan(res.dataList[0].cid)) : this.$api.tip(
						res.resultNote)
				}).catch(err => {})
			},
			getLingGan(cid) {
				let parmas = {
					cmd: 'menuclassifyList',
					cid: cid
				}
				this._reqw.ipost(parmas).then(res => {
					res.result == 0 ? (res.dataList != undefined ? this.$refs.cpLing.setLing(res.dataList) : this.$refs.cpLing.initData()) :
						this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			changeCp(e) {
				if (e.menusid == this.cid) {
					return
				} else {
					this.cplingganList = [];
					this.$refs.cpLing.init();
					this.getLingGan(e.menusid)
				}
			},
			gotToCpDetails(e) {
				this.$api.navTo(`/pages/goodDetails/cpdetails?id=${e}`)
			},
			loadMore() {
				console.log('cp  页面数据加载更多')
				this.status = 'loading';
				this.totalPage > this.page ?
					((this.page += 1), this.loadData()) :
					setTimeout(() => {
						this.status = "noMore"
					}, 300)
			},
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
