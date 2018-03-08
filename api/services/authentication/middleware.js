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
  const { token } = req.body;
  if (token) {
    // Check if token not in blacklistToken
    isTokenBlacklisted(token)
      .then((isBlacklisted) => {
        if (isBlacklisted) {
          console.log(exceptions.tokenBlacklisted);
          res.status(401).send(exceptions.tokenBlacklisted).end();
          return;
        } // if token is not blacklisted, check if it is not expired
        console.log('NOT GOING HERE');
        jwt.verify(
          token,
          config.jwt.passphrase,
          (err, decode) => { // eslint-disable-line consistent-return
            if (err) {
              res.status(401).send(exceptions.internalError).end();
              return;
            }
            const currentDate = Math.floor(new Date().getTime() / 1000);
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
  console.log(body);
  if (body.token) {
    const oldToken = body.token;
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
