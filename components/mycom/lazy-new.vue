<template>
	<view>
		<view class="uni-flex uni-align-center tody-title">
			<image src="/static/img/cp/cphot@2x.png" mode="" class="img"></image>
			<text class="img-tip">今日推荐</text>
		</view>
		<scroll-view scroll-x="true" class="scroll-x">
			<view class="uni-second-list" :style="{width:parentsWidth}">
				<view class="uni-second" v-for="(v,k) in dataList" :key="k" @click="detail(v.lazyid)">
					<view class="image-second">
						<image class="uni-second-image" :src="v.lazyimage"></image>
					</view>
					<view class="uni-second-price">
						<view class="uni-second-title">{{v.lazyname}}
						</view>
						<!-- 	<view class="uni-flex uni-align-center sku-name" v-if="type==3">
							<text>500/份 </text> <text >已售1024</text>
						</view> -->
						<view class="uni-flex uni-align-center">
							<text class="price">￥{{v.lazyprice}}/份</text>
							<!-- <image src="../../static/img/home/mc.png" class="img"></image> -->
							<view class="">

							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>

</template>

<script>
	export default {
		props: {
			dataList: {
				type: Array
			}
		},
		computed: {
			parentsWidth() {
				let len = this.dataList.length;
				if (len <= 2) {
					return '100%'
				} else {
					return len *320 + 'rpx'
				}
			}
		},
		methods: {
			detail(id) {
				this.$api.navTo(`/pages/goodDetails/lazyDetails?id=${id}`)
			}
		}
	}
</script>

<style scoped lang="scss">
	.tody-title{
		padding: 20upx;
	}
	.img {
		width: 50upx;
		height: 50upx;
		margin-right: 20upx;
	}

	.img-tip {
		font-size: 30upx;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
	}

	view {
		font-size: 24upx;
	}

	.scroll-x {
		width: 100%;
		height: 380upx;
		padding: 0 20upx;
		box-sizing: border-box;
	}

	.content {
		background: #ffffff;
		box-sizing: border-box;
	}

	.price {
		color: #FD3D00;
		font-weight: Bold;
	}

	.sku-name {
		color: $uni-color-paragraph;
		font-size: 22upx;
	}

	.second-title {
		height: 54upx;
		width: 80%;
		margin-left: 10%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		font-size: 36upx;

		image {
			height: 54upx;
		}
	}

	.uni-second-list {
		display: flex;
		margin-bottom: 10px;
		margin-top: 10px;
	}

	.uni-second {
		display: flex;
		flex-direction: column;
		margin: 0 0 20upx 20upx;
		width: 298upx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 6upx;
	}

	.image-second {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.uni-second-image {
		width: 298upx;
		height: 253upx;
		border-radius: 6upx;
	}

	.uni-second-title {
		word-break: break-all;
		display: -webkit-box;
		overflow: hidden;
		color: $uni-color-title;
		line-height: 1.5;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}

	.uni-second-price {
		flex: 1;
		margin-top: 10upx;
		font-size: 28upx;
		line-height: 1.5;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 0 10upx;
	}

	.uni-flex {
		margin-bottom: 10px;
	}
</style>
