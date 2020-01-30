const express=require('express');
const router = express.Router();
const UserController=require('../controllers/user.js');
const userShema = require('../shemas/user.js');
const roleShema = require('../shemas/role.js');
const isAutorized=require('../middleware/isAuthorized.js');
const validation=require('../middleware/validation.js');
const adminCheck=require('../middleware/adminCheck.js');
router.post("/UserAdd",validation(userShema.add),UserController.userAdd);

router.use(isAutorized);
router.get('/roles/:id', UserController.getUserRole);
router.get('/me', UserController.getMe);
router.post('/me', UserController.delReq);
router.delete('/me',UserController.sendReq);



 router.use(adminCheck);
router.get("/GetAll",UserController.getUsers);
router.put('/:id/role',UserController.updateUserRole);
router.get('/:id', UserController.getUser);
router.put('/:id', validation(userShema.update), UserController.updateUser);
router.delete('/:id', UserController.deleteUser);


module.exports= router;