<script>
	export default {
		globalData: {
			uid: '',
			cid:'',
			cart:'',
			pid:''    //  邀请码id
		},
		onLaunch: function() {
			console.log('App Launch')
			uni.getSystemInfo({
				success(res) {
					console.log(res)
					uni.setStorageSync('screen', res)
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import "./common/css/uni.css";
	page{
		min-height: 100%;
		background-color: #F6F6F6;
	}
   .btn-hover{
	   opacity: .7;
   }
	/*每个页面公共css */
	.page-body {
		padding-bottom: 130upx;
	}

	.small-btn {
		background-color: #09BB07;
		color: #FFFFFF;
		font-size: 30upx;
		border-radius: 4upx;
		text-align: center;
	}

	.s-line {
		height: 10upx;
		background-color: #F6F6F6;
	}
	.uni-space{
		justify-content: space-between;
	}
	.uni-align-center{
		align-items: center;
	}
	.bottom-border{
		border-bottom: 1px solid #F2F2F2;
	}
	/* 分割 */
	.spacle{
		height:14upx;
		background: #FAFAFA;
	}
	.top-splace{
		height: calc(110upx + var(--status-bar-height));
	}
	
	.uni-two-cut {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.ql-container{
		min-height: 160upx !important;
	}
	
	.chose-pay-info{
		width: 236upx;
		height:88upx;
		line-height: 88upx;
		background:rgb(246,245,245);
		border-radius:0px 44upx 44upx 0px;
		font-weight:500;
		text-align: center;
		color:rgb(102,102,102);
	}
	
	/* scroll-view   去滚动条 */
	::-webkit-scrollbar {
	  width:0;
	  height: 0;
	  color: transparent;
	}

	/*
字体图标
	*/
	@font-face {
		font-family: "iconfont";
		src: url('./static/iconfont/iconfont.ttf');
		/* IE9 */

	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		color: #CCCCCC;
		;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-xiajiantou:before {
		content: "\e629";
	}

	.icon-shangjiantou:before {
		content: "\e62c";
	}

	.icon-delete:before {
		content: "\e699";
	}
</style>
