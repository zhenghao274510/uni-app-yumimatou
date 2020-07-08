<template>
	<view class="page-body">
		<!--主体-->
		<view class="meMain">
			<view class="mePosition" @click="gotoOther(10)">
				<view class="position uni-flex uni-align-center">
					<image src="../../static/img/home/00.png" mode="" class="img"></image>
					<text>设置</text>
				</view>
				<view class="meMainBox">
					<!--头部-->
					<view class="meHead">
						<view class="" style="display: flex;align-items: center;">
							<view class="meHeadAvatar">
								<image src="/static/img/home/touxiang.png" mode="aspectFill" v-if="dataobject.icon == ''"></image>
								<image :src="dataobject.icon" mode="aspectFill" v-else></image>
							</view>
							<view class="meHeadName">
								<view class="useInfo">{{ dataobject.nickname }}</view>
								<view class="useInfo" v-if="phone != ''">{{ dataobject.phone }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="meOverBgOne">
			<mine-order-list @click="onClick" :dataObj="dataobject"></mine-order-list>
			<mine-servce-list @click="gotoOther"></mine-servce-list>
			<home-list :type="1" ref="homeList"></home-list>
		</view>
	</view>
</template>

<script>
	import mineOrderList from '@/components/mycom/mine-order-list.vue';
	import mineServceList from '@/components/mycom/mine-servce-list.vue';
	import homeList from '@/components/mycom/homeList.vue';
	export default {
		components: {
			mineOrderList,
			mineServceList,
			homeList
		},
		data() {
			return {
				title: '个人中心',
				newcolor: '#6BD453',
				fontColor: '#fff',
				dataobject: {
					phone: '', //手机号
					nickname: '点击登录', //昵称
					icon: '', //头像
					balance: '', //会员余额
					money: '', //分销余额
					qrcode: '', //邀请码链接
					daifukuan: "", //待付款数量
					daishouhuo: "", //待收货数量
					daipingjia: "", //待评价数量
					tuikuan: "" //退款数量
				},
				totalPage: 1,
				page: 1
			};
		},
		methods: {
			initData() {
				this.$refs.homeList.init();
				if (uni.getStorageSync('uid')) {
					getApp().globalData.uid = uni.getStorageSync('uid')
				}
				uni.setNavigationBarTitle({
					title: '个人中心'
				});
				uni.setNavigationBarColor({
					frontColor: '#ffffff',
					backgroundColor: '#6BD453'
				});
				if (getApp().globalData.uid != '') {
					this.loadDate();
				}
				this.hoteList();
			},
			loadMore() {
				console.log('mine  页面数据加载更多');
				this.status = 'loading';
				this.totalPage > this.page ?
					((this.page += 1), this.hoteList()) :
					setTimeout(() => {
						this.status = 'noMore';
					}, 1000);
			},
			loadDate() {
				let parmas = {
					cmd: 'userinfo',
					uid: getApp().globalData.uid
				};
				this._reqw
					.ipost(parmas, 'userInfo')
					.then(res => {
						console.log(res);
						if (res.result == 0) {
							if (res.dataobject.phone != '') {
								res.dataobject.phone = this.$api.formPhone(res.dataobject.phone);
							}
							this.dataobject = res.dataobject;
							uni.setStorageSync('balance', res.dataobject.balance);
							uni.setStorageSync('money', res.dataobject.money);
							uni.setStorageSync('qrcode', res.dataobject.qrcode);
						} else {
							this.$api.tip(res.resultNote);
						}

					})
					.catch(err => {});
			},
			infoDetail() {
				this.$api.navTo('/pages/mineoptions/setUp');
			},
			onClick(e) {
				console.log(e);
				if (getApp().globalData.uid == '') {
					this.$api.navTo('/pages/author')
				} else {
					let url = '';
					if (e == 5) {
						url = '/pages/order/order?id=0';
					} else {
						url = `/pages/order/order?id=${e}`;
					}
					this.$api.navTo(url);
				}

			},
			//   热销商品
			hoteList() {
				let parmas = {
					cmd: 'sellwellGoodsList',
					nowPage: this.page,
					pageCount: '10'
				};
				this._reqw
					.ipost(parmas)
					.then(res => {
						console.log(res);
						res.result == 0 ? ((this.totalPage = res.totalPage), this.$refs.homeList.set(res.dataList)) : this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			gotoOther(e) {
				if (getApp().globalData.uid == '') {
					this.$api.navTo('/pages/author')
				} else {
					console.log(e);
					switch (e) {
						case 0:
							this.$api.navTo(`/pages/mineoptions/money?id=${this.dataobject.money}`);
							break;
						case 1:
							this.$api.navTo('/pages/mineoptions/fensi');
							break;
						case 2:
							this.$api.navTo('/pages/mineoptions/compline');
							break;
						case 3:
							this.$api.navTo(`/pages/mineoptions/vip?id=${this.dataobject.balance}`);
							break;
						case 4:
							this.$api.navTo('/pages/mineoptions/fencai');
							break;
							//  个人资料
						case 5:
							this.$api.navTo('/pages/mineoptions/we');
							break;
						case 6:
							this.$api.navTo('/pages/mineoptions/address?source=0');
							break;
							//  消息
						case 7:
							this.$api.navTo('/pages/mineoptions/probelm');
							break;
						case 8:
							this.$api.callPhone(uni.getStorageSync('phone'));
							break;
						case 9:
							this.$api.navTo('/pages/mineoptions/yijian');
							break;
						case 10:
							this.$api.navTo('/pages/mineoptions/setUp');
							break;
					}
				}
			}
		}
	};
</script>

<style scoped lang="scss">
	.position {
		position: absolute;
		right: 0;
		top: 40%;
		transform: translateY(-50%);
		width: 177upx;
		height: 55upx;
		line-height: 55upx;
		background: rgba(249, 109, 109, 1);
		border-radius: 26px 0px 0px 29px;
		font-size: 24upx;
		color: #ffffff;

		.img {
			width: 32upx;
			height: 30upx;
			margin: 12upx 30upx;
		}
	}

	.icon-youjiantou {
		font-size: 38upx;
		color: #ffffff;
	}

	.clore {
		width: 10upx;
		height: 10upx;
		border-radius: 50%;
		position: absolute;
		right: 0;
		top: 0;
		border: 1px solid #ffffff;
	}

	.page-body {
		display: flex;
		flex-direction: column;
	}

	.top {
		margin-top: 30px;
	}

	.kefuIcon {
		width: 25px;
		height: 22px;
	}

	.kefuIcon>image {
		width: 100%;
	}

	.useInfo {
		text-align: left;
	}

	.imageConOne {
		width: 28px;
		height: 34px;
		margin-right: 5px;
	}

	.imageConTwo {
		width: 30px;
		height: 26px;
		margin-right: 5px;
	}

	.imageConOne>image {
		width: 100%;
		height: 100%;
	}

	.imageConTwo>image {
		width: 100%;
		height: 100%;
	}

	.meMain {
		width: 100%;
		height: 300upx;
		position: relative;
		// padding-bottom: 30px;
		background-color: $uni-border-color;
	}

	.meMain>image {
		width: 100%;
		height: 280upx;
		display: block;
	}

	.meMainBox {
		width: 92%;
		margin: 0 auto;
	}

	.mePosition {
		width: 100%;
	}

	.meHead {
		overflow: hidden;
		position: relative;
		padding: 20px 0 0 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.meHeadAvatar {
		margin-top: 10upx;
	}

	.meHeadAvatar image {
		width: 110upx;
		height: 110upx;
		display: block;
		border-radius: 50%;
	}

	.meHeadName {
		color: #ffffff;
		font-size: 28upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: flex;
		flex-direction: column;
		margin-left: 10px;
	}

	.meOverBgOne {
		margin-top: -30px;
		z-index: 999;
		background-color: #ffffff;
		border-radius: 20px 20px 0 0;
	}
</style>
