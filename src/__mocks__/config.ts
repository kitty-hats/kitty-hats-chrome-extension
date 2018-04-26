const config = {
	appUrl: 'https://localhost:8000',
	marketplaceAddress: '0x12fcef4f128fe19d3d6bef1c082785231bdaacbb',
	version: '1.0.0',
	contracts: {
		KittyItemMarket: [],
		KittyItemToken: [],
		KittyCore: []
	},
	categories: [{
		displayName: 'Hats',
		items: [
			{
				name: 'Santa',
				tokenAddress: '0x12fcef4f128fe19d3d6bef1c082785231bdaacbb',
				previewImage: 'img/preview/santa.svg',
				assetUrl: 'img/asset/santa.svg'
			},
			{
				name: 'New Era',
				tokenAddress: '0x12fcef4f128fe19d3d6bef1c082785231bdaacbb',
				previewImage: 'img/preview/newera.svg',
				assetUrl: 'img/asset/newera.svg'
			},
			{
				name: 'Top hat',
				tokenAddress: '0x12fcef4f128fe19d3d6bef1c082785231bdaacbb',
				previewImage: 'img/preview/tophat.svg',
				assetUrl: 'img/asset/tophat.svg'
			}
		]
	},
	{
		displayName: 'Eyewear & Watches',
		items: [
			{
				name: 'Aviators',
				tokenAddress: '0x12fcef4f128fe19d3d6bef1c082785231bdaacbb',
				previewImage: 'img/preview/aviators.svg',
				assetUrl: 'img/asset/aviators.svg'
			},
			{
				name: 'Yeezy',
				tokenAddress: '0x12fcef4f128fe19d3d6bef1c082785231bdaacbb',
				previewImage: 'img/preview/yeezy.svg',
				assetUrl: 'img/asset/yeezy.svg'
			},
			{
				name: 'Apple Watch',
				tokenAddress: '0x12fcef4f128fe19d3d6bef1c082785231bdaacbb',
				previewImage: 'img/preview/applewatch.svg',
				assetUrl: 'img/asset/applewatch.svg'
			}
		]}
	 ]

};

export default config;
