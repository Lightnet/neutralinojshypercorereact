//unsafe...

const HyperspaceClient = require('@hyperspace/client')

async function init(){
  //const client = new HyperspaceClient() // connect to the Hyperspace server

  const client = new HyperspaceClient({
    host: 'my-hyperspace'
  })

  const corestore = client.corestore() // make a corestore
  //const feed = corestore.get(someHypercoreKey) // make a hypercore
  //await feed.get(42) // get some data from the hypercore
  console.log('test...');
}

init();