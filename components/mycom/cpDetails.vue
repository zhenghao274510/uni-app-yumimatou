<template>
	<view style="margin-top: 10px;" v-if="list.length!=0">
		<view class="second-title">
			<image src="/static/img/home/cptuijian.png" mode=""></image>
		</view>
		<view class="uni-second-list">
			<view class="uni-second" v-for="(v,k) in list" :key="k" @click="stockDetails(v.menusid)">
				<view class="image-second">
					<image class="uni-second-image" :src="v.menusimage" ></image>
				</view>
				<view class="uni-second-price">
					<view class="uni-second-title">{{v.menusname}}
					</view>
					<!-- <view class="uni-flex uni-align-center sku-name">
						<text>{{v.menusdescs}} </text>
					</view> -->
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				list:[]
			}
		},
		methods: {
			set(val){
				console.log('cpdetails')
				this.list=val;
			},
			stockDetails(id) {
				uni.redirectTo({
					url:`/pages/goodDetails/cpdetails?id=${id}`
				})
			}
		}
	}
</script>
<style scoped lang="scss">
	.img {
		width: 60upx;
		height: 60upx;
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
		flex-wrap: wrap;
		margin-bottom: 10px;
		margin-top: 10px;
	}

	.uni-second {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin: 0 0 20upx 20upx;
		width: 46%;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 4upx;
	}

	.image-second {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.uni-second-image {
		// width: 339upx;
		height: 236upx;
		border-radius: 10upx;
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
		padding:10upx;
	}

	.uni-flex {
		justify-content: space-between;
		margin-bottom: 10px;
	}
</style>
