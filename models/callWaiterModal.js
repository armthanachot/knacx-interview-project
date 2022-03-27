var mongoose = require("mongoose");

var callWaiterSchema = mongoose.Schema({
    Table: { type: String, required: true },
    Message: { type: String },
    shortProblem: { type: String },
    date: {
        type: String,
        default: Date(Date.now())
    }
})

var callWaiterModel = mongoose.model("problems", callWaiterSchema);
module.exports = callWaiterModel;