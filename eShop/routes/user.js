const express=require('express');
const router = express.Router();
const UserController=require('../controllers/UserController.js');


router.post("/UserAdd",UserController.userAdd);
module.exports= router;