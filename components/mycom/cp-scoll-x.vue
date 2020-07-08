<template>
	<view>
		<view class="cp-scoll-tit">组合购买</view>
		<scroll-view scroll-x="true" class="scroll-x">
			<view class="item-wrapper" :style="{width:parentsWidth}">
				<view class="item" v-for="(item, index) of list" :key="index" @click.stop="detail(item)">
					<view class="icon"><image lazy-load :src="item.goodsimage" class="img" /></view>
					<view class="tip uni-ellipsis">{{ item.goodsname }}</view>
					<view class="uni-flex zh_bottom">
						<view class="tip-price">￥{{ item.price }}</view>
						<view class="icon-cart" @click.stop="addCart(item)">+</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [],
			parentsWidth:''
		};
	},
	methods: {
		set(val) {
			this.list = val;
			let len=this.list.length;
			if(len<2){
				this.parentsWidth='100%'
			}else{
				this.parentsWidth=len*290+'rpx'
			}
			
		},
		detail(e) {
			uni.redirectTo({
				url: `/pages/goodDetails/gooddetails?id=${e.goodsid}`
			});
		},
		addCart(e) {
			let parmas = {
				cmd: 'addgoodscar',
				uid: getApp().globalData.uid,
				goodsid: e.goodsid,
				skuid: e.skuid,
				count: 1
			};
			this._reqw
				.ipost(parmas)
				.then(res => {
					res.result == 0 ? this.$api.tip('加入购物车成功!') : this.$api.tip(res.resultNote);
				})
				.catch(err => {});
		}
	}
};
</script>

<style scoped>
.zh_bottom {
	justify-content: space-between;
}

.tip-price {
	color: #ff0000;
	font-size: 26upx;
}

.icon-cart {
	width: 46upx;
	height: 46upx;
	border-radius: 50%;
	background-color: #09bb07;
	text-align: center;
	line-height: 46upx;
	color: #ffffff;
	box-shadow: 0px 3px 7px 0px rgba(107, 212, 83, 0.4);
	margin-top: -50upx;
}

.cp-scoll-tit {
	font-size: 36upx;
	font-weight: bold;
	color: rgba(51, 51, 51, 1);
	padding: 30upx;
}

.uni-flex {
	align-items: center;
}

.img {
	width: 50upx;
	height: 50upx;
	margin-right: 20upx;
	border-radius: 10upx;
}

.img-tip {
	font-size: 34upx;
	font-weight: bold;
	color: rgba(51, 51, 51, 1);
}

view {
	font-size: 24upx;
}

.scroll-x {
	height: 340upx;
	padding: 40upx 20upx 100upx 20upx;
	white-space:nowrap;
}

.item-wrapper {
	height: 340upx;
	/* width: 3792upx; */
}

.scroll-x .item {
	float: left;
	width: 260upx;
	height: 340upx;
	background: #fff;
	margin-right:30upx;
	overflow: hidden;
	position: relative;
}

.icon {
	width: 100%;
	height: 60%;
	position: relative;
}

.icon .img {
	width: 100%;
	height: 100%;
}

.tip {
	font-size: 28upx;
	font-weight: 500;
	color: rgba(102, 102, 102, 1);
	line-height: 70upx;
}
</style>
