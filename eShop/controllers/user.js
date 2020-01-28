const express = require('express');
const userService=require('../services/user.js');
const HTTPStatus = require('http-status-codes');
const EmptyResExeption = require('../errors/EmptyRsponseError.js');
const resMessage = require('../helpers/helper.js');

class User{
    async getMe(req, res, next) {
        try {
            const id = req.user.id;
            const user = await userService.getUser(id);

            if (!user) {
                next(new EmptyResExeption('Empty response body.'));
            }

            res.status(HTTPStatus.OK);
            res.json(resMessage.OK(HTTPStatus.OK, 'Get me.', user));
        } catch (err) {
            next(err);
        }
    }

     async userAdd(req,res,next){
         try{
            const user=req.body;


            await userService.addUser(user);

            res.status(HTTPStatus.CREATED);
             res.json(resMessage.OK(HTTPStatus.CREATED, 'User created.'));
        }
        catch (err) {
            next(err);
        }
     }

     async getUsers(req,res,next){
         try{
             const users=await userService.getUsers();
             res.json(users);
             if (!users || !users.length) {
                 next(new EmptyResExeption('Empty result body.'));
             }
             res.status(HTTPStatus.OK);
             res.json(resMessage.OK(HTTPStatus.OK, 'Get all users.', users));
         }
         catch (err) {
             next(err);
         }
     }

     async deleteUser(req,res,next){
         try{
             const id=req.params.id;

             await userService.deleteUser(id);

             res.status(HTTPStatus.OK);
             res.json(resMessage.OK(HTTPStatus.OK, 'User deleted.'));
         }
         catch (err) {
             next(err);
         }
     }

     async getUser(req,res,next){
         try{
             const id=req.params.id;
             const user=await userService.getUser(id);

             if (!user) {
                 next(new EmptyResExeption('Empty result body.'));
             }
             res.status(HTTPStatus.OK);
             res.json(resMessage.OK(HTTPStatus.OK, 'Get user.', user));
         }
         catch (err) {
             next(err);
         }
     }

     async updateUser(req,res,next){
         try{
             const id=req.params.id;
             const userField=req.body;

             await userService.updateUser(id,userField);

             res.status(HTTPStatus.OK);
             res .json(resMessage.OK(HTTPStatus.OK, 'User updated.'));
         }
         catch(err){
             next(err);
         }
     }

     async addUserRole(req, res, next) {
        try {
            const id = req.params.id;
            const role = req.body.value;

            await userService.addUserRole(id, role);

            res.status(HTTPStatus.CREATED);
            res.json(resMessage.OK(HTTPStatus.CREATED, 'User role added.'));
        } catch (err) {
            next(err);
        }
    }

     async getUserRole(req, res, next) {
        try {
            const id = req.params.id;
            const roles = await userService.getUserRole(id);

            if (!roles || !roles.length) {
                next(new EmptyResExeption('Empty result body.'));
            }

            res.status(HTTPStatus.OK);
            res.json(resMessage.OK(HTTPStatus.OK, 'Get user roles.', roles));
        } catch (err) {
            next(err);
        }
    }

    async sendReq(req, res, next) {
        try {
            await userService.sendReq(req.user.id);

            res.status(HTTPStatus.OK);
                res.json(resMessage.OK(HTTPStatus.OK, 'Request sended.'));
        } catch (err) {
            next(err);
        }
    }

    async delReq(req, res, next) {
        try {
            await userService.delReq(req.user.id);

            res.status(HTTPStatus.OK);
            res.json(resMessage.OK(HTTPStatus.OK, 'Request deleted.'));
        } catch (err) {
            next(err);
        }
    }
}
module.exports= new User();