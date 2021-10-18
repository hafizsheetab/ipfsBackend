const SupplyChainEvent = require('../Models/SupplyChainEvent')
const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()


router.get('/:cid/:productStatus', auth, async(req,res) =>{
    const {cid, productStatus} = req.params
    let supplyChainEvents = await SupplyChainEvent.find({cid, to: {$lte: productStatus}})
    res.json(supplyChainEvents)
})

module.exports = router