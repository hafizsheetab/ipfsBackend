
const { supplyChain, erc20 } = require('../config/ethersUtil')
const { ipfsGet } = require('../config/ipfsNode')
const SupplyChainEvent = require('../Models/SupplyChainEvent')

module.exports = async () => {
    console.log('listening on Supply Chain Smart Contract')
    
    supplyChain.on("StatusChanged",(changer, cid, from, to, event) => {
        let supplyChainEvent = new SupplyChainEvent({
            changer,
            cid,
            from: Number(from),
            to: Number(to),
            event
        })
        if(Number(from) === 2 && Number(to) === 3){
            ipfsGet(cid).then(data => {
                console.log(data[1])
                let productIpfs = data[1]
                productIpfs = JSON.parse(productIpfs)
                supplyChain.productOwner(cid).then(productOwner => {
                    erc20.transfer(productOwner, Number(productIpfs.price)).then(result => {
                        console.log(result)
                    })
                })
            })
        }
        else if(Number(from) === 3 && Number(to) === 4){
            ipfsGet(cid).then(data => {
                console.log(data[1])
                let productIpfs = data[1]
                productIpfs = JSON.parse(productIpfs)
                supplyChain.productDeliveryMan(cid).then(productDeliveryMan => {
                    erc20.transfer(productDeliveryMan, 60).then(result => {
                        console.log(result)
                    })
                })
            })

        }
        supplyChainEvent.save().then(res => {
            console.log(res)
        })
    })
}