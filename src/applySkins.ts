import * as _ from 'lodash';
import { log, logError } from './log';
import { isNonNull } from './utils';

import * as $ from 'jquery';

import { KittyItem } from './KittyItem';

import config from './config';
import { KittyItemManager } from './KittyItemManager';

const dadaItems = _.map(config.categories.dada.items, (f: any) => f.assetUrl );

async function startListener() {
	window.addEventListener('message', (event) => {
		if (event.data && event.data.type === 'skinCats') {
			const elements = getUnskinnedKittyElements();
			if (elements && elements.length > 0) {
				skinElements(elements);
			}
		}
	}, false);
}

function getUnskinnedKittyElements(): Element[] {
	const kittyCards = document.querySelectorAll('.KittyCard-image:not(.skinned)');
	const kittyBanner = document.querySelectorAll('.KittyBanner-image:not(.skinned)');
	return Array.from(kittyCards).concat(Array.from(kittyBanner));
}

async function applySkinsToElement(skins, ele) {

	const srcUrl = $(ele).attr('src');
	const split = srcUrl.split('/');
	const kittyId = parseInt(split[split.length - 1].split('.')[0], 10);
	const isSpecial = split[split.length - 1].split('.')[1] === 'png';
	const isThumbnail = $(ele).parent().hasClass('KittyCard--thumbnail');
	const wrapper = $('<div> </div>');
	let styleSkin;
	let styleDadaArt;
	if (isThumbnail || isSpecial) {
		$(ele).addClass('skinned');
		return;
	}

	if ($(ele).hasClass('KittyBanner-image')) {
		wrapper.attr('id', `skin-wrapper-${kittyId}`);
		wrapper.css('height', 'var(--size-image)')
		.css('width', 'var(--size-image)')
		.css('position', 'relative');

		styleSkin = (skin) => {
			skin.css('position', 'absolute')
			.css('width', 'var(--size-image)')
			.css('height', 'var(--size-image)')
			.css('z-index', '1000')
			.css('top', '0')
			.css('left', '0');
		};

		styleDadaArt = (art) => {
			art.css('position', 'absolute')
			.css('width', '35%')
			.css('z-index', '1000')
			.css('top', '39.2%')
			.css('left', '0.8%');
		};

		$(ele).wrap(wrapper[0]);

	} else {
		// const skin = $(`<img src="${config.appUrl}/${config.categories[1].items[2].assetUrl}">`);
		styleSkin = (skin) => {
			skin.css('position', 'absolute')
			.css('width', 'var(--size-image)')
			.css('height', 'var(--size-image)')
			.css('z-index', '1000')
			.css('top', '50%')
			.css('left', '50%')
			.css('z-index', 2)
			.css('transform', 'translate(-48%,-47%)');
		};

		styleDadaArt = (art) => {
			art.css('position', 'absolute')
			.css('width', '30%')
			.css('z-index', '1000')
			.css('top', '43.5%')
			.css('left', '8.6%');
		};
	}

	let dada;
	for (const s of skins) {
		if (!$(ele).parent().hasClass(`kh-skin-${s.name}`)) {
			styleSkin(s.element);
			if (s.isDada === false) {
				$(ele).parent().addClass(`kh-skin-${s.name}`);
			}
			$($(ele).parent()).append(s.element);
			if (s.isDada === true) {
				dada = s;
			}
		}
	}

	if (isNonNull(dada) && ($(ele).parent().hasClass(`kh-skin-${dada.name}`) === false)) {
		styleDadaArt(dada.art);
		$($(ele).parent()).append(dada.art);
		styleSkin(dada.info);
		$($(ele).parent()).append(dada.info);
		$(ele).parent().addClass(`kh-skin-${dada.name}`);
	}

	$(ele).addClass('skinned');
}

async function skinElements(elements: Element[]) {
	const kittyIds = _.map(elements, (ele) => {
		const srcUrl = $(ele).attr('src');
		const split = srcUrl.split('/');
		const kittyId = parseInt(split[split.length - 1].split('.')[0], 10);
		(ele as any).kittyId = kittyId;
		return kittyId;
	});

	const appliedItems = await KittyItemManager.getKittyItems(kittyIds);
	for (const ele of elements) {
		const skins = _.map(appliedItems[(ele as any).kittyId], (itemName: string) => {
			if (dadaItems.indexOf(itemName) >= 0) {
				return {
					isDada: true,
					name: itemName,
					element: $(`<img src="${config.appUrl}/img/asset/easel.svg">`),
					art: $(`<img src="${config.appUrl}/img/asset/${itemName}.png">`),
					info: $(`<img src="${config.appUrl}/img/asset/${itemName.replace('dada', 'dada-placard')}.svg">`)
				};
			}

			return { name: itemName, element: $(`<img src="${config.appUrl}/img/asset/${itemName}.svg">`)};
		});

		applySkinsToElement(skins, ele);
	}
}

function intialize() {
	startListener();
}

intialize();
