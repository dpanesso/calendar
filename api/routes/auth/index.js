const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const { processSignupForm } = require('./processForm');
const client = require('../../redis/redisClient');
const { validPassword } = require('../../redis/auth/formValidationHelpers');
const getUserbyId = require('../../redis/auth/getUserData');

const router = new express.Router();

// const { ExtractJwt } = require('passport-jwt');
// const JwtStrategy = require('passport-jwt').Strategy;
//
// const jwtOptions = {};
// jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// jwtOptions.secretOrKey = 'tasmanianDevil';
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

// const strategy = new JwtStrategy(jwtOptions, (jwt_payload, done) => {
//   console.log('payload received', jwt_payload);
//   const { email } = jwt_payload;
//   // usually this would be a database call:
//   client.hgetall(`user:${email}`, (err, user) => {
//     console.log('-----------------DB REQUEST-------------------');
//     if (err) console.log(err);
//     if (!user) {
//       return done(null, false, { message: 'Incorrect username.' });
//     }
//     return done(null, user);
//   });
// });
//
// passport.use(strategy);

// Authentication middleware
passport.use('local', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  (req, username, password, done) => {
    client.hgetall(`user:${username}`, (err, user) => {
      console.log('-----------------DB REQUEST-------------------');
      console.log(req.session);
      if (err) console.log(err);
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!validPassword(user, password)) {
        console.log('Incorrect password.');
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  },
));

passport.serializeUser((user, done) => {
  console.log('||||||||||||||||||||||||||| BEGIN SERIALIZE ||||||||||||||||||');
  console.log(user);
  done(null, user.email);
});

passport.deserializeUser((email, done) => {
  console.log('||||||||||||||||||||||||||| BEGIN DE-SERIALIZE ||||||||||||||||||');
  getUserbyId(email).then((err, user) => {
    done(err, user);
  });
});

// TODO - split those two routes into 2 seperate files
router.post('/signup', (req, res) => {
  processSignupForm(req.body).then((result) => {
    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.errors,
      });
    }

    return res.status(200).send({}).end();
  });
});

// router.post('/login', (req, res) => {
//   const { email, password } = req.body;
//   client.hgetall(`user:${email}`, (err, user) => {
//     console.log('-----------------DB REQUEST-------------------');
//     if (err) console.log(err);
//     if (!user) {
//       return res.status(401).send({ message: 'no such user found' }).end();
//     }
//     if (!validPassword(user, password)) {
//       console.log('Incorrect password.');
//       return res.status(401).send({ message: 'passwords did not match' }).end();
//     }
//     const payload = { email: user.email };
//     const token = jwt.sign(payload, jwtOptions.secretOrKey);
//     return res.status(200).send({ message: 'ok', token }).end();
//   });
// });

router.post(
  '/login',
  passport.authenticate('local'),
  (req, res) => {
    console.log('||||||||||||||||||||||||| BEGIN MY RESPONSE |||||||||||||||||||||||');
    console.log(req.session);
    console.log('||||||||||||||||||||||||| END MY RESPONSE |||||||||||||||||||||||');
    res.cookie('access_token', 'my access token', {
      maxAge: 60 * 60 * 24 * 365 * 10,
      httpOnly: true,
    });
    res.status(200).send({}).end();
  },
);


module.exports = router;
