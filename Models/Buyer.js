const mongoose = require('mongoose')

const BuyerSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
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