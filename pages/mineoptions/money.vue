<template>
	<view class="content">
		<view class="shouyi-top">
			<image src="/static/img/home/qianbaobg.png" mode="" class="imgbg"></image>
			<view class="shouyi-one">
				总金额(元)
			</view>
			<view class="shouyi-two">
				{{balance}}
			</view>
			<view class="btn" @click="tixian">
				提 现
			</view>
		</view>
		<view class="uni-flex uni-align-center uni-space pad">
			<view class="chose-pay-info">
				收支明细
			</view>
		</view>
		<block v-for="(v,k) in dataList" :key="k">
			<view class="shouyi-con pad">
				<view class="uni-flex uni-align-center uni-space">
					<view class="uni-flex uni-column uni-flex-item">
						<view class="xiaofei-name uni-ellipsis">
							{{v.title}}
						</view>
						<view class="xiaofei-time">
							{{v.adtime}}
						</view>
					</view>
				</view>
				<view class="uni-flex uni-align-center right" v-if="v.type==1">
					-{{v.money}}
				</view>
				<view class="uni-flex uni-align-center add" v-else>
					+{{v.money}}
				</view>
			</view>
		</block>
		<uni-load-more :status="status"></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import empty from "@/components/mycom/empty.vue"
	export default {
		components: {
			uniLoadMore,
			empty
		},
		data() {
			return {
				balance: '',
				dataList: [],
				page: 1,
				totalPage: 1,
				status: 'loading'
			}
		},
		onLoad(options) {
			this.balance = this.$api.parsePrice(options.id);
			console.log(this.balance)
			this.loadData()
		},
		onReachBottom() {
			this.status = "loading";
			this.totalPage > this.page ? (this.page += 1, this.loadData()) : setTimeout(() => {
				this.status = "noMore"
			}, 100)
		},
		methods: {
			tixian() {
				this.$api.navTo('/pages/mineoptions/tixian')
			},
			loadData() {
				//   分销金额明细
				let parmas = {
					cmd: "memberdistributionslist",
					uid: getApp().globalData.uid,
					nowPage: this.page,
					pageCount: '10'
				};
				this._reqw
					.ipost(parmas)
					.then(res => {
						res.result == 0 ?
							((res.totalPage == 1 ? this.status = 'noMore' : this.status = 'more'), this.totalPage = res.totalPage,
								res.dataList.forEach(item => {
									this.dataList.push(item)
								})) :
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			}
		}
	}
</script>

<style lang="scss">
	.pad {
		padding: 0 30upx;
	}

	page {
		background-color: #FFFFFF !important;
		height: 100% !important;
	}

	.nav-title {
		font-size: 30upx;
		color: #333333;
		font-weight: bold;
	}

	.navbar {
		display: flex;
		height: 80upx;
		background: #fff;
		top: 350upx;
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
				color: #6ED757 !important;

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

	.nav-title-state {
		font-size: 26upx;
		color: #666666;
		margin-left: 10upx;
	}

	.content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		.shouyi-top {
			display: flex;
			padding: 20upx;
			height: 345upx;
			flex-direction: column;
			position: relative;

			.shouyi-one {
				color: #fff;
				text-indent: 30px;
			}

			.shouyi-two {
				font-size: 30px;
				color: #fff;
				text-indent: 30px;
			}

			.imgbg {
				position: absolute;
				top: 0;
				left: 20upx;
				right: 20upx;
				width: calc(100% - 40upx);
				height: 345upx;
				z-index: -1;
			}

			.btn {
				position: absolute;
				bottom: 80upx;
				right: 90upx;
				width: 163upx;
				height: 60upx;
				background: rgba(69, 196, 108, 1);
				border-radius: 30px;
				color: #FFFFFF;
				text-align: center;
				line-height: 60upx;
			}
		}

		.shouyi-con {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20upx;
			overflow: hidden;

			.right {
				color: #45C46C;
			}

			.add {
				color: #ff0000;
			}

			.xiaofei-time {
				font-size: 22upx;
				font-weight: 500;
				color: rgb(153, 153, 153)
			}

			.xiaofei-name {
				font-size: 30upx;
				font-weight: 500;
				color: rgb(51, 51, 51);
				width: 600upx;
			}

		}

	}
</style>
