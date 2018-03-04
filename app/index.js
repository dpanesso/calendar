const express = require('express');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();
// log requests in the console
app.use(morgan('dev'));
// Helmet is a collection of 12 middleware to help set some security headers.
app.use(helmet());

app.use(express.static(path.join(__dirname, './build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});

app.listen(3000);

console.log('App running on port 3000');

module.exports = app;
