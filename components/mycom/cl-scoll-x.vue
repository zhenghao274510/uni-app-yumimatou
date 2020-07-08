<template>
	<view>
		<scroll-view scroll-x="true" class="scroll-x">
			<view class="item-wrapper" :style="{width:parentsWidth}">
				<view class="item uni-flex uni-column" v-for="(item,index) of list" :key="index" @click="detail(item,index)">
					<view class="icon">
						<image lazy-load :src="item.image" class="img" />
					</view>
					<view class="tip uni-ellipsis" :class="{on:active==index}">
						{{item.name}}
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				parentsWidth:'',
				active:0
			}
		},
		methods: {
			set(val){
				console.log(val)
				this.list=val;
				if(getApp().globalData.cid==''){
					this.active=0
				}else{
					this.list.forEach((item,index)=>{
							if(item.cid==getApp().globalData.cid){
								this.active=index
							}	
					})
				}
				console.log(this.active)
				this.parentsWidth=val.length*80+'px'
			},
			detail(e,k) {
				this.active=k;
				this.$emit('click',e)
			}
		}
	}
</script>

<style scoped>
	.cp-scoll-tit{
		font-size:36upx;
		font-weight:bold;
		color:rgba(51,51,51,1);
		padding: 30upx;
	}
	.on{
		color: #09BB07 !important;
	}
	.uni-flex{
		align-items: center;
	}
	.img-tip{
		font-size:34upx;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	view {
		font-size: 24upx;
	}

	.scroll-x {
		padding: 20upx 0;
	}

	.item-wrapper {
		height: 160upx;
		/* width: 3792upx; */
	}

	.scroll-x .item {
		float: left;
		width: 135upx;
		height: 160upx;
		/* background: #fff; */
		margin: 0 8upx;
		border-radius: 15upx;
		overflow: hidden;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;

	}

	.icon {
		width:79upx;
		height:76upx;

	}

	.icon .img {
		width:79upx;
		height:76upx;
		border-radius:28upx;
	}

	.tip {
		font-size:22upx;
		font-weight:500;
		color:rgba(102,102,102,1);
		width: 100%;
		text-align: center;
		margin-top: 10upx;
	}
</style>
