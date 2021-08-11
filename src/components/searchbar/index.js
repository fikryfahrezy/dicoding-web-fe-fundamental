class SearchBar extends HTMLElement {
  constructor() {
    super();
    this.inputId = 'search-input';
  }

  connectedCallback() {
    this.render();
  }

  get value() {
    return this.getElementById(this.inputId).value;
  }

  render() {
    const input = document.createElement('input');

    input.setAttribute('id', this.inputId);
    input.type = 'text';
    input.placeholder = 'Search';

    this.appendChild(input);
  }
}

customElements.define('search-bar', SearchBar);
