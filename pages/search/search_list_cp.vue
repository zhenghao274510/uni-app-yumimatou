<template>
	<view class="content">
		<view class="search-pop">
			<view class="top-input">
				<view class="uni-icon uni-icon-search"></view>
				<input type="text" value="" placeholder-style="color:#74738e;font-size:13px;" placeholder="请输入关键字" v-model="keywords" />
			</view>
			<view class="search-btn" @click="submitSearch">
				搜索
			</view>
		</view>
		<view class="uni-second-list">
			<view class="uni-second" @click="gotoDetails(item.menusid)" v-for="(item,index) in dataList" :key="index">
				<view class="image-second">
					<image class="uni-second-image" :src="item.menusimage"></image>
				</view>
				<view class="uni-second-price">
					<view class="uni-second-title uni-ellipsis"><text>{{item.menusname}} </text> 
					</view>
					<view class="uni-flex uni-align-center border_bottom">
						<text class="sku-name">{{item.len}}种主料</text>
					</view>
					<view class="sku-name">
						<text v-for="(v,k) in item.materialList" :key="k" style="margin-right: 2px;">{{v.materialname}} {{v.menusweight}}<text v-if="k!=item.len-1">、</text></text>
					</view>
				</view>
			</view>
		</view>
		<empty v-if="dataList.length==0"></empty>
		<uni-load-more :status="status" v-else></uni-load-more>
	</view>
</template>
<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import empty from "@/components/mycom/empty.vue"
	export default {
		components: {
			uniLoadMore,
			empty
		},
		data() {
			return {
				dataList: [],
				keywords: '',
				page: 1,
				totalPage: 1,
				status: 'loading'
			}
		},
		onLoad(options) {
			this.keywords = options.id;
			this.$api.setNav(this.keywords)
			console.log(this.keywords);
			this.loadData();
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
			submitSearch() {
				this.dataList = [];
				this.page = this.totalPage = 1;
				this.$api.setNav(this.keywords);
				this.loadData()
			},
			loadData() {
				let parmas = {
					cmd: 'searchmenList',
					uid: getApp().globalData.uid,
					content: this.keywords
				};
				console.log(parmas);
				this._reqw
					.ipost(parmas)
					.then(res => {
						res.result == 0 ?
							((res.totalPage > 1 ? this.status = 'more' : this.status = 'noMore'), this.totalPage = res.totalPage,
								res.dataList.forEach(item => {
									item.materialList ? item.len = item.materialList.length : '';
									this.dataList.push(item)
								})
							) :
							this.$api.tip(res.resultNote)
					})
					.catch(err => {});
			},
			gotoDetails(id) {
				this.$api.navTo(`/pages/goodDetails/cpdetails?id=${id}`)
			}
		}
	}
</script>
<style lang="scss">
	.search-pop {
		padding: 14px 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #F5F5F5;
	}

	.top-input {
		flex: 1;
		margin-right: 20px;
		height: 30px;
		line-height: 30px;
		display: flex;
		padding-left: 20px;
		box-sizing: border-box;
		background: #FFFFFF;
		border-radius: 50upx;
		color: #74718c;
		align-items: center;
	}

	.top-inptu input {
		height: 100%;
	}

	.search-btn {
		width: 50px;
		height: 100%;
		color: #333333;
		font-size: 27upx;
	}

	.border_bottom {
		border-bottom: 2upx solid #F2F2F2;
		padding-bottom: 25upx;
	}

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

	.sku-name {
		color: #666666;
		font-size: 22upx;
	}

	.uni-second-list {
		display: flex;
		flex-wrap: wrap;
		padding: 20upx;
		margin-bottom: 10px;
	}

	.uni-second {
		display: flex;
		padding: 30upx 20upx;
		width: 100%;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 4upx;
		margin-bottom: 20upx;
	}

	.image-second {
		width: 180upx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.uni-second-image {
		border-radius: 10upx;
		height: 155upx;
	}

	.uni-second-title {
		color: $uni-color-title;
		line-height: 1.5;
	}

	.uni-second-price {
		width: 75%;
		font-size: 28upx;
		line-height: 1.5;
		padding-left: 15upx;
		position: relative;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.uni-flex {
		justify-content: space-between;
		margin-bottom: 10upx;
	}
</style>
