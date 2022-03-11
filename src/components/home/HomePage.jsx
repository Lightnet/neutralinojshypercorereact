/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react";
import { Button } from "@blueprintjs/core";

export default function HomePage(){

  return <>
    <p>Welcome to hyperdrive and hyperbee application.</p> 
    <p> This use Express.js, hyperDrive.js, HyperBee.js, React.js, Blueprint.js, Axios.js, Babel.js and other packages.</p>
    <p> HyperDrive as name say that as it used peer to peer drive. But current store files on local folder directory in hypercore format. </p>
    <p> The drive folder store in "my-hyperdrive" in current project folder.</p>
    
    <br />
    <Button icon="refresh" small text="button content" /><Button icon="refresh" text="button content" />
  </>
}