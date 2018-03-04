const express = require('express');
const client = require('../../redis/redisClient');

const router = new express.Router();

router.get('/timeline', (req, res) => {
  client.get('coindeskBPI', (error, result) => {
    if (error) throw error;
    if (result) res.send(JSON.parse(result).bpi);
  });
});

module.exports = router;
