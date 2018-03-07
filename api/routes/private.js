const express = require('express');
const {
  validateToken,
  blacklistToken,
} = require('../services/authentication/middleware');

const router = new express.Router();

router.post(
  '/logout',
  validateToken,
  blacklistToken,
  (req, res) => res.status(200).send({
    message: 'user session successfully removed',
  }).end(),
);

module.exports = router;
