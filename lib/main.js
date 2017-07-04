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
