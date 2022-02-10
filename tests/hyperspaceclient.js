// https://hypercore-protocol.org/guides/getting-started/hyperspace/



const { Client: HyperspaceClient } = require('hyperspace')


async function init(){

  const client = new HyperspaceClient({
    host: 'my-hyperspace'
  })

  //console.dir(client);

  client.network.on('ready', () => {
    console.log('ready')
  })

  //client.network.on('open', () => {//nope
    // Our program has connected to the daemon
    //console.log('(local) A HyperspaceClient has connected')
  //})

  //client.network.on('server-open', () => {//nope
    // Our program has connected to the daemon
    //console.log('(local) A HyperspaceClient has connected')
  //})

  // log peer events
  client.network.on('peer-add', peer => {
    console.log('New peer:', peer)
  })
  client.network.on('peer-remove', peer => {
    console.log('Peer disconnected:', peer)
  })
  // get current peers
  //await client.ready(()=>{
    //console.log("ack")
    //console.log(this)
  //})
  await client.ready();
  console.log(client.network.peers)

  const store = client.corestore()
  await store.ready()
  store.on('feed',(feed)=>{
    console.log('feed:',feed);
  })
  //console.log(store)
  //console.log(store.key) //Nope

  // create a new hypercore
  /*
  const core1 = store.get({ valueEncoding: 'utf-8' })
  await core1.ready()
  //console.log(core1);

  
  //console.log(store.key) //nope
  await core1.append(['hello', 'world']) // append 2 blocks

  await core1.append(['hello', 'world']) // append 2 blocks

  // seed the hypercore
  await client.replicate(core1)
  */
  console.log('init client...');
}

//const client = new HyperspaceClient()
//const store = client.corestore()

// create a new hypercore
//const core1 = store.get({ valueEncoding: 'utf-8' })
//await core1.append(['hello', 'world']) // append 2 blocks

// seed the hypercore
//await client.replicate(core1)

init();