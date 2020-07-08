<template>
	<view class="tui-rolling-news list-item">
		<view class="notice-text">
			公告
		</view>
		<swiper :vertical="true" :autoplay="true" :circular="true" :interval="4000" class="tui-swiper">
			<swiper-item v-for="(item, index) in dataList" :key="index" class="tui-swiper-item" @click="detail(item)">
				<view class="tui-news-item">{{ item.title }}</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props: {
			dataList: {
				type: Array
			}
		},
		methods: {
			detail(e) {
				console.log(e)
				uni.setStorageSync('content', e.content);
				this.$api.navTo(`/pages/mineoptions/webView?title=${e.title}`)
			}
		}
	}
</script>

<style scoped>
	.notice-text {
		width: 63upx;
		height: 38upx;
		background: linear-gradient(90deg, rgba(243, 142, 77, 1) 0%, rgba(230, 96, 80, 1) 100%);
		border-radius: 4px;
		text-align: center;
		color: #FFFFFF;
		font-size: 20upx;
	}

	.tui-rolling-news {
		width: 92%;
		margin: 10upx auto;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: nowrap;
		background: #FDF6E3;
		border-radius: 11upx;
	}

	.tui-rolling-news::after {
		left: 0;
	}

	.tui-swiper {
		margin-left: 8rpx;
		font-size: 28rpx;
		height: 40px;
		flex: 1;
	}

	.tui-swiper-item {
		display: flex;
		align-items: center;
	}

	.tui-news-item {
		line-height: 20px;
		font-size: 22upx;
		font-weight: 600;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #95573E;
	}
</style>
