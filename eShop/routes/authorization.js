const express = require('express');

const validation = require('../middleware/validation.js');

const userShema = require('../shemas/user.js');

const loginController = require('../controllers/authorization.js');

const router = express.Router();

router.post('/', validation(userShema.add), loginController.login);
router.delete('/', loginController.logout);

module.exports = router;