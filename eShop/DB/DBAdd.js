const Sequelize = require("sequelize");
const DBPassword=require("F:\\courses\\eShop\\helpers\\helper.js");
sequelize = new Sequelize("eShop", "root", DBPassword, {
    dialect: "mysql",
    host: "localhost"
});

sequelize.sync().then(result=>{
    console.log("connection with db established");
})
    .catch(err=> console.log(err));

module.exports=sequelize;