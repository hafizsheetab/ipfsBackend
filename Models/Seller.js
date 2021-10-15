const mongoose = require('mongoose')

const SellerSchema = new mongoose.Schema({
    name: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String,
    },
    email: {
        type: String
    },
    accountAddress: {
        type: String
    }
})

module.exports = mongoose.model('seller', SellerSchema)