const tagService=require('../services/tag.js');
const EmptyResException = require('../errors/EmptyRsponseError.js');
const resMessage = require('../helpers/helper.js');
const NotFoundException=require('../errors/NotFound.js');
const HTTPStatus = require('http-status-codes');


class tagController {

    async addTag(req,res,next){
        const tag=req.body.tag;

        if (!tag) {
            return next(new EmptyResException('Empty response body.'));
        }

        await tagService.addTag(tag);

        res.status(HTTPStatus.OK);
        res.json(resMessage.OK(HTTPStatus.OK,'tag added',tag));

    }

    async getByValue(req,res,next){
        const value=req.body.tag;

        const tag=await tagService.getByValue(value);

        if(!tag){
            return next(new NotFoundException(`tag not found.`))

        }

        res.status(HTTPStatus.OK);
        res.json(resMessage.OK(HTTPStatus.OK,'tag:',tag));

    }

    async getTag(req,res,next){
        const tagId=req.params.id;

        const tag=await tagService.getTag(tagId);

        if(!tag){
            return next(new NotFoundException(`tag with ${tagId} not found.`))
        }

        res.status(HTTPStatus.OK);
        res.json(resMessage.OK(HTTPStatus.OK,'tag:',tag));
    }

    async updateTeg(req,res,next){
        const tagId=req.params.id;
        const data=req.body.value;

        await tagService.updateTag(tagId,data);

        res.status(HTTPStatus.OK);
        res.json(resMessage.OK(HTTPStatus.OK,`tag with id ${tagId} successfully updated.`))
    }

    async deleteTag(req,res,next){
        const tagId=req.params.id;

        await tagService.deleteTag(tagId);

        res.status(HTTPStatus.OK);
        res.json(resMessage.OK(HTTPStatus.OK, `tag with ${tagId} successfully deleted.`));

    }

    async getAllTags(req,res,next){
        const tags= await tagService.getAllTags();

        if(!tags){
            return next(new NotFoundException('tags not found'));
        }

        res.status(HTTPStatus.OK);
        res.json(resMessage.OK(HTTPStatus.OK,'tags:',tags));
    }


}

module.exports=new tagController();