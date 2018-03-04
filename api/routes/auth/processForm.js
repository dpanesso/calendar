// @flow
const { isValidEmail, isFormatPasswordValid } = require('../../redis/auth/formValidationHelpers');
const createUser = require('../../redis/auth/createUser');

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
    });
});

/**
 * Validate and process the login form
 */
const processLoginForm = (payload: Object): Promise<Object> => new Promise((resolve) => {
  const errors = {};
  let isFormValid = true;
  const { email, password } = payload;

  if (!payload || typeof email !== 'string' || email.trim().length === 0) {
    isFormValid = false;
  }

  if (!payload || typeof password !== 'string' || password.trim().length === 0) {
    isFormValid = false;
  }

  if (!isFormValid) {
    errors.summary = 'Incorrect username or password.';
  }

  const result = {
    success: isFormValid,
    errors,
  };
  resolve(result);
});

module.exports = {
  processSignupForm,
  processLoginForm,
};
