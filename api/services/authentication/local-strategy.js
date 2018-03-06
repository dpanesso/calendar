const getUserbyId = require('../database/queries/getUserData');
const { validPassword } = require('./formValidationHelpers');
const jwt = require('jsonwebtoken');

module.exports.verifyUser = (req, res, next) => {
  const { body } = req;
  getUserbyId(body.email).then((user) => {
    //  Validate user format
    if (!user) {
      throw new Error('Invalid user!');
    }

    if (!validPassword(user, body.password)) {
      throw new Error('Incorrect password!');
    }
    res.HASHpwd = user.HASHpwd;
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
  }, res.HASHpwd, (err, token) => {
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
  let token = req.headers.authorization;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.writeHead(401, {'content-type': 'text/html'});
    }
    next();
  });
};
