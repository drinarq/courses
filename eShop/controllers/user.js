const express = require('express');
const userService=require('../services/user.js');
class UserController{
     async userAdd(req,res,next){
         try{
            const user=req.body;

            await userService.addUser(user);
            res.json(req.body);
        }
        catch (err) {
            next(err);
        }
     }
}
module.exports= new UserController();