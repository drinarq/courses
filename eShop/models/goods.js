const sequelize=require('../DB/DBAdd.js');
const Sequelize = require("sequelize");
const product =sequelize.define("goods", {
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
    description:{
        type:Sequelize.STRING,
        allowNull:true
    },
    update_date:{
        type:Sequelize.DATE,
        // allowNull:false
    }
});

product.beforeCreate((product,options)=>{
    product.update_date=new Date();
});
module.exports=product;