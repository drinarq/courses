const goodsModule=require("../models/goods.js");
const markRep=require("./mark.js");
const op=require('sequelize').Op;
class Goods {

    async addProduct(product){
        await goodsModule.create(product)
    }

    async getGoods(){
        const goods= await goodsModule.findAll();

        for(let value of goods){
            let productId=value.id;
            value.dataValues["Marks amount"]=await markRep.markCount(productId);
            value.dataValues["TotalMark"]=await markRep.totalMark(productId);

        }

        return goods;
    }

    async deletePoduct(id){
        await goodsModule.destroy({where:{id:id}})
    }

    async getProduct(id){
        const product = await goodsModule.findAll({where:{id:id}});
        for(let value of product){
            let productId=value.id;
            value.dataValues["Marks amount"]=await markRep.markCount(productId);
            value.dataValues["TotalMark"]=await markRep.totalMark(productId);

        }

        return product;
    }

    async updateProduct(id,field){
        const product=await goodsModule.findOne({where:{id:id}});
        const date={update_date:new Date()};
        await product.update(field);
        await product.update(date);
    }

    async getGoodsByName(){
        const goods=await goodsModule.findAll({where:{amount:{[op.gt]:0}},order:[['name','ASC']]});

        const zero=await goodsModule.findAll({where:{amount:0},order:[['name','ASC']]});

        const result=goods.concat(zero);

        for(let value of result){
            let productId=value.id;
            value.dataValues["Marks amount"]=await markRep.markCount(productId);
            value.dataValues["TotalMark"]=await markRep.totalMark(productId);

        }
        return result;
    }


    async getGoodsByUpDate(){
        const goods=await goodsModule.findAll({where:{amount:{[op.gt]:0}},order:[['update_date','ASC']]});

        const zero=await goodsModule.findAll({where:{amount:0},order:[['update_date','ASC']]});

        const result=goods.concat(zero);

        for(let value of result){
            let productId=value.id;
            value.dataValues["Marks amount"]=await markRep.markCount(productId);
            value.dataValues["TotalMark"]=await markRep.totalMark(productId);

        }

        return result;
    }

    async getGoodsWithImage(){
        const goods=await goodsModule.findAll({where:{image: {[op.ne]: null},amount:{[op.gt]:0}}});

        const zero=await goodsModule.findAll({where: {image: {[op.ne]: null},amount:0}});

        const result=goods.concat(zero);

        for(let value of result){
            let productId=value.id;
            value.dataValues["Marks amount"]=await markRep.markCount(productId);
            value.dataValues["TotalMark"]=await markRep.totalMark(productId);
            console.log(value);

        }

        return result;
    }

    async setMark(userId,value,productId){
        if (await markRep.getMark(productId,userId)){
              await markRep.updateMark(productId,value,userId);
        }
        else {
            await markRep.addMark(userId, value, productId);
        }

    }

    async deleteMark(userId,productId){
        await markRep.deleteMark(userId,productId);
    }
}



module.exports= new Goods();