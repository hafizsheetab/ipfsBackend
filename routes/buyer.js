const express = require("express");
const router = express.Router();
const Buyer = require("../Models/Buyer");

router.post("/", auth, async (req, res) => {
    let { firstName, lastName, address, phone, email } =
        req.body;
    let accountAddress = req.body
    let buyer = await Buyer.findOne({ accountAddress });
    if (buyer) {
        return res.json(buyer);
    }
    buyer = new Buyer({
        firstName,
        lastName,
        address,
        phone,
        email,
        accountAddress,
    });
    await buyer.save()
    res.json(buyer)
});

router.get("/", auth, async(req, res) => {
    const {accountAddress} = req.params
    let buyer = await Buyer.findOne(accountAddress)
    if(buyer){
        return res.json(buyer)
    }
    res.json({error: "Buyer Not Found"})
})

module.exports = router
