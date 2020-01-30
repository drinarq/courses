const Joi = require('joi');

class GoodsShema {
    constructor() {
        this.add = Joi.object().keys({
            name: Joi.string().required(),
            price: Joi.number().required(),
            image: Joi.string(),
            amount: Joi.number().required(),
            description: Joi.string().required(),
            update_date:Joi.date()
        });

        this.update = Joi.object().keys({
            name: Joi.string(),
            price: Joi.number(),
            image: Joi.string(),
            amount: Joi.number(),
            description: Joi.string(),
            update_date:Joi.date()
        });
    }
}

module.exports = new GoodsShema();