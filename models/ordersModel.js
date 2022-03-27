var mongoose = require("mongoose");

var orderSchema = mongoose.Schema({
    tableNum: { type: String, required: true },
    ordersName: { type: String, required: true },
    totalPrice: { type: String, required: true },
    payStatus: { type: String, required: true, default: 'false' },
    dataOrdered: { type: String, default: Date(Date.now()) }
})

var ordersModel = mongoose.model("orders", orderSchema);
module.exports = ordersModel;