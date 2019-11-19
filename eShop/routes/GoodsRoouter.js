const express = require('express');
const GoodsRouter = express.Router();
const GoodsController=require("F:\\courses\\eShop\\controllers\\GoodsController.js");
const bodyParser=require('body-parser');
urlencodedParser=bodyParser.urlencoded({extended:false});

GoodsRouter.post("/GoodsAdd",urlencodedParser,GoodsController.GoodsAdd);
module.exports = GoodsRouter;
