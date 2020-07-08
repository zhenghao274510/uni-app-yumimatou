<template>
	<scroll-view class="wuc-tab" :class="tabClass" :style="tabStyle" scroll-with-animation scroll-x :scroll-left="scrollLeft">
		<div v-if="!textFlex" class="uni-flex">
			<view class="" style="margin-bottom: 10px;background: #3D3D3D;">
				<div class="uni-flex-item  wuc-tab-item" :class="[index === tabCur ? selectClass + ' cur':'']" v-for="(item,index) in tabList"
				 :key="index" :id="index" @tap="tabSelect(index,$event)">
					<view>{{item.time1}}</view>
					<view v-if="index<tabCur"> 已结束</view>
					<view v-if="index>tabCur"> 未开始</view>
					<view v-if="index==tabCur"> {{text}}</view>
					<image class="wuc-tab-item-img" src="/static/img/home/miaoshaing.png" mode="scaleToFill" v-if="index==tabCur"></image>
				</div>
			</view>

		</div>

		<div class="flex text-center" v-if="textFlex">
			<view class="" style="margin-bottom: 10px;background: #3D3D3D;">
				<div class="wuc-tab-item" :class="index === tabCur ? selectClass + ' cur':''" v-for="(item,index) in tabList" :key="index"
				 :id="index" @tap="tabSelect(index,$event)">
					<view>{{item.time1}}</view>
					<view v-if="index<tabCur"> 已结束</view>
					<view v-if="index>tabCur"> 未开始</view>
					<view v-if="index==tabCur"> {{text}}</view>
					<image class="wuc-tab-item-img" src="/static/img/home/miaoshaing.png" mode="scaleToFill" v-if="index==tabCur"></image>
				</div>
			</view>

		</div>
	</scroll-view>
</template>
<script>
	export default {
		name: 'wuc-tab',
		data() {
			return {};
		},
		props: {
			tabList: {
				type: Array,
				default () {
					return [];
				}
			},
			text: {
				type: String
			},
			tabCur: {
				type: Number || String
			},
			tabClass: {
				type: String,
				default () {
					return '';
				}
			},
			tabStyle: {
				type: String,
				default () {
					return '';
				}
			},
			textFlex: {
				type: Boolean
			},
			selectClass: {
				type: String,
				default () {
					return 'text-blue';
				}
			}
		},
		methods: {
			tabSelect(index, e) {
				if (this.currentTab === index) return false;
				this.$emit('update:tabCur', index);
				this.$emit('change', index);
			}
		},
		computed: {
			scrollLeft() {
				return (this.tabCur - 1) * 60;
			}
		}
	};
</script>
<style>
	div,
	scroll-view,
	swiper {
		box-sizing: border-box;
	}

	.wuc-tab {
		white-space: nowrap;
		z-index: 9999;
	}

	.wuc-tab-item-img {
		position: absolute;
		top: 0;
		left: 0;
		width: 160upx;
		height: 115upx;
		z-index: -1;
	}
	.wuc-tab-item {
		display: inline-block;
		padding: 0 30upx;
		color: #9C9C9C;
		position: relative;
		text-align: center;
		width: 160upx;
		height: 100upx;
		box-sizing: border-box;
	}

	.position {
		position: absolute;
		bottom: -22upx;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 0;
		height: 0;
		border-left: 0;
		border-width: 8upx;
		border-style: solid;
		border-color: #09BB07 transparent transparent;
	}

	.wuc-tab-item.cur {
		background-color: #09BB07;
	}

	.wuc-tab.fixed {
		position: fixed;
		width: 100%;
		height: 100upx;
		top: 0;
		z-index: 1024;

	}

	.flex {
		display: flex;
	}

	.text-center {
		text-align: center;
	}

	.flex-sub {
		flex: 1;
	}

	.text-blue {
		color: #FFFFFF;
	}

	.text-white {
		color: #ffffff;
	}

	.bg-white {
		background-color: #ffffff;
	}

	.bg-blue {
		background-color: #0081ff;
	}

	.text-orange {
		color: #f37b1d
	}

	.text-xl {
		font-size: 36upx;
	}
</style>
