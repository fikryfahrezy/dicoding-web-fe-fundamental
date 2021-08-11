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

  const initData = () => {
    Promise.all([
      getCovidApi()
        .then((res) => {
          optionList.options = res;
        })
        .catch((err) => {
          console.log(err);
        }),
      getDaily(getDate())
        .then((res) => {
          caseList.cases = res;
        })
        .catch((err) => {
          console.log(err);
        }),
    ]);
  };

  const searchBounce = (keyword) => {
    if (keyword !== '')
      getCountryDetail(keyword)
        .then((res) => {
          caseList.cases(res);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  // TODO: Not working yet
  const buttons = document.querySelectorAll('.button');

  buttons.forEach((button) => {
    button.addEventListener('click', (currBtnE) => {
      document.querySelectorAll('.button').forEach((btn) => {
        btn.classList.remove('active');
      });

      currBtnE.target.classList.add('active');
    });
  });

  searchInput.addEventListener('keydown', debounce(searchBounce));

  initData();
};

export default app;
