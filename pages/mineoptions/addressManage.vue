<template>
	<view class="content">
		<view class="one-info">
			<view class="one-info-top">
				<text class="tit">联系人</text>
				<input class="input" type="text" v-model="addressData.name" placeholder="收货人姓名" placeholder-class="placeholder" />
			</view>
		</view>
		<view class="row b-b">
			<text class="tit">电 话：</text>
			<input class="input" type="number" v-model="addressData.phone" placeholder="请输入联系电话" placeholder-class="placeholder"
			 maxlength="11" />
		</view>
		<view class="row b-b" @click="chooseLocation">
			<text class="tit">地 址：</text>
			<text  class="input">
				{{addressData.address}}
			</text>
			<!-- <view class="address-pos" @click="getPosition">
				<image src="/static/img/dizhidingwei@2x.png" mode=""></image>
				<text class="address-pos-text">定位</text>
			</view> -->

		</view>
		<view class="row b-b">
			<text class="tit">详细地址：</text>
			<input class="input" type="text" v-model="addressData.addressdetail" placeholder="请输入详细地址，如门牌号" placeholder-class="placeholder" />
		</view>
		<view class="row default-row uni-space">
			<view class="tit">设为默认</view>
			<switch :checked="checked" @change="choseDefault" />
		</view>
		<button class="add-btn" @click="confirm">确 定</button>
		<picker-city ref='picker' :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor='#038980'
		 @onCancel="onCancel"></picker-city>
	</view>
</template>

<script>
	import pickerCity from "@/components/mpvue-citypicker/mpvueCityPicker.vue"
	import QQMapWX from "@/common/js/qqmap-wx-jssdk.js"
	export default {
		components:{
			pickerCity
		},
		data() {
			return {
				qqmapsdk: '',
				addressData: {
					addressid: '',
					name: '',
					phone: '',
					address:'',
					addressdetail: '',
					longitude: '',
					latitude: '',
					isdefault: 0
				},
				checked:false,
				cityPickerValueDefault: [0, 0, 0],
				showPicker: false
			}
		},
		onLoad(options){
			this.addressData=JSON.parse(options.id);
			if(this.addressData.isdefault==0){
				this.checked=false
			}else{
				this.checked=true
			}
			this.qqmapsdk = new QQMapWX({
				key: 'GQZBZ-3CECD-BP443-PBQEY-4R3M6-QMFBO'
			});
		},
		methods: {
			//选择地址
			chooseLocation() {
				console.log(11)
				this.$refs.picker.show()
			},
			onConfirm(e) {
				console.log(e)
				let address = this.addressData
				address.address = e.label;
			},
			onCancel() {
				this.showPicker = false;
			},
			choseDefault(e) {
				e.detail.value == false ? this.addressData.isdefault = 0 : this.addressData.isdefault = 1
			},
			//提交
			confirm() {
				let data = this.addressData;
				if (!data.name) {
					this.$api.tip('请填写收货人姓名');
					return;
				}
				if (!this.$api.regPhone(data.phone)) {
					this.$api.tip('请输入正确的手机号码');
					return;
				}
				if (data.address == '') {
					this.$api.tip('请填写所在地址');
					return;
				}
				if (data.addressdetail == '') {
					this.$api.tip('请填写详细信息');
					return;
				} else {
					let self = this;
					self.qqmapsdk.geocoder({
						address: data.address + data.addressdetail,
						success(res) {
							console.log(res)
							data.longitude = res.result.location.lng;
							data.latitude = res.result.location.lat;
							self.sub(data);
						}
					})
					

				}
			},
			sub(data){
				let parmas = {
					cmd: 'addAddress',
					uid: getApp().globalData.uid,
					addressid: data.addressid,
					name: data.name,
					phone: data.phone,
					address: data.address,
					addressdetail: data.addressdetail,
					longitude: data.longitude,
					latitude: data.latitude,
					isdefault: data.isdefault
				};
				console.log(parmas)
				this._reqw.ipost(parmas).then(res => {
					res.result == 0 ? (this.$api.tip('修改成功!'), setTimeout(() => {
						this.$api.back()
					}, 300)) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.address-pos {
		width: 60upx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.address-pos image {
		width: 22upx;
		height: 30upx;
	}

	.address-pos-text {
		color: #FF4848;
		font-size: 22upx;
		margin-top: 10upx;
	}

	.content {
		padding: 10px;
	}

	.row {
		height: 110upx;
		border-bottom: 1px solid #E7E7E7;
	}

	.one-info {
		border-bottom: 1px solid #E7E7E7;
		padding: 10px 0;
	}

	.iconfont {
		font-size: 40upx;
		margin-left: 10px;
	}

	.row,
	.one-info-top {
		display: flex;
		align-items: center;
		position: relative;

		.tit {
			flex-shrink: 0;
			width: 152upx;
			font-size: 30upx;
			color: #666666;
		}

		.input {
			flex: 1;
			font-size: 30upx;
			color: #999999;
			padding-left: 15px;
		}

	}

	.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 600upx;
		border-radius: 22px;
		height: 40px;
		margin: 50px auto;
		font-size: 30upx;
		color: #fff;
		background-color: #6CD454;
	}
</style>
