// const http = require("http");
// http.createServer(function(request,response){
//      
//     response.end("Hello NodeJS!");
//      
// }).listen(3000, "127.0.0.1",function(){
//     console.log("Сервер начал прослушивание запросов на порту 3000");
// });
var express=require('express');
var app=express();

app.get('/',function (req,res) {
    res.send('sasi pisos');
});
app.listen(3000);