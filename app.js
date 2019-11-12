var express=require('express');
var app=express();

app.get('/',function (req,res) {
    res.send('sasi pisos');
});
app.listen(3000);