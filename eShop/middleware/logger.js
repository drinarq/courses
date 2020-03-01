const logger=require('../logger/mongoLogger.js');
const userService=require('../services/user.js');

class LoggerHelper {

    async addLog(data,id){
        const role=await userService.getUserRole(id);
        data.userRole=role.value;
        await logger.addErrorLog(data);
    }

}

module.exports=new LoggerHelper();