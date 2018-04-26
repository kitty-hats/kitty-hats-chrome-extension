const isNull = (v) => v === undefined || v === null;
const isNonNull = (v) => !isNull(v);

const appUrl = 'https://kittyhats.co';

const log = console.log
const marketPlaceIcon = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve"><path d="M79.4,40.5l-6.2-13.2c-0.3-0.7-1-1.1-1.7-1.1H28.6c-0.7,0-1.4,0.4-1.7,1.1l-6.2,13.2c-0.9,2-0.9,4.3,0.2,6.2  c1,1.8,2.8,3,4.8,3.2c0.2,0,0.5,0,0.7,0c0.4,0,0.8,0,1.2-0.1v23c0,0.6,0.4,1,1,1h42.7c0.6,0,1-0.4,1-1v-23c0.4,0.1,0.8,0.1,1.2,0.1  c0.2,0,0.5,0,0.7,0c2-0.2,3.8-1.4,4.8-3.2C80.2,44.8,80.3,42.5,79.4,40.5z M46.9,71.8h-12V56.5h12V71.8z M70.4,71.8H48.9V55.5  c0-0.6-0.4-1-1-1h-14c-0.6,0-1,0.4-1,1v16.3h-3.3V49.1c1.1-0.6,2-1.5,2.7-2.5c1.2,2,3.4,3.3,5.9,3.3c2.5,0,4.7-1.3,5.9-3.3  c1.2,2,3.4,3.3,5.9,3.3c2.5,0,4.7-1.3,5.9-3.3c1.2,2,3.4,3.3,5.9,3.3c2.5,0,4.7-1.3,5.9-3.3c0.6,1.1,1.6,1.9,2.7,2.5V71.8z   M77.4,45.7c-0.7,1.3-1.9,2.1-3.3,2.2c-0.2,0-0.3,0-0.5,0c-2.4,0-4.4-1.7-4.8-4c-0.1-0.5-0.5-0.9-1.1-0.9s-1,0.4-1.1,0.9  c-0.4,2.3-2.4,4-4.8,4c-2.4,0-4.4-1.7-4.8-4c-0.1-0.5-0.5-0.9-1.1-0.9s-1,0.4-1.1,0.9c-0.4,2.3-2.4,4-4.8,4c-2.4,0-4.4-1.7-4.8-4  c-0.1-0.5-0.5-0.9-1.1-0.9s-1,0.4-1.1,0.9c-0.4,2.3-2.4,4-4.8,4s-4.4-1.7-4.8-4c-0.1-0.5-0.5-0.9-1.1-0.9c-0.5,0-1,0.4-1.1,0.9  c-0.4,2.3-2.4,4-4.8,4c-0.2,0-0.3,0-0.5,0c-1.4-0.1-2.6-0.9-3.3-2.2c-0.8-1.4-0.8-3-0.2-4.4l6.2-13.1l42.7,0l6.2,13.2  C78.2,42.7,78.1,44.4,77.4,45.7z M66.6,54.5H56.1c-0.6,0-1,0.4-1,1v5.4c0,0.6,0.4,1,1,1h10.5c0.6,0,1-0.4,1-1v-5.4  C67.6,55,67.1,54.5,66.6,54.5z M65.6,59.9h-8.5v-3.4h8.5V59.9z"></path></svg>`;
const closeIcon = `<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.1" x="0px" y="0px" viewBox="0 0 823.93427 823.91699" enable-background="new 0 0 2000 2000" xml:space="preserve"><path style="" d="m 776.75678,0 c -12.064,0 -24.124,4.608 -33.345,13.828 L 411.94378,345.27301 80.52575,13.879 c -18.443,-18.441 -48.255,-18.441 -66.695,0 -18.441,18.44 -18.441,48.244 0,66.685 l 331.418,331.39601 -331.418,331.399 c -18.441,18.44 -18.441,48.25 0,66.691 9.198,9.198 21.272,13.817 33.347,13.817 12.073,0 24.15,-4.619 33.348,-13.817 l 331.41803,-331.398 331.468,331.445 c 9.197,9.198 21.271,13.82 33.345,13.82 12.074,0 24.101,-4.622 33.346,-13.82 18.442,-18.441 18.442,-48.247 0,-66.687 l -331.464,-331.446 331.464,-331.44501 c 18.442,-18.441 18.442,-48.25 0,-66.691 C 800.88178,4.608 788.81678,0 776.75678,0 Z" fill="#000000"></path></svg>`;

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

/** Namespaced nonce to throw off the haters and detectors */
// const nonce = _.random(10000, 100000);
let appContainer; // DOM element that will contain the react app.
let appFrameWindow; // Iframe for app;
/**
 * These are important classes that we will use to find the right elements and
 * manipulate the DOM. Creating this mapping will keep this maintainable...
 */
const KittyCSSClasses = {
	BrowsePage: 'BrowsePage',
	BrowseFilterBar: 'BrowseFilterBar',
	KittyCardImage: 'KittyCard-image',
	FilterTab: 'Filter-tab',
	FilterTabs: 'Filter-tabs',
	KittyShareBtn: 'KittyBanner-shareBtn'
}

/**
 * Fired when a mutation in the dom occurs. Can be expensive but will do for now.
 * Use the debounced version since the actual version will be called really fast.
 */
function handleMutation(mutation) {
	log('DOM Mutation handler: ', mutation);
	addLaunchButtonIfPossibleAndNecessary();
	skinCats();
}

