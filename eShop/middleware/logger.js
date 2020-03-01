const logger=require('../logger/mongoLogger.js');
const userService=require('../services/user.js');

class Logger {

    async addErrorLog(data,id){
        const role=await userService.getUserRole(id);
        data.userRole=role.value;
        await logger.addErrorLog(data);
    }

    async addEventLog(req,res,next){
        let user={};
        if(req.body.email!==undefined){
            user=await userService.getUserByEmail(req.body.email);
        }
        const data={
            userId:user.id||req.user.id,
            method:req.method,
            path:req._parsedOriginalUrl.path,
            date:new Date()
        };

        await logger.addEventLog(data);

        next();

    }

}

module.exports=new Logger();