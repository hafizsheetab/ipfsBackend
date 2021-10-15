const web3Instance = require('../config/web3Node')
const fungibleTokenAbi = require('../abi/FungibleTokenAbi.json')
const contractAddresses = require('../contractAddresses.json')

module.exports = async () => {
    console.log('listening on fungible toke Smart Contract')
    let fungibleToken = new web3Instance.eth.Contract(fungibleTokenAbi, contractAddresses.pp)
    fungibleToken.events.Transfer({
        fromBlock: 0
    }, function(error, event){
        console.log(event)
    })
}