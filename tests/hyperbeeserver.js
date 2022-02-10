
// https://hypercore-protocol.org/guides/walkthroughs/p2p-indexing-with-hyperbee/



/*
let bee = new Hyperbee(client.corestore().get(null), {
  keyEncoding: 'utf8',
  valueEncoding: 'json'
})
*/

const Hypercore = require('hypercore');
const Hyperbee = require('hyperbee');
const core = Hypercore('./my-hyperbee')

const db = new Hyperbee(core, {
  keyEncoding: 'utf-8', // can be set to undefined (binary), utf-8, ascii or and abstract-encoding
  valueEncoding: 'utf-8' // same options as above
})

async function init(){
  await db.ready();
  //console.log(db);
  //await db.put('a', 'b');
  //await db.put('c', 'd')
  const node = await db.get('a') // An object of the form { key, value }
  console.log("node");
  console.log(node);

  for await (const { key, value } of db.createReadStream()) {
    console.log(`${key} -> ${value}`)
  }
}

init()