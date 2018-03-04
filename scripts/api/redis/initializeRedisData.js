// @flow
const redis = require('redis');
const client = require('./redisClient');
const fetchCoindeskBPI = require('../publicAPIs/coindesk');

const initializeRedisData = () => {
  fetchCoindeskBPI(365, 0, (err, res) => {
    if (err) throw err;
    client.set('coindeskBPI', res, redis.print);
  });
};

module.exports = initializeRedisData;
