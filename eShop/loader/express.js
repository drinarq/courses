const express=require('express');
const sessionConfig=require('../configuration/session.json');
const session=require('express-session');
const router=express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:false}));
router.use(session(sessionConfig));

module.exports=router;
