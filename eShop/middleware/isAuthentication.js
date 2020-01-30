const UnauthorizedExeption = require('../errors/UnautorizedExeption.js');

module.exports = function isAuthorized(req, res, next) {
    if (req.user) {
        return next();
    }

    next(new UnauthorizedExeption('Login to get access'));
};