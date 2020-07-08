<template>
	<view class="">
		<view class="fencai-item" v-for="(v,k) in dataList" :key="k">
			<block v-if="indexCurrent==k">
				<view class="address-tit">
					{{v.title}}
				</view>
				<!-- http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400 -->
				<view class="" style="position: relative;">
					<video :src="v.urls" :poster="v.image" class="video" :id="'myVideo'+k" custom-cache="false"  @tap="videoPlay(k)" autoplay
					  controls show-center-play-btn enable-play-gesture  ></video>
				</view>
			</block>
			<block v-else>
				<view class="address-tit">
					{{v.title}}
				</view>
				<view class="novideo" style="position: relative;" @tap="videoPlay(k)">
					<image src="/static/play.png" mode="" class="load-img"></image>
                         <image :src="v.image" mode="" class="video-img"></image>
				</view>
			</block>
			
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				dataList: [],
				indexCurrent: 0,
				urls: '',
				custom: false
			}
		},
		onLoad() {
			this.loadData();
			var videoContext = wx.createVideoContext('myVideo' +this.indexCurrent); //这里对应的视频id
			setTimeout(()=>{
				videoContext.play();
			},50)
		},
		methods: {
			loadData() {
				let parmas = {
					cmd: 'getelegantslist'
				}
				this._reqw.ipost(parmas).then(res => {
					res.result == 0 ? (res.dataList.forEach(item => {
						item.show = false,
						this.dataList.push(item)
					})) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			videoPlay(curIdx) {
				this.indexCurrent = curIdx;
				var videoContext = wx.createVideoContext('myVideo' +curIdx); //这里对应的视频id
				setTimeout(()=>{
					videoContext.play();
				},300)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.fencai-item {
		margin: 20upx;
	}
	.video-img{
		width: 85%;
		height: 446upx;
		margin:  0 auto ;
	}

	.load-img {
		width: 70upx;
		height: 70upx;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 9999;
	}

	.address-tit {
		font-size: 30upx;
		font-weight: bold;
		color: rgb(51, 51, 51);
		line-height: 70upx;
		position: relative;
		padding: 30upx 0 30upx 30upx;
		border-bottom: 1px solid #F2F2F2;
		box-sizing: border-box;
	}

	.address-tit::before {
		content: '';
		width: 6upx;
		height: 27upx;
		background: rgba(111, 215, 88, 1);
		border-radius: 3upx;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
	}
	.video{
		width: 100%;
	}

	.novideo {
		width: 100%;
		background-color: #000000;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
