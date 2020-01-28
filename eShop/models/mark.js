const Sequelize = require('sequelize');
const sequelize = require('../DB/DBAdd.js');

const Mark = (module.exports=sequelize.define('marks', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
    },
    value: {
        type: Sequelize.INTEGER(10),
    },
    product_id: {
        type: Sequelize.INTEGER,
    }
}));
