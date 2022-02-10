const { Server: HyperspaceServer } = require('hyperspace')


//const server = new HyperspaceServer()
//await server.ready()

//const server = new HyperspaceServer({
  //storage: './my-hyperspace-storage',
  //host: 'my-hyperspace'
//})

async function init(){

  const server = new HyperspaceServer({
    storage: './my-hyperspace',
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

  await server.ready()
  console.log('server init..')
}

init()