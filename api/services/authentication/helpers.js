// @flow
const validator = require('validator');
const { compareHash } = require('../../utils/encrypt');
const { getUserById } = require('../database/queries');

// regexp messing with eslint
/* eslint no-useless-escape: "off" */

const isValidEmail = (email: string): Promise<boolean> => new Promise((resolve, reject) => {
  let isValid = true;
  if (!validator.isEmail(email)) {
    isValid = false;
    resolve(isValid);
  }
  getUserById(email)
    .then((reply) => {
      if (reply !== null) isValid = false;
      resolve(isValid);
    })
    .catch((err) => {
      reject(err);
    });
});

const validPassword = (user: Object, formPassword: string) => {
  const dbPassword = user.HASHpwd;
  return compareHash(formPassword, dbPassword);
};

const isFormatPasswordValid = (password: string) => {
/*
            /^
              (?=.*\d)          // should contain at least one digit
              (?=.*[a-z])       // should contain at least one lower case
              (?=.*[A-Z])       // should contain at least one upper case
              [a-zA-Z0-9]{8,}   // should contain at least 8 from the mentioned characters
            $/
*/
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  return re.test(password);
};

module.exports = {
  isFormatPasswordValid,
  isValidEmail,
  validPassword,
};
