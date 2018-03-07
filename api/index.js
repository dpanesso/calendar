const express = require('express');
const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');
// const fs = require('fs');
// const path = require('path');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const bodyParser = require('body-parser');
const routes = require('./routes');
const config = require('./config');


const app = express();
// log requests in the console and in filesystem
app.use(morgan('dev'));
// app.use(morgan('common', {
//   stream: fs.createWriteStream(path.join(__dirname, '/log/access.log'), { flags: 'a' }),
// }));
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
  secret: config.api.secret,
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

app.listen(config.api.port);

console.log(`API running on port ${config.api.port}`);

module.exports = app;
