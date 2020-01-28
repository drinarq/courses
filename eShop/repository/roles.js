const roleModel = require('../models/role.js');
const userRoleModel=require('../models/usersRole.js');
class RolesRepository {
    async getRole(id) {
        const role = await roleModel.findByPk(id);

        return role;
    }

    async getRoleByValue(value) {
        const role = await roleModel.findOne({ where: { value: value } });

        return role;
    }

    async getAllRoles() {
        const roles = await roleModel.findAll();

        return roles;
    }

    async addRole(role) {
        await roleModel.create(role);
    }

    async deleteRole(id) {
        await roleModel.destroy({ where: { id: id } });
    }

    async updateRole(id, newRoleData) {
        const role = await this.getRole(id);
        await role.update(newRoleData);
    }

    async addUserRole(userId,roleId){
        await userRoleModel.create({
            user_id:userId,
            role_id:roleId
        });
    }

    async getUserRole(id){
        const role_id=await userRoleModel.findOne({where:{user_id:id}});
        const user_role=await roleModel.findOne({attributes:['value'],where:{id:role_id.dataValues.role_id}});
        return user_role;
    }
}

module.exports = new RolesRepository();