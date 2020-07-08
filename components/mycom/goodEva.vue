<template>
	<view class="eva-section">
		<view class="e-header">
			<text class="tit">用户评价</text>
			<text class="tip" @click="gotoEva">更多</text>
			<text class="iconfont icon-youjiantou"></text>
		</view>
		<view class="eva-box">
			<block v-for="(v,k) in dataList" :key="k"> 
			<view class="eva-top">
				<view class="eva-top-left">
					<image class="img" :src="v.usericon" mode="aspectFill"></image>
					<view class="eva-info">
						<text class="name">{{v.nickname}}</text>
						<sx-rate :defaultStar="v.star" disabledStar="true" :ind="k"></sx-rate>
					</view>
				</view>
				<view class="time">{{v.adtime}}</view>
			</view>
			<view class="eva-content">
				<text class="con">{{v.content}}</text>
				<view class="eva-img-con" v-if="v.images.length!=0"><image class="img" v-for=" (m,n) in v.images" :key="n" :src="m" mode="scaleToFill" @click="ImgDetails(k,n)"></image></view>
			</view>
		</block>
		</view>
	</view>
</template>

<script>
import sxRate from '@/components/sunui-star/sunui-star.vue';
export default {
	components: {
		sxRate
	},
	props:{
		dataList:{
			type:Array
		},
		productId:{
			type:String
		}
	},
	methods: {
		gotoEva() {
			this.$api.navTo(`/pages/useEvaList?id=${this.productId}`)
		},
		ImgDetails(k,n){
			uni.previewImage({
				urls:this.dataList[k].images,
				current:this.dataList[k].images[n]
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
	padding:30upx;
	background: #fff;
	margin-bottom: 16upx;
	.e-header {
		display: flex;
		.tit {
			margin-right: 4upx;
			color: #333333;
			font-weight: 600;
		}
		&::before{
			content: '';
			width:6upx;
			height:29upx;
			background:rgba(111,215,88,1);
			border-radius:3px;
			margin-right: 15upx;
			margin-top: 10upx;
		}
		.tip {
			flex: 1;
			text-align: right;
			color: #999999;
			font-size: 24upx;
		}
	}
}
.eva-box {
	display: flex;
	flex-direction: column;
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
				width: 160upx;
				height: 160upx;
				border-radius: 10upx;
				margin-right: 20upx;
			}
		}
	}
}
</style>
