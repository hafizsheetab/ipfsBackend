const express = require("express");
const router = express.Router();
const deployFungibleToken = require("../DeployScripts/deployFungibleToken");
const deployNonFungibleToken = require("../DeployScripts/deployNonFungibleToken");
const deploySupplyChainSmartContract = require("../DeployScripts/deploySupplyChainSmartContract");
router.post("/ft", async (req, res) => {
    try {
        await deployFungibleToken();
        res.json({ status: true });
    } catch (err) {
        console.log(err);
        res.json({ error: err.message });
    }
});

router.post("/sc", async (req, res) => {
    try {
        await deploySupplyChainSmartContract();
        res.json({ status: true });
    } catch (err) {
        console.log(err);
        res.json({ error: err.message });
    }
});

router.post("/nft", async(req,res) => {
    try{
        await deployNonFungibleToken()
        res.json({status: true})
    } catch(err){
        console.log(err);
        res.json({ error: err.message });
    }
})

module.exports = router
