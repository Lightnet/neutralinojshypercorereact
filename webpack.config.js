/*
  LICENSE: MIT
  Created by: Lightnet
*/

'use strict';

//process.env.BABEL_ENV = 'renderer';
const path = require('path');

//let file = path.join(__dirname, "./src/client.js");
//console.log(file);

module.exports = {
   entry: path.join(__dirname, "./src/client/client.js"),
   mode: process.env.NODE_ENV || "development",

   output: {
      //path: path.join(__dirname, '/public'),
      path: path.join(__dirname, './resources/js'),
      filename: 'bundle.js'
   },
   devServer: {
      port: 3000,
      //contentBase: path.resolve(__dirname, './dist')
      //watchContentBase: true
   },
   module: {
      noParse:/gun\.js$|sea\.js$/,
      rules: [
      {
         test: /\.(js|jsx)$/,
         exclude: /nodeModules/,
         use: {
            loader: 'babel-loader'
         }
      },
      {
         test: /\.css$/i,
         use: ["style-loader", "css-loader"],
         },
      ]
   },
   node: {
      //fs: "empty"
   },
   plugins:[
   ]
}