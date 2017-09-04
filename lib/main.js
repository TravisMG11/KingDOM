import DOMNodeCollection from "./dom_node_collection";

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
        return new DOMNodeCollection(selector);
      }
      break;
    default:
      console.log(selector);
  }
};

const getElementsFromDom = selector => {
  const elements = document.querySelectorAll(selector);
  const elements_array = Array.from(elements);
  return new DOMNodeCollection(elements_array);
};

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
};

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
