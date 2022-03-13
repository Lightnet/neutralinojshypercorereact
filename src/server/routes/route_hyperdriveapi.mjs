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
//import { URL } from 'url';
import { API } from "../../components/hypercore/API.mjs";
//const __dirname = new URL('.', import.meta.url).pathname;

const router = express.Router()
const upload = multer()

// https://github.com/hypercore-protocol/hyperdrive
//var stat = drive.stat('/hello.txt')
//stat.isDirectory()
//stat.isFile()
//stat.isSymlink()

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

router.post('/hyperdrive', async function (req, res) {
  const drive = await getHyperDrive();
  let data = req.body;
  console.log(data);
  // https://hypercore-protocol.org/guides/walkthroughs/sharing-files-with-hyperdrive/
  if(data.api==API.DRIVETYPES.DIR){
    try{
      const stat = await drive.promises.stat(data.dirname)
      //console.log(stat);
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

  if(data.api==API.DRIVETYPES.WRITE){ 
    if(isEmpty(data.file)||isEmpty(data.dirname)||isEmpty(data.content)){
      return res.json({error:'file name empty'});
    }
    try{ 
      let filepath = path.join(data.dirname,data.file)
      filepath = filepath.replaceAll("\\" , "/");
      await drive.promises.writeFile(filepath, data.content)
      return res.json({api:API.DRIVETYPES.WRITE});
    }catch(e){
      console.log("e.message")
      console.log(e.message)
      return res.json({error:e.message});
    }
  }

  if(data.api==API.DRIVETYPES.READ){ 
    if(isEmpty(data.file)||isEmpty(data.dirname)){
      return res.json({error:'file name empty'});
    }
    try{ 
      let filepath = path.join(data.dirname,data.file)
      filepath = filepath.replaceAll("\\" , "/");
      const content = await drive.promises.readFile(filepath, 'utf-8')
      return res.json({api:API.DRIVETYPES.READ,content:content});
    }catch(e){
      console.log("e.message")
      console.log(e.message)
      return res.json({error:e.message});
    }
  }


  if(data.api==API.DRIVETYPES.MKDIR){//make dir
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

  if(data.api== API.DRIVETYPES.RMDIR){//remove dir
    //const content = await drive.promises.readFile('/'+data.file, 'utf-8')
    if(isEmpty(data.dirname)){
      return res.json({error:'dir name empty'});
    }
    try{
      await drive.promises.rmdir(data.dirname)
    }catch(e){
      console.log(e);
      //console.log(e.message)
      return res.json({error:e.message});
    }
    return res.json({message:'removedir'});
  }

  if(data.api== API.DRIVETYPES.LS){
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

  if(data.api== API.DRIVETYPES.GETKEY){
    //const content = await drive.promises.readFile('/'+data.file, 'utf-8')
    //await drive.key
    return res.json({api:API.DRIVETYPES.DRIVEKEY,key:drive.key.toString('hex')});
  }
  //res.send(JSON.stringify({meesage:'test'}));
})

// https://hypercore-protocol.org/guides/walkthroughs/sharing-files-with-hyperdrive/
router.delete('/hyperdrive', async function (req, res) {
  const drive = await getHyperDrive();
  let data = req.body;
  console.log('delete',data)
  try{
    let filepath = path.join(data.dirname,data.file)
    filepath = filepath.replaceAll("\\" , "/");
    console.log("filepath:", filepath)
    await drive.promises.unlink(filepath);
    //let status = await drive.promises.unlink(filepath);
    //let status = await drive.promises.unlink('/'+data.file);
    //console.log("status:",status);
  }catch(e){
    console.log(e.message);
    return res.json({error:e.message});
  }
  
  res.json({api:API.DELETE,filename:data.file});
})

router.post('/hyperdriveupload', upload.single('File'),async function (req, res) {
  
  const drive = await getHyperDrive();
  console.log("uploading...")
  let {dirname} = req.body;
  if(!dirname){
    console.log('Error path dir')
    res.json({error:'Error Path'});
  }
  //console.log("dirname:",dirname)
  //console.log(req.body);
  //console.log(req.file);
  //console.log(req.files);
  try{
    let filepath = path.join(dirname,req.file.originalname)
    filepath = filepath.replaceAll("\\" , "/");
    console.log(req.file)
    console.log(req.file.buffer)
    await drive.promises.writeFile(filepath, req.file.buffer)
    //await drive.promises.writeFile('/stuff/file2.bin', Buffer.from([0,1,2,4]))
    return res.json({api:API.DRIVETYPES.UPLOADED});
  }catch(e){
    console.log(e.message)
    return res.json({error:e.message});
  }

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
      //const content = await drive.promises.readFile(req.params[0], 'utf-8')
      const content = await drive.promises.readFile(req.params[0])
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