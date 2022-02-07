/*

*/
console.log('init server...')
const { Server: HyperspaceServer } = require('hyperspace');
const server = new HyperspaceServer({
  storage: './my-hyperspace-storage',
  host: 'my-hyperspace'
})

async function init(){

  server.on('client-open', () => {
    // Our program has connected to the daemon
    console.log('(local) A HyperspaceClient has connected')
  })
  server.on('client-close', () => {
    // Our program has disconnected from the daemon
    console.log('(local) A HyperspaceClient has disconnected')
  })

  await server.ready();

  console.log('init');
}

init();

console.log('end server config...')