const debounceWaitTime = 400;
const debouncedHandleMutation = debounce(handleMutation, debounceWaitTime);

/**
 * Fired when a path change in the URL happens.
 */
function handlePathChangeEvent(event) {
	log('Path change handler: ', window.location.pathname);
	const kittyId = parseInt(window.location.pathname.split('/kitty/')[1], 10);
	appFrameWindow[0].contentWindow.postMessage({ type: 'urlChanged', detail: { kittyId } }, appUrl);
}

async function marketplaceButtonPressed(event) {
	log('Marketplace button pressed: ', window.location.pathname);
	const appContainerId = 'kittyMarketContainer';
	$(`#${appContainerId}`).css('display', 'block');
	const kittyId = parseInt(window.location.pathname.split('/kitty/')[1], 10);
	const dataUrl = `https://api.cryptokitties.co/kitties/${kittyId}`;
    
    $.get(dataUrl, function (data) {
        appFrameWindow[0].contentWindow.postMessage({
            type: 'showApp', detail: { kittyId, meta: data } }, appUrl);
    });
}

/**
 * Add a launch button to launch the cryptokitty. Does just what it says.
 */
function addLaunchButtonIfPossibleAndNecessary() {
	const buttonId = `kittyMarketStart`;
	log('addLaunchButtonIfPossibleAndNecessary', buttonId);
	const element = document.getElementById(`${buttonId}`);
	/** Found it. Dont bother to do anything. */
	if (isNonNull(element)) {
		log(`${buttonId} button found.`);
		return;
	}
	const urlPath = window.location.pathname;
	log(urlPath);

	if (urlPath.indexOf('/marketplace') > -1) {
		return;
	} else if (urlPath.indexOf('/kitty/') > -1) {
		log('Adding launch button to kittypage');
		const shareButton = document.getElementsByClassName(KittyCSSClasses.KittyShareBtn);
		const button = $('<div>')
			.css('height', '40px')
			.css('width', '40px')
			.css('background', 'rgba(255,255,255,0.48)')
			.css('borderRadius', '20px')
			.css('position', 'absolute')
			.css('top', '4.7rem')
			.css('right', '0px')
			.css('cursor', 'pointer')
			.css('transition', 'transform .3s cubic-bezier(.06,.67,.37,.99),-webkit-transform .3s cubic-bezier(.06,.67,.37,.99)')
			.attr('id', buttonId)
			.html(marketPlaceIcon)
			.on('click', marketplaceButtonPressed)
			.mouseenter(function() {
				$(this).css({ transform: 'scale(1.1)' });
			}).mouseleave(function() {
				 $(this).css({ transform: 'scale(1.0)' });
			});
		$(shareButton).parent().append(button);
		log('Added launch button to kittypage');
	}
}

function skinCats() {
	// tslint:disable-next-line:prefer-for-of
	window.postMessage({type: 'skinCats' }, 'https://www.cryptokitties.co');
	// document.dispatchEvent(new CustomEvent('skinCats'));
}

function hideApp() {
	if (appContainer) {
		appContainer.css('display', 'none');
	}
}

/**
 * This function takes care of setting up observers to watch the Cryptokitties React app DOM.
 * It watches DOM mutation events to render the KittyMarket overlay
 */
function initialize() {
	// Shouldn't cast like this but we aint got time.
	MutationObserver = (window).MutationObserver || (window).WebKitMutationObserver;
	const observer = new MutationObserver((mutations, obs) => {
		debouncedHandleMutation(mutations);
	});
	// define what element should be observed by the observer
	// and what types of mutations trigger the callback TODO: optimize this later
	observer.observe(document, {
		childList: true,
		subtree: true
	});

	// Start listening to the browser's history and mutation events. This way we can tell when the
	// Webapp changes and act accordingly.
	// if (history.isHistorySupported()) {
	// 	window.addEventListener('changestate', handlePathChangeEvent);
	// }

	// Inject popup / react app location into app at the body top level
	const appContainerId = 'kittyMarketContainer';
	appContainer = $('<div>').attr('id', appContainerId)
	.css('backgroundColor', '#FFFFFF')
	.css('display', 'none')
	.css('position', 'fixed')
	.css('height', '100%')
	.css('width', '100%')
	.css('top', '0')
	.css('left', '0')
	.css('z-index', 10000);
	$('body').append(appContainer);

	const closeButtonImgUrl = chrome.extension.getURL('img/close.svg');
	const closeButton = $('<div>')
	.css('height', '20px')
	.css('width', '20px')
	.css('position', 'fixed')
	.css('top', '20px')
	.css('right', '20px')
	.css('cursor', 'pointer')
	.html(closeIcon);

	closeButton.click(hideApp);
	appContainer.append(closeButton);
	// tslint:disable-next-line:max-line-length
	const webFrame =  $(`<iframe scrolling="no" seamless="seamless" frameborder="0" allowfullscreen  src="${appUrl}"></iframe>`);
	webFrame.css('height', '100%').css('width', '100%');
	appFrameWindow = webFrame;
	appContainer.append(webFrame);

	// Inject launch button if needed
	// addLaunchButtonIfPossibleAndNecessary();

	// Do all the web3 stuff in this script
	const skinCatsScript = $(`<script src="${appUrl}/dist/applySkins.js">`);
	$(document.body).append(skinCatsScript);

}

// Call the initalize function...
initialize();

