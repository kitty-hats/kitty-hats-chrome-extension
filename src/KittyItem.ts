// tslint:disable:no-namespace
import axios from 'axios';
import { log, logError } from './log';
import { web3 } from './web3';

import { isNonNull, isNull } from './utils';

import config from './config';

// tslint:disable:interface-name no-empty-interface
interface KittyItem {}
interface KittyItemMarket {}
export namespace KittyItem {

	export let items = {}; // Mapping of itemAddresses to their contract instances;
	export let marketContract;

	const itemNameToAddressMap = {};

	export interface Item {
		name: string;
		price: string;
		quantity?: number; // This will be fetched from a web3 call for the token
		artist?: string;
		charity?: string;
		contract?: string;
		tokenAddress: string;
		previewImage?: string;
		assetUrl?: string;
		category?: string;
		url?: string;
	}

	export interface ItemCategory {
		displayName: string;
		items: Item[];
	}

	for (const catName in config.categories) {
		if (catName === undefined) { continue; }
		const cat = config.categories[catName];
		for (const item of cat.items) {
			itemNameToAddressMap[item.assetUrl] = item.tokenAddress;
		}
	}

	export function itemNameToAddress(name: string): string {
		return itemNameToAddressMap[name];
	}

	export async function buyAndApplyItem(item: Item, kittyId: number) {
		return new Promise(async (resolve, reject) => {
			log('buyAndApplyItem');
			log(`Trying to buy token @ contract address ${item.tokenAddress} and apply to kitty ${kittyId}`);
			log('buyItem: KittyItem.ts');
			const contractInstance = getItemContract(item.tokenAddress);
			const isApplied = await applied(kittyId, item.tokenAddress);
			if (isApplied) {
				resolve();
			}

			const itemPrice = await KittyItem.price(item.tokenAddress);
			getItemContract(item.tokenAddress).name.call(async (err, result) => {
				if (isNull(err)) {
					const market = getMarketContract();
					market.buyItemAndApply(result, kittyId, { value: itemPrice }, (getItemErr, buyAndApplyResult) => {
						if (isNull(err)) {
							resolve(buyAndApplyResult);
						} else {
							reject(err);
						}
					});
				} else {
					reject(err);
				}
			});
		});
	}

	export async function applyItem(item: Item, kittyId: number) {
		return new Promise((resolve, reject) => {
			getItemContract(item.tokenAddress).applyItem(kittyId, (err, result) => {
				if (isNull(err)) {
					resolve(result);
				} else {
					reject(err);
				}
			});
		});
	}

	export async function buyItem(item: Item, quantity: number) {
		return new Promise(async (resolve, reject) => {
			log('buyItem');
			log(`Trying to buy token @ contract address ${item.tokenAddress}`);
			log('buyItem: KittyItem.ts');
			const contractInstance = getItemContract(item.tokenAddress);

			const itemPrice = await KittyItem.price(item.tokenAddress);
			getItemContract(item.tokenAddress).name.call(async (err, result) => {
				if (isNull(err)) {
					const market = getMarketContract();
					market.buyItem(result, quantity, { value: itemPrice }, (getItemErr, buyResult) => {
						if (isNull(err)) {
							resolve(buyResult);
						} else {
							reject(err);
						}
					});
				} else {
					reject(err);
				}
			});
		});
	}

	export async function removeItem(tokenAddress: string, kittyId: number) {
		return new Promise((resolve, reject) => {
			getItemContract(tokenAddress).removeItem(kittyId, (err, result) => {
				if (isNull(err)) {
					resolve(result);
				} else {
					reject(err);
				}
			});
		});
	}

	export async function getListed(): Promise<ItemCategory[]> {
		return config.categories;
	}

	export async function applied(kittyId: number, itemAddress: string) {
		return new Promise((resolve, reject) => {
			const contractInstance = getItemContract(itemAddress);
			contractInstance.applied(kittyId, (err, result) => {
				if (isNull(err)) {
					log(`appliedToKitty: ${itemAddress} ${result}`);
					resolve(result);
				} else {
					reject(err);
				}
			});
		});
	}

