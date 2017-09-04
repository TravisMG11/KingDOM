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
          element.appendChild(childElement.clonedNode(true));
        });
      });
    }

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
    return new DOMNodeCollection(result);
    // return result;
  }

  remove() {
    this.elemtns.forEach(element => element.parentElement.removeChild(element));
  }

  // remove() {
  //   this.elements.each(el => {
  //     const parent = el.parentNode;
  //     parent.removeChild(el);
  // });
  //   this.elements = [];
  // }

  on(eventName, callback) {
    this.elements.forEach(el => {
      el.addEventListener(eventName, callback);
      el.eventCallback = callback;
      // el[`myQuery-${type}-listener`] = callback;
    });
    return;
  }


  off(eventName) {
    this.elements.forEach(el => {
      // let callback = el[`myQuery-${type}-listener`];
      let callback = el.eventCallback;
      el.removeEventListener(eventName, callback);
    });
  }
}


export default DOMNodeCollection;
