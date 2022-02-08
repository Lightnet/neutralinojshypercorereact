/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://hypercore-protocol.org/guides/modules/hyperdrive/
// https://www.thatsoftwaredude.com/content/8912/create-a-basic-text-editor-in-javascript
// https://hypercore-protocol.org/guides/walkthroughs/sharing-files-with-hyperdrive/
var express = require('express');
const { isEmpty } = require('../../lib/helperserver');
var router = express.Router()

const { getHyperDrive, getHyperClient } = require('../../lib/hypercoreclient');

// define the about route
router.get('/drive', async function (req, res) {
  
  const drive = await getHyperDrive();
  const list = await drive.promises.readdir('/');
  res.json({dir:'/',list:list});

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
    return res.json({file:data.file,content:content});
  }

  if(data.mode=='save'){
    //const content = await drive.promises.readFile('/'+data.file, 'utf-8')
    await drive.promises.writeFile('/'+data.file, data.content)
    return res.json({message:'save'});
  }

  if(data.mode=='create'){
    //const content = await drive.promises.readFile('/'+data.file, 'utf-8')
    if(isEmpty(data.file)){
      return res.json({error:'file name empty'});
    }
    await drive.promises.writeFile('/'+data.file, data.content)
    return res.json({message:'create'});
  }

  if(data.mode=='mkdir'){//make dir
    //const content = await drive.promises.readFile('/'+data.file, 'utf-8')
    if(isEmpty(data.dirname)){
      return res.json({error:'file name empty'});
    }
    if(data.dirname=="/"){
      return res.json({error:"same dir '/'"});
    }
    try{
      await drive.promises.mkdir(data.dirname)
    }catch(e){
      console.log(e);
      return res.json({error:e.meesage});
    }
    return res.json({message:'createdir'});
  }

  if(data.mode=='rmdir'){//remove dir
    //const content = await drive.promises.readFile('/'+data.file, 'utf-8')
    if(isEmpty(data.dirname)){
      return res.json({error:'dir name empty'});
    }
    try{
      await drive.promises.rmdir(data.dirname)
    }catch(e){
      console.log(e);
      console.log("/////");
      console.log(e.message)
      return res.json({error:e.message});
    }
    return res.json({message:'removedir'});
  }

  if(data.mode=='ls'){
    //const content = await drive.promises.readFile('/'+data.file, 'utf-8')
    let list;
    if(isEmpty(data.dirname)){
      return res.json({error:'dir name empty'});
    }
    try{
      list = await drive.promises.readdir(data.dirname)
    }catch(e){
      console.log(e);
      return res.json({error:e.meesage});
    }
    return res.json({message:'list',list:list});
  }

  if(data.mode=='drivekey'){
    //const content = await drive.promises.readFile('/'+data.file, 'utf-8')
    //await drive.key
    return res.json({api:'drivekey',key:drive.key.toString('hex')});
  }
  //res.send(JSON.stringify({meesage:'test'}));
})

router.put('/drive', async function (req, res) {
  //console.log(getHyperDrive())
  //await getHyperClient();
  const drive = await getHyperDrive();
  await drive.promises.writeFile('/hello.txt', 'world')
  //const data = await drive.promises.readFile('/hello.txt', 'utf-8')
  res.json({meesage:'test'});
})
// https://hypercore-protocol.org/guides/walkthroughs/sharing-files-with-hyperdrive/
router.delete('/drive', async function (req, res) {
  const drive = await getHyperDrive();
  let data = req.body;
  console.log('delete....')
  try{
    let status = await drive.promises.unlink('/'+data.file);
    console.log(status);
  }catch(e){
    console.log("e.......");
    console.log(e.message);
    console.log("e.......");
    return res.json({error:e.message});
  }
  
  res.json({meesage:'delete'});
})



module.exports = router;