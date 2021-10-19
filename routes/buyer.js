const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const Buyer = require("../Models/Buyer");

router.post("/", auth, async (req, res) => {
    let { firstName, lastName, country, addressLine1, addressLine2, town, state, postCode, phone, email } =
        req.body;
    
    let accountAddress = req.accountAddress
    let filter = {accountAddress}
    let buyer = await Buyer.findOne(filter);
    if (buyer) {
       let update = {firstName, lastName, country, addressLine1, addressLine2, town, state, postCode, phone, email, accountAddress}
       await Buyer.findOneAndUpdate(filter, update)
       buyer = await Buyer.findOne(filter)
       return res.json(buyer)
    }
    buyer = new Buyer({
        firstName, lastName, country, addressLine1, addressLine2, town, state, postCode, phone, email, accountAddress
    });
    await buyer.save()
    res.json(buyer)
});

router.get("/", auth, async(req, res) => {
    const {accountAddress} = req
    let buyer = await Buyer.findOne({accountAddress})
    if(buyer){
        return res.json(buyer)
    }
    res.json({error: "Buyer Not Found"})
})

module.exports = router
