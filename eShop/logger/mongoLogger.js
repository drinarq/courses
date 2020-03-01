const MongoClient=require('mongodb').MongoClient;
const env=require('../configuration/environment.js');
const options=require('../configuration/loggerOptions.json');
//const errorSchema=require('../models/loggerError.js');
class Logger {

    async MongoConnection(){

        const client = new MongoClient("mongodb:"+env.logger.host+":"+env.logger.port,options);

        await client.connect().then(result=>{
            console.log("connection with mongoDB established")
        });

        return client;
    }

    async addEventLog(data){

        const client= await this.MongoConnection();

        try {

            const db=client.db(env.logger.dbName);
            const collection=db.collection(env.logger.events);
            await collection.insertOne(data);

        }
        catch(err){
            console.log(err);
        }
        finally {
            await client.close();
        }
    }

    async addErrorLog(data){

        const client = await this.MongoConnection();

        try {

            const db = client.db(env.logger.dbName);
            const collection = db.collection(env.logger.errors);
            await collection.insertOne(data);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            await client.close();
        }


    }
}


module.exports=new Logger();