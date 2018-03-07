const exceptions = {
  unauthorized: {
    errors: {
      summary: 'Incorrect username or password.',
    },
  },
  tokenBlacklisted: 'It seems that you have logged out. Please login again.',
  tokenNotFound: 'Token not found in request. Please send token with this request.',
  internalError: 'Internal error.',
};

module.exports = exceptions;
