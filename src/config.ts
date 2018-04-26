
import mainnetListing = require('./kitty-hats-manifest/build/listing_1.json');
import ropstenListing = require('./kitty-hats-manifest/build/listing_3.json');
import devListing = require('./kitty-hats-manifest/build/listing_5777.json');

import KittyCoreExample = require('./kitty-hats-contracts/KittyCoreExample.json');
import KittyItemMarket = require('./kitty-hats-contracts/KittyItemMarket.json');
import KittyItemToken = require('./kitty-hats-contracts/KittyItemToken.json');

const environments = {
	development: {
		appUrl: 'https://127.0.0.1:8080',
		apiEndpoint: 'http://localhost:3000',
		...mainnetListing,
		contracts: {
			KittyItemMarket,
			KittyItemToken,
			KittyCoreExample
		}
	},
	test: {
		appUrl: 'https://127.0.0.1:8000',
		apiEndpoint: 'https://g8jt8hpkwj.execute-api.us-west-2.amazonaws.com/dev',
		...devListing,
		contracts: {
			KittyItemMarket,
			KittyItemToken,
			KittyCoreExample
		}
	},
	staging: {
		appUrl: 'https://www.stage.kittyhats.co',
		apiEndpoint: 'https://g8jt8hpkwj.execute-api.us-west-2.amazonaws.com/dev',
		...mainnetListing,
		contracts: {
			KittyItemMarket,
			KittyItemToken,
			KittyCoreExample
		}
	},
	prod: {
		appUrl: 'https://www.kittyhats.co',
		apiEndpoint: 'https://av6f8j6k3g.execute-api.us-west-2.amazonaws.com/prod',
		...mainnetListing,
		contracts: {
			KittyItemMarket,
			KittyItemToken,
			KittyCoreExample
		}
	}
};

const config = environments[process.env.NODE_ENV];
export default config;
