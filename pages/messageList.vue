<template>
	<view class="content">
		<view class="uni-second-list">
			<view class="uni-second" v-for="(v,k) in dataList" :key="k" @click="details(v)">
				<view class="image-second">
					<image class="uni-second-image" src="/static/img/home/pingtaixaoxi.png" mode="widthFix" v-if="v.type==0"></image>
					<image class="uni-second-image" src="/static/img/home/dingdanxiaoxi.png" mode="widthFix" v-else></image>
				</view>
				<view class="uni-second-price">
					<view class="uni-flex uni-align-center">
						<text class="price">{{v.title}}</text>
					</view>
					<view class="uni-second-title uni-two-cut" v-if="v.type==1">{{v.content}}
					</view>
					<view class="uni-second-title uni-two-cut" v-else>平台消息,查看详情
					</view>
					<view class="sku-name">
						{{v.adtime}}
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="status"></uni-load-more>
	</view>
</template>
<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				dataList: [],
				status: 'loading',
				page: 1,
				totalPage: 1
			}
		},
		onLoad() {
			this.loadData()
		},
		//  加载
		onReachBottom() {
			console.log('到底');
			this.status = 'loading';
			this.totalPage > this.page ?
				((this.page += 1), this.loadData()) :
				setTimeout(() => {
					this.status = 'noMore';
				}, 30);
		},
		methods: {
			details(e) {
				console.log(e)
				if (e.type == 1) {
					this.$api.navTo(`/pages/order/orderDetails?id=${e.objid}`)
				}else{
					uni.setStorageSync('content',e.content)
					this.$api.navTo(`/pages/mineoptions/webView?title=${e.title}`)
				}
			},
			loadData() {
				let parmas = {
					cmd: "noticeslist",
					uid: getApp().globalData.uid,
					nowPage: this.page,
					pageCount: "10"
				}
				this._reqw
					.ipost(parmas)
					.then(res => {
						res.result == 0 ?
							((res.totalPage == 1 ? this.status = 'noMore' : this.status = 'more'),uni.setStorageSync('messageNum',res.allnum), this.totalPage = res.totalPage,
								res.dataList.forEach(item => {
									this.dataList.push(item)
								})
							) :
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			onClick(e) {
				this.$emit("click", e)
			}
		}
	}
</script>
<style lang="scss" scoped>
	page {
		background: #F6F6F6;
	}

	.btn {
		position: absolute;
		right: 0;
		bottom: 0;
		width: 160upx;
		line-height: 60upx;
		height: 60upx;
	}

	.content {
		box-sizing: border-box;
		margin-top: 10px;
	}

	.price {
		color: #666666;
		font-size: 28upx;
		font-weight: bold;
	}

	.sku-name {
		color: $uni-color-paragraph;
		font-size: 22upx;
	}

	.uni-second-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 10px;
		margin-bottom: 10px;
	}

	.uni-second {
		display: flex;
		padding: 20upx;
		width: 100%;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 4upx;
		margin-bottom: 20upx;
	}

	.image-second {
		width: 86upx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.uni-second-title {
		color: #999999;
		font-size: 26upx;
		background-color: #F6F6F6;
		padding: 10upx 5upx;
		line-height: 1.5;
		margin-bottom: 10upx;
	}

	.uni-second-price {
		width: 75%;
		font-size: 28upx;
		line-height: 1.5;
		padding-left: 15upx;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
	}

	.uni-flex {
		justify-content: space-between;
		margin-bottom: 10upx;
	}
</style>
