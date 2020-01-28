const Joi = require('joi');

class RoleShemas {
    constructor() {
        this.add = Joi.object().keys({
            value: Joi.string().required(),
        });

        this.update = Joi.object().keys({
            value: Joi.string().required(),
        });
    }
}

module.exports = new RoleShemas();