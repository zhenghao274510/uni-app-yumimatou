const QQMapWX = require('./qqmap-wx-jssdk.js');
const qqmapsdk = new QQMapWX({
	key: 'GQZBZ-3CECD-BP443-PBQEY-4R3M6-QMFBO'
});
export default {
	calculateDistance(star, end) {
		qqmapsdk.calculateDistance({
			from: star,
			to: end,
			success: function(res) { //成功后的回调
				console.log(res);
			}
		})
	},
	search(keyword) {
		qqmapsdk.search({
			keyword: keyword, //搜索关键词
			success: function(res) { //搜索成功后的回调
				console.log(res)
			}
		})
	},
	getPosition() {
		uni.getLocation({
			type: "gcj02",
			success(res) {
				uni.setStorageSync('point', JSON.stringify(res));
				qqmapsdk.reverseGeocoder({
					location: {
						latitude: res.latitude,
						longitude: res.longitude
					},
					success: function(res) {
						var result = res.result;
						let currentPosition={
							address:result.formatted_addresses.rough,
							city:result.ad_info.city
						}
						console.log(currentPosition)
						return currentPosition
					}
				});
			}
		})
	},
}
