const { getUserById, addTokenToBlacklist } = require('../database/queries');
const { validPassword } = require('./helpers');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const exceptions = require('../../config/exceptions');


const verifyUser = (req, res, next) => {
  const { body } = req;
  getUserById(body.email)
    .then((user) => { // eslint-disable-line consistent-return
      //  Validate user format
      if (!user) {
        return res.status(401).send(exceptions.unauthorized);
      }

      if (!validPassword(user, body.password)) {
        return res.status(401).send(exceptions.unauthorized);
      }
      res.user = user;
      next();
    })
    .catch((e) => {
      throw new Error(e.message);
    });
};


const generateToken = (req, res, next) => {
  jwt.sign({
    username: res.user.username,
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


const validateToken = (req, res, next) => { // eslint-disable-line consistent-return
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    jwt.verify(
      token,
      config.jwt.passphrase,
      (err, decode) => { // eslint-disable-line consistent-return
        if (err) {
          return res.status(401).send(exceptions.invalidToken).end();
        }
        const currentDate = new Date();
        const tokenExpirationDate = decode.exp;
        if (tokenExpirationDate < currentDate) {
          return res.status(401).send(exceptions.expiredToken).end();
        }
        next();
      },
    );
  } else {
    return res.status(401).send(exceptions.invalidToken).end();
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
