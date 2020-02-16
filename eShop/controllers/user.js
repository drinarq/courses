const express = require('express');
const userService=require('../services/user.js');
const HTTPStatus = require('http-status-codes');
const EmptyResExeption = require('../errors/EmptyRsponseError.js');
const resMessage = require('../helpers/helper.js');
const NotFound=require('../errors/NotFound.js');
const  roleService=require('../services/role.js');
const RootExeption=require('../errors/RootsExeption.js');

class User{
    async getMe(req, res, next) {

            const id = req.user.id;
            const user = await userService.getUser(id);

            if (!user) {
                next(new EmptyResExeption('Empty response body'));
            }

            res.status(HTTPStatus.OK);
            res.json(resMessage.OK(HTTPStatus.OK, 'Get me', user));

    }

     async userAdd(req,res,next){

            const user=req.body;


            await userService.addUser(user);

            res.status(HTTPStatus.CREATED);
            res.json(resMessage.OK(HTTPStatus.CREATED, 'User created.'));

     }

     async getUsers(req,res,next){

             const query=req.query;
             const users=await userService.getUsers(query);

             if (!users || !users.length) {
                 next(new NotFound('Empty result body.'));
             }

             res.status(HTTPStatus.OK);
             res.json(resMessage.OK(HTTPStatus.OK, 'Get all users.', users));

     }

     async deleteUser(req,res,next){

             const id=req.params.id;

             await userService.deleteUser(id);

             res.status(HTTPStatus.OK);
             res.json(resMessage.OK(HTTPStatus.OK, 'User deleted.'));

     }

     async getUser(req,res,next){

             const id=req.params.id;
             const user=await userService.getUser(id);

             if (!user) {
                 next(new NotFound('Empty result body.'));
             }

             res.status(HTTPStatus.OK);
             res.json(resMessage.OK(HTTPStatus.OK, 'Get user.', user));

     }

     async updateUser(req,res,next){

             const id=req.params.id;
             const userField=req.body;

             await userService.updateUser(id,userField);

             res.status(HTTPStatus.OK);
             res .json(resMessage.OK(HTTPStatus.OK, 'User updated.'));

     }

     async updateUserRole(req, res, next) {

            const userId = req.params.id;
            const roleId = req.body.role_id;
            const role= await roleService.getRole(roleId);

            if(!role){
                next(new NotFound(`role with ${roleId} not found`));
            }

            await userService.updateUserRole(userId, roleId);

            res.status(HTTPStatus.OK);
            res.json(resMessage.OK(HTTPStatus.OK, 'user role updated.'));

    }

     async getUserRole(req, res, next) {

            const id = req.params.id;
            const roles = await userService.getUserRole(id);

            if (!roles || !roles.length) {
                next(new EmptyResExeption('Empty result body.'));
            }

            res.status(HTTPStatus.OK);
            res.json(resMessage.OK(HTTPStatus.OK, 'Get user roles.', roles));

    }

    async sendReq(req, res, next) {

            await userService.sendReq(req.user.id);

            res.status(HTTPStatus.OK);
                res.json(resMessage.OK(HTTPStatus.OK, 'Request sended.'));

    }

    async delReq(req, res, next) {

            await userService.delReq(req.user.id);

            res.status(HTTPStatus.OK);
            res.json(resMessage.OK(HTTPStatus.OK, 'Request deleted.'));

    }

    async updateMe(req,res,next){

        const userId=req.user.id;
        const field=req.body;

        await userService.updateMe(userId,field);

        res.status(HTTPStatus.OK);
        res.json(resMessage.OK(HTTPStatus.OK,`your profile updated`));
    }

    async updatePassword(req,res,next){

        const userId=req.user.id;
        const newPass=req.body.newPassword;
        const pass=req.body.password;

        if(req.user.validatePassword(pass,req.user.password)) {

           await userService.updatePassword(userId,newPass);

           res.status(HTTPStatus.OK);
           res.json(resMessage.OK(HTTPStatus.OK,'your password updated'));
        }
    }
}

module.exports= new User();