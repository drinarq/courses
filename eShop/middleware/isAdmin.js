const adminConst = require('../constants/constRole.js');
const NotEnoughRootsExeption = require('../errors/RootsExeption.js');
const UnauthorizedExeption = require('../errors/UnautorizedExeption.js');
const RoleService=require('../services/role.js');
module.exports = async function(req, res, next) {
    if (req.user) {

        const role = await RoleService.getUserRole(req.user.id);
            if (role.value === adminConst.admin) {
                return next();
            }


        next(new NotEnoughRootsExeption('Not enough roots.'));
    }

    next(new UnauthorizedExeption('Login to get access'));
};