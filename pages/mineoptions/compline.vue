<template>
	<view class="content">
		<view class="com-list-con">
			<empty v-if="dataList.length==0"></empty>
			<block v-else v-for="(v,k) in dataList" :key="k">
				<view class="com-list uni-flex uni-space uni-align-center">
					<view class="com-list-right">
						<view class="com-list-price"><text>￥</text> <text class="price">{{v.price}}</text></view>
					</view>
					<view class="com-list-left uni-flex-item uni-flex uni-space uni-align-center">
						<view class="uni-flex-item">
							<view class="f_color">
								【全平台】{{v.title}}
							</view>
							<view class="com-list-right-one" v-if="v.type==0">
								仅限单品类商品使用
							</view>
							<view class="com-list-right-two">满{{v.fullprice}}可用</view>
							<view class="com-list-right-two">截止时间：{{v.adtime}}</view>
						</view>

						<text class="com-list-btn" @click="gotoUse(v)" v-if="v.state==0">
							立即使用
						</text>
						<text class="com-list-btn-end" v-else>
							已使用
						</text>
					</view>
				</view>
			</block>
		</view>
		<uni-load-more :status="status"></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import empty from "@/components/mycom/empty.vue"
	export default {
		data() {
			return {
				page: 1,
				totalPage: 1,
				status: "loading",
				dataList: [],
				price: 0,
				source:''
			}
		},
		onLoad(opions) {
			if (opions.source == 1) {
				this.price = opions.price;
			}
			this.source = opions.source

			this.loadData()
		},
		components: {
			uniLoadMore,
			empty
		},
		methods: {
			loadData() {
				let parmas = {
					cmd: 'mycouponlist',
					uid: getApp().globalData.uid
				};
				this._reqw.ipost(parmas).then(res => {
					res.result == 0 ? (this.totalPage = res.totalPage,(res.totalPage>1? this.status = "more":this.status="noMore"), res.dataList != undefined && res.dataList
						.length != 0 ?
						res.dataList.forEach(item => {
							this.dataList.push(item)
						}) : this.status = "noMore") : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			gotoUse(e) {
				console.log(e, this.price)
				if (this.source==1){
					this.price-0>=e.fullprice-0?(this.$api.prePage().compline = e,
						uni.navigateBack()) : this.$api.tip("该劵不满足使用条件!");
				}else{
					uni.reLaunch({
						url:'/pages/index/index'
					})
				}
					
			}
		}
	}
</script>

<style scoped lang="scss">
	.price {
		font-size: 34upx;
	}

	.com-list-price {
		color: #FF0000;
		font-weight: bold;
		line-height: 118upx;
	}

	.f_color {
		color: #333333;
		margin-top: 10px;
		font-weight: bold;
		font-size: 30upx;
	}

	.com-list-right-one {
		font-size: 22upx;
		color: #F87A4A;
		text-indent: 10upx;
	}

	.com-list-left {
		margin-left: 20upx;
	}

	.com-list-right-two {
		font-size: 22upx;
		color: #999999;
		text-indent: 10upx;
	}

	.com-list-btn {
		font-size: 22upx;
		width: 130upx;
		height: 45upx;
		background: linear-gradient(90deg, rgba(63, 207, 46, 1) 0%, rgba(26, 199, 42, 1) 100%);
		border-radius: 23px;
		text-align: center;
		line-height: 45upx;
		color: #FFFFFF;
	}

	.com-list-btn-end {
		font-size: 22upx;
		width: 130upx;
		height: 45upx;
		background: #888888;
		border-radius: 23px;
		text-align: center;
		line-height: 45upx;
		color: #FFFFFF;
	}

	.com-list {
		width: 90%;
		margin: 10px auto;
		position: relative;
		height: 250upx;
		border: 1px solid rgba(248, 122, 74, 0.41);
		border-radius: 15px;
		padding: 20upx;
		box-sizing: border-box;
	}

	.com-list-right {
		display: flex;
		padding-right: 40upx;
		justify-content: space-between;
		align-items: center;
		border-right: 1px solid #E7E7E7;

	}
</style>
