const express = require('express');
const authRoutes = require('./auth');
const defaultRoutes = require('./default');


const router = new express.Router();

router.use('/api/auth', authRoutes);
router.use(defaultRoutes);

module.exports = router;
