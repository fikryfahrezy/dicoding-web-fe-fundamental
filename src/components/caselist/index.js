import './case';

class CaseList extends HTMLElement {
  set cases(caseList = []) {
    this.caseList = caseList;
    this.render();
  }

  setLoading() {
    this.innerHTML = '';

    const h2 = document.createElement('h2');

    h2.textContent = 'Loading';

    this.classList.add('ungrid');
    this.appendChild(h2);
  }

  renderError(message) {
    this.innerHTML = '';

    const h2 = document.createElement('h2');

    h2.textContent = message;

    this.classList.add('ungrid');
    this.appendChild(h2);
  }

  render() {
    this.innerHTML = '';

    if (this.caseList.length === 0) {
      const h2 = document.createElement('h2');

      h2.textContent = 'No data available';

      this.classList.add('ungrid');
      this.appendChild(h2);

      return;
    }

    this.classList.remove('ungrid');
    this.caseList.forEach((caseItem) => {
      const caseEl = document.createElement('case-item');

      caseEl.case = caseItem;

      this.appendChild(caseEl);
    });
  }
}

customElements.define('case-list', CaseList);
