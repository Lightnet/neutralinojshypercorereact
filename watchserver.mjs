/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import path from 'path';
import nodemon from 'nodemon';
//import { URL } from 'url';
//const __dirname = new URL('.', import.meta.url).pathname; //does not work

import path,{ dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

nodemon({
  script:'./src/server/server.mjs'
  //, stdout: false // important: this tells nodemon not to output to console
  , ext: 'js, mjs, html'
  , env: { 'NODE_ENV': 'development' }
  , watch: [path.join(__dirname,'./src/server'),path.join(__dirname,'./src/lib')]
  //, done: done
})

nodemon.on('start', function () {
  console.log('App Server has started');
}).on('quit', function () {
  console.log('App Server has quit');
  process.exit();
}).on('restart', function (files) {
  console.log('App Server restarted due to: ', files);
});