<template>
	<view class="content">
		<view class="shouyi-con" v-for="(v,k) in navList" :key="k" @click="goto(k)">
			<view class="shouyi-list">
				<text class="">{{v.text}}</text>
			</view>
			<view class="uni-flex all">
				<view class="" v-if="k==1&&currentSize!=0">
					{{currentSize}}KB
				</view>

				<view class="uni-icon uni-icon-arrowright" style="color: #999999;font-size: 12px;">
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	// import  from ""
	export default {
		data() {
			return {
				currentSize: 0,
				navList: [{
						text: '意见反馈',
					},
					{
						text: '清除缓存',
					},
					{
						text: '联系客服',
					}
				],
				uid: '',
				phone: '',
				qrcode:"",
				vipNum:'',
				interval: null
			}
		},
		components: {},
		onLoad() {
			this.getSize()
		},
		methods: {
			getSize() {
				let self = this;
				self.uid = getApp().globalData.uid;
				self.phone = uni.getStorageSync('phone');
				self.qrcode = uni.getStorageSync('qrcode');
				self.vipNum = uni.getStorageSync('vipNum');
				uni.getStorageInfo({
					success(res) {
						console.log(res)
						self.currentSize = res.currentSize;
					}
				})
			},
			goto(k) {
				console.log(k)
				if (k == 1) {
					let self = this;
					uni.clearStorage({
						success(res) {
							console.log(res);
							self.interval = setInterval(() => {
								self.currentSize -= 1;
								if (self.currentSize <=0) {
									clearInterval(self.interval);
									self.currentSize = 0;
									self.$api.tip('清除成功');
									uni.setStorageSync('uid', self.uid);
									uni.setStorageSync('phone', self.phone);
									uni.setStorageSync('qrcode', self.qrcode);
									uni.setStorageSync('vipNum', self.vipNum);
								}
							}, 30)
						}
					})
				} else if (k == 0) {
					this.$api.navTo('/pages/mineoptions/yijian')
				} else {
					this.$api.callPhone(this.phone)
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.all {
		align-items: center;
		color: #666666;
	}

	.content {
		width: 100%;
		display: flex;
		flex-direction: column;

		.shouyi-con {
			display: flex;
			width: 90%;
			margin: 0 auto;
			height: 50px;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #ccc;

			.shouyi-list {
				display: flex;
				align-items: center;

				image {
					width: 20px;
					height: 22px;
					margin-right: 10px;
				}
			}

			.right {
				width: 10px;
				height: 12px;
			}

		}

	}
</style>
