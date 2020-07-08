<template>
	<view class="page-body">
		<banner-swiper :dataList="bannerList" @search="search" @click="gotoMessage" @position="position" ref="swiper" :show="0"></banner-swiper>
		<notice :dataList="noticeList"></notice>
		<scoll-compline ref="compline"></scoll-compline>
		<navs @click="navClick" :dataList="navsList"></navs>
		<view class="banner">
			<view class="left" @click="channel(0)">
				<image :src="hoteArrond" mode="scaleToFill" />
				<view class="home-pos">
					<view class="home-pos-hote">
						热销商品
					</view>
					<view class="home-pos-hote-btn">
						查看详情>
					</view>
				</view>
			</view>
			<view class="right">
				<view class="top" @click="channel(1)">
					<image :src="groupArrond" mode="scaleToFill" />
					<view class="home-pos home-tuan">
						团购
					</view>
				</view>
				<view class="bottom">
					<view class="bottom-left" @click="channel(2)">
						<image :src="scondArrond" mode="scaleToFill" />
						<view class="home-pos">
							<view class="home-pos-second">
								秒杀专区
							</view>
							<view class="home-pos-second-time">
								<home-count-down :time="LeaveEnd" ref='countDown' v-if="LeaveEnd!=0"></home-count-down>
							</view>
						</view>
					</view>

				</view>
			</view>
		</view>
		<detive @click="showHomeFencai" :dataList="othArroud"></detive>
		<home-list :type="0" ref="homeList"></home-list>
		<uni-load-more :status="status"></uni-load-more>
		<picker-pop ref="pickerPop"></picker-pop>
	</view>
</template>

