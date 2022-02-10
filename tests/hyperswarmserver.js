// https://hypercore-protocol.org/guides/getting-started/standalone-modules/

//  v3

const pump = require('pump')
const Hypercore = require('hypercore')
const Hyperswarm = require('hyperswarm')

// Setup the hypercore as usual.
const core = Hypercore('./my-hyperswarm')

async function init(){

  await core.ready()

const swarm1 = new Hyperswarm()
const swarm2 = new Hyperswarm()
//console.log(swarm1);

swarm1.on('connection', (conn, info) => {
  // swarm1 will receive server connections
  conn.write('this is a server connection')
  conn.end()
 })
 swarm2.on('connection', (conn, info) => {
  conn.on('data', data => console.log('client got message:', data.toString()))
 })
 
 const topic = Buffer.alloc(32).fill('hello world') // A topic must be 32 bytes
 const discovery = swarm1.join(topic, { server: true, client: false })
 await discovery.flushed() // Waits for the topic to be fully announced on the DHT
 //console.log(discovery)
 
 swarm2.join(topic, { server: false, client: true })
 await swarm2.flush() // Waits for the swarm to connect to pending peers.

 console.log('init swarm...');


  /*
  // Create a new swarm instance.
  const swarm = hyperswarm()

  // Replicate whenever a new connection is created.
  swarm.on('connection', (connection, info) => {
    pump(
      connection,
      core.replicate({initiator: info.client}),
      connection
    )
  })
  console.log(core);

  // Start swarming the hypercore.
  
  swarm.join(core.discoveryKey, {
    announce: true,
    lookup: true
  })
  */
}

init();