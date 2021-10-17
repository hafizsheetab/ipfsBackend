const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    productCid: {
        type: String,
        required: true
    },
    buyerAccountAddress: {
        type: String,
        required: true
    },
    txId: {
        type: String
    }
})
module.exports = mongoose.model('order', OrderSchema)