/*
  LICENSE: MIT
  Created by: Lightnet
*/

import express from "express";

import routeHyperdriveapi from "./routes/route_hyperdriveapi.mjs";
import routeHyperbeeapi from "./routes/route_hyperbeeapi.mjs";
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

// https://mfikri.com/en/blog/react-express-mysql-authentication
//router.get('/token', refreshToken); // get token last 15s
//router.get('/basetoken', refreshBaseToken); // get token last 15s

router.use('/api',routeHyperdriveapi);
router.use('/api',routeHyperbeeapi);
//router.use('/',routeUpload);

//module.exports = router;
export default router;