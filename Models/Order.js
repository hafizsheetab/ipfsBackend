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
})
module.exports = mongoose.model('order', OrderSchema)