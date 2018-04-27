/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 97);
/******/ })
/************************************************************************/
/******/ ({

/***/ 97:
/***/ (function(module, exports) {

window._cg=function e(t){if(window===this)return new e(t);var i=this;return i.parent=document.querySelector(t||"body"),window._cgMessage&&window.removeEventListener("message",window._cgMessage,!1),window.addEventListener("message",window._cgMessage=function(e){try{var t=JSON.parse(e.data);if("_cgcomms"===t.name)switch(t.action){case"closed":i.closed.bind(i)()}}catch(e){}},!1),i},_cg.prototype={open:function(e){return this.iframe=null,this.parent&&(this.iframe=this.parent.querySelector("cryptogoods"),this.iframe||(this.iframe=document.createElement("iframe")),this.iframe.src=location.protocol+"//"+"www.cryptogoods.co"+"/embed?product="+((e||{}).product||"")+"&payload="+JSON.stringify((e||{}).payload||"")+"&token_id="+((e||{}).token_id||"")+"&contract_name="+((e||{}).contract_name||"")+"&contract_address="+((e||{}).contract_address||"")+"&referrer="+((e||{}).referrer||"")+"&brand_color="+encodeURIComponent((e||{}).brand_color||"")+"&adm_test="+encodeURIComponent((e||{}).test||""),this.iframe.style.position="fixed",this.iframe.style.top=0,this.iframe.style.bottom=0,this.iframe.style.left=0,this.iframe.style.right=0,this.iframe.style.width="100%",this.iframe.style.height="100%",this.iframe.style.border=0,this.iframe.style.zIndex=9999,this.iframe.width="100%",this.iframe.height="100%",this.iframe.borderWidth=0,this.parent.appendChild(this.iframe)),this},closed:function(){this.iframe&&setTimeout(function(){this.iframe&&this.iframe.parentNode&&(this.iframe.parentNode.removeChild(this.iframe),this.iframe=null)}.bind(this),750)}},function(e,t){function i(){if(!r){r=!0;for(var e=0;e<n.length;e++)n[e].fn.call(window,n[e].ctx);n=[]}}function o(){"complete"===document.readyState&&i()}e=e||"docReady",t=t||window;var n=[],r=!1,a=!1;t[e]=function(e,t){if("function"!=typeof e)throw new TypeError("callback for docReady(fn) must be a function");return r?void setTimeout(function(){e(t)},1):(n.push({fn:e,ctx:t}),void("complete"===document.readyState?setTimeout(i,1):a||(document.addEventListener?(document.addEventListener("DOMContentLoaded",i,!1),window.addEventListener("load",i,!1)):(document.attachEvent("onreadystatechange",o),window.attachEvent("onload",i)),a=!0)))}}("docReady",window),docReady(function(){window.CryptoGoods=_cg()});


/***/ })

/******/ });
//# sourceMappingURL=cryptoGoods.js.map