const express=require('express');
const goodsService=require('../services/goods.js');
const HTTPStatus = require('http-status-codes');
const resMessage = require('../helpers/helper.js');
const EmptyResExeption = require('../errors/EmptyRsponseError.js');
const NotFound=require('../errors/NotFound.js');
const IncorrectFormatExeption=require('../errors/IncorrectFormatExeption.js');
const validationError=require('../errors/ValidationError.js');
const fs=require('fs');
const path=require('path');
const isEmpty=require('../helpers/isEmpty.js');

class Goods{
   async goodsAdd(req,res,next){
       try {
           const product=req.body;

           if(!product){
                next(new EmptyResExeption('Empty response body'));
            }

           await goodsService.addProduct(product);

           res.status(HTTPStatus.OK);
           res.json(resMessage.OK(HTTPStatus.OK,'product added',product));
       }
       catch(err){
            next(err);
       }
    }

    async getGoods(req,res,next){
       try{
           const sort=req.query;

           const goods=await goodsService.getGoods(sort);

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
       catch (err) {
           next(err);
       }
    }
    async getProduct(req,res,next){
       try{

           const id=req.params.id;
           const product=await goodsService.getProduct(id);
           if(isEmpty(product)){
               next(new NotFound(`product with ${id} not found`));
           }
           else{

               res.json(resMessage.OK(HTTPStatus.OK,'product found',product));
           }
       }
       catch (err) {
           next(err);
       }
   }

     async updateProduct(req,res,next){
           try{
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
           catch (err) {
               next(err);
           }
        }



    async setMark(req,res,next){
       try{
           const productId=req.params.id;
           const userId=req.user.id;
           const value=req.body.value;
           const product=await goodsService.getProduct(productId);
            if(isEmpty(product)) {
                next(new NotFound(`product with ${productId} not found`));
            }
            else {
                res.status(HTTPStatus.OK);
                res.json(resMessage.OK(HTTPStatus.OK, "mark added to", productId))
                const mark = await goodsService.setMark(userId, value, productId);
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
           const product= await goodsService.getProduct(productId);
           if(isEmpty(product)) {
               next(new NotFound(`product with ${productId} not found`))
           }
           else{
           await goodsService.deleteMark(userId,productId);
           res.status(HTTPStatus.OK);
           res.json(resMessage.OK(HTTPStatus.OK,`mark deleted`,productId))
            }

       }
       catch (err) {
           next(err);
       }
    }
}



module.exports= new Goods();




