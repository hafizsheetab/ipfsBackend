const web3Instance = require('../config/web3Node')
const supplyChainContractAbi = require('../abi/SupplyChainContractAbi.json')
const contractAddresses = require('../contractAddresses.json')

module.exports = async () => {
    console.log('listening on Supply Chain Smart Contract')
    let supplyChain = new web3Instance.eth.Contract(supplyChainContractAbi, contractAddresses.sc)
    supplyChain.events.Status({
        fromBlock: 0
    }, function(error, event){
        console.log(event)
    })
}