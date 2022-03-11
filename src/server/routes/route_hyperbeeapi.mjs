/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://hypercore-protocol.org/guides/walkthroughs/p2p-indexing-with-hyperbee/
// https://hypercore-protocol.org/guides/walkthroughs/p2p-indexing-with-hyperbee/

import express from "express";
import Hypercore from "hypercore";
import Hyperbee from "hyperbee";

const core = Hypercore('./my-hyperbee')

const router = express.Router()

const db = new Hyperbee(core, {
  keyEncoding: 'utf-8', // can be set to undefined (binary), utf-8, ascii or and abstract-encoding
  valueEncoding: 'utf-8' // same options as above
})

// if you own the feed
//await db.put('key', 'value')
//await db.del('some-key')

// if you want to query the feed
//const node = await db.get('key') // null or { key, value }

// if you want to read a range
//const rs = db.createReadStream({ gt: 'a', lt: 'd' }) // anything >a and <d
//const rs = db.createReadStream({ gte: 'a', lte: 'd' }) // anything >=a and <=d

//for await (const { key, value } of db.createReadStream()) {
  //console.log(`${key} -> ${value}`)
//}
//console.log(db.feed.key.toString('hex'));

router.get('/hyperbee', async function (req, res) {
  //const list = await drive.promises.readdir('/');
  await db.ready()
  //console.log(db.key);
  //await db.put('key', 'value')
  //await db.put('e', 'f')
  let list = [];
  for await (const { key, value } of db.createReadStream()) {
    console.log(`${key} -> ${value}`);
    list.push({key:key,value:value});
  }
  res.json({bee:'',list:list});
})

router.post('/hyperbee', async function (req, res) {
  //const list = await drive.promises.readdir('/');
  await db.ready()
  let data = req.body;
  if(data){
    if(data.api){
      if(data.api=='key'){
        //console.log(db);
        console.log(db.key);
        console.log(db.feed.key.toString('hex'));
        return res.json({api:'key',key:db.feed.key.toString('hex')});
      }  
    }
  }

  res.json({error:'error NULL'});
})

//module.exports = router;
export default router;