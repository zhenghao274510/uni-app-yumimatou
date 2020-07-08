<template>
	<view class="uni-steps">
		<view class="uni-steps-title">
			退款进度
		</view>
		<view :class="'uni-steps-' + direction" class="uni-steps-items">
			<view v-for="(item,index) in options" :key="index" :class="{'uni-steps-process':index === active,'uni-steps-finish':index < active}"
			 class="uni-steps-item">
				<view class="uni-steps-item-circle-container">
					<uni-icon  v-if="index== active" :color="activeColor" type="checkbox-filled" size="16" />
					<view v-else :style="{backgroundColor:index < active ? activeColor : ''}" class="uni-steps-item-circle" />
				</view>
				<view v-if="index !== options.length-1" :style="{backgroundColor:index < active ? activeColor : ''}" class="uni-steps-item-line" />
				<view :style="{color:index <= active ? activeColor : ''}" class="uni-steps-item-title-container">
					<view class="uni-steps-item-title">{{ item.title }}</view>
					<view v-if="item.desc" class="uni-steps-item-desc">{{ item.desc }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from '../uni-icon/uni-icon.vue'
	export default {
		name: 'UniSteps',
		components: {
			uniIcon
		},
		props: {
			direction: { // 排列方向 row column
				type: String,
				default: 'row'
			},
			activeColor: { // 激活状态颜色
				type: String,
				default: '#6BD453'
			},
			active: { // 当前步骤
				type: Number,
				default: 0
			},
			options: {
				type: Array,
				default () {
					return []
				}
			} // 数据
		},
		data() {
			return {}
		}
	}
</script>

<style>
	@charset "UTF-8";

	.uni-steps-title {
		font-size: 32upx;
		font-weight: bold;
		color: rgb(51, 51, 51);
		line-height: 35upx;
		padding: 30upx 0;
		
	}

	.uni-steps {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		position: relative;
		padding:30upx;
	}

	.uni-steps-items {
		position: relative;
		display: flex;
		flex-direction: row;
		margin: 20upx;
		box-sizing: border-box;
		overflow: hidden
	}

	.uni-steps-items.uni-steps-column {
		margin: 20upx 0;
		padding-left: 62upx;
		flex-direction: column
	}

	.uni-steps-items.uni-steps-column .uni-steps-item:after {
		content: ' ';
		position: absolute;
		height: 4upx;
		width: 100%;
		top: 0;
		left: 0;
		background-color: #ebedf0;
		transform: scaleY(.5)
	}

	.uni-steps-items.uni-steps-column .uni-steps-item:last-child {
		position: relative
	}

	.uni-steps-items.uni-steps-column .uni-steps-item:last-child:after {
		height: 0
	}

	.uni-steps-items.uni-steps-column .uni-steps-item:last-child .uni-steps-item-title-container {
		text-align: left
	}

	.uni-steps-items.uni-steps-column .uni-steps-item:last-child .uni-steps-item-circle-container {
		left: -34upx;
		right: auto
	}

	.uni-steps-items.uni-steps-column .uni-steps-item-title-container {
		transform: none;
		display: block;
		line-height: 36upx
	}

	.uni-steps-items.uni-steps-column .uni-steps-item-title {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden
	}

	.uni-steps-items.uni-steps-column .uni-steps-item-desc {
		white-space: normal;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden
	}

	.uni-steps-items.uni-steps-column .uni-steps-item-circle-container {
		left: -34upx;
		top: -2upx;
		/* bottom: auto; */
		padding: 16upx 0;
		z-index: 1
	}

	.uni-steps-items.uni-steps-column .uni-steps-item-line {
		height: 100%;
		width: 2upx;
		left: -30upx;
		top: -2upx;
		bottom: auto
	}

	.uni-steps-items.uni-steps-column .uni-steps-item.uni-steps-process .uni-steps-item-circle-container {
		bottom: auto;
		left: -42upx
	}

	.uni-steps-item {
		flex: 1;
		position: relative;
		padding-bottom: 18px
	}

	.uni-steps-item-title-container {
		text-align: left;
		margin-left: 6upx;
		display: inline-block;
		transform: translateX(-50%);
		color: #999
	}

	.uni-steps-item-title {
		font-size: 28upx;
		margin-top: 50upx;
		font-weight: bold;
		
	}

	.uni-steps-item-desc {
		font-size: 24upx
	}

	.uni-steps-item:first-child .uni-steps-item-title-container {
		transform: none;
		margin-left: 0
	}

	.uni-steps-item:last-child {
		position: absolute;
		right: 0
	}

	.uni-steps-item:last-child .uni-steps-item-title-container {
		transform: none;
		text-align: right
	}

	.uni-steps-item:last-child .uni-steps-item-circle-container {
		left: auto;
		right: -16upx
	}

	.uni-steps-item-circle-container {
		position: absolute;
		top: 4upx;
		left: -16upx;
		padding: 0 16upx;
		z-index: 1
	}

	.uni-steps-item-circle {
		width: 20upx;
		height: 20upx;
		background-color: #999;
		border-radius: 50%;
		margin-top: 8upx;
	}

	.uni-steps-item-line {
		background-color: #ebedf0;
		position: absolute;
		top: 20upx;
		left: 10rpx;
		right: 10rpx;
		width: 100%;
		height: 4upx
	}

	.uni-steps-item.uni-steps-finish .uni-steps-item-title-container {
		color: #333
	}

	.uni-steps-item.uni-steps-process .uni-steps-item-circle-container {
		/* bottom: 3px; */
		display: flex
	}
</style>
