const express = require('express');
const isAdmin = require('../middleware/isAdmin.js');
const validation = require('../middleware/validation.js');
const roleShema = require('../shemas/role.js');
const rolesController = require('../controllers/role.js');
const router = express.Router();
const tryCatch=require('../helpers/tryCatchWrapper.js');

router.use(isAdmin);

router.get('/',tryCatch(rolesController.getAllRoles));
router.get('/:id',tryCatch(rolesController.getRole));
router.post('/',tryCatch(validation(roleShema.add), rolesController.addRole));
router.delete('/:id',tryCatch(rolesController.deleteRole));
router.put('/:id',tryCatch(validation(roleShema.update), rolesController.updateRole));

module.exports = router;