// @flow
/* eslint max-len: 0 */
const request = require('request');

const getDate = (param: number) => {
  const date = new Date();
  date.setDate(date.getDate() - parseInt(param, 10));
  return date.toISOString().slice(0, 10);
};

// Generic function that fetches the closing bitcoin dates
// for specified time periods from Coindesk public API
function fetchCoindeskBPI(startDate: number, endDate: number, callback: (err: Error, body: string) => void) {
  const start = getDate(startDate);
  const end = getDate(endDate);
  request.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`, (err: Error, raw: string, body: string) => (
    callback(err, body)
  ));
}

module.exports = fetchCoindeskBPI;
