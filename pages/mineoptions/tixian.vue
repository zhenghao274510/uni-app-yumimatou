<template>
	<view class="tixian-content">
		<view class="tixian-tit">
			提现金额
		</view>
		<view class="tixian-input uni-flex uni-align-center">
              <text class="tixian-input-left">￥</text>
			  <input class="tixian-input-left-right uni-flex-item" v-model="money"  type="number" value="" placeholder="请输入提现金额" />
		</view>
		<view class="tixian-money uni-flex" v-if="allMoney!=0">
			<text class="tixian-price">零钱余额：￥{{allMoney}}</text> <text class="tixian-all" @click="getAll">全部提现</text>
		</view>
		<view class="tixian-btn" @click="subTixian">
			申请提现
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				money:'',
				allMoney:0
			}
		},
		onLoad() {
			this.allMoney=uni.getStorageSync('money')
		},
		methods:{
			subTixian(){
				if(this.money==''){
					this.$api.tip('请输入提现金额')
				}else{
					let parmas={
						cmd:'addwithdrawal',
						uid:getApp().globalData.uid,
						money:this.money
					}
					this._reqw.ipost(parmas).then(res=>{
						res.result==0?(uni.redirectTo({
							url:`/pages/mineoptions/tixianSuccess?money=${this.money}`
						})):this.$api.tip(res.resultNote)
					}).catch(err=>{})
				}
			},
			getAll(){
				this.money=this.allMoney;
				this.subTixian();
			}
		}
	}
</script>

<style>
	page {
		height: 100%;
		background-color: #F6F6F6;
	}

	.tixian-content {
		width: 95%;
		padding: 30upx;
		background: #FFFFFF;
		margin: 50upx auto;
		box-sizing: border-box;
	}
	.tixian-tit{
		font-size:30upx;
		font-weight:500;
		color:rgba(51,51,51,1);
	}
	.tixian-input-left{
		font-size:60upx;
		font-weight:800;
		color:rgba(51,51,51,1);
	}
	.tixian-input-left-right{
		line-height: 108upx;
		height: 108upx;
		padding-left: 30upx;
		font-size: 32upx;
		
	}
	.tixian-input{
		border-bottom:2upx solid rgba(242,242,242,1);
		padding: 30upx 0;
	}
	.tixian-price{
		font-size:26upx;
		font-weight:500;
		color:rgba(153,153,153,1)
	}
	.tixian-all{
		font-size:26upx;
		font-weight:500;
		color:rgba(87,104,141,1);
		margin-left: 30upx;
	}
	.tixian-money{
		padding: 30upx 0;
	}
	.tixian-btn{
		width:629upx;
		height:88upx;
		margin: 0 auto;
		background:#999999;
		font-size:36upx;
		font-weight:bold;
		color:rgba(255,255,255,1);
		text-align: center;
		line-height: 88upx;
	}
</style>
