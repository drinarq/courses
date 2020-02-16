const express=require('express');
const router = express.Router();
const UserController=require('../controllers/user.js');
const userShema = require('../shemas/user.js');
const roleShema = require('../shemas/role.js');
const isAutorized=require('../middleware/isAuthentication.js');
const validation=require('../middleware/validation.js');
const isAdmin=require('../middleware/isAdmin.js');
const tryCatch=require('../helpers/tryCatchWrapper.js');

router.post("/UserAdd",validation(userShema.add),UserController.userAdd);

router.use(isAutorized);
router.put('/me/update/password',tryCatch(UserController.updatePassword));
router.get('/roles/:id',tryCatch(UserController.getUserRole));
router.get('/me',tryCatch(UserController.getMe));
router.post('/me',tryCatch(UserController.delReq));
router.delete('/me',tryCatch(UserController.sendReq));
router.put('/me/update',tryCatch(UserController.updateMe));


router.use(isAdmin);
router.get("/GetAll",tryCatch(UserController.getUsers));
router.put('/:id/role',tryCatch(UserController.updateUserRole));
router.get('/:id',tryCatch(UserController.getUser));
router.put('/:id',validation(userShema.update),tryCatch(UserController.updateUser));
router.delete('/:id',tryCatch(UserController.deleteUser));


module.exports= router;