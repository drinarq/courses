const express = require('express');
const router = express.Router();
const GoodsController=require('../controllers/GoodsController.js');


router.post("/GoodsAdd", GoodsController.goodsAdd);
module.exports = router;