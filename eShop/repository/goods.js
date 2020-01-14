const goodsModule=require("../models/goods.js");

class GoodsRep {

    async addProduct(product){
        await goodsModule.create(product)
    }
}

module.exports= new GoodsRep();