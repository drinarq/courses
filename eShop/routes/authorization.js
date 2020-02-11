const express = require('express');
const validation = require('../middleware/validation.js');
const userShema = require('../shemas/user.js');
const loginController = require('../controllers/authorization.js');
const router = express.Router();
const tryCatch=require('../helpers/tryCatchWrapper.js');


router.post('/', validation(userShema.add),tryCatch(loginController.login));
router.get('/',tryCatch(loginController.logout));

module.exports = router;