/*
  LICENSE: MIT
  Created by: Lightnet

  Browser client reload...
*/

const browserSync = require("browser-sync").create();

// Start the server
browserSync.init({
    server: "./public"
  , ui:false
  , watch: true
  //, port: 8080
  , open: false
  , callbacks: {
    /**
     * This 'ready' callback can be used
     * to access the Browsersync instance
     */
    ready: function(err, bs) {

      // example of accessing URLS
      console.log(bs.options.get('urls'));

      // example of adding a middleware at the end
      // of the stack after Browsersync is running
      bs.addMiddleware("*", function (req, res) {
          res.writeHead(302, {
            location: "/"
          });
          res.end("Redirecting!");
      });
    }
  }
});