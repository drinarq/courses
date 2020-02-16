const tagRepository=require('../repository/tag.js');
const NotFoundException=require('../errors/NotFound.js');
class tagService {

    async addTag(tag){
        return await tagRepository.addTag(tag);

    }

    async getTag(id){
        return await tagRepository.getTag(id);

    }

    async getByValue(value){
        return await tagRepository.getByValue(value);

    }

    async updateTag(id,data){
        if(!this.getTag(id)){
            throw new NotFoundException(`tag with ${id} not found`);
        }

        return await tagRepository.updateTag(id,data);

    }

    async deleteTag(id){
        if(!this.getTag(id)){
            throw new NotFoundException(`tag with ${id} not found`);
        }

        return await tagRepository.deleteTag(id);

    }

    async getAllTags(){
        return await tagRepository.getAllTags();

    }

    async addProductTag(productId,tagId){
        return await tagRepository.addProductTag(productId,tagId);

    }

    async delProductTag(productId){
        return await tagRepository.delProductTag(productId);

    }

    async getProductTags(id){
        return await tagRepository.getProductTags(id);

    }

    async getGoodsByTag(tag){
        return await tagRepository.getGoodsByTag(tag);

    }
    
}

module.exports=new tagService();