/*
  LICENSE: MIT
  Created by: Lightnet

  Information:
    Browser client.
*/

//console.log('Start React:',0);

// using node-style package resolution in a CSS file: 
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import React from 'react';
import ReactDOM from 'react-dom';
import App from "../components/App.jsx";

ReactDOM.render(<App />, document.getElementById('neutralinoapp'));
//console.log('End React:',1);