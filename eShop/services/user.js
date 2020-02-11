const userRep=require('../repository/user.js');
const constRole = require('../constants/constRole.js');
const roleService = require('./role.js');
const RootsExeption = require('../errors/RootsExeption.js');
const NotFound = require('../errors/NotFound.js');
const AlreadyExist=require('../errors/AlredyExist.js');
const userRoleRep=require('../repository/roles.js');
class User{
    async getUserByEmail(email) {

        const user = await usersRepository.getUserByEmail(email);

        return user;
    }
    async addUser(value){

        const UserExist=!!(await userRep.getUserByEmail(value.email));

        if(UserExist){
            throw new AlreadyExist(`user with ${value.email} already exist`);
        }

        const user= await userRep.addUser(value);

        const role=await roleService.getRoleByValue(constRole.user);

        if(!role){
            throw new NotFound(`role ${role} not found`)
        }

        await userRoleRep.addUserRole(user.id,role.id);


    }

    async getUsers(query){

        const users=await userRep.getUsers(query);

        return users;
    }

    async deleteUser(id){

        const user=  await userRep.getUser(id);

        if (!user) {
            throw new NotFound(`User with id ${id} not found!`);
        }

        if (!user.delReq) {

            throw new RootsExeption(
                `User with id ${id} does not send delete request.`
            );
        }

        await roleService.delUserRole(id);
        await userRep.deleteUser(id);
    }

    async getUser(id){

        const user=userRep.getUser(id);

        return user;
    }

    async updateUser(id,field){

        await userRep.updateUser(id,field);
    }


    async getUserRole(id) {

        const user = await this.getUser(id);

        if (!user) {
            throw new NotFound(`User with id ${id} not found!`);
        }

        const roles = await roleService.getUserRole(id);

        return roles;
    }
    async delReq(id) {

        await userRep.sendReq(id, false);
    }

    async sendReq(id) {

        await userRep.sendReq(id, true);
    }

    async updateUserRole(userId,roleId){

        await roleService.updateUserRole(userId,roleId);
    }


}

module.exports= new User();