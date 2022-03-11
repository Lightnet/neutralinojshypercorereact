

//import Hypercore from "hypercore";
//import Hyperdrive from "hyperdrive";
//import path,{ dirname } from 'path';
//import { fileURLToPath } from 'url';
const Hyperdrive = require("hyperdrive");

//const Hypercore = require("hypercore");
//const Hyperdrive = require("hyperdrive");


//const __dirname = dirname(fileURLToPath(import.meta.url));

//const core = new Hypercore('./my-hypercore')


//export const drive = new Hyperdrive(path.join(__dirname,"./my-hyperdrive"),null) // content will be stored in this folder
//const drive = new Hyperdrive(core) // content will be stored in this folder
/*
const drive = new Hyperdrive("./my-hyperdrive")
//const drive='test';

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
async function getHyperDrive(){
  //console.log(drive);
  //console.log('my drive');
  //return 'test HDrive';
  
  return drive;
}

async function main(){
  //console.log(drive)
  const drive = new Hyperdrive("./my-hyperdrive")
  await drive.promises.ready()
  const list = await drive.promises.readdir('/');
  console.log(list);
}

main()