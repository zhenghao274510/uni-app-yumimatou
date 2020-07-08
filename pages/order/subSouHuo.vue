<template>
	<view class="content">
		<order-product :dataList="dataobject.ordertailList"></order-product>
		<view class="tui-inter uni-flex" style="align-items: center;">
			<view class="inter-title" style="margin-right:20px;">
				退款原因
			</view>
			<!-- <view class="uni-flex-item"> -->
				<xfl-select :list="navList" style="width:70%;" :clearable="false" :listShow="false" :isCanInput="false" :initValue="city" :listTop="40"
				 :selectHideType="'hideAll'" @change="changerefundreason">
				</xfl-select>
			<!-- </view> -->
			
		</view>
		<view class="tui-inter">
			<view class="inter-title">
				退款说明
			</view>
			<editor placeholder="请输入退款说明"  @input="changContent" class="refsoncontent" ></editor>
		</view>
		<view class="tui-inter">
			<view class="inter-title">
				上传凭证
			</view>
			<view class="img-list">
				<view class="img" @click="uploads" v-if="rfImage==''">
					<image src="/static/img/home/shangchuantupian@2x.png" mode="scaleToFill"></image>
				</view>
				<!-- <view class="img" v-for="(v,k) in imgList" :key="k" @click="seeDetails(k)">
					<image :src="v" mode="scaleToFill"></image>
				</view> -->
				<view class="img" >
					<image :src="rfImage" mode="scaleToFill"></image>
				</view>
			</view>
		</view>
		<view class="btn" @click="SubChange">提交</view>
	</view>
</template>

<script>
	import xflSelect from '@/components/mycom/reson-select.vue'
	import orderProduct from "@/components/mycom/ordeProduct.vue"
	import bassUrl from "@/common/js/config.js"
	export default {
		data() {
			return {
				title: '',
				active: 1,
				imgList: [],
				refundreason:'',
				rfImage:'',
				starImage:'',
				orderId: '',
				dataobject: {
					ordertailList:[]
				},
				content: '',
				navList: [{
						checked: false,
						value: "商品无货"
					},
					{
						checked: false,
						value: "不想要了"
					},
					{
						checked: false,
						value: "商品信息填写错误"
					},
					{
						checked: false,
						value: "地址信息填写错误"
					},
					{
						checked: false,
						value: "商品降价"
					},
					{
						checked: false,
						value: "其他"
					}
				]
			}
		},
		components: {
			orderProduct,
			xflSelect
		},
		onLoad(options) {
			this.orderId=options.id;
			this.loadData()
		},
		methods: {
			changContent(e){
				console.log(e)
				this.content=e.detail.text;
			},
			changerefundreason(e){
				console.log(e)
				this.refundreason=e.newVal
			},
			loadData(){
				let parmas={
					cmd:'myorderdetail',
					uid:getApp().globalData.uid,
					ordernum:this.orderId
				}
				this._reqw
					.ipost(parmas)
					.then(res => {
						res.result == 0 ? this.dataobject = res.dataobject : this.$api.tip(res
							.resultNote);
					})
					.catch(err => {});
			},
			uploads() {
				console.log("上传")
				let that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success(res){
						// tempFilePath可以作为img标签的src属性显示图片
						console.log(res);
						// res.tempFiles.forEach(item => {
						// 	that.formImg(item)
						// })
						that.formImg(res.tempFiles[0])
					}
				})
			},
			formImg(res){
				this._reqw
					.iupfile(res)
					.then(res => {
						console.log(res);
						let r = JSON.parse(res);
						r.result == 0 ? (this.rfImage=bassUrl.bass + r.datastr,this.starImage= r.datastr) : this.$api.tip(r.resultNote);
						// r.result == 0 ? (this.imgList.push(bassUrl.bass + r.datastr)) : this.$api.tip(r.resultNote);
					})
					.catch(err => {})
			},
			SubChange() {
				let parmas = {
					cmd:'orderrefund',
					uid:getApp().globalData.uid,
					ordernum: this.orderId,
					refundreason: this.refundreason,
					refunddesc:this.content,
					refundimage:this.starImage
				};
				console.log(parmas)
				this._reqw.ipost(parmas).then(res => {
					res.result == 0 ? (this.$api.tip('提交成功!'), setTimeout(() => {
						this.$api.back()
					}, 300)) : this.$api.tip(res.resultNote)
				}).catch(err => {})
				// if(this.content==''){
				// 	this.$api.tip('请输入相关说明')
				// }else if(this.refundreason==''){
				// 	this.$api.tip('请选择退款原因')
				// }else if(this.starImage==''){
				// 	this.$api.tip("请上传相关凭证!")
				// }else{
					
				// }
			}
		}
	}
</script>

<style lang="scss" scoped>
	.refsoncontent{
		margin-top: 10px;
		width:671upx;
		height:195upx;
		background:rgba(246,246,246,1);
		border-radius:6upx;
		padding: 10upx;
		box-sizing: border-box;
	}
	.content {
		padding: 0 20px;
		display: flex;
		flex-direction: column;
		background: #FFFFFF;
		box-sizing: border-box;
	}

	.img-list {
		display: flex;
		width: 100%;
		flex-wrap: wrap;

		.img {
			width: 31%;
			padding: 0 1%;
			height: 100px;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.tui-inter {
		margin: 10px 0;
	}

	.inter-title {
		line-height: 30px;
	}

	.uni-second-title {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 45px;
	}

	.uni-second-list-top {
		display: flex;
		height: 40px;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		padding: 0 5px;
		border-radius: 10px 10px 0 0;
	}

	.uni-second-list {
		display: flex;
		width: 100%;
		margin: 0 auto;
		margin-bottom: 10px;
		flex-direction: column;
		background: #fff;
		border-radius: 0 0 10px 10px;
	}

	.uni-second {
		padding: 20upx;
		display: flex;
		flex-direction: row;
	}

	.image-second {
		height: 200upx;
		width: 200upx;
		margin: 12upx 0;
	}

	.uni-second-image {
		height: 110px;
		width: 110px;
	}

	.uni-second-title {
		word-break: break-all;
		display: -webkit-box;
		overflow: hidden;
		line-height: 1.5;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.uni-second-price {
		flex: 1;
		margin-top: 10upx;
		font-size: 28upx;
		line-height: 1.5;
		position: relative;
	}
	.uni-second-price-favour {
		color: #888888;
		text-decoration: line-through;
		margin-left: 10upx;
	}

	.uni-second-tip {
		background-color: #ff3333;
		color: #ffffff;
		padding: 0 10upx;
		border-radius: 5upx;
	}

	.uni-second-from {
		color: red;
	}

	.btn {
		width: 600upx;
		margin: 0 auto;
		margin-top: 30upx;
		height: 80upx;
		line-height: 40px;
		text-align: center;
		color: #fff;
		border-radius: 5px;
		font-size: 18px;
		background-color: #09BB07;
	}
</style>
