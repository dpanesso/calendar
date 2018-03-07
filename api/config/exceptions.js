const exceptions = {
  unauthorized: {
    errors: {
      summary: 'Incorrect username or password.',
    },
  },
  expiredToken: 'Token expired, please log in.',
  invalidToken: 'Invalid token, please log in.',
};

module.exports = exceptions;
