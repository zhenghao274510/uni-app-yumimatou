<template>
	<view class="we-content">
		<rich-text :nodes="content"></rich-text>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				content:''
			}
		},
		onLoad() {
			this.loadData()
		},
		methods:{
			loadData(){
				let parmas={
					cmd:'aboutus'
				}
				this._reqw.ipost(parmas).then(res=>{
					res.result==0?this.content=this.$api.formText(res.datastr,uni.getStorageSync('screen').screenWidth- 20):this.$api.tip(res.resultNote)
				}).catch(err=>{})
			}
		}
	}
</script>

<style>
</style>
