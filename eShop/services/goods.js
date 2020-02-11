const GoodsRep=require("../repository/goods.js");

class Goods{

    async addProduct(product){

        await GoodsRep.addProduct(product);
    }

    async getGoods(sort){

        const goods=await GoodsRep.getGoods(sort);

        return goods;
    }

    async deleteProduct(id){

        await GoodsRep.deletePoduct(id);
    }

    async getProduct(id){

        const product=await GoodsRep.getProduct(id);

        return product;
    }

    async updateProduct(id,field){

        await GoodsRep.updateProduct(id,field);
    }



    async setMark(userId,value,productId){

        const mark=await GoodsRep.setMark(userId,value,productId);

        return mark;

    }

    async deleteMark(userId,productId){

        return await GoodsRep.deleteMark(userId,productId);
    }
}

module.exports= new Goods();