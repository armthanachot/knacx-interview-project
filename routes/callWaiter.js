var express = require("express");
var router = express.Router();
var callWaiterModel = require("../models/callWaiterModal");
router.post("/", (req, res, next) => {
    var problemDoc = new callWaiterModel(req.body);
    problemDoc.save((err, data) => {
        if (err) console.log(err);
        res.redirect("/");
    })
})

module.exports = router;