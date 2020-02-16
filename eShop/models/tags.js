const Sequelize = require('sequelize');
const sequelize = require('../DB/DBConnection.js');

const Tags =(module.exports=sequelize.define('tags', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },

    value: {
        type: Sequelize.STRING,
        unique:true,
        allowNull: false,
    }

}));
