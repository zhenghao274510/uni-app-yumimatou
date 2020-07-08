<template>
	<view class="content">
		<view class="uni-second-list">
			<view class="uni-second" @click="gotoDetails">
				<view class="image-second">
					<image class="uni-second-image" src="/static/img/test/p1.jpg"></image>
				</view>
				<view class="uni-second-price">
					<view class="uni-second-title uni-ellipsis">健康蔬菜 新鲜生菜叶子健康蔬菜 新鲜生菜叶子健康蔬菜 新鲜生菜叶子
					</view>
					<view class="uni-flex uni-align-center">
						<text class="price">团购价 ￥22.9/份</text>
					</view>
					<view class="sku-name">
						市场价: <text style="text-decoration: line-through;">￥36.00</text>
					</view>
					<view class="btn small-btn">
						购 买
					</view>

				</view>
			</view>
			<view class="uni-second">
				<view class="image-second">
					<image class="uni-second-image" src="/static/img/test/p1.jpg"></image>
				</view>
				<view class="uni-second-price">
					<view class="uni-second-title uni-ellipsis">健康蔬菜 新鲜生菜叶子健康蔬菜 新鲜生菜叶子健康蔬菜 新鲜生菜叶子
					</view>
					<view class="uni-flex uni-align-center">
						<text class="price">团购价 ￥22.9/份</text>
					</view>
					<view class="sku-name">
						市场价: <text style="text-decoration: line-through;">￥36.00</text>
					</view>
					<view class="btn small-btn">
						购 买
					</view>

				</view>
			</view>
			<view class="uni-second">
				<view class="image-second">
					<image class="uni-second-image" src="/static/img/test/p1.jpg"></image>
				</view>
				<view class="uni-second-price">
					<view class="uni-second-title uni-ellipsis">健康蔬菜 新鲜生菜叶子健康蔬菜 新鲜生菜叶子健康蔬菜 新鲜生菜叶子
					</view>
					<view class="uni-flex uni-align-center">
						<text class="price">团购价 ￥22.9/份</text>
					</view>
					<view class="sku-name">
						市场价: <text style="text-decoration: line-through;">￥36.00</text>
					</view>
					<view class="btn small-btn">
						购 买
					</view>

				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			dataList: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				list: this.dataList
			}
		},
		onLoad() {

		},
		onShow() {

		},
		methods: {
			gotoDetails() {
				this.$api.navTo('/pages/goodDetails/gooddetails')
			}
		}
	}
</script>
<style lang="scss">
	page {
		background: #F6F6F6;
	}

	.btn {
		position: absolute;
		right: 0;
		bottom: 0;
		width: 160upx;
		line-height: 60upx;
		height: 60upx;
	}

	.content {
		box-sizing: border-box;
		margin-top: 10px;
	}

	.price {
		color: #FF0000;
		font-size: 28upx;
		font-weight: bold;
	}

	.sku-name {
		color: $uni-color-paragraph;
		font-size: 22upx;
	}

	.uni-second-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 10px;
		margin-bottom: 10px;
	}

	.uni-second {
		display: flex;
		padding: 20upx;
		width: 100%;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 4upx;
		margin-bottom: 20upx;
	}

	.image-second {
		width: 155upx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.uni-second-image {
		width: 155upx;
		height: 155upx;
		border-radius: 10upx;
	}

	.uni-second-title {
		color: $uni-color-title;
		line-height: 1.5;
	}

	.uni-second-price {
		width: 75%;
		font-size: 28upx;
		line-height: 1.5;
		padding-left: 15upx;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
	}

	.uni-flex {
		justify-content: space-between;
		margin-bottom: 10upx;
	}
</style>
