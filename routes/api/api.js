var express = require("express");
const axios = require("axios");
var router = express.Router();
let jsondata = require("./data.json");
var empModel = require("../../models/employeeModel")
var bcrypt = require("bcrypt")
const instant = axios.create({
        baseURL: 'http://localhost:3000'
    })
    //กำหนด axios ให้ยิงไปที่ 3000

router.get("/dogData", (req, res, next) => {
    const getBreeds = () => {
        try {
            return axios.get('https://dog.ceo/api/breeds/list/all')
        } catch (error) {
            console.error(error)
        }
    }

    const countBreeds = async() => {
        const breeds = getBreeds()
            .then(response => {
                if (response.data.message) {
                    console.log(Object.keys(response))
                    console.log(
                        `Got ${Object.entries(response.data.message).length} breeds`

                    );

                    console.log(response)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    countBreeds()
})

router.get("/doginfo", (req, res, next) => {
        axios.get('https://dog.ceo/api/breeds/list/all').then((response) => {
            console.log(response.data.message.terrier)
        }).catch((err) => {
            console.log(err)
        })
    })
    //----------------- Get -------------------
    // router.get("/userinfo/:id", (req, res, next) ใช้ตอนรับ id ที่ถูกยิงมา
router.get("/userinfo/", (req, res, next) => {
    // https://jsonplaceholder.typicode.com/todos/
    var id = req.params.id
        // res.status(200).send(jsondata.user[id].name)
        //ใช้ในกรณีที่ต้องการค้นหาด้วย id 
    res.status(200).send(jsondata)
})
router.get('/getuserData/:id', (req, res, next) => {

    instant.get('api/userinfo/' + req.params.id).then((res) => {
            console.log(res.data)
        })
        // เราทำการส่ง method get ไปที่ router api/userinfo โดยการที่่ router นี้ทำการรับ id มา และส่ง id ไปให้ตัวที่มันจะยิงไปด้วย จากนั้นให้ console.log(res.data) ออกมา 
        //instant ไปดูข้างบน
})

// ------------- Post -------------------
router.get('/postData', (req, res, next) => {
    instant.post('api/addData', {
            name: "Patharanit",
            lname: "Tesjaroen",
            graduate: "NPK"
        }).then((res) => {
            console.log(res)
        })
        //instant ไปดูข้างบน
        //ทำการยิง methtod post ไปที่ api/addData โดยส่ง parameter ตามนั้นไป จากนั้นให้ console.log(res)
})
router.post('/addData', (req, res, next) => {
    console.log(req.body)
    console.log(Object.keys(jsondata.user).length)
    var index = Object.keys(jsondata.user).length
    index = index + 1;
    jsondata.user[index] = {
        "name": req.body.name,
        "lname": req.body.lname,
        "graduate": req.body.graduate
            //req.body มาจาก request ที่ถูกยิงมา 
    }
    console.log(jsondata)
        //เมื่อถูกยิง request มา ก็แล้วแต่จะเอาข้อมูลไปทำอะไร โดย request มาจาก req.body อาจจะเป็นการบันทึกลง DB ก็ได้  

})

//------------- Put -----------------
router.get("/putData", (req, res, next) => {
    instant.put("/api/updateData", {
        name: "Jatuphon"
    }).then((res) => {
        console.log(res.data)
    }).catch((err) => {
        console.log(err)
    })
})
router.put("/updateData", (req, res, next) => {
    console.log("name : " + req.body.name);
})

//------------ Delete -----------------
router.get("/deleteData", (req, res, next) => {
    instant.delete("/api/delData/" + 1).then((res) => {
        console.log(res.data);
    });
    res.render("index");

})

router.delete("/delData/:id_number", (req, res, next) => {
        // console.log(Object.keys(req))
        console.log("hi")
        console.log("id : " + req.params.id_number)

    })
    // -----------------  ของจริง ----------------
router.post("/reg", (req, res, next) => {
    // console.log(req.body);
    const salt = 10;
    const { fname, lname, email, tel, userName, password, confirmpassword } = req.body

    bcrypt.hash(password, salt, (err, result) => {
        if (err) console.log(err);
        const hashed = result;
        bcrypt.compare(confirmpassword, hashed, (err, result) => {
            if (err) console.log(err);
            else {
                var empData = new empModel({
                    fname: fname,
                    lname: lname,
                    email: email,
                    tel: tel,
                    userName: userName,
                    password: hashed
                });
                empData.save((err, data) => {
                    if (err) console.log(err);
                    console.log(data);
                    res.redirect("/loginEmp")
                })
            }
        })
    })


});

router.post("/empData", (req, res, next) => {
    console.log(req.body.email)
    empModel.findOne({
        email: req.body.email
    }, (err, data) => {
        console.log(data)
        res.render("empManage", { empData: data })
    })
})

router.post("/dataUpdate", (req, res, next) => {
    instant.put("/api/updatedEmp", { fname: req.body.fname, lname: req.body.lname, tel: req.body.tel, email: req.body.email }).then((res) => {
        console.log("success")
    }).catch((err) => {
        console.log(err);
    })
    res.redirect("/getEmp")

})

router.put("/updatedEmp", (req, res, next) => {
    console.log(req.body)
    empModel.findOneAndUpdate({ email: req.body.email }, { fname: req.body.fname, lname: req.body.lname, tel: req.body.tel }, (err, data) => {
        if (err) console.log(err)
        console.log("data")
    })
})

router.get("/deleteData/:_id", (req, res, next) => {
    console.log(req.params._id)
    instant.delete("/api/deleted/" + req.params._id).then((res) => {
        console.log("success");
    }).catch((err) => { console.log(err) });
    res.redirect("/getEmp")

});
router.delete("/deleted/:_id", (req, res, next) => {
    empModel.findByIdAndRemove({ _id: req.params._id }, (err, data) => {
        if (err) console.log(err)
        console.log("deleted");
    })
});

router.get("/allData", (req, res, next) => {

        empModel.find().exec((err, result) => {
            if (err) console.log(err);
            res.status(200).send(result)
        })
    })
    // ----------------- login
router.post("/checklogin", (req, res, next) => {
    empModel.findOne({ $or: [{ userName: req.body.username_email }, { email: req.body.username_email }] }, (err, data) => {
        // console.log(data.toJSON().userName)
        if (err) {
            console.log(err);
        } else if (data) {
            // console.log(Object.keys(data))
            // console.log(data)
            var isCorrect = bcrypt.compareSync(req.body.password, data.toJSON().password);
            if (isCorrect) {
                res.redirect('/uploadfood')
            } else {
                res.render("login", { errMessage: "invalid username or password" })
            }
        } else {
            res.render("login", {
                errMessage: "invalid username or password"
            })
        }
    })
})
module.exports = router;