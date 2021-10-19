const mongoose = require("mongoose");

const TokenTransactionEventSchema = new mongoose.Schema({
  
    from: {
        type: String,
    },
    to: {
        type: String,
    },
    value: {
        type: Number
    },
    event: {

    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("tokentransactionevent", TokenTransactionEventSchema);