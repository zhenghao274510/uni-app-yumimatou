<template>
	<view style="margin-top: 10px;">
		<view class="uni-flex-title">
			<image src="/static/img/cp/cplinggan@2x.png" mode="" class="img"></image>
			<text class="img-tip">懒人推荐</text>
		</view>
		<scroll-view scroll-x="true" class="scroll-x" :scroll-left="scrollLeft">
			<view class="item-wrapper" :style="{width:width}">
				<view class="item uni-flex uni-column" :class="{on:active==index}" v-for="(item,index) of cpLingGanTitle" :key="index" @click="detail(item,index)">
					<view class="tip">
						{{item.name}}
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="uni-second-list">
			<view class="uni-second" :class="{margin:k%2==0}" @click="stockDetails(v.lazyid)" v-for="(v,k) in list" :key="k">
				<view class="image-second">
					<image class="uni-second-image" :src="v.lazyimage" ></image>
				</view>
				<view class="uni-second-price">
					<view class="  ">
						<text class="sku-name uni-ellipsis">{{v.lazyname}} </text> 
					</view>
					<view class="">
						<text class="num">￥{{v.lazyprice}}/份</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				active:0,
				cpLingGanTitle:[],
				list: [],
				width:''
			}
		},
		computed:{
			scrollLeft(){
				return  (this.active-1)*50
			}
		},
		methods: {
			init(){
				this.list=[];
			},
			setClass(val){
				this.cpLingGanTitle=val;
				this.width=this.cpLingGanTitle.length*100+'px'
			},
			setLing(val){
				this.list=val;
			},
			initData(){
				this.list=[]
			},
			stockDetails(id) {
				this.$api.navTo(`/pages/goodDetails/lazyDetails?id=${id}`)
			},
			detail(e,k){
				console.log(e)
				if(this.active==k){
					return
				}else{
					this.active=k;
					this.$parent.getLingGan(e.cid)
				}
				
			}
			
		}
	}
</script>
<style scoped lang="scss">
	.on{
		color: #09BB07;
		border-color: #09BB07 !important;
	}
	.scroll-x {
		padding: 20upx 30upx;
		box-sizing: border-box;
	}

	.item-wrapper {
		height: 60upx;
		// width: 3792upx;
	}

	.scroll-x .item {
		float: left;
		margin: 0 8upx;
		border-radius: 15upx;
		overflow: hidden;
		position: relative;
		display: flex;
		flex-direction: column;
	}

	.scroll-x .item .tip {
		border: 2upx solid rgb(204, 204, 204);
		border-radius: 24upx;
		text-align: center;
		font-size: 24upx;
		padding: 4upx 20upx;
	}

	.num {
		font-weight: bold;
		color:#FD3D00;
	}

	.uni-flex-title {
		line-height: 70upx;
		align-items: center;
		padding: 0 20upx;
		display: flex;
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

	.content {
		background: #ffffff;
		box-sizing: border-box;
	}

	.price {
		color: #666666;
		font-size: 24upx;
	}

	.sku-name {
		color: #333333;
		width: 60%;
	}

	.second-title {
		height: 54upx;
		display: flex;
		align-items: center;
		justify-content: center;

		image {
			height: 54upx;
		}
	}

	.uni-second-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 20upx;
		margin-bottom: 20upx;
		background-color: #f7f7f7;
	}

	.margin {
		margin-right: 15upx;
	}

	.uni-second {
		display: flex;
		flex-direction: column;
		width: 48.5%;
		box-sizing: border-box;
		background-color: #FFFFFF;
		margin-top: 20upx;
	}

	.image-second {
		width: 95%;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.uni-second-image {
		// width:315upx;
		height:253upx;
		border-radius: 10upx;
	}

	.uni-second-price {
		flex: 1;
		font-size: 28upx;
		line-height: 1.5;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding:15upx;
	}

	.uni-flex {
		justify-content: space-between;
		margin-bottom: 10px;
		align-items: center;
	}
</style>
