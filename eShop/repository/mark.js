const MarkModel = require('../models/mark.js');

class MarkRep {
    async getMark(ProductId,userId) {
        const mark = await MarkModel.findOne({where:{product_id:ProductId,user_id:userId}});

        return mark;
    }


    // async getMarksByUserId(userId) {
    //     const marks = await MarkModel.findAll({ where: { user_id: userId } });
    //
    //     return marks;
    // }

    // async getProductMarks(productId) {
    //     const marks = await MarkModel.findAll({ where: { product_id: productId } });
    //
    //     return marks;
    // }

    async addMark(userId,value,productId) {
        console.log(value);
        await MarkModel.create({
            user_id: userId,
            value: value,
            product_id:productId
        });
    }

    async deleteMark(userId,ProductId) {
        await MarkModel.destroy({
            where:
                { user_id: userId,
                  product_id: ProductId
                }
        });
    }

    async updateMark(productId, newMark,userId) {
        const mark = await this.getMark(productId,userId);
        await mark.update({
        value:newMark
        });
    }

    async markCount(productId){
        const count=await MarkModel.count({where:{product_id:productId}});
        return count;

    }


    async totalMark(productId){
        const totalSum=await MarkModel.sum("value",{where:{product_id:productId}});
        const markCount=await MarkModel.count({where:{product_id:productId}});


            if(markCount&&totalSum){
                const totalMark=(totalSum/markCount).toFixed(1)
            }

        return totalSum;
    }
}

module.exports = new MarkRep();