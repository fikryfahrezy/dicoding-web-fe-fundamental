class CaseItem extends HTMLElement {
  set case(caseItem) {
    this.caseItem = caseItem;
    this.render();
  }

  render() {
    const { provinceState, countryRegion, lastUpdate, confirmed, deaths, recovered } =
      this.caseItem;

    const div = document.createElement('div');

    this.appendChild(div);
    div.classList.add('card');

    const divTop = document.createElement('div');

    div.appendChild(divTop);

    const country = document.createElement('span');

    divTop.appendChild(country);
    country.classList.add('country-badge');
    country.textContent = countryRegion;

    const date = document.createElement('p');

    divTop.appendChild(date);
    date.classList.add('date');
    date.textContent = lastUpdate;

    const province = document.createElement('h2');

    div.appendChild(province);
    province.classList.add('province');
    province.textContent = provinceState;

    const confirmedLabel = document.createElement('p');

    div.appendChild(confirmedLabel);
    confirmedLabel.classList.add('card-label');
    confirmedLabel.textContent = 'Confirmed';

    const confirmedValue = document.createElement('h2');

    div.appendChild(confirmedValue);
    confirmedValue.classList.add('card-value', 'blue');
    confirmedValue.textContent = confirmed;

    const recoveredLabel = document.createElement('p');

    div.appendChild(recoveredLabel);
    recoveredLabel.classList.add('card-label');
    recoveredLabel.textContent = 'Recovered';

    const recoveredValue = document.createElement('p');

    div.appendChild(recoveredValue);
    recoveredValue.classList.add('card-value', 'green');
    recoveredValue.textContent = recovered;

    const deathsLabel = document.createElement('p');

    div.appendChild(deathsLabel);
    deathsLabel.classList.add('card-label');
    deathsLabel.textContent = 'Deaths';

    const deathsValue = document.createElement('p');

    div.appendChild(deathsValue);
    deathsValue.classList.add('card-value', 'red');
    deathsValue.textContent = deaths;
  }
}

customElements.define('case-item', CaseItem);
