const userRep=require('../repository/user.js');

class UserServices{

    async addUser(user){
        await userRep.appUser(user);
    }
}

module.exports= new UserServices();