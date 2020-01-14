const express=require('express');
const goodsService=require('../services/goods.js');
class GoodsController{
   async goodsAdd(req,res,next){
       try {
           const product=req.body;

           await goodsService.addProduct(product);
           res.json(req.body);
       }
       catch(err){
            next(err);
       }
    }
}
module.exports= new GoodsController();




