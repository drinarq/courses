const userModel=require('../models/user.js');

class User{
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

    async getUsers(){
        const users=await userModel.findAll();

        return users;
    }

    async deleteUser(id){
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
}

module.exports= new User();