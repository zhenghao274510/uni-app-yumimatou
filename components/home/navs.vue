<template>
	<div class="all">
		<div class="contains">
			<div class="nav-item" v-for="(item,index) in dataList" :key="index" >
				<img :src="item.image"  @click="classify(item.cid)" />
				<span>{{item.name}}</span>
			</div>
			<!-- <div class="nav-item xia">
				<img src="/static/img/test/2@2x.png" alt @click="classify" />
				<span>更多</span>
			</div> -->
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			dataList:{
				type:Array
			}
		},
		methods: {
			classify(id){
				if(id!=undefined){
					getApp().globalData.cid=id;
				}
				this.$emit('click')
			},
		}
	};
</script>

<style scoped lang="scss">
	.all {
		width: 100%;
		position: relative;

		.contains {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			position: relative;

			.nav-item {
				width: 20%;
				margin-top: 20upx;
				margin-bottom: 20upx;
				display: flex;
				align-items: center;
				flex-direction: column;
				justify-content: center;

				img {
					width: 90upx;
					height: 90upx;
					border-radius: 50%;
				}

				span {
					font-size:24upx;
					color: #666;
					margin-top: 14upx;
					width: 100%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					text-align: center;
				}
			}
		}
	}
</style>
