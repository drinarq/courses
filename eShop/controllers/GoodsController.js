const express=require('express');
const product=require("F:\\courses\\eShop\\models\\goods.js");
exports.GoodsAdd=function(req,res){
    product.create({
        name:req.body.name,
        price:req.body.price,
        image:req.body.image,
        amount:req.body.amount,
        discriptin:req.body.discription,
        update_date:new Date()

    });
};



