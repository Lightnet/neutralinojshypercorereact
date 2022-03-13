/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react";
import {
  Routes,
  Route
} from "react-router-dom";
import AboutPage from "./about/AboutPage.jsx";
import HomePage from "./home/HomePage.jsx";
import HyperBeeContent from "./hyperbee/HyperBeeContent.jsx";
import HyperDrive2 from "./hyperdrive/HyperDrive2.jsx";
//import HyperDriveContent from "./hyperdrive/HyperDriveContent.jsx";
import TextEditorPage from "./texteditor/TextEditorPage.jsx";

export default function RoutePage(){

  return <div style={{height:"calc(100% - 58px)"}}>
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/hyperdrive/*" element={<HyperDrive2 />} />
      <Route path="/hyperbee/*" element={<HyperBeeContent />} />
      <Route path="/texteditor" element={<TextEditorPage />} />
    </Routes>
  </div>
}