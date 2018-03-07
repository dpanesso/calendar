const express = require('express');
const privateRoutes = require('./private');
const publicRoutes = require('./public');
const defaultRoutes = require('./default');


const router = new express.Router();

router.use('/api/pub', publicRoutes);
router.use('/api/pri', privateRoutes);
router.use(defaultRoutes);

module.exports = router;
