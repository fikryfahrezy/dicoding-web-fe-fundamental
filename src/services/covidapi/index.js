/**
 * @typedef Case
 * @type {object}
 * @property {string} provinceState
 * @property {string} countryRegion
 * @property {string} lastUpdate
 * @property {number} confirmed
 * @property {number} deaths
 * @property {number} recovered
 */
import ky from 'ky';

const COVID_API_URL = process.env.COVID_API;

/**
 * @returns {Promise<{value: string, link: string}[]>}
 */
export const getCovidApi = async () => {
  const data = await ky.get(`${COVID_API_URL}`).json();
  const { confirmed, recovered, deaths } = data;
  const result = [
    {
      value: 'Confirmed',
      link: confirmed.detail,
    },
    {
      value: 'Recovered',
      link: recovered.detail,
    },
    {
      value: 'Deaths',
      link: deaths.detail,
    },
  ];

  return result;
};

/**
 * @param {string} date
 * @returns {Promise<Case[]>}
 */
export const getDaily = async (date) => {
  const data = await ky.get(`${COVID_API_URL}/daily/${date}`).json();

  const result = data.map(
    ({ provinceState, countryRegion, lastUpdate, confirmed, deaths, recovered }) => ({
      provinceState,
      countryRegion,
      lastUpdate,
      confirmed: Number(confirmed),
      deaths: Number(deaths),
      recovered: Number(recovered),
    }),
  );

  return result;
};

/**
 * @returns {Promise<Case[]>}
 */
export const getConfirmed = async () => {
  const data = await ky.get(`${COVID_API_URL}/confirmed`).json();

  const result = data.map(
    ({ provinceState, countryRegion, lastUpdate, confirmed, deaths, recovered }) => ({
      provinceState,
      countryRegion,
      confirmed,
      deaths,
      recovered: recovered ?? 0,
      lastUpdate: new Date(lastUpdate),
    }),
  );

  return result;
};

/**
 * @returns {Promise<Case[]>}
 */
export const getRecovered = async () => {
  const data = await ky.get(`${COVID_API_URL}/recovered`).json();

  return data;
};

/**
 * @returns {Promise<Case[]>}
 */
export const getDeaths = async () => {
  const data = await ky.get(`${COVID_API_URL}/deaths`).json();

  const result = data.map(
    ({ provinceState, countryRegion, lastUpdate, confirmed, deaths, recovered }) => ({
      provinceState,
      countryRegion,
      confirmed,
      deaths,
      recovered: recovered ?? 0,
      lastUpdate: new Date(lastUpdate),
    }),
  );

  return result;
};

/**
 * @param {string} country
 * @returns {Promise<Case[]>}
 */
export const getCountryDetail = async (country) => {
  const data = await ky.get(`${COVID_API_URL}/countries/${country}`).json();
  const { confirmed, recovered, deaths, lastUpdate } = data;

  const result = [
    {
      lastUpdate,
      provinceState: country,
      countryRegion: country,
      confirmed: confirmed.value,
      recovered: recovered.value,
      deaths: deaths.value,
    },
  ];

  return result;
};
