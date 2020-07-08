<template>
	<view>
		<wuc-tab :tabList="navList" :textFlex="textFlex" :text="text" :tabCur="tabCur" @change="changeTab"></wuc-tab>
		<view class="uni-flex uni-align-center">
			<view style="color: #333333;">
				机不可失 时不再来
			</view>
			<bbs-count-down :time="LeaveEnd" ref="countDown"></bbs-count-down>
		</view>
		<second-list :dataList="dataList" :endtime='endtime' ref="secondList" :tabCur="tabCur" :currentIndex="currentIndex"></second-list>
		<uni-load-more :status="status" v-if="dataList.length!=0"></uni-load-more>
		<empty v-else></empty>
	</view>
</template>

<script>
	import secondList from "@/components/mycom/secondList.vue"
	import wucTab from "@/components/wuc-tab/wuc-tab.vue"
	import bbsCountDown from "@/components/bbs-countdown/bbs-countdown.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import empty from "@/components/mycom/empty.vue"
	export default {
		components: {
			secondList,
			wucTab,
			bbsCountDown,
			uniLoadMore,
			empty
		},
		data() {
			return {
				tabCur: '',
				textFlex: true,
				currentIndex: '',
				text: '',
				status: 'loading',
				dataList: [],
				navList: [],
				LeaveEnd: '',
				newTime: '',
				endtime: '',
				page: 1,
				totalPage: 1
			}
		},
		onShow() {
			this.$nextTick(function() {
				this.getScond()
			})
		},
		onReachBottom() {
			console.log("加载")
			this.status = 'loading';
			this.totalPage > this.page ?
				((this.page += 1), this.hoteList()) :
				setTimeout(() => {
					this.status = 'noMore';
				}, 30)
		},
		methods: {
			changeTab(k) {
				if (k != this.currentIndex) {
					this.dataList = [];
					this.currentIndex = k;
					this.page = this.totalPage = 1;
					this.getScondList(this.navList[k].timeid)
				}
			},
			getScond() {
				let parmas = {
					cmd: 'seckilltime'
				}
				this._reqw.ipost(parmas).then(res => {
					if (res.result == 0) {
						this.navList = res.dataList;
						res.dataList.length > 3 ? this.textFlex = true : this.textFlex = false;
						let data = res.dataList;
						let newTime = parseInt(new Date().getHours());
						let minTime = new Date().getMinutes();
						let minScond = new Date().getSeconds(),
							timeid = '',
							n = data.length - 1;
						if (newTime < parseInt(data[0].time1) || newTime >= parseInt(data[n].time2)) {
							this.text = "即将开始";
							timeid = data[0].timeid;
						} else {
							for (let i = 0; i < data.length; i++) {
								if (newTime >= parseInt(data[i].time1) && newTime < parseInt(data[i].time2)) {
									this.LeaveEnd = (parseInt(data[i].time2) - newTime) * 60 * 60 * 1000 - minTime * 60 * 1000 - minScond * 1000;
									this.tabCur = this.currentIndex = i;
									this.text = '进行中';
									timeid = data[i].timeid;
									this.endtime = parseInt(data[i].time2);
								} else if (newTime >= parseInt(data[i].time2) && newTime < parseInt(data[i + 1].time1)) {
									this.LeaveEnd = (parseInt(data[i + 1].time1) - newTime) * 60 * 60 * 1000 - minTime * 60 * 1000 - minScond *
										1000;
									this.tabCur = this.currentIndex = i + 1;
									this.text = "即将开始"
									timeid = data[i + 1].timeid;
								}
							}
						}
						console.log(this.LeaveEnd)
						this.getScondList(timeid);
						this.$refs.countDown.set(this.LeaveEnd)
					}
				}).catch(err => {})
			},
			getScondList(id) {
				// console.log(id)
				let parmas = {
					cmd: 'seckilltimeGoodsList',
					timeid: id,
					nowPage: this.page,
					pageCount: '10'
				}
				this._reqw.ipost(parmas).then(res => {
					console.log(res)
					res.result == 0 ? ((res.totalPage > 1 ? this.status = "more" : this.status = "noMore"), res.dataList.forEach(
						item => {
							item.percent = parseInt(item.salenum / item.stock * 100) + '%';
							this.dataList.push(item)
						})) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
		},
		onHide() {
			this.dataList = [];
			this.$refs.secondList.init();
			this.page = this.totalPage = 1;
		}
	}
</script>

<style scoped>
	.uni-flex {
		background-color: #FFFFFF;
		padding: 20upx;
		justify-content: space-between;
	}
</style>
