const exceptions = {
  unauthorized: {
    errors: {
      summary: 'Incorrect username or password.',
    },
  },
  tokenBlacklisted: 'It seems that you have logged out. You need to login again.',
  tokenNotFound: 'Token not found in request. You need to send token with this request.',
  userNotFound: 'User not found in payload. You need to send the user with this request',
  dbUserNotFound: 'User not found in database.',
  internalError: 'Internal error.',
};

module.exports = exceptions;
