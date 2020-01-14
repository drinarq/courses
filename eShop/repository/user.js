const userModule=require('../models/user.js');

class UserRep{

    async appUser(user){
        await  userModule.create(user);
    }
}

module.exports= new UserRep();