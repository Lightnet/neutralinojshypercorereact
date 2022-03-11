/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://hypercore-protocol.org/guides/modules/hyperdrive/
// https://www.thatsoftwaredude.com/content/8912/create-a-basic-text-editor-in-javascript
// https://hypercore-protocol.org/guides/walkthroughs/sharing-files-with-hyperdrive/

import express from "express";
import path from "path";
import multer from "multer";
import Hyperdrive from "hyperdrive";

import { isEmpty } from "../../lib/helper.mjs";
import { getHyperDrive } from "../../lib/hypercoreclient.mjs";
import { URL } from 'url';
const __dirname = new URL('.', import.meta.url).pathname;

const router = express.Router()

const upload = multer()

// define the about route
router.get('/hyperdrive', async function (req, res) {
  try{
    const drive = await getHyperDrive();
    //console.log(drive);
    const list = await drive.promises.readdir('/');
    res.json({dir:'/',list:list});
  }catch(e){
    console.log(e);
    res.json({error:'error'});
  }
  
})

// https://github.com/hypercore-protocol/hyperdrive
//var stat = drive.stat('/hello.txt')
//stat.isDirectory()
//stat.isFile()
//stat.isSymlink()


router.post('/hyperdrive', async function (req, res) {
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

router.put('/hyperdrive', async function (req, res) {
  //console.log(getHyperDrive())
  //await getHyperClient();
  const drive = await getHyperDrive();
  await drive.promises.writeFile('/hello.txt', 'world')
  //const data = await drive.promises.readFile('/hello.txt', 'utf-8')
  res.json({meesage:'test'});
})
// https://hypercore-protocol.org/guides/walkthroughs/sharing-files-with-hyperdrive/
router.delete('/hyperdrive', async function (req, res) {
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

router.post('/hyperdriveupload', upload.single('File'),async function (req, res) {
  
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
    return res.json({message:'uploaded'});
  }catch(e){
    console.log(e.message)
    return res.json({error:e.message});
  }

  return res.json({error:"error"});
})

var re = /(?:\.([^.]+))?$/;

router.get('/hyperdrive/:key/*',async function (req, res) {
  
  const drive = await getHyperDrive();
  console.log(req.params)
  //console.log('Request URL:', req.originalUrl)

  console.log("FILE?", req.params[0])
  console.log("KEY?", req.params.key)
  if(req.params.key.length == 64){
    console.log('ok')
  }else{
    //console.log('fail')
    //res.send('Invalid key char 64='+req.params.key.length);
    const drive = new Hyperdrive('./my-hyperdrive');

    const content = await drive.promises.readFile("/"+req.params.key + "/" + req.params[0],'binary')
    const mimetype = express.static.mime.lookup(req.params[0]);
    drive.close();
    console.log(mimetype)
    res.setHeader('Content-type', mimetype);
    res.end(content);
    return;
  }

  var ext = re.exec(req.params[0])[1];
  if(ext){//check if ext file exist
    //need to check file exist
    //need to check for dir list here

    console.log("HERE EXT?")

    const drive = new Hyperdrive('./my-hyperdrive',req.params.key);
    //const list = await drive.promises.readdir("/");
    //const content = await drive.promises.readFile(req.params[0], 'utf-8')
    const content = await drive.promises.readFile(req.params[0],'binary')
    const mimetype = express.static.mime.lookup(req.params[0]);
    drive.close();
    console.log(mimetype)
    res.setHeader('Content-type', mimetype);
    return res.end(content);

  }else{//if tnere no file by default dir list
    //res.send('Hello list');
    console.log("HERE DIR?")
    const drive = new Hyperdrive('./my-hyperdrive',req.params.key);
    let dirname = req.params[0];
    console.log("dirname")
    console.log(dirname)
    const list = await drive.promises.readdir("/"+dirname);
    drive.close();
    return res.json({dir:'/'+dirname,list:list});
  }
  //const content = await drive.promises.readFile(filepath, 'utf-8')
  //res.send('Hello ' + req.name + '!');
})

router.get('/hyperdrive/:key',async function (req, res) {
  
  //const drive = await getHyperDrive();
  console.log(req.params)
  //console.log('Request URL:', req.originalUrl)

  var ext = re.exec(req.params.key)[1];
  try{
    if(ext){
      console.log('File >>?')
      const drive = await getHyperDrive();
      //const content = await drive.promises.readFile(req.params.key)
      const content = await drive.promises.readFile(req.params.key,'binary')
      //const content = await drive.promises.readFile(req.params.key, 'hex')
      const mimetype = express.static.mime.lookup(req.params.key);
      //console.log(mimetype)
      res.setHeader('Content-type', mimetype);
      return res.end(content);
      //return res.send(content);
    }else{
      //drive key?
      // need to have key id local and server check for this...
      //console.log('KEY?')
      const drive = new Hyperdrive('./my-hyperdrive',req.params.key);
      const list = await drive.promises.readdir("/");
      //console.log(list);
      drive.close();
      return res.json({dir:"/",list:list});
    }
  }catch(e){
    console.log(e)
    return res.end('error');
  }
  res.send('!');
})

//https://stackoverflow.com/questions/67767954/set-the-filename-for-file-download-with-use-of-fetch
// https://stackoverflow.com/questions/7288814/download-a-file-from-nodejs-server-using-express
router.get('/download/*',async function (req, res) {
  const drive = await getHyperDrive();
  var ext = re.exec(req.params[0])[1];
  console.log(req.params)

  if(ext){
    try{
      const content = await drive.promises.readFile(req.params[0], 'utf-8')
      const filename = path.basename(req.params[0]);
      console.log(filename)
      res.setHeader('Content-disposition', 'attachment; filename=' + filename);

      const mimetype = express.static.mime.lookup(req.params[0]);
      console.log(mimetype)
      res.setHeader('Content-type', mimetype);

      //res.setHeader('content-type', 'text/plain');//works
      return res.end(content);
    }catch(e){
      console.log(e);
      return res.end('error');
    }
  }
  return res.end('error');
})

//module.exports = router;
export default router;