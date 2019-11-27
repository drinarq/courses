const sequelize=require("F:\\courses\\eShop\\DB\\DBAdd.js");
const Sequelize = require("sequelize");
console.log(sequelize);
const product = sequelize.define("goods", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name:{
        type:Sequelize.STRING(70),
        allowNull: false
    },
    price:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    image:{
        type:Sequelize.STRING(255),
        allowNull:true
    },
    amount:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    discription:{
        type:Sequelize.STRING,
        allowNull:true
    },
    update_date:{
        type:Sequelize.DATE,
        allowNull:false
    }
});
module.exports=product;