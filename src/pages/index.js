import '../components/navbar';
import '../components/searchbar';
import '../components/optionlist';
import '../components/caselist';
import {
  getConfirmed,
  getCountryDetail,
  getCovidApi,
  getDaily,
  getDeaths,
  getRecovered,
} from '../services';
import getDate from '../utils';

/**
 * @callback FnBounce
 * @param {string} keyword
 * @returns {void}
 *
 * @param {FnBounce} fn
 * @param {number} timer
 * @return {(e: Event) => void}
 */
const debounce = (fn, timer = 300) => {
  let timeout;

  return (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(e.target.value);
    }, timer);
  };
};

const app = () => {
  const searchBar = document.querySelector('search-bar');
  const searchInput = searchBar.querySelector(`#${searchBar.inputId}`);
  const optionList = document.querySelector('option-list');
  const caseList = document.querySelector('case-list');

  /**
   * @param {string} keyword
   * @returns {void}
   */
  const searchBounce = async (keyword) => {
    try {
      let data = [];

      if (keyword === '') {
        data = await getDaily(getDate());
      } else {
        data = await getCountryDetail(keyword);
      }

      caseList.cases = data;
    } catch (err) {
      caseList.renderError(err.message);
    }
  };

  const getData = async (key) => {
    try {
      let data = [];

      caseList.setLoading();

      switch (key) {
        case 'confirmed':
          data = await getConfirmed();
          break;
        case 'recovered':
          data = await getRecovered();
          break;
        case 'deaths':
          data = await getDeaths();
          break;
        default:
          data = await getDaily(getDate());
      }

      caseList.cases = data;
    } catch (err) {
      caseList.renderError(err.message);
    }
  };

  /**
   * @param {{value: string}[]} data
   * @returns {void}
   */
  const initOptions = (data) => {
    optionList.options = data;

    const buttons = document.querySelectorAll('.button');

    buttons.forEach((button, i) => {
      if (i === 0) button.classList.add('active');

      button.addEventListener('click', (currBtnE) => {
        document.querySelectorAll('.button').forEach((btn) => {
          btn.classList.remove('active');
        });

        currBtnE.target.classList.add('active');

        getData(currBtnE.target.id);
      });
    });
  };

  /**
   * @returns {void}
   */
  const initData = () => {
    getDaily(getDate())
      .then((res) => {
        caseList.cases = res;
      })
      .catch((err) => {
        caseList.renderError(err.message);
      });

    const data = getCovidApi();

    initOptions(data);
  };

  searchInput.addEventListener('keydown', debounce(searchBounce));

  initData();
};

export default app;
