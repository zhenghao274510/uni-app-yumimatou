<template>
	<view class="content">
		<view class="uni-second-list">
			<view class="uni-second" @click="details(v)" v-for="(v,k) in dataList" :key="k">
				<view class="image-second">
					<image class="uni-second-image" :src="v.goodsimage" ></image>
				</view>
				<view class="uni-second-price">
					<view class="uni-second-title uni-ellipsis">{{v.goodsname}}
					</view>

					<view class="uni-flex">
						<progress :percent="v.percent" active="true" activeColor="#F55555" duration="20" border-radius="11" font-size="10"
						 stroke-width="11" backgroundColor="#FDE9EA" />
						<text class="percent">{{v.percent}}</text>
						<text class="percentNumber">已售{{v.salenum}}份</text>
					</view>
					<view class="uni-flex uni-align-center">
						<text class="price">秒杀价 ￥{{v.seckillprice}}/份</text>
					</view>
						<view class="sku-name" style="text-decoration: line-through;">
						市场价: <text>￥{{v.goodsprice}}</text>
					</view>
					<view class="btn noSecond" v-if="tabCur!=currentIndex">
						秒 杀
					</view>
					<view class="btn small-btn" v-else>
						秒 杀
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
			},
			endtime:{
				type:String||Number
			},
			tabCur:{
				type:String||Number
			},
			currentIndex:{
				type:String||Number
			}
		},
		methods: {
			init(){
				
			},
			details(e) {
				if(this.tabCur==this.currentIndex){
					this.$api.navTo(`/pages/goodDetails/sconedDetails?id=${e.seckillid}&time=${this.endtime}`)
					}else{
						this.$api.tip('该商品还未开始抢购')
					}
				
			}
		}
	}
</script>
<style lang="scss">
	progress {
		width: 60%;
		margin-right: 12upx;
	}
	.noSecond{
		background-color:#929292;
		color: #FFFFFF;
		text-align: center;
	}

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

	.percent {
		position: absolute;
		top: 50%;
		left: 30%;
		transform: translate(-50%, -50%);
		color: #FF0000;
		font-size: 22upx;
	}

	.percentNumber {
		color: #999999;
		font-size: 22upx;
	}

	.uni-space {
		justify-content: space-between;
	}

	.uni-flex {
		position: relative;
	}
</style>
