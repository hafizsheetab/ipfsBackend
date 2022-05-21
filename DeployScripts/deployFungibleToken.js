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
            from: "0x7Ad5d9d260EC2cFBc5058188eeEFF621eFc7D6e6",
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
