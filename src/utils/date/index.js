/**
 * @param {number} currentTime
 * @returns {string}
 */
const getDate = (currentTime = Date.now()) => {
  const date = new Date(currentTime);
  date.setDate(date.getDate() - 2);
  const locale = date.toLocaleDateString('en-US').split('/').join('-');

  return locale;
};

export default getDate;
