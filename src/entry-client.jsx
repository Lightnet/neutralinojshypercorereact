/*
  LICENSE: MIT
  Created by: Lightnet
*/
import './style/globals.css'
import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { HyperCoreProvider } from './components/hypercore/HyperCoreProvider';

ReactDOM.hydrate(
  <ThemeProvider>
    <HyperCoreProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HyperCoreProvider>
  </ThemeProvider>
, document.getElementById('app'))