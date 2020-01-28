const sequelize = require('../DB/DBAdd.js');
const Sequelize = require("sequelize");
const bcrypt = require('bcrypt');

 const User=(module.exports=sequelize.define("users",{
     id:{
         type: Sequelize.INTEGER,
         autoIncrement:true,
         primaryKey:true,
         allowNull:false
     },
     email:{
         type:Sequelize.STRING(50),
         allowNull: false,
         unique:true
     },
     password:{
         type:Sequelize.STRING,
         allowNull:false
     },
     first_name:{
         type:Sequelize.STRING(50),
         allowNull:false,
     },
     last_name:{
         type:Sequelize.STRING(50),
         allowNull:false
     },
     delReq:{
         type:Sequelize.BOOLEAN,
         allowNull:false,
         defaultValue:0,
     }
 }));
User.beforeCreate((user, options) => {
    user.password = User.hashPassword(user.password);
});

User.hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

User.prototype.validatePassword = function(password) {
    if (!password || !this.password) {
        return false;
    }

    return bcrypt.compareSync(password, this.password);
};