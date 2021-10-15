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
            from: "0x4dbF5d143912f1cA1E37Ea99d91C31C3D65e6b71",
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
