const web3Instance = require("../config/web3Node");
const nonFungibleTokenAbi = require("../abi/NonFungibleTokenAbi.json");
const nonFungibleTokenByteCode = require("../abi/NonFungibleTokenByteCode.json");
const TokenContract = require("../Models/TokenContract")

module.exports = async () => {
    let nonFungibleTokenContract = new web3Instance.eth.Contract(
        nonFungibleTokenAbi
    );
    let instance = await nonFungibleTokenContract
        .deploy({
            data: nonFungibleTokenByteCode.object,
            arguments: ["NFT", "NFT"]
        })
        .send({
            from: "0x7Ad5d9d260EC2cFBc5058188eeEFF621eFc7D6e6",
            gas: 3000000,
            gasPrice: "1",
        });
        console.log("Non Fungible Contract Has Been Deployed")
        const tokenContract = new TokenContract({
            name: "Product",
            address: instance._address,
            type: "NFT",
            abi: nonFungibleTokenAbi
        })
        await tokenContract.save()
};
