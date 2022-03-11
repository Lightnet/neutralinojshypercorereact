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
import HyperBeeContent from "./hyper/HyperBeeContent.jsx";
import HyperDriveContent from "./hyper/HyperDriveContent.jsx";
import TextEditorPage from "./texteditor/TextEditorPage.jsx";

export default function RoutePage(){

  return <div style={{height:"calc(100% - 58px)"}}>
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/hyperdrive/*" element={<HyperDriveContent />} />
      <Route path="/hyperbee/*" element={<HyperBeeContent />} />
      <Route path="/texteditor" element={<TextEditorPage />} />
    </Routes>
  </div>
}