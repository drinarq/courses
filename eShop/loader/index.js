const express = require('express');

const expressLoader = require('./express.js');
const passportLoader = require('./passport.js');
const routesLoader = require('./routes.js');
const cronJob=require('../cron/deleteUsers.js');

const router = express.Router();
router.use(expressLoader);
router.use(passportLoader);
router.use(routesLoader);
cronJob.start();
module.exports = router;