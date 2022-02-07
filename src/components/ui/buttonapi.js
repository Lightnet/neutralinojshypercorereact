/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react";


export default function ButtonApi(){

  async function clickTest(){
    let rep = await fetch('http://localhost:80/api/test');
    console.log(rep);
    let data = await rep.json();
    console.log(data);
  }

  return <>
    <button onClick={clickTest}>Test</button>
  </>
}