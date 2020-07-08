<template>
	<view class="content">
		<view class="help-list" v-for="(v,k) in dataList" :key="k" @click="goto(v)">
			<view class="help-list-content uni-ellipsis">{{v.title}}</view>
			<view class="uni-icon uni-icon-arrowright" style="color: #C0C0C0;font-size: 13px;">
				
			</view>
			<!-- <view class="businessListYou">
				<image src="../../static/img/you.png"></image>
			</view> -->
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				dataList: [],
				page: 1
			}
		},
		onLoad() {
			this.loadData()
		},
		methods: {
			loadData() {
				let parmas = {
					cmd: "getproblemslist"
				};

				this._reqw.ipost(parmas).then(res => {
					res.result == 0 ? this.dataList = res.dataList : this.$api.tip(
						res.resultNote)
				}).catch(err => {})
			},
			goto(e) {
				uni.setStorageSync('content',e.content)
				uni.navigateTo({
					url: `/pages/mineoptions/webView?title=${e.title}`
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 10px;

		.help-list {
			width: 100%;
			height: 40px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #ccc;

			.help-list-content {
				color: #6D6C6C;
				font-size: 13px;
			}

			.businessListYou image {
				width: 20upx;
				height: 20upx;
				vertical-align: middle;
				margin: 0 0 4upx 10upx;
			}
		}
	}
</style>
