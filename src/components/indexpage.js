/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react";
import {
  Routes,
  Route
} from "react-router-dom";
import AboutPage from "./about/aboutpage";
import HomePage from "./home/homepage";
import HyperBeeContent from "./hyper/hyperbeecontent";
import HyperDriveContent from "./hyper/hyperdrivecontent";
import TextEditor from "./texteditor/texteditorpage";
import FileUploadPage from "./ui/fileuploadpage";

export default function IndexPage(){

  return <div>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/drive/*" element={<HyperDriveContent />} />
      <Route path="/bee/*" element={<HyperBeeContent />} />
      <Route path="/texteditor" element={<TextEditor />} />
      <Route path="/upload" element={<FileUploadPage />} />
    </Routes>
  </div>
}