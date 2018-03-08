const express = require('express');
const {
  validateToken,
  blacklistToken,
  updateUserEvents,
} = require('../services/authentication/middleware');
const messages = require('../config/messages');

const router = new express.Router();

router.post(
  '/logout',
  validateToken,
  blacklistToken,
  (req, res) => {
    res.status(200).send({ success: messages.successLogOut }).end();
  },
);

router.post(
  '/user',
  validateToken,
  updateUserEvents,
  (req, res) => {
    res.status(200).send({ success: messages.successLogOut }).end();
  },
);

module.exports = router;
