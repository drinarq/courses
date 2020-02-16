const express=require('express');
const router=express.Router();
const GoodsRouter = require('../routes/goods.js');
const UserRouter = require('../routes/user.js');
const LoginRouter=require('../routes/authorization.js');
const RoleRouter=require('../routes/role.js');
const TagRouter=require('../routes/tag.js');
const tryCatch=require('../helpers/tryCatchWrapper.js');

router.use("/Goods",tryCatch(GoodsRouter));
router.use("/User",tryCatch(UserRouter));
router.use("/authenticate",tryCatch(LoginRouter));
router.use("/roles",tryCatch(RoleRouter));
router.use("/tags",tryCatch(TagRouter));

module.exports=router;