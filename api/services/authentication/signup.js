// @flow
const { isValidEmail, isFormatPasswordValid } = require('./helpers');
const { createUser } = require('../database/queries');

/**
 * Validate and process the sign up form
 */
const processSignupForm = (payload: Object): Promise<Object> => new Promise((resolve) => {
  const errors = {};
  let isFormValid = true;
  const {
    email,
    password,
    confirmPassword,
    username,
  } = payload;
  isValidEmail(email)
    .then((emailValid) => {
      if (!payload || typeof email !== 'string' || !emailValid) {
        isFormValid = false;
        errors.email = 'Email is invalid or already taken.';
      }

      if (!payload || typeof password !== 'string' || !isFormatPasswordValid(password)) {
        isFormValid = false;
        errors.password = 'Use at least 8 characters, 1 number, 1 upper and 1 lowercase';
      }

      if (!payload || typeof confirmPassword !== 'string' || confirmPassword !== password) {
        isFormValid = false;
        errors.confirmPassword = 'Passwords don\'t match';
      }

      if (!payload || typeof username !== 'string' || username.trim().length === 0) {
        isFormValid = false;
        errors.username = 'Please provide your name.';
      }

      if (!isFormValid) {
        errors.summary = 'Check the form for errors.';
      } else {
        createUser(username, email, password);
      }

      const result = {
        success: isFormValid,
        errors,
      };
      resolve(result);
    })
    .catch((e) => {
      throw new Error(e.message);
    });
});

module.exports = processSignupForm;
