// @flow
const redis = require('redis');

// Create redis client - both in development and in production
const host = process.env.NODE_ENV === 'production' ? { host: 'redis' } : {};
const client = redis.createClient(host);
console.log('Redis running locally...');

// Connect to redis
client.on('connect', () => {
  console.log('Redis connected');
});

client.on('error', (err) => {
  console.log('Redis Error:', err); // errors here
});

module.exports = client;
