const rolesRepository = require('../repository/roles.js');

class RolesService {
    async getRole(id) {

        const role = await rolesRepository.getRole(id);

        return role;
    }

    async getRoleByValue(value) {

        const role = await rolesRepository.getRoleByValue(value);

        return role;
    }

    async getAllRoles() {

        const roles = await rolesRepository.getAllRoles();

        return roles;
    }

    async addRole(role) {

        await rolesRepository.addRole(role);
    }

    async deleteRole(id) {

        await rolesRepository.deleteRole(id);
    }

    async updateRole(id, data) {

        await rolesRepository.updateRole(id, data);
    }

    async getUserRole(id){

        const userRole=await rolesRepository.getUserRole(id);
        return userRole;
    }

    async delUserRole(userId){

        await rolesRepository.delUserRole(userId);
    }

    async updateUserRole(userId,roleId){

        await rolesRepository.updateUserRole(userId,roleId);
    }

}

module.exports = new RolesService();