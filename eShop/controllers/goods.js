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

           if(!product){
                next(new EmptyResExeption('Empty response body'));
            }
           await goodsService.addProduct(product);

           res.status(HTTPStatus.OK);
           res.json(res.message.OK(HTTPStatus.OK,'product added'),product);
       }
       catch(err){
            next(err);
       }
    }

    async getGoods(req,res,next){
       try{

           const goods=await goodsService.getGoods();

           if(!goods){
               next(new NotFound('goods not found'));
           }
           res.status(HTTPStatus.OK);
           res.json(resMessage.OK(HTTPStatus.OK,'products found',goods));
       }
       catch (err) {
           next(err);
       }
    }

    async deleteProduct(req,res,next){
       try{
           const id= req.params.id;

           await goodsService.deleteProduct(id);

           res.status(HTTPStatus.OK);
           res.json(resMessage.OK(HTTPStatus.OK,`prodct ${id} deleted`));
       }
       catch (err) {
           next(err);
       }
    }
    async getProduct(req,res,next){
       try{

           const id=req.params.id;
           const product=await goodsService.getProduct(id);

           if(!product){
               next(new NotFound('Empty result body'));
           }

           res.json(resMessage.OK(HTTPStatus.OK,'product found',product));
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

               res.status(HTTPStatus.OK);
               res.json(resMessage.OK(HTTPStatus.OK,`product updated`))
           }
           catch (err) {
               next(err);
           }
        }

      async getGoodsByName(req,res,next){
            try{
                const goods=await goodsService.getGoodsByName();

                res.status(HTTPStatus.OK);
                res.json(resMessage.OK(HTTPStatus.OK,'product sort by name',goods));
            }
            catch (err) {
                next(err);
            }

        }

    async getGoodsByUpDate(req,res,next){
        try{
            const goods=await goodsService.getGoodsByUpDate();
            res.status(HTTPStatus.OK);
            res.json(resMessage.OK(HTTPStatus.OK,'product sort by update',goods));

        }
        catch (err) {
            next(err);
        }

    }

    async getGoodsWithImage(req,res,next){
        try{
            const goods=await goodsService.getGoodsWithImage();

            res.status(HTTPStatus.OK);
            res.json(resMessage.OK(HTTPStatus.OK,'product with image',goods));

        }
        catch (err) {
            next(err);
        }

    }

    async setMark(req,res,next){
       try{
           const productId=req.params.id;
           const userId=req.user.id;
           const value=req.body.value;
            if(await goodsService.getProduct(productId)) {
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




