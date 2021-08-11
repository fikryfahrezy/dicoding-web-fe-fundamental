import './option';

class OptionList extends HTMLElement {
  set options(optionList = []) {
    this.optionsList = optionList;
    this.render();
  }

  render() {
    this.optionsList.forEach((option) => {
      const optionItem = document.createElement('option-item');

      optionItem.option = option;

      this.appendChild(optionItem);
    });
  }
}

customElements.define('option-list', OptionList);
