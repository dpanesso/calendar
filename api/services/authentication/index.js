const passport = require('passport');
const localStrategy = require('./local-strategy');
const getUserbyId = require('../database/queries/getUserData');

// We can add as many strategies as we want
passport.use(localStrategy());

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

module.exports = passport;
