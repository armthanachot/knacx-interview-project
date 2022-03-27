var express = require("express");
var router = express.Router();
var foodModel = require('../models/foodModel')
router.get("/", (req, res, next) => {
    res.render("uploadfood")
})

router.post("/upload", (req, res, next) => {
    const foodname = req.body.foodname
    const foodprice = req.body.foodprice
    const foodtype = req.body.foodtype
    var recipes = ""
    var img = ""
    if (!req.files.foodrecipes || !req.files.foodimg) {
        console.log("some data dont have");
        if (req.files.foodimg) {
            console.log("dont have recipe")
            img = req.files.foodimg.name
            img = img.toString()
            var imgfilename = req.files.foodimg
            imgfilename.mv('./public/images/foods/' + img, (err) => {
                if (err) console.log(err)
                next();
            })
        }
        if (req.files.foodrecipes) {
            console.log("dont have img")
            recipes = req.files.foodrecipes.name
            recipes = recipes.toString()
            var recipesfilename = req.files.foodrecipes
            imgfilename.mv('./public/foodRecipes/' + recipes, (err) => {
                if (err) console.log(err)
                next();
            })
        }
        var foodDocs = new foodModel({
            foodName: foodname,
            foodPrice: foodprice,
            foodType: foodtype,
            image: img,
            recipes: recipes
        });
        foodDocs.save((err, data) => {
            if (err) console.log(err);
            res.setHeader('Content-Type', 'text/plain');
            res.status(200).redirect("/uploadfood");
            res.end();
        })

    } else {
        recipes = req.files.foodrecipes.name
        recipes = recipes.toString();
        img = req.files.foodimg.name
        img = img.toString()
        var recipesfilename = req.files.foodrecipes
        var imgfilename = req.files.foodimg
        console.log("recipe : " + recipes)
        console.log("image : " + img)

        var foodDocs = new foodModel({
            foodName: foodname,
            foodPrice: foodprice,
            foodType: foodtype,
            image: img,
            recipes: recipes
        });
        foodDocs.save((err, data) => {
            if (err) console.log(err)
            imgfilename.mv('./public/images/foods/' + img, (err) => {
                if (err) console.log(err)
                recipesfilename.mv('./public/foodRecipes/' + recipes, (err) => {
                    if (err) console.log(err)
                    res.redirect("/uploadfood");


                })

            })

        })
    }


})

module.exports = router;