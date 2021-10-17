const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const Seller = require("../Models/Seller");

router.post("/",auth, async (req, res) => {
    let { name, address, email, phone } = req.body;
    let accountAddress = req.accountAddress
    console.log(accountAddress)
    let filter = {accountAddress: accountAddress}
    let seller = await Seller.findOne(filter);
    if (seller) {
        let update = {
            name, address, email, phone
        }
        await Seller.findOneAndUpdate(filter, update)
        let seller = await Seller.findOne(filter);
        return res.json(seller)
    }
    
    seller = new Seller({
        name,
        address,
        phone,
        email,
        accountAddress
    });
    await seller.save();
    res.json(seller);
});

router.get("/",auth, async (req, res) => {
    const { accountAddress } = req.params;
    let seller = await Seller.findOne({accountAddress: req.accountAddress});
    if (seller) {
        return res.json(seller);
    }
    res.json({ error: "seller Not Found" });
});

module.exports = router;
