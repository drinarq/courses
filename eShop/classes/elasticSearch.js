const esClient=require("../DB/elasticConnection.js");

 class elasticSearch {

     async checkIndex(name){
         const check=await esClient.indices.exists({
             index:name
         });

         return !!check;
     }

    async createIndex(name){
         if(!this.checkIndex(name)){
        await esClient.indices.create({
             index:name
            })
         }
     }

    async addToIndex(data,name){
        if(!this.checkIndex(name)){
        await esClient.index({
            index:name,
            body:data,
            })
        }
     }

    async indexSearch(name,match){
        return await esClient.search({
            index:name,
            body:{
                query:{
                    match:match,
                }
            }
        })
     }

    async deleteFromIndex(id,name){
        if(!this.checkIndex(name)){
        await esClient.deleteByQuery({
            index:name,
            body:{
                query:{
                    match:{
                        id:id
                        }
                    }
                }
            })
        }
     }

    async deleteIndex(name) {
        if (!this.checkIndex(name)) {
            await esClient.indices.delete({
                index: name
            })
        }
    }

 }

 module.exports=new elasticSearch();