// @flow
const { encrypt, encryptSHA } = require('../../utils/encrypt');
const client = require('../redisClient');
const redis = require('redis');

const createUser = (username: string, email: string, password: string) => {
  const SHApwd = encryptSHA(password, email);
  const HASHpwd = encrypt(SHApwd);
  client.hmset(`user:${email}`, 'HASHpwd', HASHpwd, 'email', email, 'username', username, redis.print);
  client.hgetall(`user:${email}`, (err, obj) => console.log(obj));
};

module.exports = createUser;
