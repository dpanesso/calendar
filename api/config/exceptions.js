const exceptions = {
  unauthorized: {
    errors: {
      summary: 'Incorrect username or password.',
    },
  },
  tokenBlacklisted: 'It seems that you have logged out. You need to login again.',
  tokenNotFound: 'Token not found in request. You need to send token with this request.',
  userEventsNotFound: 'Events not found in payload. You need to send the user events with this request',
  dbUserNotFound: 'User not found in database.',
  internalError: 'Internal error.',
  errorUpdateUser: 'There was an error while saving your events. Please try again later.',
};

module.exports = exceptions;
