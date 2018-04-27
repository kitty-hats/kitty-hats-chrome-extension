import axios from 'axios';
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
export class App extends React.Component<IAppProps, IAppState> {
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
			kittyId: 1,
			page: '/marketplace',
			firstTimeUser: true,
			isLoading: true,
			popupVisible: false,
			isInIframe: checkIsInIframe()
		};

		this.renderItem = this.renderItem.bind(this);
		this.renderListing = this.renderListing.bind(this);
		this.itemClicked = this.itemClicked.bind(this);
		this.buyButtonPressed = this.buyButtonPressed.bind(this);
		this.cryptokittiesUrlChanged = this.cryptokittiesUrlChanged.bind(this);
		this.fetchKittyCoreOwnership = this.fetchKittyCoreOwnership.bind(this);
		this.removeItemPressed = this.removeItemPressed.bind(this);
		this.giftItemPressed = this.giftItemPressed.bind(this);
		this.applyPressed = this.applyPressed.bind(this);
		this.onKittyClicked = this.onKittyClicked.bind(this);
                this.onCryptoGoodsClicked = this.onCryptoGoodsClicked.bind(this);

		this.startMetamaskAccountPolling = this.startMetamaskAccountPolling.bind(this);
		this.checkMetamaskLogin = this.checkMetamaskLogin.bind(this);
		this.fetchListing();

		this.receiveMessage = this.receiveMessage.bind(this);

		window.addEventListener('message', this.receiveMessage);
		if (this.state.isInIframe === false) {
			this.fetchOwnerKitties();
		}
	}

	public componentDidMount() {
		if (this.state.isInIframe === false) {
			this.fetchOwnerKitties();
		}

		this.startMetamaskAccountPolling();
	}

	// This function starts the metamask listener to detect account changes
	public startMetamaskAccountPolling() {
		const pollingTimeout = 1000;
		const metamaskInterval = setInterval(this.checkMetamaskLogin, pollingTimeout);
	}

	public checkMetamaskLogin() {
		if (web3.eth.accounts[0] !== this.state.account) {
			this.setState({
				account: web3.eth.accounts[0]
			});
			if (isNonNull(web3.eth.accounts[0])) {
				this.fetchOwnerKitties();
			}
		}
	}

	public async fetchOwnerKitties() {
		// Fetch kitties owned by the current account
		const ownerWallet = web3.eth.accounts[0];
		// tslint:disable-next-line:max-line-length
		const apiUrl = `https://api.cryptokitties.co/kitties?offset=0&limit=100&owner_wallet_address=${ownerWallet}&parents=false&authenticated=false`;
		const result = await axios.get(apiUrl);
		if (result.data && result.data.kitties.length > 0 ) {
			this.setState({ ownerKitties: result.data.kitties });
			this.emitShowApp(result.data.kitties[0].id, result.data.kitties[0]);
		}
	}

        public onCryptoGoodsClicked(event) {
            var kittyData = this.state.kittyData;
            (window as any).CryptoGoods.open({
                payload: {
                    image_url: kittyData.image_url
                }
            });
        }

	public emitShowApp(id, meta) {
		window.postMessage({
			type: 'showApp', detail: {
				kittyId: id,
				meta,
			}}, window.location.origin
		);
	}

	public receiveMessage(event): any {
		if (event.origin === 'https://www.cryptokitties.co' || event.origin === window.location.origin) {
			if (event.data.type === 'showApp') {
				this.setState({ kittyId: event.data.detail.kittyId, kittyData: event.data.detail.meta });
				this.fetchAppliedToKitty();
				this.fetchKittyCoreOwnership();
				this.fetchBalance();
				this.fetchAccountAddress();
				this.fetchRemaining();
				this.fetchPrice();
			} else if (event.data.type === 'urlChanged') {
				this.cryptokittiesUrlChanged();
			}
		}
	}

	public async fetchListing() {
		const listing = await KittyItem.getListed();
		this.setState({ listing });
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

	public async fetchPrice() {
		const price = {};
		for (const categoryName in config.categories) {
			if (categoryName === undefined) {
				continue;
			}
			const category = config.categories[categoryName];
			for (const item of category.items) {
				price[item.tokenAddress] = await KittyItem.price(item.tokenAddress);
			}
		}
		this.setState({ price });
	}

	public async fetchRemaining() {
		const remaining = {};
		const { kittyId } = this.state;
		for (const categoryName in config.categories) {
			if (categoryName === undefined) {
				continue;
			}
			const category = config.categories[categoryName];
			for (const item of category.items) {
				remaining[item.tokenAddress] = await KittyItem.remaining(item.tokenAddress);
			}
		}
		this.setState({ remaining });
	}

	public async fetchBalance() {
		const balance = {};
		for (const categoryName in config.categories) {
			if (categoryName === undefined) {
				continue;
			}
			const category = config.categories[categoryName];
			for (const item of category.items) {
				balance[item.tokenAddress] = await KittyItem.balance(item.tokenAddress);
			}
		}
		this.setState({ balance });
	}

	public async fetchKittyCoreOwnership() {
		const { kittyId } = this.state;
		if (isNull(kittyId)) {
			return;
		}
		const kittyCoreOwner = await KittyItem.kittyCoreOwner(kittyId);
		this.setState({ kittyCoreOwner });
	}

	public async fetchAccountAddress() {
		const account = KittyItem.account();
		this.setState({ account });
	}

	public parseKittyIdFromPath(path) {
		log(path.split('/kitty/'));
		alert(path);
	}

	public cryptokittiesUrlChanged() {
		log('App: Cryptokitties URL changed');
	}

	public renderListing(listing: KittyItem.ItemCategory[]): JSX.Element[] {
		const { renderItem } = this;
		const sortedListing = _.sortBy(listing, 'order');
		return _.map(sortedListing, (listingItem) => {
			if (listingItem.displayName === 'special') {
				return null;
			}
			return (
				<div key={listingItem.displayName}>
					<h4 style={{ ...styles.categoryHeader,  marginTop: '10px'}}>
						{listingItem.displayName}
					</h4>
					<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
						{
							_.map(listingItem.items, renderItem)
						}
					</div>
				</div>
			);
		});
	}

	public async buyButtonPressed(item: KittyItem.Item) {
		const { kittyId, kittyData, account, kittyCoreOwner, balance, appliedToKitty } = this.state;
		const isOwner = (kittyData.owner.address === account) || (kittyCoreOwner === account);

		if (isOwner === true && appliedToKitty[item.tokenAddress] !== true && balance[item.tokenAddress] === 0) {
			await KittyItem.buyAndApplyItem(item, kittyId);
			this.fetchAppliedToKitty();
			this.fetchRemaining();
		} else {
			await KittyItem.buyItem(item, 1);
			this.fetchBalance();
		}
	}

	public async removeItemPressed(item: KittyItem.Item, kittyId: number) {
		if (isNull(kittyId)) {
			return;
		}
		const result = await KittyItem.removeItem(item.tokenAddress, kittyId);
		this.fetchAppliedToKitty();
	}

	public async giftItemPressed(item: KittyItem.Item) {
		const { kittyCoreOwner } = this.state;
		const result = await KittyItem.giftItem(item.tokenAddress, kittyCoreOwner);
		this.fetchBalance();
	}

	public async applyPressed(item: KittyItem.Item, kittyId: number) {
		const result = await KittyItem.applyItem(item, kittyId);
		this.fetchBalance();
		this.fetchAppliedToKitty();
	}

	public async itemTitleClicked(item: KittyItem.Item) {
		if (isNonNull(item.url)) {
			window.open(item.url, '_blank');
		}
	}

	public renderItem(item: KittyItem.Item) {
		const { itemClicked, buyButtonPressed, removeItemPressed, giftItemPressed, applyPressed, itemTitleClicked } = this;
		const {
			selectedItem, kittyId, appliedToKitty, kittyData, kittyCoreOwner, account, balance, remaining, price
		} = this.state;
		const itemIsApplied = appliedToKitty && (appliedToKitty[item.tokenAddress] === true);
		if (isNull(kittyId)) {
			return null;
		}
		const itemClickedHandler = () => { itemTitleClicked(item); };
		const fetchingPurchaseInfo = isNull(appliedToKitty) || isNull(appliedToKitty[item.tokenAddress]);
		if (fetchingPurchaseInfo) {
			return (
			<div style={{ ...styles.item }} key={item.name}>
				<PulseLoader style={{marginTop: '40%', marginLeft: '40%'}}loading={true} color='#E6E6E6' size='10px' margin='4px'/>
			</div>
			);
		}

		/** This determines kitty ownership */
		const isOwner = (kittyData.owner.address === account) || (kittyCoreOwner === account);

		const isSelectedItem = isNonNull(selectedItem) && selectedItem.name === item.name;
		const selectedStyle = isSelectedItem ? { backgroundColor: 'rgb(247, 247, 247)'} : {};
		const whenItemClicked = () => itemClicked(item);
		const whenBuyClicked = (e) => { e.preventDefault(); e.stopPropagation(); buyButtonPressed(item); };
		const whenRemoveClicked = (e) => { e.preventDefault(); e.stopPropagation(); removeItemPressed(item, kittyId); };
		const whenGiftClicked = (e) => { e.preventDefault(); e.stopPropagation(); giftItemPressed(item); };
		const whenApplyClicked = (e) => { e.preventDefault(); e.stopPropagation(); applyPressed(item, kittyId); };
		const isDada = item.contract.indexOf('ItemDada') === 0;
		return (
			<div className={'kittyItem'} style={{ ...styles.item, ...selectedStyle }} key={item.name} onClick={whenItemClicked}>
				{
					isNonNull(item.charity) && (
					<div
						style={{float: 'right', top: '3', right: '75', height: '30px', width: '30px'}}
						data-tooltip={`100% of the proceeds from this item go to ${item.charity}`}
					>
						<img style={{height: '27px', opacity: 0.7}}src='/img/charity.png'/>
					</div>
					)
				}

				<div style={styles.itemImage}>
					<img style={{height: '100%'}}src={`img/preview/${item.assetUrl}${isDada === true ? '.png' : '.svg'}`}/>
				</div>
				<div
					style={{...styles.itemTitle, fontSize: item.name.length > 20 ? '1.2rem' : '1.8rem' }}
					onClick={itemClickedHandler}
				>
					{item.name}
				</div>
				{ isNonNull(item.artist) ?
					(<p
						style={{
						fontSize: '13px',
						color: '#545454',
						fontWeight: 600,
						paddingBottom: 0, marginBottom: 0, lineHeight: '13px' }}
					> by {item.artist}
					</p>) :
					<div style={{height: '13px', width: '100%'}}/>
				}
				<div>
					<div style={{display: 'flex', flexDirection: 'row', marginTop: '10px'}}>
						<div style={styles.pill}> {
						(price && price[item.tokenAddress]) ?
							'≡' + (price[item.tokenAddress] ? web3.fromWei(price[item.tokenAddress], 'ether').toString() : 0) :
							<ClipLoader size={'10px'} style={{ marginTop: '5px' }}/>
						} </div>
						<div style={styles.pill}> {
						(balance && typeof balance[item.tokenAddress] === 'number') ?
							balance[item.tokenAddress] :
							<ClipLoader size={'10px'} style={{ marginTop: '5px' }}/>
						} </div>
						<div style={{...styles.pill, ...styles.quantityPill}}> {
						(remaining && typeof(remaining[item.tokenAddress]) === 'number') ?
							remaining[item.tokenAddress] + ' left' :
							<ClipLoader size={'10px'} style={{ marginTop: '5px' }}/>
						}</div>
					</div>

					{
						(true &&
						(<div onClick={whenBuyClicked} style={{display: 'inline', position: 'relative', bottom: '-10px'}}>
							<div className='Button Button--buy'>
								Buy {(isOwner && !itemIsApplied && balance && balance[item.tokenAddress] === 0 ? ' and Apply ' : '')}
							</div>
						</div>))

					}

					{
						(itemIsApplied && isOwner) &&
						(<div style={{display: 'inline', position: 'relative', bottom: '-10px', marginLeft: '5px'}}>
							<div onClick={whenRemoveClicked} className='Button Button--buy'> Remove </div>
						</div>)
					}

					{
						((isOwner && !itemIsApplied && balance && balance[item.tokenAddress] > 0) &&
						(<div
							onClick={whenApplyClicked}
							style={{
								display: 'inline',
								position: 'relative',
								bottom: '-10px',
								marginLeft: '5px'
							}}
						>
							<div className='Button Button--buy'> Apply </div>
						</div>))

					}

					{
						(!isOwner && !itemIsApplied ?
						(<div
							onClick={whenGiftClicked}
							style={{
								display: 'inline',
								position: 'relative',
								bottom: '-10px',
								marginLeft: '5px',
								...((balance && balance[item.tokenAddress] <= 0) ?
									{ pointerEvents: 'none', filter: 'grayscale(100%)', opacity: 0.3 } : {}
								)
							}}
						>
							<div className='Button Button--love'> Gift </div>
						</div>) : null)
					}
				</div>
			</div>
		);
	}

	public itemClicked(item: KittyItem.Item ) {
		const { appliedToKitty, selectedItem } = this.state;
		if (appliedToKitty && appliedToKitty[item.tokenAddress] === false) {
			if (isNonNull(selectedItem) && selectedItem.tokenAddress === item.tokenAddress) {
				this.setState({ selectedItem: null });
				return;
			}
			this.setState({ selectedItem: item });
		}
	}

	public onKittyClicked(kitty) {
		this.setState({
			kittyData: kitty,
			kittyId: kitty.id
		});

		this.emitShowApp(kitty.id, kitty);
	}

	public render() {
		const { renderListing } = this;
		const { account } = this.state;

		if (isNull(account)) {
			return <Splash/>;
		}
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
		const { fetchKittyCoreOwnership, onKittyClicked, onCryptoGoodsClicked} = this;
		const previewContainerBgColor = (kittyData && c.BackgroundColor[kittyData.color] ?
				c.BackgroundColor[kittyData.color].tint : c.BackgroundColor.babyblue.tint);
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
			<div style={{paddingTop: 25, paddingLeft: 25, paddingRight: 25}}>

				<div style={{ height: '40px', display: 'flex', alignItems: 'center', marginTop: '-8px', marginBottom: '10px'}}>
					<img
						src={'img/icon.png'}
						style={{ height: '40px',
						width: '40px', borderRadius: '25px', boxShadow: '0px 3px 15px rgba(0,0,0,0.07)', border: '1px #949494 solid' }}
					/>
					<p className={'Header-wordmark'} style={{ color: '#2a2825'}}> KittyHats </p>
				</div>
				<div style={{ display: 'flex', flexDirection: 'row', marginTop: '1vh'}}>
					<div style={{ ... styles.previewContainer }}>
                                                {
				            	    (appliedItems.length > 0) && (
                                                        <div onClick={onCryptoGoodsClicked} style={{float: 'right', top: '3px', right: '23%', height: '15%', width: '15%', zIndex: 1}} data-tooltip={`Show off your KittyHat in the real world with CryptoGoods`}>
				            	    	<img style={{width:'100%'}} src='/img/crypto-goods.png'/>
				                	</div>
				                    )
				                }
						<img
							// tslint:disable-next-line:max-line-length
							src={(isNonNull(kittyData) ? kittyData.image_url : 'img/nullcat.svg')}
							style={{
								maxWidth: '550px',
								width: '80%',
								position: 'absolute',
								backgroundColor: previewContainerBgColor,
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
								if (isNull(selectedItem)) {
									return null;
								}

								const isDada = selectedItem.contract.indexOf('ItemDada') === 0;
								const imageUrl = (isDada === false) ?
									`img/asset/${selectedItem.assetUrl}.svg` :
									'img/asset/easel.svg';

								if (isNonNull(selectedItem) && !isSpecial) {
									return <img
										src={imageUrl}
										style={{ width: '80%', position: 'absolute', maxWidth: '550px' }}
									/>;
								}
							})()

						}
						{
							(() => {
								if (isNull(selectedItem)) {
									return null;
								}
								const isDada = selectedItem.contract.indexOf('ItemDada') === 0;
								const dadaArtUrl = `img/asset/${selectedItem.assetUrl}.png`;
								if (isDada === true) {
									return <img
										src={dadaArtUrl}
										style={{ width: '27%', marginTop: '31.8%', marginLeft: '1%', position: 'absolute', maxWidth: '550px' }}
									/>;
								}
							})()
						}
						{
							(() => {
								if (isNull(selectedItem)) {
									return null;
								}
								const isDada = selectedItem.contract.indexOf('ItemDada') === 0;
								const dadaPlacardUrl = `img/asset/${selectedItem.assetUrl.replace('dada', 'dada-placard')}.svg`;
								if (isDada === true) {
									return <img
										src={dadaPlacardUrl}
										style={{ width: '80%', position: 'absolute', maxWidth: '550px' }}
									/>;
								}
							})()
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

						{
							(kittyData && kittyData.owner && kittyCoreOwner && config.networkId !== '1') &&
							<Debug
								kittyId={kittyId}
								apiOwner={kittyData.owner.address}
								kittyCoreOwner={kittyCoreOwner}
								onOwnershipUpdated={fetchKittyCoreOwnership}
							/>
						}

						{
							(isInIframe === false && isNonNull(ownerKitties)) &&
							<div style={{marginTop: '31vw'}}> My cats </div>
						}

						{
							(isInIframe === false && isNonNull(ownerKitties)) &&
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									height: '140px',
									overflow: 'scroll'
								}}
							>
								{
									_.map(ownerKitties, (kitty) => {
										const kittyClicked = () => onKittyClicked(kitty);
										return (
											<div onClick={kittyClicked} key={kitty.id}>
												<div
													style={{
														height: '130px',
														width: '130px',
														borderRadius: '5px',
														marginRight: '5px',
														cursor: 'pointer',
														transition: 'all 0.2s ease',
														...(kittyId === kitty.id ?
															{ opacity: 1 } :
															{
																backgroundColor: (c.BackgroundColor[kitty.color] ?
																	c.BackgroundColor[kitty.color].tint : c.BackgroundColor.babyblue.tint),
																opacity: 0.4
															})
													}}
												>
												<img
													style={{
														height: '130px',
														width: '130px',
													}}
													src={kitty.image_url}
												/>
												</div>
												<p style={{ marginTop: '-27px', fontSize: '15px', textAlign: 'center'}}> #{kitty.id} </p>
											</div>
										);
									})
								}

							</div>
						}
					</div>

					{/* Items list */}
					<div
						style={{
							width: '60%',
							display: 'flex',
							flexDirection: 'column',
							height: '90vh',
							overflow: 'scroll',
							paddingLeft: '10px'
						}}
					>
						{
							renderListing(listing)
						}
						<div className='spacer' style={{ width: '100%', minHeight: '55px'}}/>
						<div
							className='scrollIndicator'
							style={{
								width: '100%',
								height: '80px',
								background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%)',
								position: 'fixed',
								bottom: 0,
								left: 0
							}}
						/>
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
