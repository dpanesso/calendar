const express = require('express');
const processSignupForm = require('../services/authentication/signup');
const {
  verifyUser,
  generateToken,
} = require('../services/authentication/middleware');

const router = new express.Router();

router.post('/signup', (req, res) => {
  processSignupForm(req.body)
    .then((result) => {
      if (!result.success) {
        return res.status(400).json({
          success: false,
          errors: result.errors,
        });
      }
      return res.status(200).send({ success: 'Account successfully created' }).end();
    })
    .catch((err) => {
      throw new Error(err.message);
    });
});

router.post(
  '/login',
  verifyUser,
  generateToken,
  (req, res) => res.status(200).send({
    token: res.token,
    user: {
      username: res.user.username,
      meetings: {},
      token: res.token,
    },
  }).end(),
);
module.exports = router;
