<template>
	<view class="s-page-wrapper">
		<view class="search-pop">
			<view class="top-input">
				<view class="uni-icon uni-icon-search"></view>
				<input type="text" value="" placeholder-style="color:#74738e;font-size:13px;" placeholder="请输入关键字" v-model="keywords" />
			</view>
			<view class="search-btn" @click="submitSearch">
				搜索
			</view>
		</view>
		<view class="search-cat">
			<view class="search-cat-tit one"><text class="up-menu">热门搜索</text></view>
			<view class="src-content">
				<view class="src-item" v-for="(v, k) in hotList" :key="k" @click="hostSearch(v)">
					  <image src="/static/img/home/searchhote.png" mode="" class="search-img" v-if="k==0"></image>
					  <text :class="{red:k==0}">{{v.content}}</text>
				</view>
			</view>
		</view>
		<view class="search-cat">
			<view class="search-cat-tit"><text class="up-menu">搜索历史</text> <view class="iconfont icon-delete" @click="clear"></view></view>
			<view class="src-content">
				<view class="src-item" v-for="(v, k) in searchList" :key="k" @click="hostSearch(v)">
					{{ v.content }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keywords: '',
				searchList: [],
				hotList:[]
			};
		},
		onShow() {
			this.loadData();
			this.getHitory();
		},
		methods: {
			//  热门搜索
			loadData() {
				let parmas={
					cmd:'searchhotList'
				}
				this._reqw.ipost(parmas).then(res=>{
					res.result==0?this.hotList=res.dataList:this.$api.tip(res.resultNote)
				}).catch(err=>{})
			},
			getHitory(){
				let parmas={
					cmd:'searchmenushistoryList',
					uid:getApp().globalData.uid
				}
				this._reqw.ipost(parmas).then(res=>{
					res.result==0?this.searchList=res.dataList:this.$api.tip(res.resultNote)
				}).catch(err=>{})
			},
			submitSearch(){
				for (let i in this.searchList) {
					if (this.searchList[i] == this.keywords) {
						this.searchList.splice(i, 1)
					}
				}
				this.keywords == "" ? this.$api.tip("请输入要搜索的内容!") :this.$api.navTo(
					`/pages/search/search_list_cp?id=${this.keywords}`)
			},
			clear(){
				let sidlist=[];
				this.searchList.forEach(item=>{
					sidlist.push(item.sid)
				})
				let parmas={
					cmd:'deletemenussearchhistory',
					sidlist:sidlist,
					uid:getApp().globalData.uid
				}
				this._reqw.ipost(parmas).then(res=>{
					res.result==0?(this.$api.tip('删除成功'),this.searchList = []):this.$api.tip(res.resultNote)
				}).catch(err=>{})
			},
			hostSearch(v){
				this.keywords=v.content;
				this.submitSearch();
			}

		},
		onHide() {
			this.keywords=''
		}
	};
</script>

<style lang="scss">
	.red{
		color: #FF0000;
	}
	.search-img{
		width: 38upx;
		height: 38upx;
	}
	.iconfont{
		color: #999999;
		font-size: 36upx;
	}
  .uni-icon-search{
	  font-size: 30upx;
  }
	.help-tips {
		font-size: 26upx;
		color: #999;
		line-height: 26upx;
		padding: 0 0 0 30upx;
		margin: 0;
		width: 80%;
		text-align: left;
	}

	.help-tips.color999 {
		color: #999999;
	}
	.one{
		border-left: 3px solid #6BD453;
		padding-left: 10upx;
	}

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
	.search-cat {
		padding: 40upx;
	}

	.search-cat .search-cat-tit {
		position: relative;
		display: flex;
		align-items: center;
		font-weight: bold;
		justify-content: space-between;
	}

	.search-cat .search-cat-tit .up-menu {
		display: block;
		height: 20px;
		line-height: 20px;
		font-size: 0.9em;
		color: #333333;
	}

	.src-content {
		margin: 10px auto;
		display: flex;
		flex-wrap: wrap;
	}

	.src-item {
		border-radius: 4upx;
		padding: 0 20upx;
		height: 46upx;
		line-height: 46upx;
		background: #FFF8F8;
		margin: 20upx 10upx;
		position: relative;
		font-size: 26upx;
		color: #666666;
		display: flex;
		align-items: center;
		
	}

	.clear-search {
		padding: 10px 0;
		text-align: center;
		font-size: 30upx;
		color: #333;
	}
</style>
