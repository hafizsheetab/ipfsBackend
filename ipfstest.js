const zang = require('./data.json')
const concat = require('it-concat')
const IPFS = require('ipfs')
async function testPostAndGet(){
    const data = []
    let node =  await IPFS.create()
    let result = await node.add({path: './temp/zang.json', content: JSON.stringify(zang)})
    console.log(result)
    for await(const buf of node.get(`Qmakaq9xRzP5BttNTx9pXJMZGFXyrtMADiV6GcWiaxsdkW`)){
            data.push(buf.toString())
    }
    console.log(data[1])
}
testPostAndGet()