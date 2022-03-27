var mongoose = require("mongoose");
var empSchema = mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    tel: { type: String, required: true, min: 0, max: 10 },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    DateSignUp: { type: String, default: Date(Date.now()) }

})

var empModel = mongoose.model("employees", empSchema);
module.exports = empModel