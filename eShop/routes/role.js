const express = require('express');

const AdminCheck = require('../middleware/adminCheck.js');
const validation = require('../middleware/validation.js');
const roleShema = require('../shemas/role.js');

const rolesController = require('../controllers/role.js');

const router = express.Router();

router.use(AdminCheck);

router.get('/', rolesController.getAllRoles);

router.get('/:id', rolesController.getRole);

router.post('/', validation(roleShema.add), rolesController.addRole);

router.delete('/:id', rolesController.deleteRole);

router.put('/:id', validation(roleShema.update), rolesController.updateRole);

module.exports = router;