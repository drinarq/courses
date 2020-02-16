const GoodsRep=require("../repository/goods.js");
const TagService=require('./tag.js');
const path=require('path');
const fs=require('fs');
const env=require('../configuration/environment.js');
const NotFoundException=require('../errors/NotFound.js');

class GoodsService{

    async addProduct(product){

        const imageName=path.basename(product.image);
        const image=fs.readFileSync(product.image);

        fs.writeFileSync(env.goods.uploadsPath+imageName,image);


        await GoodsRep.addProduct(product);
    }

    async getGoods(sort){

        const goods=await GoodsRep.getGoods(sort);

        return goods;
    }

    async deleteProduct(id){

        await GoodsRep.deleteProduct();
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

    async addProductTag(value,productId){
        const product=await this.getProduct(productId);

        const tag=await TagService.getByValue(value);

        if(!product){
            throw new NotFoundException('product not found.');

        }

        if(!tag){
            throw new NotFoundException('tag not found.');

        }

        return TagService.addProductTag(productId,tag.dataValues.id);
    }

    async delProductTag(productId){
        const product=await this.getProduct(productId);

        if(!product){
            throw new NotFoundException('product not found.');

        }

        return await TagService.delProductTag(productId);

    }

    async getProductTags(id){
        const product=await this.getProduct(id);

        if(!product){
            throw new NotFoundException('product not found.');

        }

        const tags= await TagService.getProductTags(id);

        if(!tags){
            throw new NotFoundException('product tags not found');
        }
        return tags;

    }

    async getGoodsByTag(value){
        const tag=await TagService.getByValue(value);

        if(!tag){
            throw new NotFoundException('tag not found.');

        }

        return await TagService.getGoodsByTag(value);

    }
}

module.exports= new GoodsService();