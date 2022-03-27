var express = require("express");
var router = express.Router()
var ordersModel = require("../models/ordersModel")

router.get("/:namelist/:pricelist/:tableNum", (req, res, next) => {
    const namelist = req.params.namelist
    const pricelist = req.params.pricelist
    const namesplit = namelist.toString().split(",");
    const pricesplit = pricelist.toString().split(",");
    const tableNum = req.params.tableNum
    let total = 0;
    for (var i in namesplit) {
        total += Number(pricesplit[i])
    }
    var orderDoc = new ordersModel({ tableNum: tableNum, ordersName: namelist.trim(), totalPrice: total });
    orderDoc.save((err, data) => {
        if (err) console.log(err);
        res.redirect("/");
    })

})
router.get("/checkorder/:namelist/:pricelist/:tableNum", (req, res, next) => {

    res.render("confirm", {
        namelist: req.params.namelist,
        pricelist: req.params.pricelist,
        tableNum: req.params.tableNum,
    })
    console.log("hello");
})


module.exports = router;