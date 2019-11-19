const express=require('express');

exports.GoodsAdd=function(req,res){
    res.send(JSON.stringify([req.body.price,req.body.id,req.body.name,req.body.]));
};



