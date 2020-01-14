const express = require("express");
const app = express();
const pasport=require('passport');
const session=require('express-session');
const GoodsRouter = require('./routes/goods.js');
const UserRouter = require('./routes/user.js');
const MarkRouter=require('./routes/mark.js');
const LoginRouter=require('./routes/authorization.js');
const RoleRouter=require('./routes/role.js');
const passportLocal=require('./passport.js')
const sessionConfig=require('./configuration/session.json');

app.use(session(sessionConfig));
passportLocal(pasport);
app.use(pasport.initialize());
app.use(pasport.session());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use("/Goods",GoodsRouter);
app.use("/User",UserRouter);
app.use("/authenticate",LoginRouter);
app.use("/roles",RoleRouter);
app.use("/mark",MarkRouter);
app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});


app.listen(3000);
