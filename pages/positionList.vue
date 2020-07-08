<template>
	<view class="swiper-content">
		<view class="search-wrapper">
			<xfl-select :list="cityList" :clearable="false" :listShow="false" :isCanInput="false" :initValue="city" :listTop="40"
			 :selectHideType="'hideAll'" @change="changeHouse">
			</xfl-select>
			<view class="search">
				<view class="uni-icon uni-icon-search"></view>
				<input class="placeholder" v-model="keyword" placeholder="请输入关键词搜索" @blur="getCurPositions(0)" />
			</view>
		</view>
		<scroll-view class="search-content" scroll-y="true" v-if="searchList.length!=0">
			<view class="search-item" v-for="(v,k) in searchList" :key="k">
				<view class="list b-b" @click.stop="checkAddress(v)">
					<view class="wrapper">
						<view class="address-box uni-flex">
							<text class="address">{{v.title}}</text>
						</view>
						<!-- <view class="u-box-first">
							<text class="name">{{v.address}}</text>
						</view> -->

					</view>
				</view>
			</view>
		</scroll-view>
		<view class="posititon-current">
			<view class="orders-title">
				<text>当前定位</text>
			</view>
			<view class="posititon-current-info" style="padding: 30upx;">
				<view class="">
					{{city}}
				</view>
				<view class="" @click="getCurPositions(1)">
					重新定位
				</view>
			</view>
		</view>
		<view class="">
			<view class="orders-title">
				<text>我的地址</text>
			</view>
			<view class="posititon-current-info">
				<view class="list b-b" @click.stop="currentAddress">
					<view class="wrapper">
						<view class="address-box uni-flex d-betten">
							<text class="address">当前定位</text>
							<text class="bi-btn">编辑</text>
						</view>
						<view class="u-box-first" style="margin-top: 20upx;">
							<text class="name">{{address}}</text>
						</view>

					</view>
				</view>
			</view>
			<view class="posititon-current-info" v-for="(v,k) in addressList" :key="k">
				<view class="list b-b" @click.stop="checkAddress(v)">
					<view class="wrapper">
						<view class="u-box-first">
							<text class="name">{{v.address}} {{v.addressdetail}}</text>
						</view>
						<view class="address-box uni-flex">
							<text class="address">{{v.name}} {{v.phone}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import xflSelect from "@/components/mycom/xfl-select.vue"
	import QQMapWX from "@/common/js/qqmap-wx-jssdk.js"
	export default {
		components: {
			xflSelect
		},
		data() {
			return {
				latitude: '',
				longitude: '',
				city: '',
				cityList: [],
				keyword: '',
				addressList: [],
				searchList: [],
				qqmapsdk: "",
				address: ''
			}
		},
		onLoad() {
			this.qqmapsdk = new QQMapWX({
				key: 'GQZBZ-3CECD-BP443-PBQEY-4R3M6-QMFBO'
			});
			if (uni.getStorageSync('city')) {
				this.city = uni.getStorageSync('city');
				this.address = uni.getStorageSync('address')

				console.log(this.address)
			}
			this.loadData();
			this.getCity();
		},
		methods: {
			getCurPositions(type) {
				let self=this;
				uni.getLocation({
					type: "gcj02", //返回可以用于wx.openLocation的经纬度
					success(res) {
						self.latitude = res.latitude;
						self.longitude = res.longitude;
						if (type == 0) {
							self.getNeary();
						} else {
							self.getPosition();
						}
					}
				});
			},
			getPosition() {
				let self = this;
				self.city="定位中...";
				self.address='';
				self.qqmapsdk.reverseGeocoder({
					location: {
						latitude: self.latitude,
						longitude: self.longitude
					},
					success: function(res) {
						console.log(res)
						var result = res.result;
						self.city = result.ad_info.city;
						self.address = result.formatted_addresses.rough;
						uni.setStorageSync('address', result.formatted_addresses.rough)
					}
				});
			},
			getCity() {
				let parmas = {
					cmd: 'getcity'
				}
				this._reqw
					.ipost(parmas)
					.then(res => {
						res.result == 0 ? (res.dataList.forEach(item => {
							item.value = item.city
						}), this.cityList = res.dataList) : this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			getNeary() {
				let self = this;
				self.qqmapsdk.search({
					keyword: self.keyword,
					location: `${self.latitude},${self.longitude}`,
					page_size: '20',
					page_index: self.page,
					success: function(res) {
						console.log(res);
						self.searchList = res.data;
					}
				});
			},
			loadData() {
				let parmas = {
					cmd: 'myAddressList',
					uid: getApp().globalData.uid
				};
				this._reqw
					.ipost(parmas)
					.then(res => {
						res.result == 0 ? this.addressList = res.dataList : this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			changeHouse(e) {
				console.log(e)
				this.city = e.orignItem.value;
			},
			currentAddress() {
				let obj={
					addressid: '',
					name: '',
					phone: '',
					address: '',
					addressdetail:this.address,
					longitude: '',
					latitude: '',
					isdefault:1
				}
				uni.redirectTo({
					url:`/pages/mineoptions/addressManage?id=${JSON.stringify(obj)}`
				})
			},
			checkAddress(e) {
				if (e.addressdetail != undefined) {
					uni.setStorageSync('address', e.addressdetail);
				} else {
					uni.setStorageSync('address', e.title);
				}
				this.$api.back()
			}

		}
	}
</script>

<style scoped lang="scss">
	.search-content {
		position: fixed;
		top: 50px;
		width: 100%;
		padding: 0 20upx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		z-index: 99;
		height: calc(100% - 50px);
	}
	.bi-btn{
		border: 1px solid #F2F2F2;
		color: #666666;
		padding: 5upx 10upx;
	}
	.d-betten{
		justify-content: space-between;
		width: 680upx;
	}

	.row {
		display: flex;
		align-items: center;
		position: relative;

		.tit {
			font-size: 21upx;
			color: #666666;
		}
	}

	.list {
		display: flex;
		flex-direction: column;
		border-radius: 10px;
	}

	.edmit {
		border: 1px solid #F2F2F2;
		color: #666666;
	}

	.del {
		border: 1px solid #F2F2F2;
	}

	.search-item {
		border-bottom: 1px solid #C0C0C0;
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 10px 0;
	}

	.address-box {
		display: flex;
		margin-top: 20upx;
		font-size: 20upx;

		.default {
			color: #6CD454;
		}

		.address {
			color: #999999;
		}
	}

	.posititon-current-info {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30upx;
		background-color: #eaeaea;
		margin-bottom: 20upx;
	}

	.posititon-current {
		padding-top: 100upx;
	}

	.orders-title {
		line-height: 40px;
		padding: 0 20px;
		border-bottom: 1px solid #F7F9FA;
		position: relative;
		overflow: hidden;
	}

	.bg-title {
		position: absolute;
		top: 50%;
		left: 45upx;
		width: 108upx;
		height: 15upx;
		transform: translateY(-50%);
		background-color: #D1FFC6;
		z-index: -1;
	}

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

	.search-wrapper {
		position: absolute;
		z-index: 10;
		top: 15upx;
		left: 5%;
		width: 90%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.search {
		color: #888;
		height: 60upx;
		font-size: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #F2F2F2;
		border-radius: 10upx;
		width: 500upx;
	}

	.uni-icon-search {
		font-size: 22upx;
	}

	.placeholder {
		font-size: 22upx;
	}
</style>
