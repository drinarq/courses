const express = require('express');
const router = express.Router();
const GoodsController=require('../controllers/goods.js');
const isAuthorized = require('../middleware/isAuthorized.js');
const adminCheck = require('../middleware/adminCheck.js');
const validation = require('../middleware/validation.js');
const GoodsShema = require('../shemas/goods.js');
const MarkShema=require('../shemas/mark.js');

router.use(isAuthorized);
router.get("/:id",GoodsController.getProduct);
router.get("/",GoodsController.getGoods);
router.get("/sort/name",GoodsController.getGoodsByName);
router.get("/sort/UpDate",GoodsController.getGoodsByUpDate);
router.get("/sort/image",GoodsController.getGoodsWithImage);
router.post("/product/:id",validation(MarkShema.add),GoodsController.setMark);
router.delete("/product/:id",GoodsController.deleteMark);

router.use(adminCheck);
router.post("/GoodsAdd",validation(GoodsShema.add), GoodsController.goodsAdd);
router.delete("/:id",GoodsController.deleteProduct);
router.put("/:id",validation(GoodsShema.update),GoodsController.updateProduct);


module.exports = router;