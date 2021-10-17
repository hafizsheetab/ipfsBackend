const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({

    cid: {
        type: String,
        required: true
    },
    sellerAccountAddress: {
        type: String,
    },
    added: {
        type: Boolean,
        default: false
    },
    ordered: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['Not Ready For Sale','Ready For Sale', 'Shipped To Wearhouse', 'Received By Warehouse', 'Ready For Delivery', 'Picked Up For Deliver', 'Received']
    },

})

module.exports = mongoose.model('product',ProductSchema)