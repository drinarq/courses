const Sequelize = require("sequelize");

sequelize = new Sequelize("eShop", "root", "01282000vladdd", {
    dialect: "mysql",
    host: "localhost"
});

sequelize.sync().then(result=>{
    console.log("connection with db established");
})
    .catch(err=> console.log(err));

module.exports=sequelize;