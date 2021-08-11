class OptionItem extends HTMLElement {
  set option(optionItem) {
    this.optionItem = optionItem;
    this.render();
  }

  render() {
    const { value, link } = this.optionItem;
    const button = document.createElement('button');

    button.setAttribute('id', 'test');
    button.classList.add('button');
    button.textContent = value;

    this.appendChild(button);
  }
}

customElements.define('option-item', OptionItem);
