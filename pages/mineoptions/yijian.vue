<template>
	<view class="content">
		<view class="yijian-tit">
			说明意见
		</view>
		<view class="mian-con">
			<textarea v-model="content" placeholder="请留下您宝贵的意见" class="textarea" />
			</view>
		
		<view class="footer-btn" hover-class="btn-hover" @click="subElement">
			提 交
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				content:''
			}
		},
		methods:{
			tip(){
				uni.showModal({
					content:"感谢您的宝贵意见",
					showCancel:false,
					confirmText:'提交',
					confirmColor:'#009D37',
					success(res){
						if(res.confirm){
							setTimeout(()=>{uni.navigateBack()},100)
						}else if(res.cancel){
							
						}
					}
					
				})
				},
			getRemark(e){
				this.content=e.detail.text;
			},
			subElement(){
				if(this.content==''){
					this.$api.tip('反馈内容不能为空!')
				}else if(this.content.length>200){
					this.$api.tip('内容最多200字!')
				}else{
					let parmas={
						cmd:'addfeedback',
						uid:getApp().globalData.uid,
						content:this.content
					}
					this._reqw.ipost(parmas).then(res=>{
						res.result==0?this.tip():this.$api.tip(res.resultNote)
					}).catch(err=>{})
				}
				
			}
		}
	}
</script>

<style>
	.yijian-tit{
		font-size: 30upx;
		color: #333333;
		font-weight: bold;
		position: relative;
		padding: 20upx 0 20upx 20upx;
	}
	.yijian-tit::before{
		content: '';
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		width:5upx;
		height:31upx;
		background:rgba(107,212,83,1);
		border-radius:3px;
	}
	page{
		background-color: #FAFAFA;
		height: 100%;
	}
	.info{
		color: #999999;
		font-size: 24upx;
	}
	.img{
		width: 67upx;
		height: 67upx;
	}
	.content{
		padding: 10px;
	}
	.mian-con{
		background-color: #FFFFFF;
		height:368upx;
	}
	.footer-btn{
		width: 90%;
		height:88upx;
		margin: 20upx auto;
		background:rgba(107,212,83,1);
		box-shadow:0px 2px 10px 0px rgba(107,212,83,0.5);
		border-radius:10px;
		font-weight:bold;
		color: #FFFFFF;
		text-align: center;
		line-height: 88upx;
	}
	.textarea{
		padding: 20upx;
		width: 100%;
		height: 300upx;
		box-sizing: border-box;
		border-radius: 4px;
		font-size: 22upx;
		border-radius:2px;
		color: #A4A4A5;
	}
</style>
