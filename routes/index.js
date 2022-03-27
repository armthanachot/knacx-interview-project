var express = require('express');
var router = express.Router();
var QRCode = require("qrcode");
var foodModel = require('../models/foodModel');
var orderModel = require('../models/ordersModel')
var getIP = require("request-ip");
// get client ip 
var geoip = require("geoip-lite");
const empModel = require('../models/employeeModel');

//get geolocation of ip
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
    var ipinfo = getIP.getClientIp(req)
    console.log(ipinfo)
    let ip = req.connection.remoteAddress
    console.log("remote : " + ip)
    let newip = "1.47.35.30";
    var geo = geoip.lookup(newip);
    console.log(geo)
        // 192.168.1 คือ :: ได้ 45 มา ก็รวมเป็น 192.16.1.45
});
router.get('/foods/:foodType', (req, res, next) => {
    var type = req.params.foodType
    console.log(type)
    foodModel.find({ foodType: type }).exec((err, data) => {
        if (err) console.log(err);
        res.render("foods", { foods: data })
    });


})
router.get('/uploadfood', (req, res, next) => {
    res.render("uploadfood");

})
router.get('/callserve', (req, res, next) => {
    res.render("callserve");
})
router.get('/inputTbl/:tblNum', (req, res, next) => {
    req.session.tableNum = req.params.tblNum;
    // console.log(tblNum)
    res.redirect('/')
})
router.get('/checkbill/:tableNumber', (req, res, next) => {
    console.log("Table: " + req.params.tableNumber)
    orderModel.find({ tableNum: req.params.tableNumber, payStatus: 'false' }).exec((err, data) => {
        res.render("checkbill", { url: 'https://www.google.com', tableNumber: req.params.tableNumber, infofood: data })
    })
})

router.get("/testpage/:start", (req, res, next) => {
    var options = "";
    var row = Number(req.params.start);
    if (row == 1) {
        console.log("begin page : " + row)
        options = {
            offset: 0, //ลำดับแถวข้อมูล เริ่มต้น จาก 0 คือแถวแรก
            limit: 2, //ถ้ามันเกิน มันก็จะแสดงแค่ที่มี
            collection: {
                locale: 'en'
            }
        };

    } else {

        var startPage = row + ((row - 1) * 2);
        console.log("start Page : " +
            startPage)
        startPage--;
        options = {
            offset: row, //ลำดับแถวข้อมูล เริ่มต้น
            limit: 2, //ถ้ามันเกิน มันก็จะแสดงแค่ที่มี
            collection: {
                locale: 'en'
            }
        };
    }

    foodModel.paginate({}, options, (err, result) => {
        console.log(result.docs);
    })
})

router.get("/testCall", (req, res, next) => {
    res.render("testCallApi");
})

router.get("/empReg", (req, res, next) => {
    res.render("empReg")
})
router.get("/getEmp", (req, res, next) => {
    empModel.find().exec((err, data) => {
        console.log(data)
        res.render("empManage", { allEmpData: data })
    })

})
router.get("/loginEmp", (req, res, next) => {
    res.render("login");
})

router.post("/testajax", (req, res, next) => {
    empModel.findOne({ fname: req.body.fname }, (err, data) => {
        if (err) console.log(err)
        res.json(data);

    })


})
module.exports = router;