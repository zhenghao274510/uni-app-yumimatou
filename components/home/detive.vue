<template>
	<div class="all">
		<div class="contains">
			<div class="nav-item" v-for="(item,index) in dataList" :key="index"  @click="classify(index)">
				<img :src="item.image"  />
				<view class="nav-item-info">
					<view class="nav-item-name">
						{{item.name}}
					</view>
					<view class="nav-item-text">
						{{item.text}}
					</view>
				</view>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			dataList:{
				type:Array
			}
		},
		methods: {
			classify(k) {
				this.$emit('click',k)
			}
		}
	};
</script>

<style scoped lang="scss">
	.nav-item-info{
		position: absolute;
		top:20upx;
		left: 30upx;
		height: 100%;
	}
	.nav-item-name{
		font-size:26upx;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	.nav-item-text{
		font-size:16upx;
		font-weight:500;
		color:rgba(153,153,153,1);
	}
	.all {
		width: 100%;
		position: relative;
		padding: 0 15upx;
		box-sizing: border-box;
		.contains {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			position: relative;
			.nav-item {
				width: 25%;
				margin-top: 20upx;
				margin-bottom: 20upx;
				display: flex;
				align-items: center;
				flex-direction: column;
				justify-content: center;
				position: relative;

				img {
					width: 170upx;
					height: 110upx;
					border-radius: 6px;
				}

				span {
					font-size:24upx;
					color: #666;
					margin-top: 14upx;
					width: 100%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					text-align: center;
				}
			}
		}
	}
</style>

