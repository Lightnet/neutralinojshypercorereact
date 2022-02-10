/*
  LICENSE: MIT
  Created by: Lightnet
*/

const { Client: HyperspaceClient } = require('hyperspace');
const Hyperdrive = require('hyperdrive');

var hyperClient;
//var coreStore;

// https://hypercore-protocol.github.io/new-website/guides/hyperspace/corestore/
// https://github.com/hypercore-protocol/corestore
// https://hypercore-protocol.github.io/new-website/guides/hyperspace/hypercore/
// https://hypercore-protocol.github.io/new-website/guides/walkthroughs/creating-and-sharing-hypercores/

/*
const newCore = corestore.get() // create a new hypercore
const existingCore = corestore.get(key) // get an existing hypercore
*/

exports.getHyperClient = async function getHyperClient(){

  if(hyperClient){
    return hyperClient;
  }
  //console.log('test drive');
  hyperClient = new HyperspaceClient({
    host: 'my-hyperspace'
  })

  await hyperClient.ready() // wait for .peers to be populated

  // get current peers
  console.log(hyperClient.network.peers)

  // log peer events
  hyperClient.network.on('peer-add', peer => {
    console.log('New peer:', peer)
  })
  hyperClient.network.on('peer-remove', peer => {
    console.log('Peer disconnected:', peer)
  })
  coreStore = hyperClient.corestore();
  //console.dir(coreStore)

  // Create a new RemoteCorestore.
  const localStore = hyperClient.corestore()

  // Create a fresh Remotehypercore.
  const localCore = localStore.get({
      key:'a201b3173f4a42eb7c57ef1873467b0511121d005d2b2c9aa07318d5bcbb1a7f'
    ,valueEncoding: 'utf-8'
  })
  localCore.on('peer-add', peer => console.log('new peer', peer))
  localCore.on('peer-remove', peer => console.log('peer disconnected', peer))
  localCore.on('append', () => console.log('new block added'))

  console.log(await localCore.get(0)) // get block 0
  console.log(await localCore.get(1)) // get block 1

  console.log(localCore.length ) // get block 0

  //console.log(localCore.list());
  
  // Append two blocks to the RemoteHypercore.
  //await localCore.append(['hello', 'world'])
  //console.log(await localCore.get('hello'))
  //console.log(localCore)

  localCore.on('peer-add', () => {
    console.log(chalk.blue('(local) Replicating with a new peer.'))
  })

  //console.dir(localCore);
  //const store = hyperClient.corestore()
  console.log('client test...////////////////////');

  return hyperClient;
}

// https://hypercore-protocol.org/guides/modules/hyperdrive/
// https://hypercore-protocol.org/guides/walkthroughs/sharing-files-with-hyperdrive/
const drive = new Hyperdrive('./my-hyperdrive') // content will be stored in this folder
//const drive='test';
/*
drive.ready(err => {
  if (err) throw err

  console.log(drive.key.toString('hex')) // the drive's public key, used to identify it
  console.log(drive.discoveryKey.toString('hex')) // the drive's discovery key for the DHT
  console.log(drive.writable) // do we possess the private key of this drive?
  console.log(drive.version) // what is the version-number of this drive?
  console.log(drive.peers) // list of the peers currently replicating this drive
})
*/

// main access current folder
// https://hypercore-protocol.org/guides/modules/hyperdrive/
exports.getHyperDrive = async function getHyperDrive(){
  //console.log(drive);
  //console.log('my drive');
  //return 'test HDrive';
  return drive;
}



// https://hypercore-protocol.org/guides/getting-started/standalone-modules/
//const core = new Hypercore('./my-hyperbee')
//const bee = new Hyperbee(core)

/*
const Hyperbee = require('hyperbee');
const core = Hypercore('./my-hyperbee')

const db = new Hyperbee(core, {
  keyEncoding: 'utf-8', // can be set to undefined (binary), utf-8, ascii or and abstract-encoding
  valueEncoding: 'utf-8' // same options as above
})
*/