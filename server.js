const express = require('express')
const {ipfsStart} = require('./config/ipfsNode')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./Config/db');
const listenForStatusChangeOnSupplyChain = require('./ListenerScripts/listenForStatusChangeOnSupplyChain');
const listenForTokenTransaction = require('./ListenerScripts/listenForTokenTransaction');
const app = express()

//listener Scripts
listenForTokenTransaction()
listenForStatusChangeOnSupplyChain()
//starting the ipfs node
ipfsStart()
//Connecting to the Database
connectDB()

app.use(express.json({extende: false}))
app.use(cors())
app.get('/',(req,res) => res.send(`API Running`))
app.use('/api/deploy', require('./routes/deploy'))
app.use('/api/product', require('./routes/product'))
app.use('/api/seller', require('./routes/seller'))
app.use('/api/buyer', require('./routes/buyer'))
app.use('/api/order', require('./routes/order'))
app.use('/api/supplyChainEvent', require('./routes/supplyChainEvent'))

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('./routes/api'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
  }
  
  const PORT = process.env.PORT || 5000;
  
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

