const GoodsRep=require("../repository/goods.js");

class GoodsServices{

    async addProduct(product){
        await GoodsRep.addProduct(product);
    }
}

module.exports= new GoodsServices();