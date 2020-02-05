const CronJob=require('cron').CronJob;
const userRepository=require('../repository/user.js');
const job=new CronJob('0 0 * * * *',async ()=> {

    const users=await userRepository.getReqUsers();
    for (let value of users){
        await userRepository.deleteUser(value.id);
    }
});


module.exports=job;