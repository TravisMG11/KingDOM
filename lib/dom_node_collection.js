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

  append(children) {
    if (this.nodes.length === 0) return;
    if (typeof children === 'object' && !(children instanceof DOMNodeCollection)) {
      children = $l(children);
    }
    if (typeof children === 'string') {
      this.each(element => element.innerHTML += children);
    } else if (children instanceof DOMNodeCollection) {
      this.each(element => {
        children.each(childElement => {
          element.appendChild(childElement.clonedNode(true))
        });
      })
    }

  }

  remove() {
    this.each(element => element.parentElement.removeChild(element));
  }
}

export default DOMNodeCollection;
