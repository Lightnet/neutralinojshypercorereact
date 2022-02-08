/*
  LICENSE: MIT
  Created by: Lightnet
*/

var express = require('express')
var router = express.Router()
var routeHypercoreapi = require('./routes/route_hypercoreapi');
var routeUpload = require('./routes/route_upload');

// middleware that is specific to this router
//router.use(function timeLog (req, res, next) {
  //console.log('Time: ', Date.now())
  //next()
//})

// define the about route
router.get('/api/test', function (req, res) {
  res.send(JSON.stringify({meesage:'test'}));
})

router.get('/test', function (req, res) {
  console.log('test');
  res.send(JSON.stringify({meesage:'test'}));
})

router.use('/',routeHypercoreapi);
router.use('/',routeUpload);

module.exports = router;