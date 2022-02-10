// https://hypercore-protocol.org/guides/getting-started/hyperspace/
// https://github.com/hypercore-protocol/walkthroughs/blob/main/hyperspace/2-replicate-hypercores.js


const { Client: HyperspaceClient } = require('hyperspace')
const chalk = require('chalk');

async function init(){
  console.log(chalk.blue('Hello world!')); 
  // Create a client that's connected to the "local" peer.
  const localClient = new HyperspaceClient({
    host: 'hyperspace-demo-1'
  })

  // Create a client that's connected to the "remote" peer.
  const remoteClient = new HyperspaceClient({
    host: 'hyperspace-demo-2'
  })
  // Create a new RemoteCorestore.
  const localStore = localClient.corestore()

  var sharedKey = null
  //key: 595b0bd550accfbe79c769be3ae187859dab1a6a9bf4d8aaf36495ab41ad1d42
  //discoveryKey: 57e6c38f5efdb0308f2d02ad0a435a68978be5265352649957a51211c7f140fa
  // Create a fresh Remotehypercore.
  const localCore = localStore.get({
    key:"595b0bd550accfbe79c769be3ae187859dab1a6a9bf4d8aaf36495ab41ad1d42"
    , valueEncoding: 'utf-8'
  })
  await localCore.ready()
  console.log(localCore);
  sharedKey = localCore.key.toString('hex');

  // Append two blocks to the RemoteHypercore.
  //await localCore.append(['hello', 'world'])

  console.log(await localCore.get(0))
  console.log(await localCore.get(1))

  // Log when the core has any new peers.
  localCore.on('peer-add', () => {
    console.log(chalk.blue('(local) Replicating with a new peer.'))
  })

  // Start seeding the Hypercore on the Hyperswarm network.
  localClient.replicate(localCore)
  localClient.network.configure(localCore.discoveryKey.toString('hex'), { announce: true, lookup: true })

  //REMOTE
  console.log("REMOTE");
  const remoteStore = remoteClient.corestore()
  // Create a fresh Remotehypercore.
  // Here we'll get a core using the shared key from above.
  console.log("sharedKey:",sharedKey)
  const clone = remoteStore.get({
    key: sharedKey,
    valueEncoding: 'utf-8'
  })
  await clone.ready()
  console.log(clone)
  

  // Log when the core has any new peers.
  clone.on('peer-add', () => {
    console.log('(remote) Replicating with a new peer.')
  })
  // Start seeding the clone (this will connect to the first Hyperspace instance)
  remoteClient.replicate(clone)
  //remoteClient.network.configure(clone.discoveryKey.toString('hex'), { announce: false, lookup: true })
  console.log(clone)
  
  //console.log(await clone.get(0))
  //console.log(await clone.get(1))

  console.log('init client...');
}

init();