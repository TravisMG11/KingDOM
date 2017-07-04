import DOMNodeCollection from "./dom_node_collection";

window.$l = selector => {
  let elementList;
  switch(typeof selector) {
    case 'string':
      elementList = document.querySelectorAll(selector);
      // return Array.from(elementList);
      return new DOMNodeCollection(Array.from(elementList));
    case 'object':
      if (selector instanceof HTMLElement) {
        return new DOMNodeCollection(selector);
      }
      break;
    default:
      console.log(selector)
  }
};

getElementsFromDom = selector => {
  const elements = document.querySelectorAll(selector);
  const elements_array = Array.from(elements);
  return new DOMNodeCollection(elements_array);
}

const _docReadyCallbacks = [];
let _docReady = false;

document.addEventListener('DOMContentLoaded', () => {
  _docReady = true;
  _docReadyCallbacks.forEach( func => func() );
});
