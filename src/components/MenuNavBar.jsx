/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react";
import { Link } from "react-router-dom";
import ThemeButton from "./theme/ThemeButton";

export default function MenuNavBar(){

  return <div style={{width:'100%', height:'28px'}} >
    <Link to="/" > Home </Link><span> | </span>
    <Link to="/hyperdrive" > HyperDrive </Link><span> | </span>
    <Link to="/hyperbee" > HyperBee </Link><span> | </span>
    <Link to="/texteditor" > Text Editor </Link><span> | </span>
    <ThemeButton/><span> | </span>
  </div>
}
//<Link to="/about" > About </Link><span> | </span>