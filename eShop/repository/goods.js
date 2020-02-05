const goodsModule=require("../models/goods.js");
const markRep=require("./mark.js");
const op=require('sequelize').Op;
const fs=require('fs');
const isEmpty=require('../helpers/isEmpty.js');
class Goods {

    async addProduct(product){
        await goodsModule.create(product);
    }

    async getGoods(sort){
        let result=[];
        let zero=[];
        let goods=[];

        if(isEmpty(sort)) {
            goods = await goodsModule.findAll();
        }

        else if(sort.sortBy==='image'){
            goods=await goodsModule.findAll({where:{image: {[op.ne]: null},amount:{[op.gt]:0}}});
            zero=await goodsModule.findAll({where: {image: {[op.ne]: null},amount:0}});
            console.log(zero);

        }
        else{
            goods=await goodsModule.findAll({where:{amount:{[op.gt]:0}},order:[[sort.sortBy,'ASC']]});

            zero=await goodsModule.findAll({where:{amount:0},order:[[sort.sortBy,'ASC']]});


        }

        result=goods.concat(zero);

        for(let value of result){
            let productId=value.id;
            value.dataValues["Marks amount"]=await markRep.markCount(productId);
            value.dataValues["TotalMark"]=await markRep.totalMark(productId);
        }


        return result;
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