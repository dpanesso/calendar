// @flow
const client = require('./redisClient');
const redis = require('redis');
const { encrypt, encryptSHA } = require('../../utils/encrypt');

const createUser = (username: string, email: string, password: string) => {
  const SHApwd = encryptSHA(password, email);
  const HASHpwd = encrypt(SHApwd);
  client.hmset(`user:${email}`, 'HASHpwd', HASHpwd, 'email', email, 'username', username, redis.print);
  client.hgetall(`user:${email}`, (err, obj) => console.log(obj));
};

const getUserById = (email: string): Promise<any> => new Promise((resolve) => {
  client.hgetall(`user:${email}`, (err, obj) => {
    resolve(obj);
  });
});

const addTokenToBlacklist = (token: string) => {
  client.rpush('token_blacklist', token, redis.print);
};

module.exports = {
  createUser,
  getUserById,
  addTokenToBlacklist,
};
