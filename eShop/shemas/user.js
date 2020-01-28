const Joi = require('joi');

class UserShemas {
    constructor() {
        this.add = Joi.object().keys({
            email: Joi.string().required().email(),
            password: Joi.string().required(),
            first_name: Joi.string(),
            last_name: Joi.string(),
        });

        this.update = Joi.object().keys({
            email: Joi.string().email(),
            password: Joi.forbidden(),
            first_name: Joi.string(),
            last_name: Joi.string(),
        });
    }
}

module.exports = new UserShemas();