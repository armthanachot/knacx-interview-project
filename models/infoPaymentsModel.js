var mongoose = require("mongoose");

var info_payment_schema = mongoose.Schema({
    TableNum: { type: String, required: true },
    Total: { type: String, required: true },
    Money: { type: String, required: true },
    Change: { type: String, required: true },
    datePay: {
        type: String,
        default: Date(Date.now())
    }
});

var paymentModel = mongoose.model("info_payments", info_payment_schema);
module.exports = paymentModel;