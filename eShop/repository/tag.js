const tagModel=require('../models/tags.js');
const goodsTagModel=require('../models/goodsTag.js');
const goodsModel=require('../models/goods.js')
const NotFoundException=require('../errors/NotFound.js');


class tagRepository {

    async addTag(tag){
       await tagModel.create({value:tag})

    }

    async getTag(id){
        return await tagModel.findOne({where: {id: id}});

    }

    async getByValue(value){
        return await tagModel.findOne({where: {value: value}});

    }

    async updateTag(id,data){
        const tag=await this.getTag(id);

        await tag.update(data);
    }

    async deleteTag(id){
       await tagModel.destroy({where:{id: id}});

    }

    async getAllTags(){
        return await tagModel.findAll();

    }

    async addProductTag(productId,tagId){
        await goodsTagModel.create({
            product_id:productId,
            tag_id:tagId,
        });

    }

    async delProductTag(productId){
        await goodsTagModel.destroy({where:{product_id:productId}});

    }

    async getProductTags(id){
        const productId=await goodsTagModel.findOne({where:{product_id:id}});

        if(!productId){
            throw new NotFoundException('product tags not found');
        }

        return await tagModel.findAll({attributes: ['value'], where: {id: productId.dataValues.id}});

    }

    async getGoodsByTag(tag){
        const tagId=await this.getByValue(tag);

        const productId=await goodsTagModel.findOne({where:{tag_id:tagId.dataValues.id}});

        return await goodsModel.findAll({where: {id: productId.dataValues.product_id}});

    }

}

module.exports=new tagRepository();