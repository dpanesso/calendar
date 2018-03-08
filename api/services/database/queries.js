// @flow
const { encrypt, encryptSHA } = require('../../utils/encrypt');
const client = require('./redisClient');

const createUser = (username: string, email: string, password: string): Promise<any> => new Promise((resolve, reject) => {
  const SHApwd = encryptSHA(password, email);
  const HASHpwd = encrypt(SHApwd);
  client.hmset(`user:${email}`, ['HASHpwd', HASHpwd, 'email', email, 'username', username], (err, reply) => {
    if (err) reject(err);
    resolve(reply);
  });
});

const updateUser = (email: string, userEvents: string): Promise<any> => new Promise((resolve, reject) => {
  client.hmset(`user:${email}`, 'userEvents', userEvents, (err, reply) => {
    if (err) reject(err);
    resolve(reply);
  });
});

const getUserById = (email: string): Promise<any> => new Promise((resolve, reject) => {
  client.hgetall(`user:${email}`, (err, reply) => {
    if (err) reject(err);
    resolve(reply);
  });
});

const addTokenToBlacklist = (token: string): Promise<any> => new Promise((resolve, reject) => {
  client.rpush('token_blacklist', token, (err, reply) => {
    if (err) reject(err);
    resolve(reply);
  });
});

const getTokenBlacklist = (): Promise<any> => new Promise((resolve, reject) => {
  client.lrange('token_blacklist', 0, -1, (err, reply) => {
    if (err) reject(err);
    resolve(reply);
  });
});

const isTokenBlacklisted = (token: string): Promise<any> => new Promise((resolve, reject) => {
  getTokenBlacklist()
    .then((blacklist) => {
      let isBlacklisted = false;
      blacklist.forEach((blackToken) => {
        if (token === blackToken) {
          isBlacklisted = true;
        }
      });
      resolve(isBlacklisted);
    })
    .catch(err => reject(err));
});

module.exports = {
  createUser,
  updateUser,
  getUserById,
  addTokenToBlacklist,
  getTokenBlacklist,
  isTokenBlacklisted,
};
