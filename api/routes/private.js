const express = require('express');
const {
  validateToken,
  blacklistToken,
} = require('../services/authentication/middleware');
const messages = require('../config/messages');

const router = new express.Router();

router.post(
  '/logout',
  validateToken,
  blacklistToken,
  (req, res) => {
    console.log(messages);
    res.status(200).send({ success: messages.successLogOut }).end();
  },
);
module.exports = router;
