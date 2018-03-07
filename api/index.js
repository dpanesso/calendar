const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const routes = require('./routes');
const config = require('./config');


const app = express();
// log requests in the console and filesystem
app.use(morgan('dev'));
app.use(morgan('dev', {
  stream: fs.createWriteStream(path.join(__dirname, './log/access.log'), { flags: 'a' }),
}));
// Helmet is a collection of 12 middleware to help set some security headers.
app.use(helmet());
// enable cross origin requests
app.use(cors());
// tell the app to parse HTTP body messages
app.use(bodyParser.json());

// routing
app.use(routes);

app.listen(config.api.port);

console.log(`API running on port ${config.api.port}`);

module.exports = app;
