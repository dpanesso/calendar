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
  '/update/user/events',
  validateToken,
  updateUserEvents,
  (req, res) => {
    res.status(200).send({ success: messages.successUserEventsUpdate }).end();
  },
);

module.exports = router;
