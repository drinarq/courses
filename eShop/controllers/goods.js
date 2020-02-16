const express=require('express');
const goodsService=require('../services/goods.js');
const HTTPStatus = require('http-status-codes');
const resMessage = require('../helpers/helper.js');
const EmptyResExeption = require('../errors/EmptyRsponseError.js');
const NotFound=require('../errors/NotFound.js');
const IncorrectFormatExeption=require('../errors/IncorrectFormatExeption.js');
const validationError=require('../errors/ValidationError.js');
const isEmpty=require('../helpers/isEmpty.js');

class Goods{

   async goodsAdd(req,res,next){

           const product=req.body;

           if(!product){
                next(new EmptyResExeption('Empty response body'));
            }

           await goodsService.addProduct(product);

           res.status(HTTPStatus.OK);
           res.json(resMessage.OK(HTTPStatus.OK,'product added',product));

    }

    async getGoods(req,res,next){

           const sort=req.query;

           const goods=await goodsService.getGoods(sort);

           if(!goods){
               next(new NotFound('goods not found'));
           }

           res.status(HTTPStatus.OK);
           res.json(resMessage.OK(HTTPStatus.OK,'products found',goods));

    }

    async deleteProduct(req,res,next){

           const id= req.params.id;
           const product= await goodsService.getProduct(id)

           if(isEmpty(product)){
               next(new NotFound(`product with ${id} not found`));
           }

            else{
           await goodsService.deleteProduct(id);

           res.status(HTTPStatus.OK);
           res.json(resMessage.OK(HTTPStatus.OK,`product ${id} deleted`));

           }

    }

    async getProduct(req,res,next){

           const id=req.params.id;
           const product=await goodsService.getProduct(id);

           if(isEmpty(product)){
               next(new NotFound(`product with ${id} not found`));
           }

           else{
               res.status(HTTPStatus.OK);
               res.json(resMessage.OK(HTTPStatus.OK,'product found',product));

           }

   }

     async updateProduct(req,res,next){

               const id=req.params.id;
               const field=req.body;
               const product=goodsService.getProduct(id);

               if(isEmpty(product)) {
                   next(new NotFound(`product with ${id} not found`));
               }

               else{

                   await goodsService.updateProduct(id, field);
                   res.status(HTTPStatus.OK);
                   res.json(resMessage.OK(HTTPStatus.OK,`product updated`))

               }
        }



    async setMark(req,res,next){

           const productId=req.params.id;
           const userId=req.user.id;
           const value=req.body.value;
           const product=await goodsService.getProduct(productId);

            if(isEmpty(product)) {
                next(new NotFound(`product with ${productId} not found`));
            }

            else {

                res.status(HTTPStatus.OK);
                res.json(resMessage.OK(HTTPStatus.OK, "mark added to", productId));
                const mark = await goodsService.setMark(userId, value, productId);

            }
    }

    async deleteMark(req,res,next){

           const userId=req.user.id;
           const productId=req.params.id;
           const product= await goodsService.getProduct(productId);

           if(isEmpty(product)) {
               next(new NotFound(`product with ${productId} not found`))
           }

           else{

           await goodsService.deleteMark(userId,productId);
           res.status(HTTPStatus.OK);
           res.json(resMessage.OK(HTTPStatus.OK,`mark deleted`,productId));

        }
    }

    async addProductTag(req,res,next){
        const productId=req.params.id;
        const value=req.body.value;

        await goodsService.addProductTag(value,productId);

        res.status(HTTPStatus.OK);
        res.json(resMessage.OK(HTTPStatus.OK, "tag added",));

    }

    async delProductTag(req,res,next){
        const productId=req.params.id;

        await goodsService.delProductTag(productId);

        res.status(HTTPStatus.OK);
        res.json(resMessage.OK(HTTPStatus.OK, "tag deleted",));

    }

    async getProductTags(req,res,next){
        const productId=req.params.id;

        const tags=await goodsService.getProductTags(productId);

        res.status(HTTPStatus.OK);
        res.json(resMessage.OK(HTTPStatus.OK, "tags:", tags));

    }

    async getGoodsByTag(req,res,next){
       const tag=req.body.value;

       const goods=await goodsService.getGoodsByTag(tag,paginate);

       res.status(HTTPStatus.OK);
       res.json(resMessage.OK(HTTPStatus.OK, "goods:", goods));

    }
}



module.exports= new Goods();




