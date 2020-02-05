const express = require("express");
const app = express();
const pasport=require('passport');
const session=require('express-session');
const loader=require('./loader/index.js');

app.use(loader);
app.use((req, res, next)=> {
    res.status(404).send("Not Found")
});


app.listen(3000);
