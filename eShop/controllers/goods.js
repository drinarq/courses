const express=require('express');
const goodsService=require('../services/goods.js');
const HTTPStatus = require('http-status-codes');
const resMessage = require('../helpers/helper.js');
const EmptyResExeption = require('../errors/EmptyRsponseError.js');
const NotFound=require('../errors/NotFound.js');

class Goods{
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

    async getGoods(req,res,next){
       try{

           const goods=await goodsService.getGoods();
            console.log(goods);
            res.json(goods);
       }
       catch (err) {
           next(err);
       }
    }

    async deleteProduct(req,res,next){
       try{
           const id= req.params.id;

           await goodsService.deleteProduct(id);

           res.send(`prodct ${id} deleted`);
       }
       catch (err) {
           next(err);
       }
    }
    async getProduct(req,res,next){
       try{
           const id=req.params.id;

           const product=await goodsService.getProduct(id);
           res.json(product);
       }
       catch (err) {
           next(err);
       }
   }

     async updateProduct(req,res,next){
           try{
               const id=req.params.id;
               const field=req.body;

               await goodsService.updateProduct(id,field);
           }
           catch (err) {
               next(err);
           }
        }

      async getGoodsByName(req,res,next){
            try{
                const goods=await goodsService.getGoodsByName();

                res.json(goods);
            }
            catch (err) {
                next(err);
            }

        }

    async getGoodsByUpDate(req,res,next){
        try{
            const goods=await goodsService.getGoodsByUpDate();
            console.log(goods);
            res.json(goods);
        }
        catch (err) {
            next(err);
        }

    }

    async getGoodsWithImage(req,res,next){
        try{
            const goods=await goodsService.getGoodsWithImage();

            res.json(goods);
        }
        catch (err) {
            next(err);
        }

    }

    async setMark(req,res,next){
       try{
           const productId=req.params.id;
           const userId=req.user.id;
           const value=req.body.mark;
            if(goodsService.getProduct(productId)) {
                const mark = await goodsService.setMark(userId, value, productId);

           res.status(HTTPStatus.OK);
           res.json(resMessage.OK(HTTPStatus.OK,"mark added to",productId))
        }
            else {
                    next(new NotFound(`product with ${productId} not found`));
            }
       }
       catch(err){
           next(err)
       }
    }

    async deleteMark(req,res,next){
       try{
           const userId=req.user.id;
           const productId=req.params.id;
           if(goodsService.getProduct(productId)){

           await goodsService.deleteMark(userId,productId);
           res.status(HTTPStatus.OK);
           res.json(resMessage.OK(HTTPStatus.OK,`mark deleted`,productId))
            }
        else{
            next(new NotFound(`product with ${productId} not found`))
           }
       }
       catch (err) {
           next(err);
       }
    }
}



module.exports= new Goods();




