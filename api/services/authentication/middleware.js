const { getUserById, isTokenBlacklisted, addTokenToBlacklist } = require('../database/queries');
const { validPassword } = require('./helpers');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const exceptions = require('../../config/exceptions');


const verifyUser = (req, res, next) => {
  const { body } = req;
  getUserById(body.email)
    .then((user) => {
      //  Validate user format
      if (!user) {
        res.status(401).send(exceptions.unauthorized).end();
        return;
      }

      if (!validPassword(user, body.password)) {
        res.status(401).send(exceptions.unauthorized).end();
        return;
      }
      res.user = user;
      next();
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};


const generateToken = (req, res, next) => {
  jwt.sign({
    username: res.user.username,
    exp: Math.floor(new Date().getTime() / 1000) + (7 * 24 * 60 * 60), // in seconds!
  }, config.jwt.passphrase, (err, token) => {
    if (err) {
      throw new Error(err.message);
    }
    res.token = token;
    next();
  });
};


const validateToken = (req, res, next) => { // eslint-disable-line consistent-return
  if (req.headers.authorization && req.headers.authorization.token) {
    const token = req.headers.authorization;
    // Check if token not in blacklistToken
    isTokenBlacklisted(token)
      .then((isBlacklisted) => {
        if (isBlacklisted) {
          res.status(401).send(exceptions.tokenBlacklisted).end();
          return;
        } // if token is not blacklisted, check if it is not expired
        jwt.verify(
          token,
          config.jwt.passphrase,
          (err, decode) => { // eslint-disable-line consistent-return
            if (err) {
              res.status(401).send(exceptions.internalError).end();
              return;
            }
            const currentDate = new Date();
            const tokenExpirationDate = decode.exp;
            if (tokenExpirationDate < currentDate) {
              res.status(401).send(exceptions.expiredToken).end();
              return;
            }
            next();
          },
        );
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  } else {
    res.status(401).send(exceptions.tokenNotFound).end();
  }
};


const blacklistToken = (req, res, next) => {
  const { body } = req;
  if (body.user && body.user.token) {
    const oldToken = body.user.token;
    addTokenToBlacklist(oldToken);
    next();
  } else {
    throw new Error('Token not found!');
  }
};


module.exports = {
  verifyUser,
  generateToken,
  validateToken,
  blacklistToken,
};
