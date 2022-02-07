const nodemon = require('nodemon');
const path = require('path');

nodemon({
  script:'./src/server/server.js'
  //, stdout: false // important: this tells nodemon not to output to console
  , ext: 'js html'
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