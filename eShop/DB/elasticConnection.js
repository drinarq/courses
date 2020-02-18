const es = require('elasticsearch');
const esConfig=require('../configuration/elasticsearchConfig.json');
const esClient = new es.Client(
    esConfig);

esClient.ping({
    requestTimeout:30000,
    },
     (err) =>{
        if(err){
            throw err;
        }
        else{
            console.log("elasticsearch work well");
        }
    }
);

module.exports=esClient;