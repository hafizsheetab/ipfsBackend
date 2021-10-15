const web3Instance = require("../config/web3Node");
const fungibleTokenAbi = require("../abi/FungibleTokenAbi.json");
const fungibleTokenByteCode = require("../abi/FungibleTokenByteCode.json");
const TokenContract = require("../Models/TokenContract");
module.exports = async () => {
    let fungibleToken = new web3Instance.eth.Contract(fungibleTokenAbi);
    let instance = await fungibleToken
        .deploy({
            data: fungibleTokenByteCode.object,
            arguments: ["TKN", "TKN"],
        })
        .send({
            from: "0x4dbF5d143912f1cA1E37Ea99d91C31C3D65e6b71",
            gas: 3000000,
            gasPrice: "1",
        });
        console.log("Fungible Token Contract Has Been Deployed")
        const tokenContract = new TokenContract({
            name: "TKN",
            address: instance._address,
            type: "FT",
            abi: fungibleTokenAbi
        })
        await tokenContract.save()
};
