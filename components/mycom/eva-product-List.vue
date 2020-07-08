<template>
	<view>
		<view class="cart-item-title">
			退款商品
		</view>
		<view class="cart-item" v-for="(v,k) in dataList" :key="k">
			<view class="cart-item-left">
				<image :src="v.goodsimage" mode="aspectFill" lazy-load class="product-img"></image>
			</view>
			<view class="item-right">
				<view class="item-right-top">
					<view class="clamp title uni-ellipsis">{{v.goodsname}}</view>
				</view>
				<view class="item-right-top">
					<view class="skuname">{{v.skuname}}</view>
				</view>
				<view class="item-right-top">
					<view class="price">￥{{v.skuprice}}</view>
					<view class="step">
					X {{v.goodsnum}}
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		props:{
			dataList:{
				type:Array
			}
		}
	}
</script>

<style scoped>
	.cart-item-title {
		font-size: 32upx;
		font-weight: bold;
		color: rgb(51, 51, 51);
		line-height: 35upx;
		padding:30upx;
	}

	.cart-item {
		display: flex;
		position: relative;
		padding: 10upx 30upx;
		box-sizing: border-box;

	}

	.price {
		color: #FF0000;
		font-size: 30upx;
	}

	.uni-icon {
		font-size: 36upx;
	}

	.item-right-top {
		display: flex;
		flex: 1;
		justify-content: space-between;
		align-items: center;
	}

	.skuname {
		font-size: 20upx;
		color: #999999;
	}

	.bottom-width {
		width: 100%;
		justify-content: space-between;
		align-items: center;
		color: #FFFFFF;
	}

	.cart-item-left {
		position: relative;
		display: flex;
		align-items: center;
	}

	.product-img {
		width: 80px;
		height: 80px;
		border-radius: 5px;
		margin-left: 5upx;
	}

	.item-right {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding-left: 10upx;
		overflow: hidden;
		position: relative;
	}

	.title,
	.price {
		height: 40upx;
		line-height: 40upx;
		flex: 1;
	}
</style>
