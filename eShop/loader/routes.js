const express=require('express');
const routes=require('../routes/index.js');
const router=express.Router();

router.use(routes);

module.exports=router;
