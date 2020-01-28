const UnauthorizedExeption = require('../errors/UnautorizedExeption.js');

module.exports = function isAuthorized(req, res, next) {
    console.log(req.user);
    if (req.user) {
        return next();
    }

    next(new UnauthorizedExeption('Login to get access'));
};