import axios from 'axios';
import 'whatwg-fetch';
import * as $ from 'jquery';
import * as _ from 'lodash';
import * as React from 'react';
import * as c from './colors';
import { log, logError } from './log';
import { isInIframe as checkIsInIframe, isNonNull, isNull } from './utils';
import { web3 } from './web3';

import { Splash } from './Splash';
// tslint:disable:jsx-no-multiline-js

import { Debug } from './Debug';

import { KittyItem } from './KittyItem';
import { KittyItemManager } from './KittyItemManager';

import { ClipLoader, PulseLoader } from 'halogenium';

import config from './config';

interface IAppState {
	popupVisible: boolean;
	firstTimeUser: boolean;
	isLoading: boolean;
	kittyId?: number;
	kittyData?: any;
	kittyCoreOwner?: string;
	appliedToKitty?: { [key: string]: boolean };
	page?: string;
	listing?: KittyItem.ItemCategory[];
	selectedItem?: KittyItem.Item;
	price?: { [key: string]: number };
	balance?: { [key: string]: number };
	remaining?: { [key: string]: number };
	account?: string;
	isInIframe?: boolean;
	ownerKitties?: any[];
}

interface IAppProps {
	version?: string;
	container?: HTMLElement;
	// We dont need props since we're interacting through standard window events.
	// To get a clean seperation of interaface in and out of the app
}
export class KittyHatsCryptoGoods extends React.Component<IAppProps, IAppState> {
	private containerElement: JQuery<HTMLElement>;
	public constructor(props) {
		// Start listening to the window events and watch for show events
		// Update the state accordingly..
		super(props);
		log(config);
		if (isNonNull(props.container)) {
			this.containerElement = $(`#${props.container}`);
		}
		this.state = {
			kittyId: null,
			page: '/marketplace',
			firstTimeUser: true,
			isLoading: true,
                        kittyData: null,
			popupVisible: false,
			isInIframe: checkIsInIframe()
		};

	}
   
        public async componentWillMount(){
          await this.fetchListing();

          var id =this.props.props.match.params.id
          await this.setState({kittyId: id});

          var _this = this;

          try {
            await fetch(`https://api.cryptokitties.co/kitties/${id}`, {
              method: 'get',
              headers: {
                'content-type': 'application/json'
              }
            }).then(function(response) {
              return response.json()
            }).then(function(data){
              _this.setState({kittyData:data});
            });
          } catch(e) {
            return e; // TODO provide a useful error message
          } 

          await this.fetchAppliedToKitty()
        }

	public async fetchAppliedToKitty() {

		const applied = {};
		const { kittyId } = this.state;
		this.setState({ appliedToKitty: undefined });

		const result  = await KittyItemManager.getKittyItems([kittyId]);
		const appliedItems = result[kittyId];
		for (const categoryName in config.categories) {
			if (categoryName === undefined) { continue; }
			const category = config.categories[categoryName];
			for (const item of category.items) {
				if (appliedItems.indexOf(item.assetUrl) > -1) {
					applied[item.tokenAddress] = true;
				} else {
					applied[item.tokenAddress] = false;
				}
			}
		}
		this.setState({ appliedToKitty: applied });
		this.validateAppliedToKitty();
	}

        public async fetchListing() {
		const listing = await KittyItem.getListed();
		this.setState({ listing });
	}

	public async validateAppliedToKitty() {
		const { kittyId, appliedToKitty } = this.state;
		const applied = {};
		for (const categoryName in config.categories) {
			if (categoryName === undefined) { continue; }
			const category = config.categories[categoryName];
			for (const item of category.items) {
				const isApplied = await KittyItem.applied(kittyId, item.tokenAddress);
				if (isApplied !== appliedToKitty[item.tokenAddress]) {
					log(`Mismatch on ${item.tokenAddress}`);
					applied[item.tokenAddress] = isApplied;
				}
			}
		}
		// If there was a mismatch on one of the items, update the state to use blockchain copy
		// and invalidate the cache
		if (Object.keys(applied).length > 0) {
			this.setState({
				appliedToKitty: {
					...appliedToKitty,
					...applied
				}
			});
			const invalidateSuccess = await KittyItemManager.invalidateCache(kittyId);
			log(`Cache invalidate success ${invalidateSuccess}`);
		}
	}

