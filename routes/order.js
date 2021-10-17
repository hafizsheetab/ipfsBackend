const express= require('express')
const router = express.Router()
const Order = require('../Models/Order')

router.post('/', async(req, res) => {
    const{cid,  txId} = req.body
    let {accountAddress} = req
    let order = new Order({
        productCid: cid,
        buyerAccountAddress: accountAddress,
        txId
    })
    await order.save()
    res.json(order)
})

router.get('/', auth, async(req, res) => {
    let accountAddress = req.accountAddress
})
router.get('/:orderId', async(req, res) => {
    const {orderId} = req.params
    let order = await Order.findById(orderId)
    res.json(order)
})

module.exports = router