import './styles/tailwind.css';
import './styles/styles.css';

// eslint-disable-next-line
import init from './index.js';

if (module.hot) {
  module.hot.accept('./index.js', () => {
    init();
  });
}