<script>
	import pickerPop from "@/components/mycom/homePop.vue"
	import scollCompline from "@/components/home/scoll-x-xompline.vue"
	import bannerSwiper from "@/components/mycom/swiper.vue"
	import notice from '@/components/home/notic.vue'
	import homeList from "@/components/mycom/homeList.vue"
	import navs from "@/components/home/navs.vue"
	import detive from "@/components/home/detive.vue"
	import homeCountDown from "@/components/homeCountDown/homeCountDown.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		components: {
			notice,
			homeList,
			bannerSwiper,
			navs,
			detive,
			scollCompline,
			pickerPop,
			homeCountDown,
			uniLoadMore
		},
		data() {
			return {
				page: 1, //页码
				totalPage: 1,
				status: 'loading',
				hoteArrond: '', //   热销封面图
				scondArrond: '', //   秒杀封面图
				groupArrond: '', //   团购面图
				LeaveEnd: '', //   秒杀剩余时间
				uid: '',
				address: '',
				display: false,
				bannerList: [],
				complineList: [],
				noticeList: [],
				navsList: [],
				othArroud: []

			}
		},
		methods: {
			position() {
				if (getApp().globalData.uid == '') {
					this.$api.navTo('/pages/author')
				} else {
					this.$api.navTo('/pages/positionList')
				}

			},
			initData() {
				uni.setNavigationBarTitle({
					title: "首页"
				})
				uni.setNavigationBarColor({
					frontColor: '#000000',
					backgroundColor: "#F8F8F8"
				})
				this.uid = getApp().globalData.uid;
				// this.$nextTick(function() {
				this.$refs.swiper.getPosition();
				if (getApp().globalData.uid != '') {
					this.getCompline();
					this.getMessage();
					this.customersmessage();
					this.getPerson();
				}
				this.getClass();
				this.getNotice();
				this.getScond();
				this.getSwiper();
				this.hoteList();
				// })

			},
			set(val) {
				this.$refs.swiper.setAddress(val)
			},
			getPerson() {
				if (uni.getStorageSync('qrcode')) {
					this.$refs.pickerPop.set(uni.getStorageSync('qrcode'));
				} else {
					let parmas = {
						cmd: 'userinfo',
						uid: getApp().globalData.uid
					};
					this._reqw
						.ipost(parmas, 'userInfo')
						.then(res => {
							console.log(res);
							if (res.result == 0) {
								console.log(res)
								uni.setStorageSync('qrcode', res.dataobject.qrcode);
								this.$refs.pickerPop.set(res.dataobject.qrcode);
							} else {
								this.$api.tip(res.resultNote);
							}

						})
						.catch(err => {});
				}

			},
			loadMore() {
				console.log('home  页面数据加载更多')
				this.status = 'loading';
				this.totalPage > this.page ?
					((this.page += 1), this.hoteList()) :
					setTimeout(() => {
						this.status = 'noMore';
					}, 30)
			},
			channel(n) {
				if (n == 0) {
					this.$api.navTo(`/pages/productList`)
				} else if (n == 1) {
					this.$api.navTo(`/pages/parentList`)
				} else {
					this.$api.navTo(`/pages/secondList`)
				}

			},
			//  客服电话
			customersmessage() {
				let parmas = {
					cmd: 'customersmessage'
				}
				this._reqw.ipost(parmas).then(res => {
					res.result == 0 ? uni.setStorageSync('phone', res.dataobject.phone) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			//  首页轮播图
			getSwiper() {
				let parmas = {
					cmd: 'homepage'
				}
				this._reqw.ipost(parmas).then(res => {
					// console.log(res)
					res.result == 0 ? (this.bannerList = res.dataList, this.formDataImage(res.imageList), uni.setStorageSync(
						'swiper', JSON.stringify(res.dataList))) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			formDataImage(arry) {
				let othArroud = [];
				// 1秒杀 2团购 3热销商品 4风采展示 5邀请有礼 6精选菜谱 7懒人专区
				arry.forEach(item => {
					if (item.type == 3) {
						this.hoteArrond = item.image;
					} else if (item.type == 1) {
						this.scondArrond = item.image;
					} else if (item.type == 2) {
						this.groupArrond = item.image;
					} else if (item.type == 8) {
						uni.setStorageSync('classImg', item.image)
					} else {
						if (item.type == 4) {
							item.name = '风采展示';
							item.text = '农庄直供';
						} else if (item.type == 5) {
							item.name = '邀请有礼';
							item.text = '';
						} else if (item.type == 6) {
							item.name = '精选菜谱';
							item.text = '做菜必备';
						} else if (item.type == 7) {
							item.name = '懒人专区';
							item.text = '搭配套餐';
						}
						this.$set(this.othArroud, item.type - 4, item)
					}
				})
			},
			getNotice() {
				let parmas = {
					cmd: 'getannouncementlist',
					uid: getApp().globalData.uid
				}
				this._reqw.ipost(parmas).then(res => {
					// console.log('getNotice',res)
					res.result == 0 ? this.noticeList = res.dataList : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			getCompline() {
				let parmas = {
					cmd: 'getnotreceivecoupon',
					uid: getApp().globalData.uid
				}
				this._reqw.ipost(parmas).then(res => {
					console.log('compline', res)
					res.result == 0 ? (res.dataList.length != 0 ? this.$refs.compline.set(res.dataList, res.datastr) : '') : this.$api
						.tip(res.resultNote)
				}).catch(err => {})
			},
			getScond() {
				let parmas = {
					cmd: 'seckilltime'
				}
				this._reqw.ipost(parmas).then(res => {
					console.log('getScond', res)
					if (res.result == 0) {
						let data = res.dataList;
						let newTime = parseInt(new Date().getHours());
						let minTime = new Date().getMinutes();
						let minScond = new Date().getSeconds();
						console.log(newTime)
						for (let i = 0; i < data.length; i++) {
							if (newTime >= parseInt(data[i].time1) && newTime < parseInt(data[i].time2)) {
								this.LeaveEnd = (parseInt(data[i].time2) - newTime) * 60 * 60 * 1000 - minTime * 60 * 1000 - minScond * 1000;
								console.log(this.LeaveEnd, data[i].time2)
							} else if (newTime >= parseInt(data[i].time2) && newTime < parseInt(data[i + 1].time1)) {
								this.LeaveEnd = (parseInt(data[i + 1].time1) - newTime) * 60 * 60 * 1000 - minTime * 60 * 1000 - minScond *
									1000;
								console.log(this.LeaveEnd)
							}
						}
					}
				}).catch(err => {})
			},
			getClass() {
				let parmas = {
					cmd: 'oneClassifyList'
				}
				this._reqw.ipost(parmas).then(res => {
					// console.log('class',res)
					res.result == 0 ? (this.navsList = res.dataList, uni.setStorageSync('firstClass', JSON.stringify(res.dataList))) :
						this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			//   销量推荐
			hoteList() {
				let parmas = {
					cmd: 'boutiqueRecommend'
				}
				this._reqw.ipost(parmas).then(res => {
					// console.log('hoteList',res)
					res.result == 0 ? this.$refs.homeList.set(res.dataList) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			navClick() {
				// console.log(e)
				this.$parent.cut_index(1);
			},
			showHomeFencai(e) {
				console.log(e)
				switch (e) {
					case 0:
						this.$api.navTo('/pages/mineoptions/fencai');
						break;
					case 1:
						if (getApp().globalData.uid == '') {
							this.$api.navTo('/pages/author')
						} else {
							this.$refs.pickerPop.showPicker();
						}
						break;
					case 2:
						this.$parent.cut_index(2);
						break;
					case 3:
						this.$api.navTo('/pages/lazyList');
						break;
				}
			},
			search() {
				if (getApp().globalData.uid == '') {
					this.$api.navTo('/pages/author')
				} else {
					this.$api.navTo('/pages/search/search')
				}
			},
			getMessage() {
				let parmas = {
					cmd: "noticeslist",
					uid: getApp().globalData.uid,
					nowPage: this.page,
					pageCount: "10"
				}
				this._reqw
					.ipost(parmas)
					.then(res => {
						if (res.result == 0) {
							console.log('消息', res)

							if (res.allnum != undefined) {
								if (uni.getStorageSync('messageNum')) {
									let num = uni.getStorageSync('messageNum');
									if (res.allnum > num) {
										this.$refs.swiper.setShowRed(false)
									} else {
										this.$refs.swiper.setShowRed(true)
									}
								} else {
									this.$refs.swiper.setShowRed(true);
									uni.setStorageSync('messageNum', res.allnum)
								}
							}

						} else {
							this.$api.tip(res.resultNote)
						}
					})
					.catch(err => {});
			},
			gotoMessage() {
				if (getApp().globalData.uid == '') {
					this.$api.navTo('/pages/author')
				} else {
					this.$api.navTo('/pages/messageList')
				}
			}
		},
	}
</script>

<style scoped>
	/* 介绍图部分 */
	.home-pos-hote {
		font-size: 30upx;
		color: rgba(20, 139, 84, 1)
	}

	.home-pos-hote-btn {
		width: 155upx;
		height: 48upx;
		background: rgba(43, 193, 123, 1);
		border-radius: 24upx;
		font-size: 22upx;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		line-height: 48upx;
	}

	.home-pos {
		position: absolute;
		top: 30upx;
		left: 15upx;
	}

	.home-tuan {
		font-size: 30upx;
		color: rgba(254, 254, 254, 1);
	}

	.home-pos-second-time {
		width: 140upx;
		height: 40upx;
		background: rgba(255, 199, 26, 1);
		border-radius: 18upx;
		font-size: 22upx;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		line-height: 36upx;
	}


	.home-pos-second {
		font-size: 30upx;
		color: rgba(255, 255, 255, 1);
	}

	.uni-icon-location-filled {
		/* color: #FFFFFF; */
		font-size: 28upx;
	}

	.img {
		width: 50upx;
		height: 50upx;
	}

	.page-body {
		width: 750upx;
		overflow: hidden;
		font-size: 30upx;
		background: #f1f1f1;
	}

	.swiper {
		width: 750upx;
		height: 313upx;
	}

	.swiper-item {
		width: 750upx;
		display: block;
	}

	.swiper-item image {
		width: 750upx;
		display: block;
		height: 313upx;
	}

	.title {
		height: 100upx;
		background: #fff;
	}

	.title .fr {
		float: right;
		line-height: 100upx;
		margin-right: 30upx;
		font-size: 20upx;
		color: #ccc;
	}

	.banner {
		padding: 0 20upx;
		height: 430upx;
		overflow: hidden;
		display: flex;
	}

	.banner image {
		width: 100%;
		height: 100%;
		border-radius: 6px;
	}

	.banner>.left {
		flex: 6;
		margin-right: 10upx;
		border-right: 2px solid #f2f2f2;
		overflow: hidden;
		position: relative;
	}

	.banner>.right {
		flex: 7;
		position: relative;
	}

	.right .top {
		width: 100%;
		height: 208upx;
		margin-bottom: 7upx;
		border-bottom: 2px solid #f2f2f2;
		overflow: hidden;
		position: relative;
	}

	.right .bottom {
		display: flex;
		width: 100%;
		height: 208upx;
	}

	.right .bottom .bottom-left {
		flex: 6;
		overflow: hidden;
		border-right: 1px solid #f2f2f2;
		position: relative;
	}

	.right .bottom .bottom-right {
		flex: 6;
		overflow: hidden;
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 100%;
		background: rgba(7, 17, 27, 0.5);
		z-index: 499;
	}
</style>
