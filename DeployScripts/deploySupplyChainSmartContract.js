const web3Instance = require("../config/web3Node");
const supplyChainContractAbi = require('../abi/SupplyChainContractAbi.json')
const supplyChainContractByteCode = require('../abi/SupplyChainContractByteCode.json')
const TokenContract = require("../Models/TokenContract");
module.exports = async () => {
    let supplyChainContract = new web3Instance.eth.Contract(supplyChainContractAbi);
    let instance = await supplyChainContract
        .deploy({
            data: supplyChainContractByteCode.object,
        })
        .send({
            from: "0x7Ad5d9d260EC2cFBc5058188eeEFF621eFc7D6e6",
            gas: 3000000,
            gasPrice: "1",
        });
        console.log("Supply Chain Contract Has Been Deployed")
        const tokenContract = new TokenContract({
            name: "Product Status",
            address: instance._address,
            type: "util",
            abi: supplyChainContractAbi
        })
        await tokenContract.save()
};
