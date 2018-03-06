// @flow
const bcrypt = require('bcryptjs');
const sha256 = require('sha256');

const encryptSHA = (password: string, email: string) => sha256(password + email);

const encrypt = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const compareHash = (password: string, hash: string) => bcrypt.compareSync(password, hash);


module.exports = {
  encryptSHA,
  encrypt,
  compareHash,
};