	function getItemContract(itemAddress: string) {
		const cached = items[itemAddress];
		if (isNonNull(cached)) {
			return cached;
		} else {
			const contractInstance = web3.eth.contract(config.contracts.KittyItemToken.abi).at(itemAddress);
			items[itemAddress] = contractInstance;
			return contractInstance;
		}
	}

	function getMarketContract() {
		const cached = marketContract;
		if (isNonNull(cached)) {
			return cached;
		} else {
			const contractInstance = web3.eth.contract(
				config.contracts.KittyItemMarket.abi
			).at(config.marketplaceAddress);
			marketContract = contractInstance;
			return contractInstance;
		}
	}

	export function account() {
		return web3.eth.accounts[0];
	}

	export async function balance(tokenAddress: string) {
		return new Promise((resolve, reject) => {
			getItemContract(tokenAddress).balanceOf.call(web3.eth.accounts[0], (err, result) => {
				if (isNull(err)) {
					resolve(result.toNumber());
				} else {
					reject(err);
				}
			});
		});
	}

	export async function giftItem(tokenAddress: string, recipient: string) {
		return new Promise((resolve, reject) => {
			getItemContract(tokenAddress).transfer(recipient, 1, (err, result) => {
				if (isNull(err)) {
					resolve(result);
				} else {
					reject(err);
				}
			});
		});
	}

	export async function remaining(tokenAddress: string) {
		return new Promise((resolve, reject) => {
			getItemContract(tokenAddress).balanceOf.call(config.marketplaceAddress, (err, result) => {
				if (isNull(err)) {
					resolve(result.toNumber());
				} else {
					reject(err);
				}
			});
		});
	}

	/** Returns the price of an item in wei as a BigNumber */
	export async function price(tokenAddress: string) {
		return new Promise((resolve, reject) => {
			getItemContract(tokenAddress).name.call(async (err, result) => {
				if (isNull(err)) {
					const market = getMarketContract();
					market.getItem(result, (getItemErr, itemResult) => {
						if (isNull(err)) {
							resolve(itemResult[1]);
						} else {
							reject(err);
						}
					});
				} else {
					reject(err);
				}
			});
		});
	}

	/** DEV: Returns the owner of a kitty according to the KittyCoreExample */
	export async function setKittyCoreOwner(kittyId: number): Promise <any> {
		return new Promise((resolve, reject) => {
			const kittyCore = web3.eth.contract(config.contracts.KittyCoreExample.abi).at(config.kittyCoreAddress);
			kittyCore.setOwnerOf(kittyId, web3.eth.accounts[0], (err, result: boolean) => {
				if (isNull(err)) {
					log(`Kitty ${kittyId} owner set to ${web3.eth.accounts[0]}`);
					resolve(result);
				} else {
					logError(err);
					reject(err);
				}
			});
		});
	}

	export async function resetKittyCoreOwner(kittyId: number): Promise <any> {
		return new Promise((resolve, reject) => {
			const kittyCore = web3.eth.contract(config.contracts.KittyCoreExample.abi).at(config.kittyCoreAddress);
			kittyCore.setOwnerOf(kittyId, '0x0000000000000000000000000000000000000000', (err, result: boolean) => {
				if (isNull(err)) {
					log(`Kitty ${kittyId} owner set to 0`);
					resolve(result);
				} else {
					logError(err);
					reject(err);
				}
			});
		});
	}

	/** DEV: Returns the owner of a kitty according to the KittyCoreExample */
	export async function kittyCoreOwner(kittyId: number): Promise <any> {
		return new Promise((resolve, reject) => {
			const kittyCore = web3.eth.contract(config.contracts.KittyCoreExample.abi).at(config.kittyCoreAddress);
			kittyCore.ownerOf(kittyId, (err, result) => {
				if (isNull(err)) {
					resolve(result);
				} else {
					logError(err);
					reject(err);
				}
			});
		});
	}

	export async function cachedKittyItems(kittyIds) {
		const url = `${config.apiEndpoint}/getKittyStickers?kitties=${kittyIds.join(',')}`;
		const response = await axios.get(url, { headers: { 'Access-Control-Allow-Origin': '*'}});
		return response.data;
	}
}
