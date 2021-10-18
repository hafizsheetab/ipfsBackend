const mongoose = require('mongoose')

const BuyerSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    country: {
        type: String
    },
    addressLine1: {
        type: String
    },
    addressLine2: {
        type: String
    },
    town: {
        type: String
    },
    state: {
        type: String
    },
    phone: {
        type: String
    },
    postCode: {
        type: String
    },
    email: {
        type: String
    },
    accountAddress: {
        type: String
    }
})

module.exports = mongoose.model('buyer',BuyerSchema)