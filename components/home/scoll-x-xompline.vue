<template>
	<view v-if="display">
		<view class="compline-con">
			<image src="/static/img/home/youhuiquanbg.png" mode="" class="compline-bg"></image>
			<view class="compline-title">
				{{title}}
			</view>
			<scroll-view scroll-x="true" class="scroll-x">
				<view class="compline-list" :style="{width:parentsWidth}">
					<view class="item-wrapper" v-for="(v,k) in list" :key="k">
						<image src="/static/img/home/jinebg.png" class="compline-bg"></image>
						<view class="compline-info">
							<view style="color: #EB3939;">
								￥<text class="item-wrapper-top">{{v.price}}</text>
							</view>
							<view class="item-wrapper-bottom">
								满{{v.fullprice}}可用
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<view class="compline-btn" @click="getAllCompline">
				一键领取 >
			</view>
		</view>
	</view>


</template>

<script>
	export default {
		data() {
			return {
				parentsWidth: '',
				list: [],
				display: false,
				title:'领取优惠券'
			}
		},
		methods: {
			detail(data) {
				uni.showToast({
					title: '进入详情页',
					duration: 2000
				});
			},
			set(val,title) {
				if (val.length == 0) {
					this.display = false;
					console.log(this.display)
				} else {
					this.display = true;
					this.title=title;
					console.log(this.display)
					val.forEach(item => {
						item.fullprice = parseInt(item.fullprice);
						item.price = parseInt(item.price);
					})
					this.list = val;
					this.parentsWidth = val.length * 120 + 'px'
				}

			},
			getAllCompline() {
				let parmas = {
					cmd: 'receivecoupon',
					uid: getApp().globalData.uid
				}
				this._reqw.ipost(parmas).then(res => {
					console.log('compline', res)
					res.result == 0 ? (this.$api.tip('领取成功'), this.display = false) : this.$api.tip(res.resultNote)
				}).catch(err => {})

			}
		}
	}
</script>

<style scoped scoped>
	view {
		line-height: 1.2;
	}

	.compline-info {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		text-align: center;
	}

	.zIndex {
		z-index: 999;
	}

	.compline-con {
		width: 690upx;
		height: 312upx;
		position: relative;
		margin: 30upx auto;
		overflow: hidden;
	}

	.compline-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.item-wrapper-top {
		font-size: 74upx;
		font-weight: 800;
		color: #EF3737;
	}

	.item-wrapper-bottom {
		font-size: 25upx;
		color: #EF3737;
		margin-top: 5upx;
	}

	.scroll-x {
		margin-top: 50upx;
		width: 100%;

	}

	.compline-title {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		font-size: 32upx;
		font-weight: bold;
		color: #f72408;
	}

	.compline-btn {
		width: 367upx;
		height: 71upx;
		line-height: 71upx;
		margin: 20upx auto;
		background: linear-gradient(0deg, rgba(250, 234, 198, 1) 0%, rgba(252, 239, 222, 1) 100%, rgba(234, 54, 39, 1) 100%, rgba(252, 239, 222, 1) 100%);
		border-radius: 36upx;
		font-size: 32upx;
		font-weight: bold;
		color: #C33E39;
		opacity: 0.9;
		text-align: center;
	}

	.compline-list {
		/* width: 1345px; */
		display: flex;
	}

	.item-wrapper {
		width: 190upx;
		height: 143upx;
		position: relative;
		margin-left: 25upx;
	}
</style>
