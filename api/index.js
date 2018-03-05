const express = require('express');
const session = require('express-session');
const cors = require('cors');
const initializeRedisData = require('./services/database/initializeRedisData');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const bodyParser = require('body-parser');
const routes = require('./routes');
const config = require('./config');


// fetch historical data from various APIs and initialize REDIS with that data
initializeRedisData();

const app = express();
// log requests in the console
app.use(morgan('dev'));
// Helmet is a collection of 12 middleware to help set some security headers.
app.use(helmet());
// enable cross origin requests
app.use(cors());
// tell the app to parse HTTP body messages
app.use(bodyParser.json());
// Makes it easier to handle cookies from requests
app.use(cookieParser());
// Passport for authentication
app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    expires: new Date(Date.now() + 36000000),
  },
}));
app.use(passport.initialize());
app.use(passport.session());

// routing
app.use(routes);

app.listen(config.port);

console.log(`API running on port ${config.port}`);

module.exports = app;
