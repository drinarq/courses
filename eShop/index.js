const express = require("express");
const app = express();
const GoodsRouter = require("F:\\courses\\eShop\\routes\\GoodsRoouter.js");
app.use("/goods",GoodsRouter );
app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});

app.listen(3000);