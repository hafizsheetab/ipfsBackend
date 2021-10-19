const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const Order = require("../Models/Order");
const Product = require("../Models/Product");

router.post("/", auth, async (req, res) => {
    const { productCids, txId } = req.body;
    let { accountAddress } = req;
    let order = new Order({
        productCids,
        buyerAccountAddress: accountAddress,
        txId,
    });
    await Promise.all(
        productCids.map((cid) => {
            let filter = { cid };
            let update = { ordered: true };
            return Product.findOneAndUpdate(filter, update);
        })
    );
    await order.save();
    res.json(order);
});
router.get("/:orderId", auth, async (req, res) => {
    const { orderId } = req.params;
    let order = await Order.findById(orderId);
    let products = await Promise.all(
        order.productCids.map((cid) => {
            return Product.findOne({cid});
        })
    );
    res.json(products)
});
router.get("/", auth, async (req, res) => {
    let accountAddress = req.accountAddress;
    let orders = await Order.find({ buyerAccountAddress: accountAddress });
    res.json(orders);
});

module.exports = router;
