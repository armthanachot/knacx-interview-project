var mongoose = require("mongoose")
var mongoosePaginate = require('mongoose-paginate-v2');

var foodSchema = mongoose.Schema({
    foodName: { type: String, require: true },
    foodPrice: { type: String, require: true },
    foodType: { type: String, require: true },
    image: { type: String },
    recipes: { type: String },
    date_upload: { type: String, default: Date(Date.now) }
});
foodSchema.plugin(mongoosePaginate);
var food = mongoose.model("foods", foodSchema);
module.exports = food;
food.paginate().then({});