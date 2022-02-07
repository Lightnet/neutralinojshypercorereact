/*
  LICENSE: MIT
  Created by: Lightnet

  Information:
    Browser client.
*/

console.log('Start React:',0);

import React from 'react';
import ReactDOM from 'react-dom';

import MyApp from "../components/app.js";

ReactDOM.render(<MyApp />, document.getElementById('neutralinoapp'));
console.log('End React:',1);