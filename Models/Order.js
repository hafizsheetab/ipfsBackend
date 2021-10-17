const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    buyerAccountAddress: {
        type: string,
        required: true
    },
    txId: {
        type: String
    }
})
module.exports = mongoose.model('order', OrderSchema)