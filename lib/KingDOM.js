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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class DOMNodeCollection {
  constructor(elements) {
    this.elements = elements;
  }

  each(callback) {
    this.elements.forEach(callback);
  }

  html(string) {
    if (typeof html === "string") {
      this.each(element => element.innerHTML = html);
    } else {
      if (this.elements.length > 0) {
        return this.elements[0].innerHTML;
      }
    }
  }

  empty() {
    this.html('');
  }

  append(child) {
    if (this.elements.length === 0) return;
    if (typeof child === 'object' && !(child instanceof DOMNodeCollection)) {
      child = $l(child);
    }
    if (typeof child === 'string') {
      this.each(element => element.innerHTML += child);
    } else if (child instanceof DOMNodeCollection) {
      this.each(element => {
        child.each(childElement => {
          element.appendChild(childElement.clonedNode(true))
        });
      })
    }

  }

  remove() {
    this.each(element => element.parentElement.removeChild(element));
  }

  attr(key, val) {
    if (typeof val === 'string') {
      this.each( element =>element.setAttribute(key, val) );
    } else {
      return this.elements[0].getAttribute(key);
    }
  }

  // attr(name, value) {
  //   this.elements.each(element => {
  //     element.setAttribute(name, value);
  //   });
  // }


  addClass(name) {
    this.each(element => element.classList.add(name));
    // this.elements.each(element => element.classList.add(name));
  }
  removeClass(name) {
    this.each(element => element.classList.remove(name));
    // this.elements.each(element => element.classList.remove(name));
  }
  toggleClass(name) {
    this.each(element => element.classList.toggle(name));
  }
// traversal
  children() {
    let result = [];
    this.each(el => {
    // this.elements.each(el => {
      // const childElementList = element.children;
      result = result.concat(Array.from(el.children));
    });
    return new DOMNodeCollection(result);
  }

  // parent() {
  //   const result = [];
  //   this.each({ parent } => {
  //     result.visited ? result.push(parent) : parent.visited = true;
  //   })
  //   result.forEach(el => el.visited = false)
  //   return new DOMNodeCollection(result);
  // }
  parent() {
    let result = [];
    this.elements.each(el => {
      result.push(el.parentNode);
    });
    return new DOMNodeCollection(result);
  }

  find(selector) {
    let result = [];
    // this.elements.each(el => {
    this.each(el => {
      const elementList = el.querySelectorAll(selector);
      result = result.concat(Array.from(result));
    });
    return new DOMNodeCollection(result)
    // return result;
  }

  remove() {
    this.elements.each(el => {
      const parent = el.parentNode;
      parent.removeChild(el);
  });
    this.elements = [];
  }

  // on(type, callback) {
  //   this.elements.each(el => {
  //     el.addEventListener(type, callback);
  //     el[`myQuery-${type}-listener`] = callback;
  //   });
  // }
  
  on(eventName, callback) {
    this.each(el => {
      el.addEventListener(eventName, callback);
      const eventKey = `jqliteEvents=${eventName}`;
      if (typeof el[eventKey] === 'undefined') {
        el[eventKey] = [];
      }
    })
  }

  off(eventName) {
    this.each(el => {
      const eventKey = `jqliteEvents-${eventName}`;
      if (el[eventKey]) {
        el[eventKey].forEach(callback => {
          el.removeEventListener(eventName, callback);
        });
      }
      el[eventKey] = [];
    });
  }

  // off(type) {
  //   this.elements.each(el => {
  //     let callback = el[`myQuery-${type}-listener`];
  //     el.removeEventListener(type, callback);
  //   });
  // }
}


/* harmony default export */ __webpack_exports__["a"] = (DOMNodeCollection);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom_node_collection__ = __webpack_require__(0);


window.$l = selector => {
  let elementList;
  switch(typeof selector) {
    case 'string':
      // elementList = document.querySelectorAll(selector);
      // return Array.from(elementList);
      // return new DOMNodeCollection(Array.from(elementList));
      return getElementsFromDom(selector);
    case 'object':
      if (selector instanceof HTMLElement) {
        return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection__["a" /* default */](selector);
      }
      break;
    default:
      console.log(selector)
  }
};

const getElementsFromDom = selector => {
  const elements = document.querySelectorAll(selector);
  const elements_array = Array.from(elements);
  return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection__["a" /* default */](elements_array);
}

const _docReadyCallbacks = [];
let _docReady = false;

document.addEventListener('DOMContentLoaded', () => {
  _docReady = true;
  _docReadyCallbacks.forEach( func => func() );
});

$l.extend = (base, ...objs) => {
  objs.forEach( obj => {
    for(let prop in obj) {
      base[prop] = obj[prop];
    }
  });
  return base;
}

$l.ajax = options => {
  const request = new XMLHttpRequest();
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    success: () => {},
    error: () => {},
    data: {},
  };
  options = $l.extend(defaults, options);
  options.method = options.method.toUpperCase();

  if (options.method === "GET"){
    options.url += "?" + toQueryString(options.data);
  }

  request.open(options.method, options.url, true);
  request.onload = e => {
    if (request.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.response);
    }
  };

  request.send(JSON.stringify(options.data));
};

toQueryString = obj => {
  let result = "";
  for(let prop in obj){
    if (obj.hasOwnProperty(prop)){
      result += prop + "=" + obj[prop] + "&";
    }
  }
  return result.substring(0, result.length - 1);
};


/***/ })
/******/ ]);