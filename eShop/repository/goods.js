const goodsModule=require("../models/goods.js");
const markRep=require("./mark.js");
const op=require('sequelize').Op;
const paginate=require('../helpers/paginate.js');
const isEmpty=require('../helpers/isEmpty.js');

class Goods {

    async addProduct(product){

        await goodsModule.create(product);
    }

    async getGoods(sort){

        let result=[];
        let zero=[];
        let goods=[];

        let page=isEmpty(sort.page)?1:parseInt(sort.page);
        let pageSize=isEmpty(sort.pageSize)?10:parseInt(sort.pageSize);

        if(isEmpty(sort.sortBy)) {
            goods = await goodsModule.findAll(paginate({where:{},
            },{page,pageSize},));
        }

        else if(sort.sortBy==='image'){

            goods=await goodsModule.findAll(paginate({where:{image: {[op.ne]: null},amount:{[op.gt]:0}}},{page,pageSize},));
            zero=await goodsModule.findAll(paginate({where: {image: {[op.ne]: null},amount:0}},{page,pageSize}));
        }
        else{

            goods=await goodsModule.findAll(paginate({where:{amount:{[op.gt]:0}},order:[[sort.sortBy,'ASC']]},{page,pageSize}));
            zero=await goodsModule.findAll(paginate({where:{amount:0},order:[[sort.sortBy,'ASC']]},{page,pageSize}));
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