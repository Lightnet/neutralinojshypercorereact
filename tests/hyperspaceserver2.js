
const { Server: HyperspaceServer } = require('hyperspace')
const chalk = require('chalk'); // 4.1.2 work, 5 need -> import  

async function init(){
  // Create one server to simulate your local Hyperspace instance.
  const localServer = new HyperspaceServer({
    storage: './storage/hyperspace-storage-1',
    host: 'hyperspace-demo-1'
  })
  // Create a second server to simulate a remote peer.
  const remoteServer = new HyperspaceServer({
    storage: './storage/hyperspace-storage-2',
    host: 'hyperspace-demo-2'
  })
  await localServer.ready()
  await remoteServer.ready()

  localServer.on('client-open', () => {
    // Our program has connected to the daemon
    console.log('(local) A HyperspaceClient has connected')
  })
  localServer.on('client-close', () => {
    // Our program has disconnected from the daemon
    console.log('(local) A HyperspaceClient has disconnected')
  })

  remoteServer.on('client-open', () => {
    console.log('(remote) A HyperspaceClient has connected')
  })
  remoteServer.on('client-close', () => {
    console.log('(remote) A HyperspaceClient has disconnected')
  })

  process.on('SIGINT', cleanup)

  async function cleanup () {
    console.log('Hyperspace servers are shutting down...')
    await localServer.close()
    await remoteServer.close()
  }

  console.log('hyperspace server init')
}

init()