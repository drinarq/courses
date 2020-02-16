const HTTPStatus = require('http-status-codes');

const rolesService = require('../services/role.js');
const EmptyResExeption = require('../errors/EmptyRsponseError.js');
const responceMessage = require('../helpers/helper.js');

class RolesController {
    async getRole(req, res, next) {

            const id = req.params.id;
            const role = await rolesService.getRole(id);

            if (!role) {
                next(new EmptyResExeption('Empty result.'));
            }

            res.status(HTTPStatus.OK).json(responceMessage.OK(HTTPStatus.OK, 'Get role.', role));

    }

    async getAllRoles(req, res, next) {

            const roles = await rolesService.getAllRoles();

            if (!roles || !roles.length) {
                next(new EmptyResExeption('Empty result.'));
            }

            res.status(HTTPStatus.OK).json(responceMessage.OK(HTTPStatus.OK, 'Get roles.', roles));


    }

    async addRole(req, res, next) {

            const role = req.body;

            await rolesService.addRole(role);

            res.status(HTTPStatus.CREATED).json(responceMessage.OK(HTTPStatus.CREATED, 'Role created.'));

    }

    async deleteRole(req, res, next) {

            const id = req.params.id;

            await rolesService.deleteRole(id);

            res.status(HTTPStatus.OK).json(responceMessage.OK(HTTPStatus.OK, 'Role deleted.'));

    }

    async updateRole(req, res, next) {

            const id = req.params.id;
            const role = req.body;

            await rolesService.updateRole(id, role);

            res.status(HTTPStatus.OK).json(responceMessage.OK(HTTPStatus.OK, 'Role updated.'));

    }

}

module.exports = new RolesController();