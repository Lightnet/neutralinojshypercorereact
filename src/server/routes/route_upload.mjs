
// https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-js-when-using-es6-modules
// https://www.pluralsight.com/guides/uploading-files-with-reactjs
// https://expressjs.com/en/resources/middleware/multer.html
//var express = require('express')
//const multer  = require('multer')

import express from "express";
import multer from "multer";
import { URL } from 'url';
const __dirname = new URL('.', import.meta.url).pathname;

const router = express.Router();
const upload = multer()

// define the about route
router.post('/upload', upload.single('File'),async function (req, res) {
  
  //const drive = await getHyperDrive();
  //const list = await drive.promises.readdir('/');
  //res.send(JSON.stringify({dir:'/',list:list}));
  console.log('test////')
  console.log(req.body);
  console.log(req.file);
  console.log(req.files);

  res.send(JSON.stringify({dir:'/'}));
})

//module.exports = router;
export default router;