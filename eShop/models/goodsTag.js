const Sequelize = require('sequelize');
const sequelize = require('../DB/DBConnection.js');

const goodsTag = (module.exports=sequelize.define('goods_tags', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    product_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
    },

    tag_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }

}));
