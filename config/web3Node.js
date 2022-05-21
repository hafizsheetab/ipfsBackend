const Web3 = require("web3");
const { ganacheUrlEndPoint } = require("./vars");
const web3 = new Web3(new Web3.providers.HttpProvider(`${ganacheUrlEndPoint}`));
web3.eth.accounts.wallet.add(
    "cfd4c7ad786988c6ae1f3129756c091f1184478fde19a74b3b8d1119649212b1"
);
module.exports = web3