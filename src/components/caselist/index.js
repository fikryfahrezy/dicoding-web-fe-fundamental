import './case';

class CaseList extends HTMLElement {
  set cases(caseList = []) {
    this.caseList = caseList;
    this.render();
  }

  render() {
    this.innerHTML = '';
    this.caseList.forEach((caseItem) => {
      const caseEl = document.createElement('case-item');

      caseEl.case = caseItem;

      this.appendChild(caseEl);
    });
  }
}

customElements.define('case-list', CaseList);
