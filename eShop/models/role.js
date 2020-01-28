const Sequelize = require('sequelize');
const sequelize = require('../DB/DBAdd.js');

const Roles =(module.exports=sequelize.define('roles', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    value: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'user',
    }
}));
