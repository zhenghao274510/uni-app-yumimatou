<template>
	<view>
		<view class="uni-flex uni-align-center">
			<image src="/static/img/cp/cphot@2x.png" mode="" class="img"></image>
			<text class="img-tip">今日推荐</text>
		</view>
		<scroll-view scroll-x="true" class="scroll-x">
			<view class="item-wrapper" :style="{width:parentsWidth}">
				<view class="item" v-for="(item,index) of dataList" :key="index" @click="detail(item)">
					<view class="icon">
						<image lazy-load :src="item.menusimage" mode="scaleToFill" />
					</view>
					<view class="tip uni-ellipsis">
						{{item.menusname}}
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
	
</template>

<script>
	export default {
		props:{
			dataList:{
				type:Array
			}
		},
		computed:{
			parentsWidth(){
				let len=this.dataList.length;
				if(len<=2){
					return  '100%'
				}else{
					return len*316+'rpx'
				}
			}
		},
		methods: {
			detail(e) {
				this.$api.navTo(`/pages/goodDetails/cpdetails?id=${e.menusid}`)
			}
		}
	}
</script>

<style scoped>
	.uni-flex{
		line-height: 70upx;
		align-items: center;
		padding: 0 20upx;
	}
	.img{
		width: 50upx;
		height: 50upx;
		margin-right: 20upx;
	}
	.img-tip{
		font-size:30upx;
		font-weight:bold;
		color:rgba(51,51,51,1);
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

	.item-wrapper {
		height: 380upx;
		/* width: 3792upx; */
	}

	.scroll-x .item {
		float: left;
		width: 300upx;
		/* height: 380upx; */
		background: #fff;
		margin: 0 8upx;
		border-radius: 15upx;
		overflow: hidden;
		position: relative;
	}

	.icon {
		width: 100%;
		height:280upx;
		position: relative;
	}

	.icon image {
		width: 100%;
		height: 100%;
		border-radius: 10upx;
	}

	.tip {
		height: 50upx;
		padding: 20upx 0;
		width: 100%;
		text-align: center;
		color: #333;
		font-size: 30upx;
		font-weight: bold;
		line-height: 50upx;
	}
</style>
