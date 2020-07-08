<template>
	<view class="content">
		<view class="genaral-area">
			<view class="flex-box table tc" v-for="(v,k) in options" :key="k">
				<view class="item-2 uni-flex-item">
					{{v.materialname}}
				</view>
				<view class="item-2 uni-flex-item" :class="{on:k%2==0}">
					{{v.menusweight}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			options:{
				type:Array,
				default:[]
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #fbf9fe;
		padding: 30upx 0;
	}

	.flex-box {
		display: flex;
		// flex: 1;
		width: 50%;
		// border-bottom: 1upx solid #e0e0e0;
	}


	.flex-box>.item-2 {
		flex: 1;
	}

	.flex-box>.item-3 {
		flex: 0 0 33.3333%;
	}

	.title {
		margin: 20upx 0;
		color: red;
	}

	//普通表格
	.genaral-area {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		.on{
			border-right:1upx solid #e0e0e0;
		}
		.item-2 {
			font-size: 28upx;
			padding: 16upx 0;
			box-sizing: border-box;
			text-align: center;
		}

		.thead {
			.item-2 {
				font-weight: bold;
				box-sizing: border-box;
			}
		}

		.table {
			.item-2 {
				display: flex;
				justify-content: center;
				align-items: center;
				box-sizing: border-box;
			}
		}
	}


	// 多行合并表格
	.advance-area {
		.item-3 {
			font-size: 26upx;
			border: 1upx solid #e0e0e0;
			border-width: 1upx 1upx 0 0;
			box-sizing: border-box;
			text-align: center;

			&:first-child {
				border-left-width: 1upx;
			}

			&:last-child {
				border-right-width: 1upx;
			}
		}

		.thead {
			.item-3 {
				font-weight: bold;
				padding: 16upx 0;
				box-sizing: border-box;
			}
		}

		.table {
			.item-3 {
				display: flex;
				justify-content: center;
				align-items: center;
				box-sizing: border-box;
			}
		}

		.table-flex {
			flex: 1;

			.item {
				padding: 10upx 0;
				box-sizing: border-box;

				&:last-child {
					border-width: 0;
				}
			}
		}
	}
</style>
