<template>
	<view class="container">
		<empty v-if="dataList.length == 0" @click="navToLogin"></empty>
		<view>
			<view class="cart-list">
				<view class="uni-flex cart-item uni-align-center" v-if="dataList.length!=0">
					<view class="uni-com" v-if="complineNum!=0">
						<image src="/static/img/home/bg_com.png" class="uni-com-bg"></image>
						有{{complineNum}}张优惠券
					</view>
					<text style="font-size: 24rpx;" v-if="addBuy!=0">再买{{addBuy}}元可享 满{{currentCompline.fullprice}}减{{currentCompline.price}}</text>
				</view>
				<block v-for="(item, index) in dataList" :key="item.goodscarid">
					<view class="cart-item">
						<view class="cart-item-left">
							<view class="" @tap="check('item',index)">
								<view class="uni-icon uni-icon-circle-filled" style="color:#F55555;" v-if="item.checked">
								</view>
								<view class="uni-icon uni-icon-checkbox" style="color: #898989;" v-else>
								</view>
							</view>
							<image :src="item.goodsimage" mode="aspectFill" lazy-load class="product-img"></image>
						</view>
						<view class="item-right">
							<view class="item-right-top">
								<view class="clamp title uni-ellipsis">{{item.goodsname}}</view>
								<view class="iconfont  icon-delete" style="color: #999999;font-size: 18px;" @click="deleteCartItem(item.goodscarid,index)">
								</view>
							</view>
							<view class="item-right-top">
								<view class="skuname">{{item.name}}</view>
							</view>
							<view class="item-right-top">
								<view class="price">￥{{item.price}}</view>
								<uni-number-box class="step" :min="1" :value="item.numbers" :isMin="item.numbers===1" :index="index" @change="numberChange"></uni-number-box>
							</view>
						</view>
					</view>
				</block>
			</view>
			<view class="notice-con uni-ellipsis" v-if="dataList.length!=0" :style="{bottom:is_lhp?'220rpx':'180rpx'}">
				{{datastr}}
			</view>
			<!-- 底部菜单栏 -->
			<view class="action-section" :class="{'bottom-width':total==0}" v-if="dataList.length!=0" :style="{bottom:is_lhp?'140rpx':'100rpx'}">
				<view class="uni-flex">
					<view class="checkbox" @tap="check('all')">
						<view class="uni-icon uni-icon-circle-filled" style="color:#F55555;" v-if="allChecked">
						</view>
						<view class="uni-icon uni-icon-checkbox" style="color: #898989;" v-else>
						</view>
					</view>
					<text style="color: #000;margin-left: 5px;">全选</text>
				</view>
				

				<view class="total-box" v-if="total!=0">
					<text class="price">合计:¥{{total}}</text>
				</view>
				<view class="confirm-btn" @tap="createOrder(0)">去结算</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue'
	import empty from "@/components/mycom/cartEmpty.vue";
	export default {
		components: {
			uniNumberBox,
			empty
		},
		data() {
			return {
				title: '购物车',
				checked: false,
				total: 0, //总价格
				allChecked: false, //全选状态  true|false
				empty: false, //空白页现实  true|false
				dataList: [],
				uid: "",
				allPrice: 0,
				complineList: [],
				complineNum: 0,
				addBuy: 0,
				currentCompline: {
					fullprice: 0,
					price: 0
				},
				datastr:'',
				is_lhp:false
			};
		},
		watch: {
			//显示空白页
			dataList(e) {
				let empty = e.length === 0 ? true : false;

				if (this.empty !== empty) {
					this.empty = empty;

				}
				e.forEach(item => {
					this.allPrice += item.price * item.numbers;
				})
				e.length == 0 ? (this.allChecked = false, this.total = 0) : ''
			}

		},
		methods: {
			initData() {
				uni.setNavigationBarTitle({
					title: "购物车"
				})
				uni.setNavigationBarColor({
					frontColor: '#000000',
					backgroundColor: "#F8F8F8"
				})
				this.is_lhp = this.$is_bang;
				if (getApp().globalData.uid != '') {
					this.loadData();
					this.getCompline();
				}

			},
			navToLogin() {
				this.$parent.cut_index(0)
			},
			getCompline() {
				let parmas = {
					cmd: 'mycouponlist',
					uid: getApp().globalData.uid
				}
				this._reqw.ipost(parmas).then(res => {
					console.log('compline', res)
					if (res.result == 0) {
						console.log(this.allPrice)
						this.complineList = res.dataList;
						this.complineNum = res.dataList.length;
						let arry = [];
						this.currentCompline = this.complineList[0];
						for (let i = 0; i < this.complineList.length; i++) {
							if (this.complineList[i].type == 1) {
								this.$set(arry, arry.length, this.complineList[i])
							}
						}
						if (arry.length > 0) {
							let len = arry.length - 1;
							this.currentCompline = arry[len];
							if (this.allPrice < this.currentCompline.fullprice) {
								this.addBuy = this.currentCompline.fullprice - this.allPrice
							}
						}


					} else {
						this.$api.tip(res.resultNote)
					}
				}).catch(err => {})
			},
			loadMore() {
				console.log('cart  页面数据加载更多')
				this.status = 'loading';
				this.totalPage > this.page ?
					((this.page += 1), this.loadData()) :
					setTimeout(() => {
						this.status = "noMore"
					}, 300)
			},
			loadData() {
				let parmas = {
					cmd: 'mygoodscar',
					uid: getApp().globalData.uid
				};
				this._reqw.ipost(parmas).then(res => {
					console.log(res)
					res.result == 0 ?(this.datastr=res.datastr,res.dataList.forEach(item => {
						item.checked = false;
						this.dataList.push(item)
					})) : this.$api.tip(res.resultNote)
				}).catch(err => {})

			},
			//选中状态处理
			check(type, index) {
				if (type === 'item') {
					this.dataList[index].checked = !this.dataList[index].checked;
				} else {
					const checked = !this.allChecked
					const list = this.dataList;
					list.forEach(item => {
						item.checked = checked;
					})
					this.allChecked = checked;
				}
				this.calcTotal();
			},
			//数量
			numberChange(data) {
				console.log(data)
				let parmas = {
					cmd: 'editgoodscar',
					uid: getApp().globalData.uid,
					goodscarid: this.dataList[data.index].goodscarid,
					count: data.number
				}
				this._reqw.ipost(parmas).then(res => {
					res.result == 0 ? (this.dataList[data.index].numbers = data.number, this.calcTotal()) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			//删除
			deleteCartItem(id, k) {
				let cartId = [];
				cartId.push(id);
				let _this = this;
				uni.showModal({
					title: "确定删除吗",
					cancelText: "取消",
					confirmText: "确定",
					confirmColor: "#00736B",
					titleColor: "#00736B",
					success(res) {
						console.log(cartId)
						if (res.confirm) {
							let parmas = {
								cmd: 'deletegoodscar',
								uid: getApp().globalData.uid,
								cidlist: cartId
							}
							_this._reqw.ipost(parmas).then(res => {
								res.result == 0 ? (_this.$api.tip('删除成功!'), _this.dataList.splice(k, 1), _this.calcTotal()) : _this.$api.tip(
									res.resultNote)
							})
						} else if (res.cancel) {
							console.log("取消")
						}
					}
				})

			},
			//计算总价
			calcTotal() {
				let list = this.dataList;
				let n = 0;
				if (list.length === 0) {
					this.empty = true;
					return;
				}
				let total = 0;
				let checked = true;
				list.forEach(item => {
					if (item.checked === true) {
						total += item.price * item.numbers;
					} else if (checked === true) {
						checked = false;
					}
				})
				this.allChecked = checked;
				if (total >= this.currentCompline.fullprice) {
					this.addBuy = 0;
				} else {
					this.addBuy = this.currentCompline.fullprice - total
				}
				console.log(n)
				this.total = this.$api.parsePrice(total);

			},
			//创建订单
			createOrder() {
				let list = this.dataList.filter(item => {
					return item.checked
				});
				list.length > 0 ?
					setTimeout(() => {
						this.$api.navTo(
							`/pages/order/finishOrder?type=cart&goods=${JSON.stringify(list)}`)
					}, 200) :
					this
					.$api.tip('请选择商品!')
			}
		}
	}
</script>

<style lang='scss' scoped>
	.container {
		padding-bottom: 180px;
	}

	.uni-com {
		width: 208upx;
		height: 52upx;
		position: relative;
		color: #F55555;
		font-size: 24upx;
		text-align: center;
		line-height: 49upx;
		margin-right: 30upx;
	}

	.uni-com-bg {
		width: 208upx;
		height: 52upx;
		position: absolute;
		top: 0;
		left: 0;
	}

	.notice-con {
		position: fixed;
		bottom: 180upx;
		background-color: #F2FFEF;
		color: #333333;
		line-height: 80upx;
		width: 100%;
		text-indent: 20upx;
	}

	.cart-item {
		width: 97%;
		margin: 0 auto;
		display: flex;
		position: relative;
		background: #ffffff;
		padding: 10upx;
		box-sizing: border-box;

	}

	.price {
		color: #FF0000;
		font-size: 30upx;
	}
	.item-right-top {
		display: flex;
		flex: 1;
		justify-content: space-between;
		align-items: center;
	}

	.skuname {
		font-size: 20upx;
		color: #999999;
	}

	.bottom-width {
		width: 100%;
		justify-content: space-between;
		align-items: center;
		color: #FFFFFF;
	}

	.cart-item-left {
		/* width: 230upx; */
		position: relative;
		display: flex;
		align-items: center;
	}

	.product-img {
		width: 80px;
		height: 80px;
		border-radius: 5px;
		margin-left:14upx;
	}

	.item-right {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding-left: 10upx;
		overflow: hidden;
		position: relative;
	}

	.title,
	.price {
		height: 40upx;
		line-height: 40upx;
		flex: 1;
	}

	.del-btn {
		padding: 4upx 10upx;
		font-size: 34upx;
		height: 50upx;
	}

	.iconfont {
		font-size: 24px;
	}

	/* 底部栏 */
	.action-section {
		position: fixed;
		left: 0;
		bottom: 100upx;
		z-index: 95;
		display: flex;
		align-items: center;
		width: 100%;
		height: 80upx;
		padding-left: 10px;
		box-sizing: border-box;
		background: rgba(255, 255, 255, 1);

		.checkbox {
			height: 52upx;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;

			image {
				width: 52upx;
				height: 100%;
				position: relative;
				z-index: 5;
			}
		}

		.clear-btn {
			position: absolute;
			left: 26upx;
			top: 0;
			z-index: 4;
			width: 0;
			height: 52upx;
			line-height: 52upx;
			padding-left: 38upx;
			color: #fff;
			border-radius: 0 50px 50px 0;
			opacity: 0;
			transition: .2s;
		}

		.total-box {
			flex: 1;
			display: flex;
			flex-direction: column;
			text-align: right;
			padding-right: 40upx;
		}

		.confirm-btn {
			height: 70upx;
			width: 160upx;
			text-align: center;
			line-height: 70upx;
			background: #F55555;
			font-size: 26upx;
			color: #FFFFFF;
		}
	}
</style>
