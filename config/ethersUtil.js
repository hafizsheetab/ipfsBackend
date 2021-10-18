const { ethers } = require("ethers");
const { ganacheUrlEndPoint, privateKey, fungibleTokenAddress, fungibleTokenAbi, supplyChainContractAddress, supplyChainSmartContractAbi } = require("./vars");

const provider = new ethers.providers.JsonRpcProvider(`${ganacheUrlEndPoint}`)
const signer = new ethers.Wallet(privateKey, provider)

const erc20 = new ethers.Contract(fungibleTokenAddress, fungibleTokenAbi, signer)
const supplyChain = new ethers.Contract(supplyChainContractAddress, supplyChainSmartContractAbi, signer)
module.exports = {erc20, supplyChain}
