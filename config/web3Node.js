const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.eth.accounts.wallet.add(
    "c6b680ae6d7d3836dbbd11ddcc32c3347b3d9ae82ed98676e7be7b65dd055933"
);
module.exports = web3