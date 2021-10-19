const {  erc20 } = require("../config/ethersUtil");
const TokenTransactionEvent = require("../Models/TokenTransactionEvent");

module.exports = async () => {
    console.log("listening on Fungible Token Smart Contract");

    erc20.on("Transfer", (from, to, value, event) => {
        let tokenTransactionEvent = new TokenTransactionEvent({
            from,
            to,
            value: Number(value),
            event,
        });
        tokenTransactionEvent.save().then((res) => {
            console.log(res);
        });
    });
};