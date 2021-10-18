const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    productCids: [
        { 
            type: String, 
            required: true 
        }
    ],
    buyerAccountAddress: {
        type: String,
        required: true,
    },
    txId: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model("order", OrderSchema);
