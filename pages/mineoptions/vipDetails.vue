<template>
	<view class="con-details">
		<block v-for="(v,k) in detailsList" :key="k">
			<view class="shouyi-con pad">
				<view class="uni-flex uni-align-center uni-space">
					<view class="uni-flex uni-column uni-flex-item">
						<view class="xiaofei-name uni-ellipsis">
							{{v.title}}
						</view>
						<view class="xiaofei-time">
							{{v.adtime}}
						</view>
					</view>
				</view>
				<view class="uni-flex uni-align-center right" v-if="v.type==1">
					-{{v.money}}
				</view>
				<view class="uni-flex uni-align-center add" v-else>
					+{{v.money}}
				</view>
			</view>
		</block>
		<uni-load-more :status="status"></uni-load-more>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				detailsList:[],
				page:1,
				totalPage:1,
				status:'loading'
			}
		},
		onLoad() {
			this.loadData()
		},
		onReachBottom() {
			this.totalPage > this.page ?
				((this.page += 1), this.loadData(),this.status = 'loading') :
				setTimeout(() => {
					this.status = 'noMore';
				}, 30);
		},
		methods:{
			loadData(){
				let parmas = {
					cmd: "membermoneylist",
					uid: getApp().globalData.uid,
					nowPage: this.page,
					pageCount: '10'
				};
				this._reqw
					.ipost(parmas)
					.then(res => {
						res.result == 0 ?
							((res.totalPage>1 ? this.status = 'more' : this.status = 'noMore'), this.totalPage = res.totalPage,
								res.dataList.forEach(item => {
									this.detailsList.push(item)
								})) :
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.con-details{
		padding: 60upx 40upx;
	}
	//  新增
	.shouyi-con {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20upx;
		overflow: hidden;
		padding: 20upx 0;
	
		.right {
			color: #45C46C;
		}
	
		.add {
			color: #ff0000;
		}
	
		.xiaofei-time {
			font-size: 22upx;
			font-weight: 500;
			color: rgb(153, 153, 153)
		}
	
		.xiaofei-name {
			font-size: 30upx;
			font-weight: 500;
			color: rgb(51, 51, 51);
			width: 560upx;
		}
	
	}
</style>
