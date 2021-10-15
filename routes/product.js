const express = require("express");
const { ipfsNode, ipfsAdd, ipfsGet } = require("../config/ipfsNode");
const router = express.Router();
const Product = require("../Models/Product");
const multer = require("multer");
const path = require("path")
const fs = require('fs')

const storage = multer.diskStorage({
    destination:'./upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage
})
router.get('/', async(req, res) => {
    let products = await Product.find()
    res.json(products)
})
router.get("image/:cid", async (req, res) => {
    
})
router.get("/:cid", async (req, res) => {
    const { cid } = req.params;
    const data = await ipfsGet(cid)
    console.log(data[1])
    let productIpfs = data[1]
    let productDb = await Product.findOne({cid: cid})
    // productDb = await populateProduct(productDb)
    res.json(productIpfs);
});

router.put('/changeStatus', async(req, res) => {
    let {status, cid} = req.body
    let product = await Product.findOne({cid})
    product.status = status
    await product.save()
    res.json(product)
})

router.post("/upload", upload.single("productImage"), async (req, res) => {
    const {file, body} = req
    
    let cid = await ipfsAdd(fs.readFileSync(`${file.destination}/${file.filename}`))
    let imgUri = `${cid}`
    let productMetaData = {
        name: body.name,
        description: body.description,
        price: body.price,
        imgUri
    }
    cid = await ipfsAdd(Buffer.from(JSON.stringify(productMetaData)))
    let productLink = `https://ipfs.io/ipfs/${cid}`
    console.log(req.body)
    console.log(req.file);
    let product = new Product({
        cid,
        status: 'Not Ready For Sale'
    })
    await product.save()
    res.json({ product });
});

const populateProduct = async (product) => {
    await product.populate([{path: 'seller', select: 'name email'}]).execPopulate()
    return product
}
module.exports = router;