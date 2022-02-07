/*
  LICENSE: MIT
  Created by: Lightnet
*/

const express = require('express')
const app = express()
const port = 80

var routes = require('./routes')
var cors = require('cors')
var bodyParser = require('body-parser')

//const { Server: HyperspaceServer } = require('hyperspace');

async function main(){
  /*
  const server = new HyperspaceServer({
    storage: './my-hyperspace-storage',
    host: 'my-hyperspace'
  })
  
  server.on('client-open', () => {
    // Our program has connected to the daemon
    console.log('(local) A HyperspaceClient has connected')
  })
  server.on('client-close', () => {
    // Our program has disconnected from the daemon
    console.log('(local) A HyperspaceClient has disconnected')
  })

  await server.ready();
  console.log('init HyperspaceServer');
  */


  //app.use(express.static('public'))
  app.use(express.static('./public'))
  app.use(cors())
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))

  // parse application/json
  app.use(bodyParser.json())

  //app.get('/', (req, res) => {
    //res.send('Hello World!')
  //})

  app.use("/",routes)
  
  app.listen(port, () => {
    console.log(`web server listen http://localhost:${port}`)
    console.log('TEST',0);
  })
}

main();
//module.exports.main = main;
module.exports = main;