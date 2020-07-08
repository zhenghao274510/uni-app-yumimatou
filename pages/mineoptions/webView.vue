<template>
	<view class="content">
		<!-- <web-view src=""></web-view> -->
		<rich-text :nodes="content"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: ''
			}
		},
		onLoad(options) {
			this.content = this.$api.formText(uni.getStorageSync('content'), uni.getStorageSync('screen').screenWidth - 20)
			console.log(uni.getStorageSync('content'))
			if(options.title){
				let title = options.title;
				uni.setNavigationBarTitle({
					title: title
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 10px;
	}
</style>
