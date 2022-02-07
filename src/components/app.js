/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react";

import { ThemeProvider } from "./theme/themeprovider";
import {
  BrowserRouter,
} from "react-router-dom";
import IndexPage from "./indexpage";
import NavBar from "./navbar";
import WindowHeader from "./neutralino/windowheader";

// https://reactrouter.com/docs/en/v6/getting-started/overview

export default function MyApp(){

  return <ThemeProvider>
      <BrowserRouter>
        <WindowHeader></WindowHeader>
        <div style={{
        position:'fixed'
        , top:'28px'
        , left:'0px'
        , width:'100%'
        , height:'100%'
        //, WebkitAppRegion:'drag'
        //, background:'#000000'
      }}>
        <NavBar />
        <IndexPage />
      </div>
    </BrowserRouter>
  </ThemeProvider>
}