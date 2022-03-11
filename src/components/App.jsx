/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react";
import {
  BrowserRouter,
} from "react-router-dom";
import { ThemeProvider } from "./theme/ThemeProvider.jsx";
import IndexPage from "./RoutePage.jsx";
import MenuNavBar from "./MenuNavBar.jsx";
import WindowHeader from "./neutralino/WindowHeader.jsx";
import { HyperCoreProvider } from "./hypercore/HyperCoreProvider.jsx";
// https://reactrouter.com/docs/en/v6/getting-started/overview

export default function App(){

  return <>
    <ThemeProvider>
      <HyperCoreProvider>
        <BrowserRouter>
        
          <WindowHeader></WindowHeader>
          <div style={{position:'fixed', top:'28px', left:'0px', width:'100%', height:'100%'}}>
            <MenuNavBar />
            <IndexPage />
          </div>
        
        </BrowserRouter>
      </HyperCoreProvider>
    </ThemeProvider>
  </>
}