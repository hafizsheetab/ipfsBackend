const express= require('express')
const router = express.Router()
const Order = require('../Models/Order')

router.post('/', async(req, res) => {
    const{productId, buyerId} = req.body
    let order = new Order({
        product: productId,
        buyer: buyerId
    })
    await order.save()
    res.json(order)
})

router.get('/:orderId', async(req, res) => {
    const {orderId} = req.params
    let order = await Order.findById(orderId)
    res.json(order)
})

module.exports = router