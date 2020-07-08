<template>
	<view class="content">
		<lazy-list  :dataList='dataList'></lazy-list>
		<empty v-if="emty"></empty>
		<uni-load-more :status="status" v-else></uni-load-more>
	</view>
</template>

<script>
	import empty from "@/components/mycom/empty.vue"
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import lazyList from "@/components/mycom/lazy-list.vue"
	export default {
		data() {
			return {
				dataList: [],
				page: 1,
				totalPage: 1,
				status: 'loading',
				keywords:'',
				emty:false
			};
		},
		components: {
			uniLoadMore,
			empty,
			lazyList
		},
		onLoad(options) {
			this.keywords=options.id;
			this.$api.setNav(this.keywords);
			this.loadData();
		},
		methods: {
			loadData() {
				let parmas = {
					cmd: "searchlazyGoodsList",
					content:this.keywords,
					nowPage: this.page,
					pageCount: "10"
				};
				console.log(parmas);
				this._reqw
					.ipost(parmas)
					.then(res => {
						res.result == 0 ?
							((res.totalPage == 1 ? this.status = 'noMore' : this.status = 'more'),res.dataList.length==0?this.emty=true:this.empty=false, this.totalPage = res.totalPage,
								res.dataList.forEach(item=>{
									this.dataList.push(item)
								})
							) :
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			initData() {
				this.dataList = [];
				this.page = 1;
				this.totalPage = 1;
				this.status = 'loading';
				this.loadData();
			}
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
		}
	};
</script>

<style lang="scss">
	.iconColor {
		color: #72BD54;
	}

	page {
		height: 100%;
		background: #FAFAFA;
	}

	.content {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
</style>
