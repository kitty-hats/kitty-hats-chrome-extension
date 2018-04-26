import axios from 'axios';
import * as _ from 'lodash';
import config from './config';
import { KittyItem } from './KittyItem';
import { isNonNull, isNull } from './utils';
// tslint:disable-next-line:no-namespace
export namespace KittyItemManager {

	export async function getKittyItems(
		kittyIds: number[], invalidate: boolean = false
	): Promise<{[key: string]: string[]}> {
		if (isNull(kittyIds) || kittyIds.length === 0) {
			throw new Error('kittyIds is undefined or empty');
		}
		const url = `${config.apiEndpoint}/getKittyStickers?kitties=${kittyIds.join(',')}`;
		const response = await axios.get(url, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const result = response.data;
		return result;
	}

	export async function invalidateCache(kittyId: number) {
		const url = `${config.apiEndpoint}/invalidateKittyId?kittyId=${kittyId}`;
		const response = await axios.get(url, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const result = response.data;
		return result;
	}
}
