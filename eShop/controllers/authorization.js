const passport = require('passport');
const HTTPStatus = require('http-status-codes');

const UnauthorizedExeption = require('../errors/ValidationError.js');
const resMessage = require('../helpers/helper.js');

class LoginController {
    login(req, res, next) {
        passport.authenticate("local", (err, user, info) => {
            if (err) {
                return next(err);
            }

            if (!user) {
                next(new UnauthorizedExeption(info.message));
            }

            req.logIn(user, err => {
                if (err) {
                    return next(err);
                }

                res.status(HTTPStatus.OK).json(resMessage.OK(HTTPStatus.OK, 'logged in.'));
            });
        })
        (req, res, next);
    }

    logout(req, res, next) {
        req.logOut();

        res.status(HTTPStatus.OK).json(resMessage.OK(HTTPStatus.OK, 'logged out.'));
    }
}

module.exports = new LoginController();