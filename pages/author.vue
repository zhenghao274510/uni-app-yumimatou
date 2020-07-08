<template>
	<view>
		<view class="header">
			<image src="/static/1.png" />
		</view>
		<button class="bottom" type="primary" open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo" v-if="show">微信授权登录</button>
		<button class="bottom" type="primary" open-type="getPhoneNumber" lang="zh_CN" @getphonenumber="bindGetPhoneNumber"
		 v-else>进入</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				uid: '',
				show: true
			};
		},
		computed: {},
		methods: {
			bindGetPhoneNumber(e) {
				console.log(e)
				let self = this;
				uni.getSetting({
					success(res) {
						if (res.authSetting['scope.userInfo']) {
							uni.login({
								success: function(res) {
									console.log(res)
									let parmas = {
										uid: self.uid,
										encryptedData: e.detail.encryptedData,
										iv: e.detail.iv,
										code: res.code
									};
									console.log(parmas)
									self._reqw.ilogin(parmas, "getPhoneNum").then(res => {
										if (res.result == 0) {
											getApp().globalData.uid = self.uid;
											uni.setStorageSync('uid',self.uid);
											// self.$api.back()
											self.getQrcode();
										} else {
											self.$api.tip(res.resultNote)
										}
									});
								},
								fail: function() {
									// fail
								},
								complete: function() {
									// complete
								}
							});
						}
					}
				})
				// }
				// })
			},
			getQrcode() {
				let parmas = {
					cmd: 'userinfo',
					uid:this.uid
				};
				this._reqw
					.ipost(parmas)
					.then(res => {
						console.log(res);
						if (res.result == 0) {
							uni.setStorageSync('qrcode',res.dataobject.qrcode);
							this.$api.back();
						} else {
							this.$api.tip(res.resultNote);
						}
						
					})
					.catch(err => {});
			},
			bindGetUserInfo(e) {
				console.log(e)
				let self = this;
				wx.login({
					success: function(res) {
						console.log(res)
						let parmas = {
							code: res.code,
							userInfo: e.detail.userInfo,
							pid:getApp().globalData.pid
						};
						console.log(parmas)
						self._reqw.ilogin(parmas, "login").then(res => {
							if (res.result == 0) {
								console.log(res)
								self.uid = res.uid;
							        self.show=false;
							} else {
								self.$api.tip(res.resultNote)
							}
						});
					},
					fail: function() {
						console.log("失败")
						// fail
					},
					complete: function() {
						// complete
					}
				});
			}
		}
	};
</script>
<style scoped lang="scss">
	.header {
		margin: 90px auto;
		text-align: center;
	}

	.hide {
		opacity: 0;
	}

	.header image {
		width: 400rpx;
		height: 200rpx;
	}

	.bottom {
		height: 80rpx;
		width: 200px;
		background: #09BB07;
		border-radius: 12rpx;
		margin: 70rpx auto;
		font-size: 30rpx;
	}
</style>
