<template>
	<view class="swiper-content">
		<view class="search-wrapper">
			<view class="uni-flex uni-align-center" v-if="show==0">
				<view class="uni-flex-item" @click="position">
					<view class="uni-icon uni-icon-location-filled">
					</view>
					<text class="location-title">送至：{{address}}</text>
				</view>
				<view class="uni-flex uni-align-center" style="width: 50px;justify-content: center;" @click="gotoMessage">
					<image src="../../static/img/home/xiaoxiwu.png" class="img" v-if="showRed"></image>
					<image src="../../static/img/home/newxiaoxi.png" class="img" v-else></image>
				</view>
			</view>
			<view @click="search" style="margin-top: 10px;">
				<view class="search">
					<view class="uni-icon uni-icon-search"></view>
					<view class="placeholder">请输入关键词搜索</view>
				</view>
			</view>
		</view>
		<view class="swiper-wrapper">
			<swiper class="swiper" :indicator-dots="true"  :autoplay="true" :interval="3000" :duration="1000" circular="true"
			 indicator-active-color="#72BD54">
				<swiper-item class="swiper-item" v-for="(item,index) of dataList" :key="index" @click="imagDetails(item)">
					<img :src="item.bannerimage">
				</swiper-item>
			</swiper>
		</view>
	</view>

</template>

<script>
	import QQMapWX from "@/common/js/qqmap-wx-jssdk.js"
	export default {
		props: {
			dataList: {
				type: Array,
				default: []
			},
			show: {
				type: String,
				default: '0'
			}
		},
		data() {
			return {
				latitude: '',
				longitude: '',
				address: '定位中...',
				city: '',
				showRed:true
			}
		},
		methods: {
			set(val){
				this.list=val
			},
			setAddress(val){
				this.address=val
			},
			setShowRed(val){
				this.showRed=val
			},
			getPosition() {
				if(uni.getStorageSync('address')){
					this.address=uni.getStorageSync('address')
				}else{
					let qqmapsdk = new QQMapWX({
						key: 'GQZBZ-3CECD-BP443-PBQEY-4R3M6-QMFBO'
					});
					let self = this;
					uni.getLocation({
						type: "gcj02",
						success(res) {
							uni.setStorageSync('point', JSON.stringify(res));
							qqmapsdk.reverseGeocoder({
								location: {
									latitude: res.latitude,
									longitude: res.longitude
								},
								success: function(res) {
									console.log(res)
									var result = res.result;
									self.address = result.formatted_addresses.rough;
									uni.setStorageSync('city', result.ad_info.city);
									uni.setStorageSync('address',result.formatted_addresses.rough)
								}
							});
						}
					})
				}
				
			},
			search() {
				this.$emit('search')
			},
			gotoMessage() {
				this.$emit('click')
			},
			position() {
				this.$emit('position')
			},
			imagDetails(e) {
				console.log(e)
				if (e.type == 0) {
					uni.setStorageSync('content',e.content)
					this.$api.navTo(`/pages/mineoptions/webView`)
				} else if (e.type == 1) {
					this.$api.navTo(`/pages/goodDetails/gooddetails?id=${e.gid}`)
				}else if(e.type==undefined){
					this.$api.navTo(`/pages/goodDetails/lazyDetails?id=${e.gid}`)
				}
			}
		}
	}
</script>

<style scoped>
	.location-title {
		color: #FFFFFF;
		margin-left: 15upx;
		font-size: 24upx;
	}

	.swiper-content {
		position: relative;
		/* padding-top: calc(180upx +); */
		/* padding-top: calc(180upx + var(--status-bar-height)); */
	}

	.uni-icon-location-filled {
		color: #FFFFFF;
		font-size: 28upx;
	}

	.img {
		width: 50upx;
		height: 50upx;
	}

	.swiper {
		width: 750upx;
		height: 500upx;
	}

	.swiper-item {
		width: 750upx;
		display: block;
	}

	.swiper-item img {
		width: 750upx;
		display: block;
		height: 500upx;
	}

	.search-wrapper {
		position: absolute;
		z-index: 10;
		top: 15upx;
		left: 5%;
		width: 90%;
		height: 150upx;

	}

	.search {
		color: #888;
		height: 60upx;
		font-size: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 1);
		border-radius: 10upx;
	}

	.uni-icon-search {
		font-size: 22upx;
	}

	.placeholder {
		font-size: 22upx;
	}
</style>
