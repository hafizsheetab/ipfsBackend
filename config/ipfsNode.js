let ipfsNode
const IPFS = require('ipfs')
async function ipfsStart(){
    ipfsNode = await IPFS.create()
}

async function ipfsAdd(content){
    let result = await ipfsNode.add({path: "", content})
    return result.cid.toString()
}

async function ipfsGet(cid){
    const data = [];
    for await (const buf of ipfsNode.get(cid)) {
        data.push(buf.toString());
    }
    return data
}

async function ipfsGetImage(cid){
    for await (const file of ipfsNode.get(cid)){
        const content = []
        if(file.content){
            for await(const chunk of file.content){
                content.push(chunk)
            }
            return URL.createObjectURL(new Blob())
        }
    }
}
module.exports = {ipfsNode, ipfsStart, ipfsAdd, ipfsGet}