	public render() {
		const { account } = this.state;

		// tslint:disable-next-line:max-line-length
		const {
			kittyId,
			kittyData,
			listing,
			selectedItem,
			appliedToKitty,
			kittyCoreOwner,
			ownerKitties,
			isInIframe
		} = this.state;
		const isSpecial = kittyData && kittyData.fancy_type !== null;
		const appliedItems = [];
		if (isNonNull(listing) && isNonNull(appliedToKitty)) {
			for (const catName in listing) {
				if (catName === undefined) {
					continue;
				}
				const cat = listing[catName];
				for (const item of cat.items) {
					if (appliedToKitty[item.tokenAddress] === true) {
						appliedItems.push(item);
					}
				}
			}
		}

		const appliedDadaItem = _.find(appliedItems, (e) => e.assetUrl.indexOf('dada') > -1);

		return (
			<div>

				<div style={{ display: 'flex', flexDirection: 'row', marginTop: '1vh'}}>
					<div style={{ ... styles.previewContainer }}>
						<img
							// tslint:disable-next-line:max-line-length
							src={(isNonNull(kittyData) ? kittyData.image_url : 'img/nullcat.svg')}
							style={{
								maxWidth: '550px',
								width: '80%',
								position: 'absolute',
								borderRadius: '6px'
							}}
						/>
						{
							(appliedItems.length > 0 && !isSpecial) &&
							_.map(_.filter(appliedItems, (element) => element.assetUrl.indexOf('dada') === -1), (element) => {
								if (isNull(element)) {
									return null;
								}

								return <img
									key={element.tokenAddress}
									src={`img/asset/${element.assetUrl}.svg`}
									style={{ width: '80%', maxWidth: '550px', position: 'absolute' }}
								/>;
							})
						}
						{
							(() => {
								// If a dada item is applied render an easel
								if (isNull(appliedDadaItem)) {
									return null;
								}
								const imageUrl = 'img/asset/easel.svg';
								if (isNonNull(appliedDadaItem)) {
									return <img
										src={imageUrl}
										style={{ width: '80%', position: 'absolute', maxWidth: '550px' }}
									/>;
								}
							})()

						}

						{
							(() => {
								if (isNull(appliedDadaItem)) {
									return null;
								}
								const dadaArtUrl = `img/asset/${appliedDadaItem.assetUrl}.png`;
								return <img
									src={dadaArtUrl}
									style={{ width: '27%', marginTop: '31.8%', marginLeft: '1%', position: 'absolute', maxWidth: '550px' }}
								/>;
							})()
						}

						{
							(() => {
								if (isNull(appliedDadaItem)) {
									return null;
								}
								const dadaPlacardUrl = `img/asset/${appliedDadaItem.assetUrl.replace('dada', 'dada-placard')}.svg`;
								return <img
									src={dadaPlacardUrl}
									style={{ width: '80%', position: 'absolute', maxWidth: '550px' }}
								/>;
							})()
						}
					</div>

				</div>

			</div>
		);
	}
}

const styles: any = {

	item: {
		borderRadius: '2px',
		background: 'rgb(255,254,254)',
		height: '270px',
		width: '200px',
		paddingTop: '5px',
		paddingLeft: '10px',
		marginRight: '5px',
	},

	itemImage: {
		cursor: 'pointer',
		height: '120px',
		width: '120px',
		boxShadow: '0px 1px 0px rgba(0,0,0,0.2)',
		background: 'white',
		borderRadius: '8px',
		border: '1px solid #f3f3f3',
		overflow: 'hidden',
	},

	categoryHeader: {
		marginTop: '6px',
		marginBottom: '6px',
		fontFamily: 'Calibre,Helvetica,Arial,sans-serif',
		fontSize: '2.0rem',
		color: 'rgb(165, 163, 163)',
		fontWeight: 500
	},

	previewContainer: {
		width: '40%',
		fontWeight: '500',
		position: 'relative'
	},

	itemTitle: {
		fontFamily: 'Calibre,Helvetica,Arial,sans-serif',
		height: '2.7rem',
		fontSize: '1.8rem',
		color: '#2a2825',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		fontWeight: '500',
		cursor: 'pointer'
	},

	pill: {
		color: 'white',
		height: '20px',
		lineHeight: '20px',
		background: 'rgb(251, 163, 112)',
		borderRadius: '20px',
		fontSize: '14px',
		textAlign: 'center',
		marginRight: '3px',
		fontWeight: '700',
		paddingLeft: '5px',
		paddingRight: '5px'
	},

	quantityPill: {
		color: '#9c9c9c',
		background: 'rgb(230, 230, 230)'
	}
};
