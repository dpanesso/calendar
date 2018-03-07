const getUserbyId = require('../database/queries/getUserData');
const { validPassword } = require('./formValidationHelpers');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const exceptions = require('../../config/exceptions');


module.exports.verifyUser = (req, res, next) => {
  const { body } = req;
  console.log(exceptions);
  getUserbyId(body.email).then((user) => {
    //  Validate user format
    if (!user) {
      return res.status(401).send(exceptions.unauthorized);
    }

    if (!validPassword(user, body.password)) {
      return res.status(401).send(exceptions.unauthorized);
    }
    res.user = user;
    next();
  }).catch((e) => {
    throw new Error(e.message);
  });
};

module.exports.generateToken = (req, res, next) => {
  jwt.sign({
    auth: 'calendar',
    agent: req.headers['user-agent'],
    exp: Math.floor(new Date().getTime() / 1000) + (7 * 24 * 60 * 60), // in seconds!
  }, config.jwt.passphrase, (err, token) => {
    if (err) {
      throw new Error(err.message);
    }
    res.token = token;
    next();
  });
};

module.exports.validateToken = (req, res, next) => {
  if (res.token) {
    next();
  } else {
    throw new Error('Invalid Token!');
  }
};

module.exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  // TODO - add if token not in blacklist
  jwt.verify(token, config.jwt.passphrase, (err, decoded) => {
    if (err) {
      return res.status(401).send();
    }
    next();
  });
};

module.exports.logout = (req, res, next) => {
  if (req.token) {
    // TODO - implement token blacklist
    next();
  } else {
    throw new Error('Token not found!');
  }
};
