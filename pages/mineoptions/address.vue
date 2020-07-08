<template>
	<view class="content b-t">
		<!-- <empty v-if="addressList.length==0"></empty> -->
		<!-- 调试 -->
		<view class="list b-b" >
			<view class="wrapper">
				<view class="u-box-first">
					<!-- <text class="name">{{v.name}}</text>
					<text class="mobile">{{v.phone}} </text> -->
				</view>
				<view class="address-box uni-flex">
					<text class="default">【当前地址】</text>
					<text class="address">{{address}}</text>
				</view>
			</view>
			<view class="u-box line">
				<view class="row ">
				</view>
				<view class="u-bottom">
					<text class="yticon edmit" @click.stop="addAddress('edit')">编辑</text>
					<!-- <text class="yticon del" @click.stop="delAddress(v.addressid, k)">删除</text> -->
				</view>
			</view>
		</view>
		<block v-for="(v,k) in addressList" :key="k">
			<view class="list b-b" @click.stop="checkAddress(v)">
				<view class="wrapper">
					<view class="u-box-first">
						<text class="name">{{v.name}}</text>
						<text class="mobile">{{v.phone}} </text>
					</view>
					<view class="address-box uni-flex">
						<text class="default" v-if="k==0">【默认】</text>
						<text class="address">{{v.address}}{{v.addressdetail}}</text>
					</view>
				</view>
				<view class="u-box line">
					<view class="row " v-if="k==0">
					</view>
					<view class="row " @click="choseDefault" v-else>
						<view class="uni-icon uni-icon-checkbox-filled" style="color: #CCCCCC;"></view>
						<view class="tit">设为默认</view>
					</view>
					<view class="u-bottom">
						<text class="yticon edmit" @click.stop="addAddress('edit',v)">编辑</text>
						<text class="yticon del" @click.stop="delAddress(v.addressid, k)">删除</text>
					</view>
				</view>
			</view>
		</block>
		<uni-load-more :status="status" v-if="addressList.length!=0"></uni-load-more>
		<view class="add-btn" @click="addAddress('add')" hover-class="btn-hover" :style="{paddingBottom:is_lhp?'40rpx':'0'}">+新增地址</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import empty from "@/components/mycom/empty.vue"
	export default {
		data() {
			return {
				status: 'loading',
				source: 0,
				addressList: [],
				initList: [],
				page: 1,
				totalPage: 1,
				is_lhp: false,
				address: ''
			};
		},
		components: {
			uniLoadMore,
			empty
		},
		onLoad(options) {
			console.log(options.source);
			this.source = options.source;
			this.is_lhp = this.$is_bang;

		},
		onShow() {
			this.loadData();
			if (uni.getStorageSync('address')) {
				this.address = uni.getStorageSync('address')
			}
		},
		// onReachBottom() {
		// 	this.status = 'loading';
		// 	this.totalPage > this.page ?
		// 		((this.page += 1), this.loadData()) :
		// 		setTimeout(() => {
		// 			this.status = 'noMore';
		// 		}, 30);
		// },
		methods: {
			choseDefault() {
				this.$api.tip("修改默认")
			},
			loadData() {
				let parmas = {
					cmd: 'myAddressList',
					uid: getApp().globalData.uid
				};
				this._reqw
					.ipost(parmas)
					.then(res => {
						console.log(res)
						res.result == 0 ? (this.status = 'noMore', this.addressList = res.dataList) :
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			//选择地址
			checkAddress(item) {
				if (this.source == 1) {
					//  上一页实例
					console.log(item);
					this.$api.prePage().addressData = item;
					this.$api.back();
				}
			},
			addAddress(type, e) {
				let initList, url;
				if (type == 'edit') {
					if (e == undefined) {
						e = {
							addressid: '',
							name: '',
							phone: '',
							address: '',
							addressdetail:this.address,
							longitude: '',
							latitude: '',
							isdefault:1
						}
					}
					url = `/pages/mineoptions/addressManage?id=${JSON.stringify(e)}`

				} else {
					url = `/pages/mineoptions/newAddAdress`
				}

				this.$api.navTo(url);
			},
			perData(id){
				if(this.source==1){
					(id==this.$api.prePage().addressData.addressid)?this.$api.prePage().addressData={
							addressid: "", //收货地址ID
							name: "", //收货人姓名
							phone: "", //收货人电话
							address: "", //收货地址
							addressdetail: "", //详细地址
							longitude: "", //经度
							latitude: "", //纬度
							isdefault: "" //是否默认(0否 1是)
					}:''
					console.log(this.$api.prePage().addressData)
				}
			},
			delAddress(id, k) {
				let _this = this;
				uni.showModal({
					confirmText: '确定',
					cancelText: '取消',
					confirmColor: "#ff3b32",
					content: '确定删除吗？',
					success(res) {
						if (res.confirm) {
							let parmas = {
								cmd: 'deleteAddress',
								uid: getApp().globalData.uid,
								addressId: id
							}
							_this._reqw
								.ipost(parmas)
								.then(res => {
									res.result == 0 ? (_this.$api.tip('删除成功'),_this.perData(id), _this.addressList.splice(k, 1)) : _this.$api.tip(res.resultNote);
								})
								.catch(err => {});
						} else if (res.cancel) {
							console.log('取消')
						}
					}
				});
			}
			// initData() {
			// 	this.page = 1;
			// 	this.totalPage = 1;
			// 	this.addressList = [];
			// 	this.loadData();
			// }
		}
	};
</script>

<style lang="scss" scoped>
	.uni-icon {
		font-size: 28upx;
		margin-right: 15upx;
	}

	.iconfont {
		font-size: 40upx;
		margin-right: 10upx;
	}

	.line {
		border-top: 1px solid #f0f0f0;
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
		width: 90%;
		margin: 10px auto;
		padding: 0 10px;
		background: #fff;
		box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.04);
		border-radius: 10px;
	}

	.edmit {
		border: 1px solid #F2F2F2;
		color: #666666;
	}

	.del {
		border: 1px solid #F2F2F2;
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

	.u-box-first {
		color: #666666;
		// font-weight: bold;
		margin-top: 16upx;
		display: flex;
		align-items: center;

		.name {
			margin-right: 30upx;
			font-weight: bold;
			color: #333333;
		}

		.mobile {
			color: #333333;
		}
	}

	.u-box {
		font-size: 14px;
		margin-top: 16upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 80upx;
		font-size: 32upx;
		color: #fff;
		background-color: #6FD758;
		border-radius: 0;
		border: none;
	}

	.u-bottom {
		display: flex;
		justify-content: flex-end;
		padding: 10px 0;
	}

	.yticon {
		padding: 4upx 20upx;
		border-radius: 5px;
		margin-left: 15px;
		font-size: 22upx;
	}
</style>
