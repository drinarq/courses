const Goods = require('./goods.js');
const Roles = require('./role.js');
const Users = require('./user.js');
const UsersRoles = require('./usersRole.js');
const Marks = require('./mark.js');
const Tags=require('./tags.js');
const GoodsTags=require('./usersRole.js');

Users.belongsToMany(Roles, {
    through: UsersRoles,
    foreignKey: 'user_id',
    onDelete: 'SET NULL',
});

Roles.belongsToMany(Users, {
    through: UsersRoles,
    foreignKey: 'role_id',
    onDelete: 'SET NULL',
});

Users.hasMany(Marks, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Goods.hasMany(Marks, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE',
});

Goods.belongsToMany(Tags,{
    through:GoodsTags,
    foreignKey:'product_id',
    onDelete:'SET NULL',
})

Tags.belongsToMany(Goods,{
    through:GoodsTags,
    foreignKey:'tag_id',
    onDelete:'SET NULL',
})