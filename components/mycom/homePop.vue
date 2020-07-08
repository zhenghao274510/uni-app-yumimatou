<template>
	<view class="mask" v-if="pickerShow">
		<view class="yaoqing-content" @click.stop="pickerShow=false">
			<image class="yaoqing-bg" src="/static/img/home/shouyetanchuang.png"></image>
			<image class="yaoqing-main" :src="url" mode=""></image>
			<view class="yaoqing-bottom">
				<view class="yaoqing-btn-con one" @click.stop="save" hover-class="btn-hover">
					保存二维码
				</view>
				<button class="yaoqing-btn-con uni-flex two" open-type="share" hover-class="btn-hover">
					<text>微信好友</text> <text class="share">GO</text>
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pickerShow: false,
				url: ''
			}
		},
		onShareAppMessage() {
			return {
				path: `/pages/index/index?scene=${getApp().globalData.cid}`,
			}
		},
		methods: {
			showPicker() {
				this.pickerShow = true;
			},
			hidePicker() {
				this.pickerShow = false;
			},
			set(val) {
				this.url = val;
				console.log(this.url)
			},
			savePhoto() {
				let that = this
				uni.downloadFile({
					url: that.url,
					success: function(res) {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success(res) {
								uni.showToast({
									title: '保存成功',
									icon: "success",
									duration: 1000
								})
							}
						})
					}
				})
			},
			//保存图片到相册，提示保存成功
			save() {
				let that=this;
				uni.getSetting({
					success(res) {
						//没有权限，发起授权
						if (!res.authSetting['scope.writePhotosAlbum']) {
							uni.authorize({
								scope: 'scope.writePhotosAlbum',
								success() { //用户允许授权，保存图片到相册
									that.savePhoto();
								},
								fail() { //用户点击拒绝授权，跳转到设置页，引导用户授权
									uni.openSetting({
										success() {
											uni.authorize({
												scope: 'scope.writePhotosAlbum',
												success() {
													that.savePhoto();
												}
											})
										}
									})
								}
							})
						} else { //用户已授权，保存到相册
							that.savePhoto()
						}
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.uni-flex {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.share {
		width: 60upx;
		height: 60upx;
		background: linear-gradient(0deg, rgba(251, 213, 55, 1), rgba(255, 243, 167, 1));
		border-radius: 50%;
		color: #B75700;
		margin-left: 15upx;
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99999;
		background: rgba(0, 0, 0, .6);
	}

	.yaoqing-bottom {
		position: fixed;
		bottom: 24%;
		left: 50%;
		transform: translateX(-50%);
		width: 90%;
		display: flex;
		justify-content: space-between;
	}

	.yaoqing-content {
		position: fixed;
		top: 5%;
		left: 50%;
		height: 1000upx;
		transform: translateX(-50%);
		width: 80%;

	}

	.yaoqing-bg {
		width: 100%;
		height: 1000upx;
	}

	.yaoqing-main {
		width: 280upx;
		height: 280upx;
		position: fixed;
		top: 48%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.yaoqing-btn-con {
		height: 75upx;
		background: rgba(111, 215, 88, 1);
		box-shadow: 0px 6px 10px 0px rgba(111, 215, 88, 0.2);
		border-radius: 38upx;
		text-align: center;
		line-height: 75upx;
		color: #FFFFFF;
	}

	.one {
		width: 242upx;
	}

	.two {
		width: 261upx;
		font-size: 28upx;
		display: inline-block;
	}
</style>
