const express = require('express')
const router = express.Router()
const TokenContract = require('../Models/TokenContract')

router.get('/',async(req, res) => {
    let {name} = req.body
    let tokenContract = await TokenContract.findOne({name})
    res.json(tokenContract)
})