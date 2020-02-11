const env=require('dotenv').config();

module.exports={

    email:{
        login:process.env.MAILLOGIN,
        pass:process.env.MAILPASS
    },

    db:{
        name:process.env.DBNAME,
        login:process.env.DBLOGIN,
        pass:process.env.DBPASS
    }

};