const Joi = require('joi');

const ValidationError = require('../errors/ValidationError.js');

module.exports = (shema) => {
    return (req, res, next) => {
        const isNotValid = Joi.validate(req.body, shema).error;

        if (isNotValid) {
            next(new ValidationError(isNotValid.message));
        }

        next();
    }
};