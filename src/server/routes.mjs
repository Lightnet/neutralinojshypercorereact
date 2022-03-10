/*
  LICENSE: MIT
  Created by: Lightnet
*/

//var express = require('express')
//var router = express.Router()
//var routeHyperdriveapi = require('./routes/route_hyperdriveapi.mjs');
//var routeHyperbeeapi = require('./routes/route_hyperbeeapi.mjs');
//var routeUpload = require('./routes/route_upload.mjs');

import express from "express";

import routeHyperdriveapi from "./routes/route_hyperdriveapi.mjs";
import routeHyperbeeapi from "./routes/route_hyperbeeapi.mjs";
import routeUpload from "./routes/route_upload.mjs";

const router = express.Router()

// middleware that is specific to this router
//router.use(function timeLog (req, res, next) {
  //console.log('Time: ', Date.now())
  //next()
//})

// define the about route
//router.get('/api/test', function (req, res) {
  //res.send(JSON.stringify({meesage:'test'}));
//})

//router.get('/test', function (req, res) {
  //console.log('test');
  //res.send(JSON.stringify({meesage:'test'}));
//})

router.use('/',routeHyperdriveapi);
router.use('/',routeHyperbeeapi);
router.use('/',routeUpload);

//module.exports = router;
export default router;