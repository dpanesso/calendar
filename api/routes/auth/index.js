const express = require('express');
const { processSignupForm } = require('../../services/authentication/processForm');
const auth = require('../../services/authentication');

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
  auth.authenticate('local'),
  (req, res) => {
    console.log('||||||||||||||||||||||||| BEGIN MY RESPONSE |||||||||||||||||||||||');
    console.log(req.session);
    console.log('||||||||||||||||||||||||| END MY RESPONSE |||||||||||||||||||||||');
    res.cookie('access_token', 'my access token', {
      maxAge: 60 * 60 * 24 * 365 * 10,
      httpOnly: true,
    });
    res.status(200).send({}).end();
  },
);


module.exports = router;
