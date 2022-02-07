/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://hypercore-protocol.org/guides/modules/hyperdrive/
// https://www.thatsoftwaredude.com/content/8912/create-a-basic-text-editor-in-javascript
var express = require('express')
var router = express.Router()

const { getHyperDrive, getHyperClient } = require('../../lib/hypercoreclient');

// define the about route
router.get('/drive', async function (req, res) {
  
  const drive = await getHyperDrive();
  const list = await drive.promises.readdir('/');
  res.send(JSON.stringify({dir:'/',list:list}));

  //res.send(JSON.stringify({dir:'/'}));
})

router.post('/drive', async function (req, res) {
  //console.log(getHyperDrive())
  //await getHyperClient();
  const drive = await getHyperDrive();
  //await drive.promises.writeFile('/hello.txt', 'world')
  //const data = await drive.promises.readFile('/hello.txt', 'utf-8')

  let data = req.body;
  console.log(data);
  if(data.mode=='edit'){
    const content = await drive.promises.readFile('/'+data.file, 'utf-8')
    res.send(JSON.stringify({file:data.file,content:content}));
  }

  if(data.mode=='save'){
    //const content = await drive.promises.readFile('/'+data.file, 'utf-8')
    await drive.promises.writeFile('/'+data.file, data.content)
    res.send(JSON.stringify({message:'save'}));
  }

  if(data.mode=='create'){
    //const content = await drive.promises.readFile('/'+data.file, 'utf-8')
    await drive.promises.writeFile('/'+data.file, data.content)
    res.send(JSON.stringify({message:'create'}));
  }

  //res.send(JSON.stringify({meesage:'test'}));
})

router.put('/drive', async function (req, res) {
  //console.log(getHyperDrive())
  //await getHyperClient();
  const drive = await getHyperDrive();
  await drive.promises.writeFile('/hello.txt', 'world')

  //const data = await drive.promises.readFile('/hello.txt', 'utf-8')
  
  res.send(JSON.stringify({meesage:'test'}));
})

router.delete('/drive', async function (req, res) {
  //console.log(getHyperDrive())
  //await getHyperClient();
  //const drive = await getHyperDrive();
  //await drive.promises.writeFile('/hello.txt', 'world')

  //const data = await drive.promises.readFile('/hello.txt', 'utf-8')
  
  res.send(JSON.stringify({meesage:'test'}));
})



module.exports = router;