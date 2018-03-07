const express = require('express');
const { processSignupForm } = require('../services/authentication/signup');
const {
  verifyUser,
  generateToken,
  validateToken,
} = require('../services/authentication/middleware');

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
  verifyUser,
  generateToken,
  validateToken,
  (req, res) => res.status(200).send({
    user: {
      username: res.user.username,
      meetings: {},
      token: res.token,
    },
  }).end(),
);

module.exports = router;
