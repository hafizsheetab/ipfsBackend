const mongoose = require('mongoose')

const TokenContractSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    abi: []
})

module.exports = mongoose.model('tokencontract',TokenContractSchema)