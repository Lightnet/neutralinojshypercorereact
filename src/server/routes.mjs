/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { fileURLToPath, URL } from 'url';
import path, { dirname } from "path";
import express from "express";
import routeHyperdriveapi from "./routes/route_hyperdriveapi.mjs";
import routeHyperbeeapi from "./routes/route_hyperbeeapi.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));

//import routeUpload from "./routes/route_upload.mjs";
//import { refreshBaseToken } from "./controllers/RefreshBaseToken.mjs";
//import { refreshToken } from "./controllers/RefreshToken.mjs";

const router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  //console.log('Time: ', Date.now())
  console.log("originalUrl: ",req.originalUrl)
  next()
})

//react ace 
router.use((req, res, next)=> {
  //console.log('Time: ', Date.now())
  console.log("originalUrl: ",req.originalUrl)
  //if(req.originalUrl == "/mode-json.js"){
    //let file = path.join(__dirname,"../../node_modules/ace-builds/src-noconflict/mode-json.js");
    //console.log(file)
    //return res.sendFile(file);
  //}
  if(req.originalUrl == "/worker-json.js"){
    let file = path.join(__dirname,"../../node_modules/ace-builds/src-noconflict/worker-json.js");
    console.log(file)
    return res.sendFile(file);
  }
  if(req.originalUrl == "/worker-css.js"){
    let file = path.join(__dirname,"../../node_modules/ace-builds/src-noconflict/worker-css.js");
    console.log(file)
    return res.sendFile(file);
  }
  if(req.originalUrl == "/worker-html.js"){
    let file = path.join(__dirname,"../../node_modules/ace-builds/src-noconflict/worker-html.js");
    console.log(file)
    return res.sendFile(file);
  }
  if(req.originalUrl == "/worker-javascript.js"){
    let file = path.join(__dirname,"../../node_modules/ace-builds/src-noconflict/worker-javascript.js");
    console.log(file)
    return res.sendFile(file);
  }
  next()
})

// https://mfikri.com/en/blog/react-express-mysql-authentication
//router.get('/token', refreshToken); // get token last 15s
//router.get('/basetoken', refreshBaseToken); // get token last 15s

router.use('/api',routeHyperdriveapi);
router.use('/api',routeHyperbeeapi);
//router.use('/',routeUpload);

export default router;