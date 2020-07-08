<template>
	<view class="eva-section">
		<view class="eva-box">
			<block v-for="(v,k) in list" :key="k">
				<view class="eva-top">
					<view class="eva-top-left">
						<image class="img" :src="v.usericon" mode="aspectFill"></image>
						<view class="eva-info">
							<text class="name">{{v.username}}</text>
							<sx-rate :defaultStar="v.star" :disabledStar="true"></sx-rate>
						</view>
					</view>
					<view class="time">{{v.adtime}}</view>
				</view>
				<view class="eva-content">
					<text class="con">{{v.content}}</text>
					<view class="eva-img-con" v-if="v.images.length!=0">
						<image class="img" v-for=" (m,n) in v.images" :key="n" :src="m" mode="scaleToFill" @click="ImgDetails(k,n)"></image>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import sxRate from '@/components/sunui-star/sunui-star.vue';
	export default {
		props: {
			list: {
				type: Array,
				dafault: []
			}
		},
		components: {
			sxRate
		},
		data() {
			return {};
		},
		methods: {
			ImgDetails(k, n) {
				uni.previewImage({
					urls: this.list[k].images,
					current: this.list[k].images[n]
				})
			}
		}
	};
</script>

<style scoped lang="scss">
	.eva-active {
		padding: 20upx;
		border-radius: 8upx;
		background-color: #f8f8f8;
	}

	/* 评价 */
	.eva-section {
		display: flex;
		flex-direction: column;
		padding: 30upx;
		background: #fff;
		margin-bottom: 16upx;

		.e-header {
			display: flex;
			// align-items: center;
			height: 70upx;

			.tit {
				margin-right: 4upx;
			}

			.tip {
				flex: 1;
				text-align: right;
				color: #666666;
			}

			.icon-you {
				margin-left: 10upx;
			}
		}
	}

	.eva-box {
		display: flex;
		flex-direction: column;
        border-bottom: 1px solid #eaeaea;
		.eva-top {
			display: flex;
			justify-content: space-between;

			.eva-top-left {
				display: flex;
				flex: 1;

				.img {
					width: 120upx;
					height: 120upx;
					border-radius: 50%;
					margin-right: 20upx;
				}

				.eva-info {
					display: flex;
					flex-direction: column;

					.name {
						margin-bottom: 20upx;
					}
				}
			}

			.time {
				color: #333333;
			}
		}

		.eva-content {
			margin: 20upx 0;

			.eva-img-con {
				display: flex;
				align-items: center;
				padding: 20upx 0;

				.img {
					width: 200upx;
					height: 200upx;
					margin-right:20upx;
				}
			}
		}
	}
</style>
