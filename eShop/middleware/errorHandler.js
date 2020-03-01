const resMessage=require('../helpers/helper.js');
const loggerHelper=require('./logger.js');
module.exports=(err, req, res, next)=> {
    res.status(err.status);
    res.json(resMessage.ERROR(err));

    loggerHelper.addErrorLog({
        path:req._parsedOriginalUrl.path,
        status:err.status,
        message:err.message,
        stack: err.stack,
        method: req.method,
        body: req.body,
        date: new Date()
    },req.user.id).then(r=>(console.log('error log added')));



};