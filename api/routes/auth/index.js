const express = require('express');
const { processSignupForm } = require('../../services/authentication/processForm');
const strategy = require('../../services/authentication/local-strategy');

const router = new express.Router();

router.post('/signup', (req, res) => {
  processSignupForm(req.body).then((result) => {
    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.errors,
      });
    }
    return res.status(200).send({}).end();
  });
});

router.post(
  '/login',
  strategy.verifyUser,
  strategy.generateToken,
  strategy.validateToken,
  (req, res) => res.status(200).send({
    token: res.token,
    user: {
      username: res.user.username,
      meetings: {},
    },
  }).end(),
);
module.exports = router;
