// @flow
const client = require('../redisClient');

// TODO - see why flow is not happy with this type
// type objType = {
//   key: {
//     email: string,
//     HASHpwd: string,
//     username: string,
//   }
// };

const getUserbyId = (email: string): Promise<any> => new Promise((resolve) => {
  client.hgetall(`user:${email}`, (err, obj) => {
    resolve(obj);
  });
});

module.exports = getUserbyId;
