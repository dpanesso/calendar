const LocalStrategy = require('passport-local').Strategy;
const getUserbyId = require('../database/queries/getUserData');
const { validPassword } = require('./formValidationHelpers');


const localStrategy = () => new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  (req, username, password, done) => {
    getUserbyId(username).then((user) => {
      console.log('-----------------DB REQUEST-------------------');
      console.log(req.session);
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!validPassword(user, password)) {
        console.log('Incorrect password.');
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
    // client.hgetall(`user:${username}`, (err, user) => {
    //   console.log('-----------------DB REQUEST-------------------');
    //   console.log(req.session);
    //   if (err) console.log(err);
    //   if (!user) {
    //     return done(null, false, { message: 'Incorrect username.' });
    //   }
    //   if (!validPassword(user, password)) {
    //     console.log('Incorrect password.');
    //     return done(null, false, { message: 'Incorrect password.' });
    //   }
    //   return done(null, user);
    // });
  },
);

module.exports = localStrategy;
