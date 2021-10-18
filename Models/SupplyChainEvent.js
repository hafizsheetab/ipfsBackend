const mongoose = require("mongoose");

const SupplyChainEventSchema = new mongoose.Schema({
    changer: {
        type: String,
    },
    cid: {
        type: String,
    },
    from: {
        type: Number,
    },
    to: {
        type: Number
    },
    event: {

    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("supplychainevent", SupplyChainEventSchema);