<template>
	<view class="content">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{current: tabCurrentIndex == index}"
			 @click="tabClick(index)">
				<text class="nav-title" :class="{colorfT:tabCurrentIndex == index}">{{item.text}}</text><text class="nav-title-state" :class="{colorfT:tabCurrentIndex == index}">{{item.state}}</text>
			</view>
		</view>
		<swiper :current="tabCurrentIndex" duration="300" @change="changeTab" class="swiper-box">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadDataMore">
					<view class="com-list" v-for="(v,k) in tabItem.dataList" :key="k">
						<view class="com-list-left" >
							<image :src="v.userimage" mode="" lazy-load></image>
							<view class="com-list-left-info">
								<view class="list-top" style="color: #333333;font-weight: bold;">{{v.username}}</view>
								<view class="list-bottom" style="color: #999999;">{{v.adtime}}</view>
							</view>
							<view class="com-list-right-info">
								<view class="list-top" style="color: #6ED757;" v-if="tabCurrentIndex==0">直属邀请人</view>
								<view class="list-top" style="color: #6ED757;"v-else></view>
								<!-- <view class="list-bottom" style="color: #666666;" v-if="tabCurrentIndex==0">产生佣金{{v.fmoney}}</view>
								<view class="list-bottom" style="color: #666666;"v-else>产生佣金{{v.smoney}}</view> -->
							</view>
						</view>
					</view>
					<empty v-if="tabItem.dataList.length==0"></empty>
					<uni-load-more :status="tabItem.status" v-else></uni-load-more>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import empty from "@/components/mycom/empty";
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		data() {
			return {
				tabCurrentIndex: 0,
				navList: [{
						text: 'A粉',
						state: '(一级推荐人)',
						dataList: [],
						status: "loading",
						page: 1,
						totalPage:1,
					},
					{
						text: 'B粉',
						state: '(二级推荐人)',
						dataList: [],
						status: "loading",
						page: 1,
						totalPage:1,
					}
				]
			}
		},
		components: {
			empty,
			uniLoadMore
		},
		onLoad() {
			this.loadData();
		},
		methods: {
			changeTab(e) {
				this.tabCurrentIndex = e.detail.current;
				let n=this.tabCurrentIndex
				if(this.navList[n].dataList.length==0){
					this.loadData()
				}
			},
			tabClick(index) {
				this.tabCurrentIndex = index;
			},
			loadData() {
				let n = this.tabCurrentIndex;
				let parmas = {
					uid: getApp().globalData.uid,
					nowPage: this.navList[n].page,
				};
				if (n == 0) {
					parmas.cmd = 'firstmemberlist'
				} else {
					parmas.cmd = 'secondmemberlist'
				}

				this._reqw.ipost(parmas).then(res => {
					console.log(res)
					this.navList[n].status = "more"
					res.result == 0 ? (this.totalPage = res.totalPage, (res.totalPage > 1 ? this.navList[n].status = "more" : this.navList[
							n].status = "noMore"),
						res.dataList.forEach(item => {
							this.navList[n].dataList.push(item)
						})) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			loadDataMore() {
				let num = this.tabCurrentIndex,data=this.navList[num];
				data.totalPage > data.page ? (data.page += 1,data.status = "loading",this.loadData()) : setTimeout(() => {
					data.status = "noMore"
				}, 30)
			}
		}


	}
</script>

<style lang="scss">
	page,
	.content {
		height: 100%;
		background-color: #F6F6F6;
	}
	.colorfT{
		color:  #6ED757 !important;
	}

	.nav-title {
		font-size: 30upx;
		color: #333333;
		font-weight: bold;
	}

	.nav-title-state {
		font-size: 26upx;
		color: #666666;
		margin-left: 10upx;
	}

	.swiper-box {
		height: calc(100% - 80upx);
		padding-top: 80upx;
	}

	.list-scroll-content {
		height: 100%;
		.com-list {
			width: 90%;
			height: 200upx;
			margin: 20upx auto;
			display: flex;
			background-color: #FFFFFF;
			border-radius: 6px;
			padding: 0 20upx;
			.com-list-left {
				width: 100%;
				display: flex;
				align-items: center;

				image {
					width: 160upx;
					height: 160upx;
					border-radius: 50%;
				}

				.com-list-left-info {
					margin-left: 20upx;
					display: flex;
					flex: 1;
					flex-direction: column;
					align-items: center;

					view {
						width: 100%;
						text-align: left;
					}
				}
			}

			.com-list-right-info {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				view {
					width: 100%;
					text-align: right;
					color: #666666;
				}
			}
		}
	}

	.navbar {
		display: flex;
		height: 80upx;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0, 0, 0, .06);
		position: fixed;
		z-index: 999;
		width: 100%;

		.nav-item {
			width: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 30upx;
			color: #333333;
			position: relative;
			&.current {
				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 100%;
					height: 0;
					border-bottom: 2upx solid #6ED757;
				}
			}
		}
	}
</style>
