class NavBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const h1 = document.createElement('h1');

    h1.textContent = 'Covid Cases';
    h1.classList.add('text-3xl', 'font-bold');

    this.appendChild(h1);
  }
}

customElements.define('nav-bar', NavBar);
