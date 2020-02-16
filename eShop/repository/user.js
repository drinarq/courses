const userModel=require('../models/user.js');
const paginate=require('../helpers/paginate.js');
const isEmpty=require('../helpers/isEmpty.js');
const hashPassword=require('../helpers/hashPassword.js');

class UserRepository{

    async deleteAllUsers() {
        await userModel.destroy({ where: {} });
    }

    async getUserByEmail(value) {

        const user = await userModel.findOne({ where: { email: value } });

        return user;
    }

    async addUser(user){

        const userr=await  userModel.create(user);

        return  userr;
    }

    async getUsers(query){

        let page=isEmpty(query.page)?1:parseInt(query.page);
        let pageSize=isEmpty(query.pageSize)?10:parseInt(query.pageSize);

        const users=await userModel.findAll(paginate({where:{}},{page,pageSize}));

        return users;
    }

    async deleteUser(id){

        const user=await this.getUser(id);
        await userModel.destroy({where:{id:id}});

    }

    async getUser(id){

        const user=await userModel.findOne({where:{id:id}});

        return user;
    }

    async updateUser(id,field){

        const user=await this.getUser(id);

        await user.update(field);
    }

    async sendReq(id, value) {

        const user = await this.getUser(id);
        await user.update({ delReq: value });
    }

    async getReqUsers(){

        const users= await userModel.findAll({where:{delReq:1}});

        return users;
    }

    async updateMe(id,field){

        const user=await this.getUser(id);

        await user.update(field);
    }

    async updatePassword(id,pass){

        const user=await this.getUser(id);
        const password=hashPassword(pass);

        await user.update({password:password});
    }

}



module.exports= new UserRepository();