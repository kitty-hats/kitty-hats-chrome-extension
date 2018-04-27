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
/*!****************************!*\
  !*** ./src/cryptoGoods.js ***!
  \****************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

eval("window._cg=function e(t){if(window===this)return new e(t);var i=this;return i.parent=document.querySelector(t||\"body\"),window._cgMessage&&window.removeEventListener(\"message\",window._cgMessage,!1),window.addEventListener(\"message\",window._cgMessage=function(e){try{var t=JSON.parse(e.data);if(\"_cgcomms\"===t.name)switch(t.action){case\"closed\":i.closed.bind(i)()}}catch(e){}},!1),i},_cg.prototype={open:function(e){return this.iframe=null,this.parent&&(this.iframe=this.parent.querySelector(\"cryptogoods\"),this.iframe||(this.iframe=document.createElement(\"iframe\")),this.iframe.src=location.protocol+\"//\"+\"www.cryptogoods.co\"+\"/embed?product=\"+((e||{}).product||\"\")+\"&payload=\"+JSON.stringify((e||{}).payload||\"\")+\"&token_id=\"+((e||{}).token_id||\"\")+\"&contract_name=\"+((e||{}).contract_name||\"\")+\"&contract_address=\"+((e||{}).contract_address||\"\")+\"&referrer=\"+((e||{}).referrer||\"\")+\"&brand_color=\"+encodeURIComponent((e||{}).brand_color||\"\")+\"&adm_test=\"+encodeURIComponent((e||{}).test||\"\"),this.iframe.style.position=\"fixed\",this.iframe.style.top=0,this.iframe.style.bottom=0,this.iframe.style.left=0,this.iframe.style.right=0,this.iframe.style.width=\"100%\",this.iframe.style.height=\"100%\",this.iframe.style.border=0,this.iframe.style.zIndex=9999,this.iframe.width=\"100%\",this.iframe.height=\"100%\",this.iframe.borderWidth=0,this.parent.appendChild(this.iframe)),this},closed:function(){this.iframe&&setTimeout(function(){this.iframe&&this.iframe.parentNode&&(this.iframe.parentNode.removeChild(this.iframe),this.iframe=null)}.bind(this),750)}},function(e,t){function i(){if(!r){r=!0;for(var e=0;e<n.length;e++)n[e].fn.call(window,n[e].ctx);n=[]}}function o(){\"complete\"===document.readyState&&i()}e=e||\"docReady\",t=t||window;var n=[],r=!1,a=!1;t[e]=function(e,t){if(\"function\"!=typeof e)throw new TypeError(\"callback for docReady(fn) must be a function\");return r?void setTimeout(function(){e(t)},1):(n.push({fn:e,ctx:t}),void(\"complete\"===document.readyState?setTimeout(i,1):a||(document.addEventListener?(document.addEventListener(\"DOMContentLoaded\",i,!1),window.addEventListener(\"load\",i,!1)):(document.attachEvent(\"onreadystatechange\",o),window.attachEvent(\"onload\",i)),a=!0)))}}(\"docReady\",window),docReady(function(){window.CryptoGoods=_cg()});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiOTcuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY3J5cHRvR29vZHMuanM/NjVjMiJdLCJzb3VyY2VzQ29udGVudCI6WyJ3aW5kb3cuX2NnPWZ1bmN0aW9uIGUodCl7aWYod2luZG93PT09dGhpcylyZXR1cm4gbmV3IGUodCk7dmFyIGk9dGhpcztyZXR1cm4gaS5wYXJlbnQ9ZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0fHxcImJvZHlcIiksd2luZG93Ll9jZ01lc3NhZ2UmJndpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLHdpbmRvdy5fY2dNZXNzYWdlLCExKSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIix3aW5kb3cuX2NnTWVzc2FnZT1mdW5jdGlvbihlKXt0cnl7dmFyIHQ9SlNPTi5wYXJzZShlLmRhdGEpO2lmKFwiX2NnY29tbXNcIj09PXQubmFtZSlzd2l0Y2godC5hY3Rpb24pe2Nhc2VcImNsb3NlZFwiOmkuY2xvc2VkLmJpbmQoaSkoKX19Y2F0Y2goZSl7fX0sITEpLGl9LF9jZy5wcm90b3R5cGU9e29wZW46ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuaWZyYW1lPW51bGwsdGhpcy5wYXJlbnQmJih0aGlzLmlmcmFtZT10aGlzLnBhcmVudC5xdWVyeVNlbGVjdG9yKFwiY3J5cHRvZ29vZHNcIiksdGhpcy5pZnJhbWV8fCh0aGlzLmlmcmFtZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaWZyYW1lXCIpKSx0aGlzLmlmcmFtZS5zcmM9bG9jYXRpb24ucHJvdG9jb2wrXCIvL1wiK1wid3d3LmNyeXB0b2dvb2RzLmNvXCIrXCIvZW1iZWQ/cHJvZHVjdD1cIisoKGV8fHt9KS5wcm9kdWN0fHxcIlwiKStcIiZwYXlsb2FkPVwiK0pTT04uc3RyaW5naWZ5KChlfHx7fSkucGF5bG9hZHx8XCJcIikrXCImdG9rZW5faWQ9XCIrKChlfHx7fSkudG9rZW5faWR8fFwiXCIpK1wiJmNvbnRyYWN0X25hbWU9XCIrKChlfHx7fSkuY29udHJhY3RfbmFtZXx8XCJcIikrXCImY29udHJhY3RfYWRkcmVzcz1cIisoKGV8fHt9KS5jb250cmFjdF9hZGRyZXNzfHxcIlwiKStcIiZyZWZlcnJlcj1cIisoKGV8fHt9KS5yZWZlcnJlcnx8XCJcIikrXCImYnJhbmRfY29sb3I9XCIrZW5jb2RlVVJJQ29tcG9uZW50KChlfHx7fSkuYnJhbmRfY29sb3J8fFwiXCIpK1wiJmFkbV90ZXN0PVwiK2VuY29kZVVSSUNvbXBvbmVudCgoZXx8e30pLnRlc3R8fFwiXCIpLHRoaXMuaWZyYW1lLnN0eWxlLnBvc2l0aW9uPVwiZml4ZWRcIix0aGlzLmlmcmFtZS5zdHlsZS50b3A9MCx0aGlzLmlmcmFtZS5zdHlsZS5ib3R0b209MCx0aGlzLmlmcmFtZS5zdHlsZS5sZWZ0PTAsdGhpcy5pZnJhbWUuc3R5bGUucmlnaHQ9MCx0aGlzLmlmcmFtZS5zdHlsZS53aWR0aD1cIjEwMCVcIix0aGlzLmlmcmFtZS5zdHlsZS5oZWlnaHQ9XCIxMDAlXCIsdGhpcy5pZnJhbWUuc3R5bGUuYm9yZGVyPTAsdGhpcy5pZnJhbWUuc3R5bGUuekluZGV4PTk5OTksdGhpcy5pZnJhbWUud2lkdGg9XCIxMDAlXCIsdGhpcy5pZnJhbWUuaGVpZ2h0PVwiMTAwJVwiLHRoaXMuaWZyYW1lLmJvcmRlcldpZHRoPTAsdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5pZnJhbWUpKSx0aGlzfSxjbG9zZWQ6ZnVuY3Rpb24oKXt0aGlzLmlmcmFtZSYmc2V0VGltZW91dChmdW5jdGlvbigpe3RoaXMuaWZyYW1lJiZ0aGlzLmlmcmFtZS5wYXJlbnROb2RlJiYodGhpcy5pZnJhbWUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmlmcmFtZSksdGhpcy5pZnJhbWU9bnVsbCl9LmJpbmQodGhpcyksNzUwKX19LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gaSgpe2lmKCFyKXtyPSEwO2Zvcih2YXIgZT0wO2U8bi5sZW5ndGg7ZSsrKW5bZV0uZm4uY2FsbCh3aW5kb3csbltlXS5jdHgpO249W119fWZ1bmN0aW9uIG8oKXtcImNvbXBsZXRlXCI9PT1kb2N1bWVudC5yZWFkeVN0YXRlJiZpKCl9ZT1lfHxcImRvY1JlYWR5XCIsdD10fHx3aW5kb3c7dmFyIG49W10scj0hMSxhPSExO3RbZV09ZnVuY3Rpb24oZSx0KXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBlKXRocm93IG5ldyBUeXBlRXJyb3IoXCJjYWxsYmFjayBmb3IgZG9jUmVhZHkoZm4pIG11c3QgYmUgYSBmdW5jdGlvblwiKTtyZXR1cm4gcj92b2lkIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtlKHQpfSwxKToobi5wdXNoKHtmbjplLGN0eDp0fSksdm9pZChcImNvbXBsZXRlXCI9PT1kb2N1bWVudC5yZWFkeVN0YXRlP3NldFRpbWVvdXQoaSwxKTphfHwoZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcj8oZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIixpLCExKSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIixpLCExKSk6KGRvY3VtZW50LmF0dGFjaEV2ZW50KFwib25yZWFkeXN0YXRlY2hhbmdlXCIsbyksd2luZG93LmF0dGFjaEV2ZW50KFwib25sb2FkXCIsaSkpLGE9ITApKSl9fShcImRvY1JlYWR5XCIsd2luZG93KSxkb2NSZWFkeShmdW5jdGlvbigpe3dpbmRvdy5DcnlwdG9Hb29kcz1fY2coKX0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY3J5cHRvR29vZHMuanNcbi8vIG1vZHVsZSBpZCA9IDk3XG4vLyBtb2R1bGUgY2h1bmtzID0gMiJdLCJtYXBwaW5ncyI6IkFBQUE7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///97\n");

/***/ })

/******/ });