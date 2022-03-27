var express = require("express");
var router = express.Router();
var orderModel = require("../models/ordersModel");
var infoPaymentsModel = require("../models/infoPaymentsModel");
router.post("/", (req, res, next) => {
    console.log(req.body);
    orderModel.updateMany({ tableNum: req.session.tableNum }, { payStatus: 'true' }, (err, data) => {
        if (err) console.log(err);
        var infostatus = new infoPaymentsModel(req.body)
        infostatus.save((err, data) => {
            console.log("success");
            req.session.tableNum = null;
            res.redirect("/");
        })
    })
});

module.exports = router;