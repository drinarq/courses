const Sequelize = require('sequelize');
const sequelize = require('../DB/DBAdd.js');

const UsersRoles = (module.exports=sequelize.define('users_roles', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
    },
    role_id: {
        type: Sequelize.INTEGER,
    }
}));
