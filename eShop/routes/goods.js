const express = require('express');
const router = express.Router();
const GoodsController=require('../controllers/goods.js');
const isAuthentication = require('../middleware/isAuthentication.js');
const isAdmin = require('../middleware/isAdmin.js');
const validation = require('../middleware/validation.js');
const GoodsShema = require('../shemas/goods.js');
const MarkShema=require('../shemas/mark.js');
const tryCatch=require('../helpers/tryCatchWrapper.js');

router.use(isAuthentication);
router.get("/:id",tryCatch(GoodsController.getProduct));
router.get("/",tryCatch(GoodsController.getGoods));
router.post("/product/:id",validation(MarkShema.add),tryCatch(GoodsController.setMark));
router.delete("/product/:id",tryCatch(GoodsController.deleteMark));
router.get("/product/:id/tags",tryCatch(GoodsController.getProductTags));
router.get("/tags/goods",tryCatch(GoodsController.getGoodsByTag));

router.use(isAdmin);
router.post("/GoodsAdd", tryCatch(GoodsController.goodsAdd));
router.delete("/:id",tryCatch(GoodsController.deleteProduct));
router.put("/:id",validation(GoodsShema.update),tryCatch(GoodsController.updateProduct));
router.post("/:id/tags/add",tryCatch(GoodsController.addProductTag));
router.delete("/tags/:id/delete",tryCatch(GoodsController.delProductTag));


module.exports = router;