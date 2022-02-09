/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://hypercore-protocol.org/guides/modules/hyperdrive/
// https://www.thatsoftwaredude.com/content/8912/create-a-basic-text-editor-in-javascript
// https://hypercore-protocol.org/guides/walkthroughs/sharing-files-with-hyperdrive/
const express = require('express');
const { isEmpty } = require('../../lib/helperserver');
const router = express.Router()
const path = require('path');
const multer  = require('multer')
const upload = multer()
const mime = require('mime');

const { getHyperDrive, getHyperClient } = require('../../lib/hypercoreclient');

// define the about route
router.get('/drive', async function (req, res) {
  const drive = await getHyperDrive();
  const list = await drive.promises.readdir('/');
  res.json({dir:'/',list:list});
})
/*
// https://github.com/hypercore-protocol/hyperdrive
var stat = drive.stat('/hello.txt')
stat.isDirectory()
stat.isFile()
stat.isSymlink()
*/

router.post('/drive', async function (req, res) {
  const drive = await getHyperDrive();
  let data = req.body;
  console.log(data);
  // https://hypercore-protocol.org/guides/walkthroughs/sharing-files-with-hyperdrive/
  if(data.mode=='dir'){
    try{
      const stat = await drive.promises.stat(data.dirname)
      console.log(stat);
      //console.log("stat.isDirectory()")
      //console.log(stat.isDirectory())
      //console.log(stat.isFile())
      //console.log(stat.isSymlink())
      if(stat.isDirectory() == true){
        console.log("Found Directory()");
        const list = await drive.promises.readdir(data.dirname);
        console.log(list);
        return res.json({dir:data.dirname,list:list});
      }
      return res.json({error:data.dirname + 'Not Found!'});
    }catch(e){
      //console.log(e);
      console.log(e.message);
      return res.json({error:e.message});  
    }
  }

  if(data.mode=='edit'){
    let filepath = path.join(data.dirname,data.file)
    filepath = filepath.replaceAll("\\" , "/");
    const content = await drive.promises.readFile(filepath, 'utf-8')
    return res.json({file:data.file,content:content});
  }

  if(data.mode=='save'){
    //const content = await drive.promises.readFile('/'+data.file, 'utf-8')
    //var test = path.join("/test",data.file)
    //console.log("test...");
    //console.log(test);
    let filepath = path.join(data.dirname,data.file)
    filepath = filepath.replaceAll("\\" , "/");
    await drive.promises.writeFile(filepath, data.content)
    return res.json({message:'save'});
  }

  if(data.mode=='create'){
    console.log(data.dirname)
    console.log(data.file)
    try{
      if(isEmpty(data.file)||isEmpty(data.dirname)){
        return res.json({error:'file name empty'});
      }
      let filepath = path.join(data.dirname,data.file)
      filepath = filepath.replaceAll("\\" , "/");
      await drive.promises.writeFile(filepath, data.content)
      
      return res.json({message:'create'});
    }catch(e){
      console.log("e.message")
      console.log(e.message)
      return res.json({error:e.message});
    }
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
  //console.log('delete....')
  try{
    let status = await drive.promises.unlink('/'+data.file);
    console.log(status);
  }catch(e){
    //console.log("e.......");
    console.log(e.message);
    //console.log("e.......");
    return res.json({error:e.message});
  }
  
  res.json({meesage:'delete'});
})

router.post('/driveupload', upload.single('File'),async function (req, res) {
  
  const drive = await getHyperDrive();
  console.log('test////')
  let {dirname} = req.body;
  if(!dirname){
    console.log('Error path dir')
    res.json({error:'Error Path'});
  }
  //console.log("dirname:",dirname)
  //console.log(req.body);
  //console.log(req.file);
  //console.log('test////')
  //console.log(req.files);

  try{
    let filepath = path.join(dirname,req.file.originalname)
    filepath = filepath.replaceAll("\\" , "/");
    await drive.promises.writeFile(filepath, req.file.buffer)
  }catch(e){
    console.log(e.message)
    res.json({error:e.message});
  }

  res.json({message:'uploaded'});
})

/*
router.get('/drive/:name',async function (req, res) {
  
  const drive = await getHyperDrive();
  console.log(req.params)
  console.log(req.body)
  let name = req.name
  console.log(name)
  console.log('Request URL:', req.originalUrl)

  //const content = await drive.promises.readFile(filepath, 'utf-8')
  res.send('Hello ' + req.name + '!');
})
*/

var re = /(?:\.([^.]+))?$/;

router.get('/drive/*',async function (req, res) {
  
  const drive = await getHyperDrive();
  console.log(req.params)
  console.log('Request URL:', req.originalUrl)

  var ext = re.exec(req.params[0])[1];
  if(ext){
    console.log('test:',ext);
    console.log('test:',req.params[0]);
    const content = await drive.promises.readFile(req.params[0], 'utf-8')
    //res.type('txt')
    //res.append('Content-Type', 'text/html; charset=UTF-8');
    //res.append('Content-Type', 'application/javascript; charset=UTF-8');
    //res.type('txt')
    //res.header("Content-Type", "text/cache-manifest");
    //res.setHeader('Content-type', 'txt');//work
    //res.setHeader('content-type', 'text/plain');//works
    const mimetype = mime.lookup(req.params[0]);
    //console.log(mimetype)
    res.setHeader('Content-type', mimetype);
    return res.end(content);
    //return res.send(content);
  }

  const list = await drive.promises.readdir('/');
  res.json({dir:'/',list:list});

  //const content = await drive.promises.readFile(filepath, 'utf-8')
  //res.send('Hello ' + req.name + '!');
})
//https://stackoverflow.com/questions/67767954/set-the-filename-for-file-download-with-use-of-fetch
// https://stackoverflow.com/questions/7288814/download-a-file-from-nodejs-server-using-express
router.get('/download/*',async function (req, res) {
  const drive = await getHyperDrive();
  var ext = re.exec(req.params[0])[1];

  if(ext){
    const content = await drive.promises.readFile(req.params[0], 'utf-8')
    const filename = path.basename(req.params[0]);
    console.log(filename)
    res.setHeader('Content-disposition', 'attachment; filename=' + filename);

    const mimetype = mime.lookup(req.params[0]);
    console.log(mimetype)
    res.setHeader('Content-type', mimetype);

    //res.setHeader('content-type', 'text/plain');//works
    return res.end(content);
  }
})

module.exports = router;