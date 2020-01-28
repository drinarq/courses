const Joi = require('joi');

class MarkShema {
    constructor() {
        this.add = Joi.object().keys({
            user_id: Joi.number().required(),
            value: Joi.number().required(),
            product_id:Joi.number().required()
        });

        this.update = Joi.object().keys({
            user_id: Joi.number(),
            value: Joi.number(),
            product_id:Joi.number()
        });
    }
}

module.exports = new MarkShema();